import { AUTH_FLOW_STATUS } from "../../auth/state";
import { Action } from "../../../types";
import { Context } from "../../overmind";
import {
  ErrorResponse,
  HttpResponse,
  MoodPagedListReadPublicResponse,
  MoodReadResponse,
  UserCreateRequest,
  UserInvitationPagedListReadPublicResponse,
  UserInviteRequest,
  UserReadPublicResponse,
  UserUpdateRequest,
} from "@newstackdev/iosdk-newgraph-client-js";
import { IBadgeResponse } from "../../../Components/UserWidget";
import { debounce, json, pipe, throttle } from "overmind";
import { fischerYates } from "../../../utils/random";
import { get, isEmpty, uniqBy } from "lodash";
export const cache: Action<{
  user: UserReadPublicResponse & { moods?: MoodReadResponse[] };
  force?: boolean;
  moods?: MoodReadResponse;
}> = async ({ state, actions, effects }, { user, force }) => {
  // moods.forEach(m => m.author = ur.data)
  let { id, username } = { id: "", username: "", ...user };
  const cache = state.api.cache.users;

  if (!id && !username) return Promise.resolve();

  await actions.cache.store({ label: "user", value: user });

  !id && (id = cache.byUsername[username].id || "");
  !username && (username = cache.byId[id]?.username || "");

  // mr.data.value?.forEach(m => (m.id && (state.api.cache.moods[m.id] = { ...state.api.cache.moods[m.id], ...m })));

  let curr;
  try {
    curr = (id ? cache.byId[id] : cache.byUsername[username]) || null;
  } catch (ex) {
    console.log(ex);
  }

  const isNewer = !curr?.id || new Date(user?.updated || 0).getTime() - new Date(curr?.updated || 0).getTime() > 0;

  const shouldUpdate = force || !curr || !curr?.moods?.length /* && user.moods?.length */ || isNewer;

  if (!shouldUpdate) return Promise.resolve();

  let mr: MoodReadResponse[] = [];

  if ((!curr?.username && !user?.username) || curr?.moods?.length || 0 > 4) {
    mr = curr?.moods;
  } else {
    try {
      const p = state.api.client.user.moodsList({ id });
      const response = await p;
      mr = response.data.value || [];
    } catch (e) {
      console.log(e);
    }
  }

  const moods = mr || [];

  mr && (await actions.api.mood.cache({ moods: mr }));

  if (state.api.auth.user?.id == id)
    state.api.auth.moods = [...(state.api.cache.users.byId[state.api.auth.user?.id || ""]?.moods || [])];

  if (curr && curr.id && curr.moods && curr.moods.length < moods.length) {
    cache.byId[id].moods = moods;
    cache.byUsername[username || ""].moods = moods;
  } else {
    cache.byId[id] = { ...curr, ...user, moods: mr };
    cache.byUsername[username] = { ...curr, ...user, moods };
  }

  if (shouldUpdate) {
    state.api.auth.user?.id === user.id &&
      (state.api.auth.user = Object.assign({}, json(state.api.auth.user) || {}, cache.byId[id]));
  } //state.api.auth.user, user));
};
const inProgress: Record<string, any> = {};

export const read: Action<{ id?: string; username?: string }, UserReadPublicResponse> = async (
  { state, actions, effects },
  { id, username },
) => {
  if (!(id || username)) return Promise.resolve();

  const known = (id && state.api.cache.users.byId[id]) || (username && state.api.cache.users.byUsername[username]);

  const ur: any = await (known
    ? Promise.resolve({ data: known })
    : state.api.client.user.userList({ ...(id ? { id } : {}), username }));

  id = id || ur?.data?.id || "";

  actions.api.user.cache({ user: ur.data });
  return ur.data;
};

export const create: Action<{
  noRouting?: boolean;
  user: UserCreateRequest;
  preregisterCreate?: boolean;
}> = pipe(throttle(3000), async ({ state, effects, actions }: Context, { noRouting, user, preregisterCreate }) => {
  try {
    const currUser = state.api.auth.user || {};
    if (currUser.id && preregisterCreate) {
      return;
    }

    if (
      currUser.id &&
      currUser.username &&
      !["imported"].includes(currUser.status || "") &&
      !state.flows.user.create.isLegacyUpdateOngoing
    ) {
      return;
    }
    const pn = state.flows.user.create.form.phone || state.firebase.user!.phoneNumber;
    if (!pn) {
      !noRouting && actions.routing.historyPush({ location: "/auth" });
      return;
    }
    user.phone = pn;
    const nu = preregisterCreate
      ? await state.api.client.user.preregisterCreate(user)
      : await state.api.client.user.userCreate({
          ...user,
          legacyToken: state.flows.user.create.legacyToken,
        });

    !preregisterCreate &&
      effects.ux.notification.open({
        message: "Success!",
        description: "User was created successfully. Welcome to Newlife.IO!",
      });
    await actions.api.auth.logout({ keepFbUser: true });
    await actions.firebase.refreshApiToken();
    await actions.api.auth.authorize();

    state.flows.user.create.justCreated = true;
    state.flows.user.create.isLegacyUpdateOngoing = false;
    state.flows.user.create.progressedSteps = [];
    actions.routing.historyPush({ location: "/explore" });
  } catch (ex) {
    effects.ux.message.error(JSON.stringify(get(ex, "error.errorMessage.details") || get(ex, "message")));
  }
});

export const update: Action<{ user: UserUpdateRequest; file?: any }> = async ({ state, effects, actions }, { user, file }) => {
  const id = state.api.auth.user?.id ?? "";

  await state.api.client.user.userUpdate({ ...user, id });

  effects.ux.message.info(`Successfully updated profile`);

  // state.api.cache.users.byId[id] = state.api.auth.user = {
  //   ...state.api.auth.user
  // };

  const hasUpload = file && file.originFileObj;

  if (hasUpload) {
    //@ts-ignore
    const uploadInfo = await state.api.client.user.uploadCreate({
      filename: file.name,
      contentType: file.type,
    });

    const r = await fetch(uploadInfo.data.url as string, {
      method: "PUT",
      body: file.originFileObj,
    });

    effects.ux.message.info(`Successfully updated profile avatar. Processing the image, this will take up to a minute.`);
  }
  actions.api.user.cache({
    force: true,
    user: { ...state.api.auth.user, ...user, id, ...(hasUpload ? { contentUrl: "PROCESSING" } : {}) },
  });
};

export const getMoods: Action<{ id?: string }> = pipe(debounce(300), async ({ state, actions, effects }, { id }) => {
  if (!id) return;

  const page = state.lists.selectedUser.moods.page ?? 0;
  const r = await state.api.client.user.moodsList({
    page: page.toString(),
    id,
  });
  state.lists.selectedUser.isNextMoodsAvailable = true;
  if (isEmpty(r.data?.value)) {
    state.lists.selectedUser.isNextMoodsAvailable = false;
    return;
  }
  // state.lists.selectedUser.isNextMoodsAvailable = true;
  const u = state.api.cache.users.byId[id];

  await actions.api.user.cache({ user: u });

  // const un = u?.username || "";

  if (state.api.cache.users.byId[id]) {
    const moods = state.api.cache.users.byId[id].moods || [];
    state.api.cache.users.byId[id].moods = uniqBy(
      [...moods, ...((r.data?.value || []) as MoodReadResponse[])],
      (mood: MoodReadResponse) => mood?.id,
    );
  }
  if (state.api.cache.users.byUsername[u?.username || ""]) {
    const moods = state.api.cache.users.byUsername[u?.username || ""].moods || [];
    state.api.cache.users.byUsername[u.username || ""].moods = uniqBy(
      [...moods, ...((r.data?.value || []) as MoodReadResponse[])],
      (mood: MoodReadResponse) => mood?.id,
    );
  }

  //   moods: (r.data?.value || []) as MoodReadResponse[],
  // };
  await actions.api.mood.cache({ moods: fischerYates(r.data?.value || []) });
  state.lists.selectedUser.moods.page++;
  // r.data.value?.forEach(p => p.id && (state.api.cache.moods[p.id] = { ...state.api.cache.moods[p.id], ...p }))
});

export const getBadges: Action<{ id: string }, Promise<IBadgeResponse>> = pipe(
  debounce(300),
  async ({ state, effects }, { id }) => {
    try {
      const res = await state.api.client.user.badgeListList({ id });
      return res.data;
    } catch (ex) {
      effects.ux.message.error(((ex as any).error as ErrorResponse).errorMessage);
      return [];
    }
  },
);

export const stake: Action<{ user: UserReadPublicResponse; amount: string }, any> = pipe(
  debounce(1000),
  async ({ state, actions, effects }: Context, { user, amount }) => {
    try {
      const u = await actions.api.user.read(user);

      const res = await state.api.client.user.stakeCreate({
        username: u?.username || "",
        amount,
      });

      state.api.cache.stakeHistory.push({
        user,
        amount,
        response: res,
        error: null,
      });

      //tate.api.actions.newcoin.getAccountBalance();({ user, amount, response: res });

      const pool = { owner: user.username };
      actions.newcoin.getAccountBalance({
        user: state.api.auth.user || {},
      });
      actions.newcoin.getPoolInfo({ pool: { owner: user.username } });

      return res.data;
    } catch (ex) {
      const {
        error: { errorMessage },
      }: { error: { errorMessage: string; statusCode: number } } = ex as any;

      state.api.cache.stakeHistory.push({
        user,
        amount,
        response: null,
        error: ex,
      });

      effects.ux.message.error(errorMessage);
    }
  },
);

export const invite: Action<{ userInvite: UserInviteRequest }, string | undefined> = async (
  { state, effects }: Context,
  { userInvite },
) => {
  try {
    const response = await state.api.client.user.inviteCreate(userInvite);
    //@ts-ignore
    return response.data.invitation?.hash;
  } catch (ex) {
    effects.ux.message.error(((ex as any).error as ErrorResponse).errorMessage);
  }
};

export const getUserInvitesList: Action<any, void> = async ({ state, effects, actions }: Context) => {
  try {
    const response = await state.api.client.user.inviteesList();

    const promises = response.data.value?.map((res) => {
      return actions.api.user.cache({ user: res });
    });

    if (promises) {
      await Promise.all(promises);
      state.api.auth.inviteesList = response.data;
    }
    return Promise.resolve();
  } catch (ex) {
    effects.ux.message.error(((ex as any).error as ErrorResponse).errorMessage);
  }
};

export const powerup: Action<{ user: UserReadPublicResponse; amount: number }> = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context, { user, amount }) => {
    try {
      const res = await state.api.client.user.userRateCreate({
        targetId: user.id,
        value: amount || 1,
      });
      effects.ux.message.info("Powerup successful");
      await actions.api.user.getPowerups({
        user: state.api.auth.user || {},
      });
      await actions.api.user.getPowerups({ user });
    } catch (ex) {
      effects.ux.message.error(((ex as any).error as ErrorResponse).errorMessage);
    }
  },
);

export const powerUpMultiple: Action<{
  users: UserReadPublicResponse[];
  amount?: number;
}> = pipe(debounce(300), async ({ state, actions, effects }: Context, powerUps) => {
  try {
    const promise = powerUps.users.map((user) => {
      return state.api.client.user.userRateCreate({
        targetId: user.id,
        value: 1,
      });
    });
    await Promise.all(promise);
    // effects.ux.message.info("Powerups successful");
    await actions.api.user.getPowerups({
      user: state.api.auth.user || {},
    });
    const promiseSecond = powerUps.users.map((user) => {
      return actions.api.user.getPowerups({ user });
    });
    await Promise.all(promiseSecond);
  } catch (ex) {
    effects.ux.message.error(((ex as any).error as ErrorResponse).errorMessage);
  }
});

export const getPowerups: Action<{ user: UserReadPublicResponse }> = pipe(
  // throttle(300),
  async ({ state }: Context, { user }: { user: UserReadPublicResponse }) => {
    if (!user.id) return;

    if (state.api.cache.powerups[user.id || ""]) return;

    const o = await state.api.client.user.ratedOutUsersList(user);
    const i = await state.api.client.user.ratedInList(user);

    state.api.cache.powerups[user.id || ""] = {
      in: i.data,
      out: o.data,
    };
  },
);

export const getCurrent: Action<undefined> = async ({ state, actions, effects }) => {
  try {
    // (state.routing.simpleHistory || [{ search: "" }])[0].search
    //   .slice(1)
    //   .split(/&/)
    //   .map((kv) => kv.split(/=/))
    //   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    state.api.auth.user = (await state.api.client.user.currentList()).data;
    state.auth.status = state.api.auth.user.username ? AUTH_FLOW_STATUS.AUTHORIZED : state.auth.status;
  } catch (ex) {
    state.api.auth.user = {};
  }

  // actions.auth.routeAfterAuth();
};

export const checkLinkHash: Action<{ hash: string }> = ({ effects }, { hash }) => {
  // effects.api
  return;
};

export const checkNft: Action<{ collectionAddr: string; nftId: number }> = ({ effects }, { collectionAddr, nftId }) => {
  // effects.api
  return;
};
