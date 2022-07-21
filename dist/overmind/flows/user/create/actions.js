import { debounce, pipe } from "overmind";
// import { IReaction } from "overmind";
const reduceState = ({ api: { auth }, auth: { authenticated }, config: { featureFlags }, flows: { user: { create: { legacyToken, form: { username, couponCode }, formUsernameIsAvailable, isLegacyUpdateOngoing, }, }, }, }) => {
    return {
        ...auth,
        ...{ authenticated },
        formUsername: username || "",
        subscribed: !!auth.user?.subscriptionStatus?.startsWith("io-domain-sale"),
        formUsernameIsAvailable,
        user: auth.user,
        legacyToken,
        isLegacyUpdateOngoing,
        featureFlags: featureFlags,
        couponCode: couponCode || "",
    };
};
export const onInitializeOvermind = async ({ actions, effects, state, reaction }) => {
    const legacy = JSON.parse(window.localStorage.getItem("legacyAuthToken") || "{}");
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
    reaction((s) => ({ auth: s.api.auth, username: s.flows.user.create.form.username }), ({ username, auth }) => {
        if (username && !auth.authorized)
            actions.flows.user.create.checkAvailability({ username });
    });
};
export const updateForm = //({ state }, val) =>
 pipe(
// debounce(200),
({ state }, val) => {
    state.flows.user.create.form = {
        ...state.flows.user.create.form,
        ...val,
    };
});
const usernameToAccount = (username) => {
    // adjust any string to newlife account name
    username = username.replace(/\.io/, "").replace(/[^a-z1-5]/g, "");
    if (/^[0-9]+/.test(username))
        username = "z" + username;
    return username.replace(/^(.{0,9})(.*)$/, (...m) => `${m[1]}.io`);
};
export const startLegacyImport = //({ state }, val) =>
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
    actions.routing.historyPush({ location: "/" });
    window.localStorage.setItem("legacyAuthToken", JSON.stringify({ legacyToken, updated: Date.now() }));
};
export const stopLegacyImport = (_, params = {}) => {
    window.localStorage.setItem("legacyAuthToken", "");
    if (!params.noRedirect)
        window.location.pathname = "/";
};
export const wizardStepPrev = ({ state }) => {
    state.flows.user.create.wizard.send("PREV", reduceState(state));
};
const autoRedirectFrom = ["", "/", "/auth"];
export const _wizardReact = // ({ state, actions }, i: WizardInput) =>
 pipe(debounce(300), ({ state, actions }, i) => {
    if (state.api.auth.authorized &&
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
    const subscription = (state.api.auth.user?.subscriptionStatus || "").split(/_/);
    if (subscription[0] === "io-domain-sale" && state.flows.user.create.form.username != subscription[1])
        actions.flows.user.create.updateForm({ username: subscription[1] });
});
export const wizardStepNext = ({ state }) => {
    state.flows.user.create.wizard.send("NEXT", reduceState(state));
    state.flows.user.create.wizard.send("UPDATE", reduceState(state));
};
export const preregisterCreate = async ({ actions }, params) => {
    const u = params.user || {};
    return actions.api.user.create({
        ...params,
        user: u,
        preregisterCreate: true,
    });
};
export const create = async ({ actions }, params) => {
    const u = await actions.api.user.create({ ...params });
    actions.flows.user.create.stopLegacyImport({ noRedirect: true });
};
export const checkAvailability = pipe(
// filter((_, { username }) => username.length > 6),
debounce(300), async ({ actions, state }, { username }) => {
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
    const availableOnNewlife = r.data?.available || (currUser?.username === username && currUser.status === "imported");
    // const availableOnNewcoin = nc?.statusCode === 500;
    state.flows.user.create.formUsernameIsAvailable = availableOnNewlife ? "available" : "unavailable"; // && availableOnNewcoin
});
// const deriveAndSetStep : Action<{ processors: WizardStepsProcessors }> = (ctx, { processors }) => {
//     const step: DOMAIN_PRESALE_STEPS = deriveStep(ctx, { processors });
//     ctx.state.flows.user.create.wizard.step.current = step;
//# sourceMappingURL=actions.js.map