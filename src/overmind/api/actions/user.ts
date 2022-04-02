import {
  ErrorResponse,
  MoodReadResponse,
  UserCreateRequest,
  UserInviteRequest,
  UserReadPublicResponse,
  UserUpdateRequest,
} from "@newlife/newlife-creator-client-api";
import { get } from "lodash";
import { debounce, pipe, throttle } from "overmind";
import { Action } from "../../../types";
import { AUTH_FLOW_STATUS } from "../../auth/state";
import { Context } from "../state";

export const cache: Action<{ user: UserReadPublicResponse }> = async (
  { state, actions, effects },
  { user }
) => {
  // moods.forEach(m => m.author = ur.data)
  const { id, username } = { id: "", username: "", ...user };
  const cache = state.api.cache.users;

  if (!id && !username) return;
  // mr.data.value?.forEach(m => (m.id && (state.api.cache.moods[m.id] = { ...state.api.cache.moods[m.id], ...m })));

  const curr = cache.byId[id] || cache.byUsername[username] || null;

  const mr =
    curr?.moods || (await state.api.client.user.moodsList({ id })).data?.value;

  const moods = mr || [];

  mr && actions.api.mood.cache({ moods: mr });

  if (
    curr &&
    curr.id &&
    curr.username &&
    curr.moods &&
    curr.moods.length < moods.length
  ) {
    cache.byId[id].moods = moods;
    cache.byUsername[curr.username || ""].moods = moods;
  } else {
    cache.byId[id] = { ...curr, ...user, moods: mr };
    cache.byUsername[username] = { ...curr, ...user, moods };
  }
};
const inProgress: Record<string, any> = {};

export const read: Action<
  { id?: string; username?: string },
  UserReadPublicResponse
> = async ({ state, actions, effects }, { id, username }) => {
  if (!(id || username)) return;

  const known =
    (id && state.api.cache.users.byId[id]) ||
    (username && state.api.cache.users.byUsername[username]);

  const ur: any = await (known
    ? Promise.resolve({ data: known })
    : state.api.client.user.userList({ ...(id ? { id } : {}), username }));

  id = id || ur.data.id || "";

  actions.api.user.cache({ user: ur.data });
  return ur.data;
};

export const create: Action<{
  noRouting?: boolean;
  user: UserCreateRequest;
  preregisterCreate?: boolean;
}> = pipe(
  throttle(3000),
  async (
    { state, effects, actions }: Context,
    { noRouting, user, preregisterCreate }
  ) => {
    try {
      const currUser = state.api.auth.user || {};
      if (currUser.id && preregisterCreate) return;

      if (
        currUser.id &&
        currUser.username &&
        !["imported"].includes(currUser.status || "")
      )
        return;

      const pn = state.firebase.user!.phoneNumber;
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
          description: "User was created successfully",
        });

      await actions.api.auth.logout({ keepFbUser: true });
      await actions.firebase.refreshApiToken();
      await actions.api.auth.authorize();

      state.flows.user.create.justCreated = true;
    } catch (ex) {
      effects.ux.message.error(
        JSON.stringify(
          get(ex, "error.errorMessage.details") || get(ex, "message")
        )
      );
    }
  }
);

export const update: Action<{ user: UserUpdateRequest; file?: any }> = async (
  { state, effects, actions },
  { user, file }
) => {
  const id = state.api.auth.user?.id ?? "";

  await state.api.client.user.userUpdate({ ...user, id });

  effects.ux.message.info(`Successfully updated profile`);

  state.api.cache.users.byId[id] = state.api.auth.user = {
    ...state.api.auth.user,
  };

  if (file && file.originFileObj) {
    //@ts-ignore
    const uploadInfo = await state.api.client.user.uploadCreate({
      filename: file.name,
      contentType: file.type,
    });

    const r = await fetch(uploadInfo.data.url as string, {
      method: "PUT",
      body: file.originFileObj,
    });

    await actions.api.user.cache({
      user: { ...state.api.auth.user, ...user, contentUrl: "processing" },
    });

    effects.ux.message.info(
      `Successfully updated profile avatar. Processing the image, this will take up to a minute.`
    );
  }

  // state.auth.user = { ...state.auth.user, ...user, contentUrl: "PROCESSING" };
};

export const getMoods: Action<{ id?: string }> = async (
  { state, actions, effects },
  { id }
) => {
  if (!id) return;

  const r = await state.api.client.user.moodsList({ id });

  if (!r.data) return;

  const u = state.api.cache.users.byId[id];
  const un = u?.username || "";

  state.api.cache.users.byId[id] = {
    ...u,
    moods: (r.data?.value || []) as MoodReadResponse[],
  };
  state.api.cache.users.byUsername[un] = {
    ...u,
    moods: (r.data?.value || []) as MoodReadResponse[],
  };

  actions.api.mood.cache({ moods: r.data?.value });
  // r.data.value?.forEach(p => p.id && (state.api.cache.moods[p.id] = { ...state.api.cache.moods[p.id], ...p }))
};

export const stake: Action<{ user: UserReadPublicResponse; amount: string }> =
  pipe(
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
        actions.newcoin.getAccountBalance({ user: state.api.auth.user || {} });
        actions.newcoin.getPoolInfo({ pool: { owner: user.username } });
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
    }
  );

export const invite: Action<{ userInvite: UserInviteRequest }> = (
  { state },
  { userInvite }
) => {
  const rate = state.api.client.user.inviteCreate(userInvite);
};

export const powerup: Action<{ user: UserReadPublicResponse; amount: number }> =
  pipe(
    debounce(300),
    async ({ state, actions, effects }: Context, { user, amount }) => {
      try {
        const res = await state.api.client.user.rateCreate({
          targetId: user.id,
          value: amount || 1,
        });
        effects.ux.message.info("Powerup successful");
        await actions.api.user.getPowerups({ user: state.api.auth.user || {} });
        await actions.api.user.getPowerups({ user });
      } catch (ex) {
        effects.ux.message.error(
          ((ex as any).error as ErrorResponse).errorMessage
        );
      }
    }
  );

export const getPowerups: Action<{ user: UserReadPublicResponse }> = pipe(
  debounce(300),
  async ({ state }: Context, { user }: { user: UserReadPublicResponse }) => {
    const o = await state.api.client.user.ratedOutUsersList(user);
    const i = await state.api.client.user.ratedInList(user);

    state.api.cache.powerups[user.id || ""] = {
      in: i.data,
      out: o.data,
    };
  }
);

export const getCurrent: Action<undefined> = async ({
  state,
  actions,
  effects,
}) => {
  try {
    state.routing.simpleHistory[0].search
      .slice(1)
      .split(/&/)
      .map((kv) => kv.split(/=/))
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    state.api.auth.user = (await state.api.client.user.currentList()).data;
    state.auth.status = state.api.auth.user.username
      ? AUTH_FLOW_STATUS.AUTHORIZED
      : state.auth.status;
  } catch (ex) {
    state.api.auth.user = {};
  }

  // actions.auth.routeAfterAuth();
};
