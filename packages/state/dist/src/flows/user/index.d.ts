declare const _default: {
    state: import("overmind/lib/internalTypes").SubType<{
        create: {
            form: Partial<import("@newlife/newlife-creator-client-api").UserCreateRequest & {
                displayName?: string;
            }>;
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
                data: import("./create/wizardStateMachine").WizardInput;
            } | {
                type: "PREV";
                data: import("./create/wizardStateMachine").WizardInput;
            } | {
                type: "UPDATE";
                data: import("./create/wizardStateMachine").WizardInput;
            }, {
                current: string;
                hasNext: boolean;
                hasPrev: boolean;
            }>;
        };
    }, object>;
    effects: import("overmind/lib/internalTypes").SubType<{
        create: {};
    }, object>;
    actions: import("overmind/lib/internalTypes").SubType<{
        create: typeof import("./create/actions");
    }, object>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map