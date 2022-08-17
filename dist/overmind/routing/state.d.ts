import { AUTH_FLOW_STATUS_TYPE } from "../auth/state";
import { History } from "history";
import { Link } from "../../types";
import { State } from "../overmind";
export declare const ROUTE_ACCESS_LEVELS: Record<string, (st: AUTH_FLOW_STATUS_TYPE, gst: State) => boolean>;
declare const state: {
    preLoginRoute: string;
    breadcrumbs: Link[];
    history: History<unknown>;
    backHistory: {
        pathname: string;
        search: string;
    }[];
    simpleHistory: {
        pathname: string;
        search: string;
    }[];
    location: string;
    isAllowed: any;
};
export default state;
