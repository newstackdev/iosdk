import { derived } from "overmind";
import history from "../../history";
import { AUTH_FLOW_STATUS } from "../auth/state";
export const ROUTE_ACCESS_LEVELS = {
    "/": (_st) => true,
    "/profile": (st) => st > AUTH_FLOW_STATUS.ANONYMOUS,
    "/auth": (st) => true,
    "/auth/newlife-members": (st) => true,
    "/create-user": (st) => AUTH_FLOW_STATUS.AUTHORIZED <= st &&
        st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/DomainPresale": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
    "/terms_of_service": () => true,
    "/privacy_policy": () => true,
};
const state = {
    preLoginRoute: "",
    breadcrumbs: [],
    history: history,
    backHistory: [],
    simpleHistory: [],
    location: "",
    isAllowed: derived((st, gst) => {
        const specificAccess = gst.config.settings.routing.routeAccessLevels[st.location.split(/\?/)[0]];
        const isAllowed = (!specificAccess && gst.api.auth.authorized) ||
            (specificAccess && specificAccess(gst.auth.status));
        console.log("isAllowed", isAllowed);
        return isAllowed;
    }),
};
export default state;
//# sourceMappingURL=state.js.map