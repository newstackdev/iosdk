"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailability = exports.create = exports.preregisterCreate = exports.wizardStepNext = exports._wizardReact = exports.wizardStepPrev = exports.stopLegacyImport = exports.startLegacyImport = exports.updateForm = exports.onInitializeOvermind = void 0;
const overmind_1 = require("overmind");
// import { IReaction } from "overmind";
const reduceState = ({ api: { auth }, auth: { authenticated }, flows: { user: { create: { legacyToken, form: { username }, formUsernameIsAvailable } } } }) => {
    return ({
        ...auth, ...{ authenticated }, formUsername: username || "",
        subscribed: !!auth.user?.subscriptionStatus,
        formUsernameIsAvailable,
        user: auth.user,
        legacyToken
    });
};
const onInitializeOvermind = async ({ actions, effects, state, reaction }) => {
    const legacy = JSON.parse(window.localStorage.getItem('legacyAuthToken') || "{}");
    if (legacy.updated && ((Date.now() - (legacy.updated || 0) < 30 * 60000))) {
        // const cf = state.flows.user.create;
        // cf.form = legacy.form;
        // cf.legacyToken = legacy.legacyToken;
        //actions.auth.firebaseRequestToken
        effects.api.updateToken(legacy.legacyToken);
        state.firebase.token = legacy.legacyToken;
        await actions.api.auth.authorize();
        await actions.flows.user.create.startLegacyImport();
    }
    ;
    reaction(reduceState, actions.flows.user.create._wizardReact);
    reaction((s) => ({ auth: s.api.auth, username: s.flows.user.create.form.username }), ({ username, auth }) => {
        if (username && !auth.authorized)
            actions.flows.user.create.checkAvailability({ username });
    });
};
exports.onInitializeOvermind = onInitializeOvermind;
exports.updateForm = (0, overmind_1.pipe)((0, overmind_1.debounce)(200), ({ state }, val) => {
    state.flows.user.create.form = { ...state.flows.user.create.form, ...val };
});
const usernameToAccount = (username) => {
    username = username.replace(/\.io/, "").replace(/[^a-z1-5]/g, "");
    if (/^[0-9]+/.test(username))
        username = "z" + username;
    return username
        .replace(/^(.{0,9})(.*)$/, (...m) => `${m[1]}.io`);
};
const startLegacyImport = async ({ state, actions }) => {
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
    window.localStorage.setItem('legacyAuthToken', JSON.stringify({ legacyToken, updated: Date.now() }));
};
exports.startLegacyImport = startLegacyImport;
const stopLegacyImport = (_, params = {}) => {
    window.localStorage.setItem('legacyAuthToken', "");
    if (!params.noRedirect)
        window.location.pathname = "/";
};
exports.stopLegacyImport = stopLegacyImport;
const wizardStepPrev = ({ state }) => {
    state.flows.user.create.wizard.send("PREV", reduceState(state));
};
exports.wizardStepPrev = wizardStepPrev;
const autoRedirectFrom = ["", "/", "/auth"];
exports._wizardReact = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), ({ state, actions }, i) => {
    if (state.api.auth.authorized &&
        // (state.auth.user?.status === "registered") &&
        (state.api.auth.user?.username != state.flows.user.create.form.username) &&
        autoRedirectFrom.includes(state.routing.location) &&
        state.newcoin.pools["CGY"])
        actions.routing.historyPush({ location: "/explore" });
    state.flows.user.create.wizard.send("UPDATE", i);
});
const wizardStepNext = ({ state }) => {
    state.flows.user.create.wizard.send('NEXT', reduceState(state));
    state.flows.user.create.wizard.send('UPDATE', reduceState(state));
};
exports.wizardStepNext = wizardStepNext;
const preregisterCreate = async ({ actions }, params) => {
    const u = params.user || {};
    return actions.api.user.create({ ...params, user: u, preregisterCreate: true });
};
exports.preregisterCreate = preregisterCreate;
const create = async ({ actions }, params) => {
    const u = await actions.api.user.create({ ...params });
    actions.flows.user.create.stopLegacyImport({ noRedirect: true });
};
exports.create = create;
exports.checkAvailability = (0, overmind_1.pipe)(
// filter((_, { username }) => username.length > 6),
(0, overmind_1.debounce)(300), async ({ actions, state }, { username }) => {
    if (!username) {
        state.flows.user.create.formUsernameIsAvailable = "";
        return;
    }
    ;
    state.flows.user.create.formUsernameIsAvailable = "checking";
    // const promises = [
    //     state.api.client.user.availabilityList({ username }),
    //     actions.newcoin.getAccountHitory({ user: { username } })
    // ];
    // const [r, nc] = await Promise.all(promises);  //actions.flows.user.create._userCreate({ ...params });
    const r = await state.api.client.user.availabilityList({ username });
    const currUser = state.api.auth.user;
    const availableOnNewlife = r.data?.available || ((currUser?.username === username) && (currUser.status === "imported"));
    // const availableOnNewcoin = nc?.statusCode === 500;
    state.flows.user.create.formUsernameIsAvailable = availableOnNewlife ? "available" : "unavailable"; // && availableOnNewcoin
});
// const deriveAndSetStep : Action<{ processors: WizardStepsProcessors }> = (ctx, { processors }) => {
//     const step: DOMAIN_PRESALE_STEPS = deriveStep(ctx, { processors });
//     ctx.state.flows.user.create.wizard.step.current = step;
//# sourceMappingURL=actions.js.map