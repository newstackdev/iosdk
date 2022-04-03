"use strict";
exports.__esModule = true;
exports.api = void 0;
var overmind_1 = require("overmind");
var state_1 = require("../auth/state");
exports.api = {};
exports["default"] = {
    client: exports.api,
    auth: {
        // newlife
        user: null,
        moods: [],
        status: state_1.AUTH_FLOW_STATUS.ANONYMOUS,
        attempted: false,
        userDisplayHandler: (0, overmind_1.derived)(function (state, rs) {
            var _a, _b, _c;
            return (((_a = state.user) === null || _a === void 0 ? void 0 : _a.username) ||
                (((_b = rs.firebase.user) === null || _b === void 0 ? void 0 : _b.phoneNumber) || "") + (((_c = state.user) === null || _c === void 0 ? void 0 : _c.id) ? "*" : ""));
        }),
        authorized: (0, overmind_1.derived)(function (s, rs) {
            return rs.auth.status >= state_1.AUTH_FLOW_STATUS.AUTHORIZED;
        }),
        admitted: (0, overmind_1.derived)(function (s) { var _a; return ["admitted", "registered"].includes(((_a = s.user) === null || _a === void 0 ? void 0 : _a.status) || ""); })
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
};
