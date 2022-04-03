"use strict";
exports.__esModule = true;
exports.ROUTE_ACCESS_LEVELS = void 0;
var overmind_1 = require("overmind");
var state_1 = require("../auth/state");
exports.ROUTE_ACCESS_LEVELS = {
    "/": function (_st) { return true; },
    "/profile": function (st) { return st > state_1.AUTH_FLOW_STATUS.ANONYMOUS; },
    "/auth": function (st) { return true; },
    "/auth/legacy": function (st) { return true; },
    "/create-user": function (st) {
        return state_1.AUTH_FLOW_STATUS.AUTHORIZED <= st && st < state_1.AUTH_FLOW_STATUS.AUTHENTICATED;
    },
    "/DomainPresale": function (st) { return st < state_1.AUTH_FLOW_STATUS.AUTHENTICATED; },
    "/terms_of_service": function () { return true; },
    "/privacy_policy": function () { return true; }
};
var state = {
    preLoginRoute: "",
    breadcrumbs: [],
    history: history,
    backHistory: [],
    simpleHistory: [],
    location: "",
    isAllowed: (0, overmind_1.derived)(function (st, gst) {
        var specificAccess = exports.ROUTE_ACCESS_LEVELS[st.location.split(/\?/)[0]];
        var isAllowed = (!specificAccess && gst.api.auth.authorized) ||
            (specificAccess && specificAccess(gst.auth.status));
        console.log("isAllowed", isAllowed);
        return isAllowed;
    })
};
exports["default"] = state;
