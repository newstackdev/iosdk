"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const overmind_1 = require("overmind");
const state_1 = require("../auth/state");
exports.api = {};
exports.default = {
    client: exports.api,
    auth: {
        // newlife
        user: null,
        moods: [],
        status: state_1.AUTH_FLOW_STATUS.ANONYMOUS,
        attempted: false,
        userDisplayHandler: (0, overmind_1.derived)((state, rs) => {
            return state.user?.username ||
                ((rs.firebase.user?.phoneNumber || "") + (state.user?.id ? "*" : ""));
        }),
        authorized: (0, overmind_1.derived)((s, rs) => rs.auth.status >= state_1.AUTH_FLOW_STATUS.AUTHORIZED),
        admitted: (0, overmind_1.derived)((s) => ["admitted", "registered"].includes(s.user?.status || "")),
    },
    cache: {
        posts: {},
        moods: {},
        users: {
            byId: {},
            byUsername: {}
        },
        powerups: {},
        stakeHistory: []
    }
    // post: derived((state: State) => (id: string) => state._posts[id] || actions.getPost(id) )
};
//# sourceMappingURL=state.js.map