import { UserCreateRequest } from "@newcoin-foundation/iosdk-newgraph-client-js";
export declare enum DOMAIN_PRESALE_STEPS {
    SELECT_DOMAIN = 0,
    AUTHENTICATE = 1,
    CREATE_USER = 2,
    DONE = 3
}
export declare const state: {
    form: Partial<UserCreateRequest & {
        couponCode?: string | undefined;
    }>;
    justCreated: boolean;
    legacyToken: string;
    legacyUsername: string;
    isLegacyUpdateOngoing: boolean;
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
