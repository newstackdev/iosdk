import { Action } from "@newcoin-foundation/core";
import { UserCreateRequest } from "@newlife/newlife-creator-client-api";
import { get } from "lodash";
import { debounce, filter, pipe, throttle } from "overmind";
import { Context, State } from "../../../overmind";
import { WizardInput } from "./wizardStateMachine";
// import { IReaction } from "overmind";

const reduceState: (st: State) => WizardInput = ({
  api: { auth },
  auth: { authenticated },
  flows: {
    user: {
      create: {
        legacyToken,
        form: { username },
        formUsernameIsAvailable,
      },
    },
  },
}: State) => {
  return {
    ...auth,
    ...{ authenticated },
    formUsername: username || "",
    subscribed: !!auth.user?.subscriptionStatus,
    formUsernameIsAvailable,
    user: auth.user,
    legacyToken,
  };
};

export const onInitializeOvermind: Action<any> = async ({
  actions,
  effects,
  state,
  reaction,
}) => {
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

  reaction(reduceState, actions.flows.user.create._wizardReact);

  reaction(
    (s) => ({ auth: s.api.auth, username: s.flows.user.create.form.username }),
    ({ username, auth }) => {
      if (username && !auth.authorized)
        actions.flows.user.create.checkAvailability({ username });
    }
  );
};

export const updateForm: Action<Partial<UserCreateRequest>> = //({ state }, val) =>
  pipe(debounce(200), ({ state }, val) => {
    state.flows.user.create.form = { ...state.flows.user.create.form, ...val };
  });

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

    actions.auth.logout({ noRouting: true });
    actions.routing.historyPush({ location: "/" });

    actions.flows.user.create.updateForm(user);
    state.flows.user.create.legacyToken = legacyToken;
    const form = state.flows.user.create.form;
    form.username = user.username;
    form.displayName = form.username || form.displayName;
    form.username = usernameToAccount(form.displayName || "");

    window.localStorage.setItem(
      "legacyAuthToken",
      JSON.stringify({ legacyToken, updated: Date.now() })
    );
  };

export const stopLegacyImport: Action<{ noRedirect?: boolean } | undefined> = (
  _,
  params = {}
) => {
  window.localStorage.setItem("legacyAuthToken", "");
  if (!params.noRedirect) window.location.pathname = "/";
};

export const wizardStepPrev: Action = ({ state }) => {
  state.flows.user.create.wizard.send("PREV", reduceState(state));
};

const autoRedirectFrom = ["", "/", "/auth"];

export const _wizardReact: Action<WizardInput> = // ({ state, actions }, i: WizardInput) =>
  pipe(debounce(300), ({ state, actions }: Context, i: WizardInput) => {
    if (
      state.api.auth.authorized &&
      // (state.auth.user?.status === "registered") &&
      state.api.auth.user?.username != state.flows.user.create.form.username &&
      autoRedirectFrom.includes(state.routing.location) &&
      state.newcoin.pools["CGY"]
    )
      actions.routing.historyPush({ location: "/explore" });

    state.flows.user.create.wizard.send("UPDATE", i);
  });

export const wizardStepNext: Action = ({ state }) => {
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

export const checkAvailability: Action<{ username: string }> = pipe(
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
    const availableOnNewlife =
      r.data?.available ||
      (currUser?.username === username && currUser.status === "imported");
    // const availableOnNewcoin = nc?.statusCode === 500;

    state.flows.user.create.formUsernameIsAvailable = availableOnNewlife
      ? "available"
      : "unavailable"; // && availableOnNewcoin
  }
);

// const deriveAndSetStep : Action<{ processors: WizardStepsProcessors }> = (ctx, { processors }) => {
//     const step: DOMAIN_PRESALE_STEPS = deriveStep(ctx, { processors });
//     ctx.state.flows.user.create.wizard.step.current = step;
