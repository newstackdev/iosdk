"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.authorize = void 0;
const state_1 = require("../../auth/state");
const authorize = async ({ state, actions, effects }) => {
    state.auth.status = Math.max(state_1.AUTH_FLOW_STATUS.AUTHORIZING, state.auth.status);
    try {
        state.api.auth.user = await effects.api.authorize();
    }
    catch (ex) {
        console.log(ex);
    }
    if (!state.api.auth.user || !state.api.auth.user.id) {
        state.auth.status = state.firebase.user ? state_1.AUTH_FLOW_STATUS.AUTHENTICATED : state_1.AUTH_FLOW_STATUS.ANONYMOUS;
        if (!state.routing.isAllowed)
            actions.routing.historyPush({ location: "/" });
        state.api.auth.attempted = true;
        return;
    }
    ;
    actions.newcoin.getAccountBalance({ user: state.api.auth.user });
    actions.newcoin.getPoolInfo({ pool: { owner: state.api.auth.user.username } });
    if (!state.lists.top.moods.items.length) {
        actions.lists.top.moods();
        actions.lists.top.users();
        actions.lists.top.posts();
    }
    state.auth.status = state.api.auth.user?.username ? state_1.AUTH_FLOW_STATUS.AUTHORIZED : state_1.AUTH_FLOW_STATUS.AUTHENTICATED;
    actions.routing.routeAfterAuth();
};
exports.authorize = authorize;
const logout = async ({ state, actions, effects }, config) => {
    if (!config?.keepFbUser) {
        state.firebase.token = "";
        state.firebase.user = null;
    }
    ;
    state.api.auth.user = {};
    state.api.cache.stakeHistory = [];
    effects.api.updateToken("");
    effects.websockets.newlife.socket?.close();
};
exports.logout = logout;
//# sourceMappingURL=auth.js.map