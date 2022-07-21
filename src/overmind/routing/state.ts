import { AUTH_FLOW_STATUS, AUTH_FLOW_STATUS_TYPE } from "../auth/state";
import { History } from "history";
import { Link } from "../../types";
import { derived } from "overmind";
import history from "../../history";

export const ROUTE_ACCESS_LEVELS: Record<string, (st: AUTH_FLOW_STATUS_TYPE) => boolean> = {
  "/": (_st) => true,
  "/profile": (st) => st > AUTH_FLOW_STATUS.ANONYMOUS,
  "/auth": (st) => true, //st <= AUTH_FLOW_STATUS.AUTHENTICATED,
  "/auth/newlife-members": (st) => true,
  "/create-user": (st) => AUTH_FLOW_STATUS.AUTHORIZED <= st && st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/DomainPresale": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/terms_of_service": () => true,
  "/privacy_policy": () => true,

  ...",link,nft,link-verify,nft-verify,domain,subsribe,create,powerup"
    .split(/,/)
    .map((r) => ({ [`/signup${r ? "/" : ""}${r}`]: (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED }))
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
    const isAllowed = (!specificAccess && gst.api.auth.authorized) || (specificAccess && specificAccess(gst.auth.status));

    console.log("isAllowed", isAllowed);

    return isAllowed;
  }),
};

export default state;
