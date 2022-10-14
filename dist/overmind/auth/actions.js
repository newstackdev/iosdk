// import { User } from "@firebase/auth";
import { AUTH_FLOW_STATUS } from "./state";
export const logout = async ({ state, actions, effects }, { noRouting } = {}) => {
    state.auth.status = AUTH_FLOW_STATUS.ANONYMOUS;
    state.auth.timers.authTimeoutCancel();
    state.auth.timers.timeToRefreshCancel();
    await actions.api.auth.logout();
    Object.values(state.auth.tokens).forEach((t) => t.logout());
    await actions.newsafe.signOut();
    if (!noRouting)
        window.location.replace("/");
};
export const resetAuthTimer = async ({ state, actions, effects }) => {
    state.auth.timers.authTimeout = 120;
    state.auth.timers.authTimeoutCancel && state.auth.timers.authTimeoutCancel();
    state.auth.timers.authTimeoutCancel = () => undefined;
};
export const reduceTimer = async ({ state, actions, effects }) => {
    state.auth.timers.authTimeout -= 1;
};
export const fakeUserUpdate = async ({ state, actions }, upd) => {
    Object.assign(state.api.auth.user, (upd || {}));
};
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