"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_ACCESS_LEVELS = void 0;
const overmind_1 = require("overmind");
const history_1 = __importDefault(require("../../history"));
const state_1 = require("../auth/state");
exports.ROUTE_ACCESS_LEVELS = {
    "/": (_st) => true,
    "/profile": (st) => st > state_1.AUTH_FLOW_STATUS.ANONYMOUS,
    "/auth": (st) => true,
    "/auth/legacy": (st) => true,
    "/create-user": (st) => (state_1.AUTH_FLOW_STATUS.AUTHORIZED) <= st && (st < state_1.AUTH_FLOW_STATUS.AUTHENTICATED),
    "/DomainPresale": (st) => st < state_1.AUTH_FLOW_STATUS.AUTHENTICATED,
    "/terms_of_service": () => true,
    "/privacy_policy": () => true
};
const state = {
    preLoginRoute: "",
    breadcrumbs: [],
    history: history_1.default,
    backHistory: [],
    simpleHistory: [],
    location: "",
    isAllowed: (0, overmind_1.derived)((st, gst) => {
        const specificAccess = gst.config.settings.routing.routeAccessLevels[st.location.split(/\?/)[0]];
        const isAllowed = (!specificAccess && gst.api.auth.authorized)
            || (specificAccess && specificAccess(gst.auth.status));
        console.log("isAllowed", isAllowed);
        return isAllowed;
    })
};
exports.default = state;
//# sourceMappingURL=state.js.map