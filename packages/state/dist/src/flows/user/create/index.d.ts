import * as actions from "./actions";
declare const _default: {
    actions: typeof actions;
    effects: {};
    state: {
        form: Partial<import("@newlife/newlife-creator-client-api").UserCreateRequest>;
        justCreated: boolean;
        legacyToken: string;
        formUsernameIsAvailable: "" | "available" | "checking" | "unavailable";
        wizard: ({
            current: "SELECT_DOMAIN";
            hasNext: boolean;
            hasPrev: false;
        } | {
            current: "AUTHENTICATE";
            hasNext: boolean;
            hasPrev: boolean;
        } | {
            current: "SUBSCRIBE";
            hasNext: boolean;
            hasPrev: boolean;
        } | {
            current: "CREATE_USER";
            hasNext: boolean;
            hasPrev: boolean;
        } | {
            current: "DONE";
            hasNext: false;
            hasPrev: false;
        }) & {
            current: string;
            hasNext: boolean;
            hasPrev: boolean;
        } & import("overmind/lib/statemachine").MachineMethods<{
            current: "SELECT_DOMAIN";
            hasNext: boolean;
            hasPrev: false;
        } | {
            current: "AUTHENTICATE";
            hasNext: boolean;
            hasPrev: boolean;
        } | {
            current: "SUBSCRIBE";
            hasNext: boolean;
            hasPrev: boolean;
        } | {
            current: "CREATE_USER";
            hasNext: boolean;
            hasPrev: boolean;
        } | {
            current: "DONE";
            hasNext: false;
            hasPrev: false;
        }, {
            type: "NEXT";
            data: import("./wizardStateMachine").WizardInput;
        } | {
            type: "PREV";
            data: import("./wizardStateMachine").WizardInput;
        } | {
            type: "UPDATE";
            data: import("./wizardStateMachine").WizardInput;
        }, {
            current: string;
            hasNext: boolean;
            hasPrev: boolean;
        }>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map