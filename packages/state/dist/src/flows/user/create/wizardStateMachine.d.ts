import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
declare type States = {
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
};
export declare type WizardInput = {
    authenticated: boolean;
    authorized: boolean;
    subscribed: boolean;
    formUsername: string;
    formUsernameIsAvailable: string;
    user: UserReadPrivateResponse | null;
    legacyToken: string;
};
declare type BaseState = {
    current: string;
    hasNext: boolean;
    hasPrev: boolean;
};
declare type Events = {
    type: "NEXT";
    data: WizardInput;
} | {
    type: "PREV";
    data: WizardInput;
} | {
    type: "UPDATE";
    data: WizardInput;
};
export declare const Wizard: {
    create(state: States, baseState: BaseState): States & BaseState & import("overmind/lib/statemachine").MachineMethods<States, Events, BaseState>;
};
export {};
//# sourceMappingURL=wizardStateMachine.d.ts.map