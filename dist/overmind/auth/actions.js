"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUserUpdate = exports.reduceTimer = exports.resetAuthTimer = exports.logout = void 0;
const state_1 = require("./state");
const logout = async ({ state, actions, effects }, { noRouting } = {}) => {
    state.auth.status = state_1.AUTH_FLOW_STATUS.ANONYMOUS;
    state.auth.timers.authTimeoutCancel();
    state.auth.timers.timeToRefreshCancel();
    await actions.api.auth.logout();
    Object.values(state.auth.tokens).forEach(t => t.logout());
    // await effects.firebase.logout();
    // actions.routing.historyPush({ location: "/" });
    if (!noRouting)
        window.location.replace("/");
};
exports.logout = logout;
const resetAuthTimer = async ({ state, actions, effects }) => {
    state.auth.timers.authTimeout = 120;
    state.auth.timers.authTimeoutCancel && state.auth.timers.authTimeoutCancel();
    state.auth.timers.authTimeoutCancel = () => undefined;
};
exports.resetAuthTimer = resetAuthTimer;
const reduceTimer = async ({ state, actions, effects }) => {
    state.auth.timers.authTimeout -= 1;
};
exports.reduceTimer = reduceTimer;
const fakeUserUpdate = async ({ state, actions }, upd) => {
    Object.assign(state.api.auth.user, upd);
};
exports.fakeUserUpdate = fakeUserUpdate;
// export const newlifeLogout: Action<{ keepFbUser?: boolean } | undefined> = async ({ state, actions, effects }, config) => {
//     if(!config?.keepFbUser) {
//         state.auth.token = "";
//         state.auth.fbUser = null;
//     };
//     state.auth.user = {};
//     state.auth.status = AUTH_FLOW_STATUS.ANONYMOUS;
//     state.api.cache.stakeHistory = [];
//     state.auth.timers.authTimeoutCancel();
//     state.auth.timers.timeToRefreshCancel();
//     effects.api.updateToken("");
//     effects.websockets.newlife.socket?.close();
// }
// export const setPreloginRoute: Action<undefined> = ({ state,  actions,  effects }) => {
//     const p = window.location.pathname;
//     state.routing.preLoginRoute = p === "/auth" ? "" : p;
// };
// export const getCurrent: Action<undefined> = async ({ state, actions, effects }) => {
//     try {
//         state.routing.simpleHistory[0].search.slice(1).split(/&/).map(kv => kv.split(/=/)).reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
//         state.auth.user = (await state.api.client.user.currentList()).data;
//         state.auth.status = state.auth.user.username ? AUTH_FLOW_STATUS.AUTHORIZED : state.auth.status;
//     } catch (ex) {
//         state.auth.user = {};
//     }
//     actions.auth.routeAfterAuth();
// }
// reaction(
//     (state) => state.auth.authorized,
//     async () => {
//         if (
//             state.auth.status < AUTH_FLOW_STATUS.AUTHORIZED ||
//             !["registered", "admitted"].includes(state.auth.user?.status || "")
//         ) {
//             console.log("Not yet authorized")
//             return;
//         }
//         actions.websockets.toggleWebSocket()
//         await actions.api.user.getMoods({ id: state.auth.user?.id });
//         state.auth.moods = [...(state.api.cache.users.byId[state.auth.user?.id || ""]?.moods || [])];
//         await actions.api.user.getPowerups({ user : state.auth.user || {} });
//     }
// )
// reaction(
//     (state) => state.auth?.user?.id,
//     async (id) => {
//         if (!id || state.auth.status < AUTH_FLOW_STATUS.AUTHORIZED) {
//             return; //actions.auth.newlifeLogout();
//         }
//         // await actions.auth.refreshApiToken();
//         // await actions.auth.newlifeAuthorize();
//         state.auth.moods = ((await state.api.client.user.moodsList({ id })).data.value || []) as MoodReadResponse[];
//         await actions.api.user.getPowerups({ user : { id } });
//     }
// )
// export const setApi: Action<{ userInfo: UserInfo, client: CreatorApi }> = ({ state,  actions,  effects }, { userInfo, client }) => {
//     // state.userInfo = userInfo;
//     state.api.client = client;
// };
// export const wrapPromise: Action<Promise<unknown>> = ({ state,  actions,  effects }, value) => {
//     state.indicators._inProgressCounter++;
//     value
//         .finally(() => state.indicators._inProgressCounter--);
//     return value;
// };
//# sourceMappingURL=actions.js.map