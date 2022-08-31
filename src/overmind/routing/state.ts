import { AUTH_FLOW_STATUS, AUTH_FLOW_STATUS_TYPE } from "../auth/state";
import { History } from "history";
import { Link } from "../../types";
import { State } from "../overmind";
import { derived } from "overmind";
import { isEmpty } from "lodash";
import history from "../../history";

const ROUTE_ACCESS_LEVELS_ONBOARDING = ["create", "subscribe", "domain", "auth"];
const ROUTE_ACCESS_LEVELS_METAMASK = ["create", "domain", "auth"];

export const ROUTE_ACCESS_LEVELS: Record<string, (st: AUTH_FLOW_STATUS_TYPE, gst: State) => boolean> = {
  "/": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/profile": (st) => st > AUTH_FLOW_STATUS.ANONYMOUS,
  "/auth": (st) => true, //st <= AUTH_FLOW_STATUS.AUTHENTICATED,
  "/auth/newlife-members": (st) => true,
  "/create-user": (st) => AUTH_FLOW_STATUS.AUTHORIZED <= st && st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/DomainPresale": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/terms_of_service": () => true,
  "/privacy_policy": () => true,
  "/signup/metamask": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/signup/notInvited": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,

  ..."domain,subscribe,create,powerup,auth"
    .split(/,/)
    .map((r) => ({
      [`/signup${r ? "/" : ""}${r}`]: (st, gst: State) => {
        if (
          ((gst.flows.user.create.isLegacyUpdateOngoing || !isEmpty(gst.flows.user.create.progressedSteps)) &&
            ROUTE_ACCESS_LEVELS_ONBOARDING.includes(r)) ||
          (ROUTE_ACCESS_LEVELS_METAMASK.includes(r) && gst.flows.user.create.metamaskFlow)
        ) {
          return true;
        }
        return false;
      },
    }))
    .reduce((r, c) => ({ ...r, ...c }), {}),
};

const state = {
  preLoginRoute: "",
  breadcrumbs: <Link[]>[],
  history: history as History,
  backHistory: [] as { pathname: string; search: string }[],
  simpleHistory: [] as { pathname: string; search: string }[],
  location: "",
  isAllowed: derived((st: any, gst: any) => {
    const _specificAccess = gst.config.settings.routing.routeAccessLevels[st.location.split(/\?/)[0]];
    const _wildcard = gst.config.settings.routing.routeAccessLevels["*"];
    const specificAccess = _specificAccess || _wildcard;
    const isAllowed = (!specificAccess && gst.api.auth.authorized) || (specificAccess && specificAccess(gst.auth.status, gst));

    console.log("isAllowed", isAllowed);

    return isAllowed;
  }),
};

export default state;
