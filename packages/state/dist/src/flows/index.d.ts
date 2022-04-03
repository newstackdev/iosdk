declare const _default: {
    state: import("overmind/lib/internalTypes").SubType<{
        user: import("overmind/lib/internalTypes").SubType<{
            create: {
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
                    data: import("./user/create/wizardStateMachine").WizardInput;
                } | {
                    type: "PREV";
                    data: import("./user/create/wizardStateMachine").WizardInput;
                } | {
                    type: "UPDATE";
                    data: import("./user/create/wizardStateMachine").WizardInput;
                }, {
                    current: string;
                    hasNext: boolean;
                    hasPrev: boolean;
                }>;
            };
        }, object>;
        rating: {
            _value: number;
            value: number;
            startTime: number;
            isRating: boolean;
            rated: boolean;
            interval: {
                start: (f: import("@newcoin-foundation/core").EventHandler) => void;
                stop: () => void;
            };
            keyBinding: {
                remove: () => void;
                setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd, }: {
                    onKeyUp: import("@newcoin-foundation/core").EventHandler;
                    onKeyDown: import("@newcoin-foundation/core").EventHandler;
                }) => void;
            };
        };
    }, object>;
    effects: import("overmind/lib/internalTypes").SubType<{
        user: import("overmind/lib/internalTypes").SubType<{
            create: {};
        }, object>;
        rating: {
            initInterval: (ms: number) => {
                start: (f: import("@newcoin-foundation/core").EventHandler) => void;
                stop: () => void;
            };
            onceKeyBinding: (keyCodes: number[]) => {
                remove: () => void;
                setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd, }: {
                    onKeyUp: import("@newcoin-foundation/core").EventHandler;
                    onKeyDown: import("@newcoin-foundation/core").EventHandler;
                }) => void;
            };
        };
    }, object>;
    actions: import("overmind/lib/internalTypes").SubType<{
        user: import("overmind/lib/internalTypes").SubType<{
            create: typeof import("./user/create/actions");
        }, object>;
        rating: {
            deepLikeInit: import("@newcoin-foundation/core").Action<undefined, void>;
            deepLikeStart: import("@newcoin-foundation/core").Action<{
                event?: Event;
            }, void>;
            deepLikeStep: import("@newcoin-foundation/core").Action<undefined, void>;
            deepLikeStop: import("@newcoin-foundation/core").Action<undefined, void>;
            onInitializeOvermind: import("@newcoin-foundation/core").Action<undefined, void>;
        };
    }, object>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map