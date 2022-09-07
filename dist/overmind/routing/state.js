import { AUTH_FLOW_STATUS } from "../auth/state";
import { derived } from "overmind";
import { isEmpty } from "lodash";
import history from "../../history";
const ROUTE_ACCESS_LEVELS_ONBOARDING = ["create", "subscribe", "domain", "auth"];
const ROUTE_ACCESS_LEVELS_METAMASK = ["create", "domain", "auth"];
export const ROUTE_ACCESS_LEVELS = {
    "/": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/profile": (st) => st > AUTH_FLOW_STATUS.ANONYMOUS,
    "/auth": (st) => true,
    "/auth/newlife-members": (st) => true,
    "/create-user": (st) => AUTH_FLOW_STATUS.AUTHORIZED <= st && st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/DomainPresale": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/terms_of_service": () => true,
    "/privacy_policy": () => true,
    "/signup/metamask": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/signup/notInvited": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/signout": () => true,
    ..."domain,subscribe,create,powerup,auth"
        .split(/,/)
        .map((r) => ({
        [`/signup${r ? "/" : ""}${r}`]: (st, gst) => {
            if (((gst.flows.user.create.isLegacyUpdateOngoing || !isEmpty(gst.flows.user.create.progressedSteps)) &&
                ROUTE_ACCESS_LEVELS_ONBOARDING.includes(r)) ||
                (ROUTE_ACCESS_LEVELS_METAMASK.includes(r) && gst.flows.user.create.metamaskFlow)) {
                return true;
            }
            return false;
        },
    }))
        .reduce((r, c) => ({ ...r, ...c }), {}),
};
const state = {
    preLoginRoute: "",
    breadcrumbs: [],
    history: history,
    backHistory: [],
    simpleHistory: [],
    location: "",
    isAllowed: derived((st, gst) => {
        const _specificAccess = gst.config.settings.routing.routeAccessLevels[st.location.split(/\?/)[0]];
        const _wildcard = gst.config.settings.routing.routeAccessLevels["*"];
        const specificAccess = _specificAccess || _wildcard;
        const isAllowed = (!specificAccess && gst.api.auth.authorized) || (specificAccess && specificAccess(gst.auth.status, gst));
        console.log("isAllowed", isAllowed);
        return isAllowed;
    }),
};
export default state;
//# sourceMappingURL=state.js.map