import { Link } from "@newcoin-foundation/core";
import { History } from "history";
import { derived } from "overmind";
import { AUTH_FLOW_STATUS, AUTH_FLOW_STATUS_TYPE } from "../auth/state";

export const ROUTE_ACCESS_LEVELS: Record<
  string,
  (st: AUTH_FLOW_STATUS_TYPE) => boolean
> = {
  "/": (_st) => true,
  "/profile": (st) => st > AUTH_FLOW_STATUS.ANONYMOUS,
  "/auth": (st) => true, //st <= AUTH_FLOW_STATUS.AUTHENTICATED,
  "/auth/legacy": (st) => true,
  "/create-user": (st) =>
    AUTH_FLOW_STATUS.AUTHORIZED <= st && st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/DomainPresale": (st) => st < AUTH_FLOW_STATUS.AUTHENTICATED,
  "/terms_of_service": () => true,
  "/privacy_policy": () => true,
};

const state = {
  preLoginRoute: "",
  breadcrumbs: <Link[]>[],
  history: history as unknown as History,
  backHistory: [] as { pathname: string; search: string }[],
  simpleHistory: [] as { pathname: string; search: string }[],
  location: "",
  isAllowed: derived((st: any, gst: any) => {
    const specificAccess = ROUTE_ACCESS_LEVELS[st.location.split(/\?/)[0]];
    const isAllowed =
      (!specificAccess && gst.api.auth.authorized) ||
      (specificAccess && specificAccess(gst.auth.status));

    console.log("isAllowed", isAllowed);

    return isAllowed;
  }),
};

export default state;
