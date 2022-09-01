import { Action } from "../../../../types";
import { Context, State } from "../../../overmind";
import { UserCreateRequest } from "@newstackdev/iosdk-newgraph-client-js";
import { WizardInput } from "./wizardStateMachine";
import { debounce, filter, pipe, throttle } from "overmind";
import { get, isEmpty, isNil } from "lodash";
// import { IReaction } from "overmind";

const reduceState: (st: State) => WizardInput = ({
  api: { auth },
  auth: { authenticated },
  config: { featureFlags },
  flows: {
    user: {
      create: {
        legacyToken,
        form: { username, couponCode, inviteHash, phone },
        formUsernameIsAvailable,
        inviteHashVerified,
        isLegacyUpdateOngoing,
        metamaskFlow,
      },
    },
  },
}: State) => {
  return {
    ...auth,
    ...{ authenticated },
    formUsername: username || "",
    inviteHash: inviteHash || "",
    subscribed: !!auth.user?.subscriptionStatus?.startsWith("io-domain-sale"),
    formUsernameIsAvailable,
    user: auth.user,
    formPhone: phone,
    inviteHashVerified,
    metamaskFlow,
    legacyToken,
    isLegacyUpdateOngoing,
    featureFlags: featureFlags,
    couponCode: couponCode || "",
  };
};

export const onInitializeOvermind: Action<any> = async ({ actions, effects, state, reaction }) => {
  const legacy: {
    form: UserCreateRequest;
    legacyToken: string;
    updated: number;
  } = JSON.parse(window.localStorage.getItem("legacyAuthToken") || "{}");

  if (legacy.updated && Date.now() - (legacy.updated || 0) < 30 * 60000) {
    // const cf = state.flows.user.create;
    // cf.form = legacy.form;
    // cf.legacyToken = legacy.legacyToken;
    //actions.auth.firebaseRequestToken
    effects.api.updateToken(legacy.legacyToken);
    state.firebase.token = legacy.legacyToken;
    await actions.api.auth.authorize();
    await actions.flows.user.create.startLegacyImport();
  }

  if (!state.auth.authenticated && !state.api.auth.authorized && !isEmpty(state.firebase?.token)) {
    actions.routing.historyPush({ location: "/" });
  }

  reaction(reduceState, actions.flows.user.create._wizardReact);
  reaction(
    (s) => ({ auth: s.api.auth, username: s.flows.user.create.form.username }),
    ({ username, auth }) => {
      if (!auth.authorized) actions.flows.user.create.checkAvailability({ username });
    },
  );
};

export const updateForm: Action<Partial<UserCreateRequest & { couponCode?: string; inviteHash?: string }>> = //({ state }, val) =>
  pipe(
    // debounce(200),
    ({ state }, val) => {
      state.flows.user.create.form = {
        ...state.flows.user.create.form,
        ...val,
      };
    },
  );

const usernameToAccount = (username: string) => {
  // adjust any string to newlife account name
  username = username.replace(/\.io/, "").replace(/[^a-z1-5]/g, "");

  if (/^[0-9]+/.test(username)) username = "z" + username;

  return username.replace(/^(.{0,9})(.*)$/, (...m) => `${m[1]}.io`);
};
export const startLegacyImport: Action = //({ state }, val) =>
  async ({ state, actions }) => {
    const user = { ...state.api.auth.user }; // wont be available after logout
    const legacyToken = state.firebase.token;

    const username = usernameToAccount(user.username || user.displayName || "");

    actions.flows.user.create.updateForm({
      ...user,
      username,
    });

    state.flows.user.create = {
      ...state.flows.user.create,
      legacyToken: legacyToken,
      legacyUsername: user.username || "",
      isLegacyUpdateOngoing: true,
    };

    actions.auth.logout({ noRouting: true });
    actions.routing.historyPush({ location: "/signup/domain" });

    window.localStorage.setItem("legacyAuthToken", JSON.stringify({ legacyToken, updated: Date.now() }));
  };

export const stopLegacyImport: Action<{ noRedirect?: boolean } | undefined> = (_, params = {}) => {
  window.localStorage.setItem("legacyAuthToken", "");
  if (!params.noRedirect) window.location.pathname = "/";
};

export const wizardStepPrev: Action = ({ state }) => {
  state.flows.user.create.wizard.send("PREV", reduceState(state));
};

const autoRedirectFrom = ["", "/", "/auth", "/signup/auth", "/signup/domain", "/signup/create", "/signup/subscibe"];

export const _wizardReact: Action<WizardInput> = // ({ state, actions }, i: WizardInput) =>
  pipe(debounce(300), ({ state, actions }: Context, i: WizardInput) => {
    if (
      state.api.auth.authorized &&
      ["registered", "admitted"].includes(state.api.auth.user?.status || "") &&
      !state.flows.user.create.isLegacyUpdateOngoing &&
      state.api.auth.user?.username !== state.flows.user.create.form.username &&
      autoRedirectFrom.includes(state.routing.location)
      // &&
      // state.newcoin.pools["CGY"]
    ) {
      actions.routing.historyPush({ location: "/explore" });
    }

    state.flows.user.create.wizard.send("UPDATE", i);

    const subscription = (state.api.auth.user.subscriptionStatus || "").split(/_/);
    if (subscription[0] === "io-domain-sale" && state.flows.user.create.form.username != subscription[1]) {
      actions.flows.user.create.updateForm({ username: subscription[1] });
      if (!state.flows.user.create.isLegacyUpdateOngoing && !state.api.auth.authorized) {
        actions.routing.historyPush({ location: "/signup/create" });
      }
    }
  });

export const wizardStepNext: Action = ({ state, actions }) => {
  const { nextLink, hasNext, current, hasPrev } = state.flows.user.create.wizard;
  if (!isEmpty(state.flows.user.create.wizard.nextLink)) {
    actions.routing.historyPush({ location: state.flows.user.create.wizard.nextLink as string });
  }

  state.flows.user.create.progressedSteps = state.flows.user.create.progressedSteps.filter((step) => step.current !== current);
  state.flows.user.create.progressedSteps.push({ nextLink, hasNext, current, hasPrev });

  state.flows.user.create.wizard.send("NEXT", reduceState(state));
  state.flows.user.create.wizard.send("UPDATE", reduceState(state));
};

export const preregisterCreate: Action<{
  noRouting?: boolean;
  user?: UserCreateRequest;
}> = async ({ actions }, params) => {
  const u = params.user || ({} as UserCreateRequest);
  return actions.api.user.create({
    ...params,
    user: u,
    preregisterCreate: true,
  });
};

export const create: Action<{
  noRouting?: boolean;
  user: UserCreateRequest;
}> = async ({ actions }, params) => {
  const u = await actions.api.user.create({ ...params });
  actions.flows.user.create.stopLegacyImport({ noRedirect: true });
};

export const checkAvailability: Action<{ username?: string }> = pipe(
  // filter((_, { username }) => username.length > 6),
  debounce(300),
  async ({ actions, state }: Context, { username }) => {
    if (!username) {
      state.flows.user.create.formUsernameIsAvailable = "";
      return;
    }
    state.flows.user.create.formUsernameIsAvailable = "checking";

    // const promises = [
    //     state.api.client.user.availabilityList({ username }),
    //     actions.newcoin.getAccountHitory({ user: { username } })
    // ];

    // const [r, nc] = await Promise.all(promises);  //actions.flows.user.create._userCreate({ ...params });
    const r = await state.api.client.user.availabilityList({ username });

    const currUser = state.api.auth.user;
    const isOpenSeaOffer = !isEmpty(r.data?.offer);
    const availableOnNewlife = r.data?.available || (currUser?.username === username && currUser.status === "imported");
    // const availableOnNewcoin = nc?.statusCode === 500;

    state.flows.user.create.formUsernameIsAvailable = availableOnNewlife
      ? isOpenSeaOffer
        ? "availableOnOpenSea"
        : state.flows.user.create.metamaskFlow
        ? "unavailable"
        : "available"
      : "unavailable"; // && availableOnNewcoin
  },
);

export const verifyHash: Action<{ inviteHash: string }> = pipe(async ({ state, actions, effects }: Context, { inviteHash }) => {
  try {
    const res = (await state.api.client.user.inviteHashList({ hash: inviteHash })).data;
    if (res) {
      state.flows.user.create.inviteHashVerified = true;
      //@ts-ignore
      actions.flows.user.create.updateForm({ ...res });
      actions.flows.user.create.wizardStepNext();
    }
  } catch (e) {
    effects.ux.notification.error({
      message: "Something went wrong, please try again",
    });
    actions.routing.historyPush({ location: "/signup/notInvited" });
  }
});

export const startMetamaskFlow: Action<{}> = pipe(async ({ state, actions }: Context) => {
  state.flows.user.create.metamaskFlow = true;
  actions.routing.historyPush({ location: "/signup/auth" });
});

export const stopMetamaskFlow: Action = pipe(async ({ state }: Context) => {
  state.flows.user.create.metamaskFlow = false;
});
