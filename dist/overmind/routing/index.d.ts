import * as actions from "./actions";
declare const _default: {
    actions: typeof actions;
    effects: {};
    state: {
        preLoginRoute: string;
        breadcrumbs: import("../../types").Link[];
        history: import("history").History<unknown>;
        backHistory: {
            pathname: string;
            search: string;
        }[];
        simpleHistory: {
            pathname: string;
            search: string;
        }[];
        location: string;
        isAllowed: boolean;
    };
};
export default _default;
