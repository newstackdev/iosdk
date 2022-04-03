import { IContext } from "overmind";
import { PartialConfiguration } from "@newcoin-foundation/core";
export declare const config: (cfg: PartialConfiguration) => {
    state: import("overmind/lib/internalTypes").SubType<{
        indicators: {
            _isWorking: number;
            isWorking: boolean;
            _specific: Record<string, number>;
            specific: Record<string, any>;
        };
        auth: import("./auth/state").State;
        routing: {
            preLoginRoute: string;
            breadcrumbs: import("@newcoin-foundation/core").Link[];
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
            isAllowed: any;
        };
        firebase: {
            token: string;
            user: import("@firebase/auth").User;
        };
        websockets: {
            socket: WebSocket;
            url: string;
            messages: {
                incoming: any[];
                activityStream: {
                    title: string;
                    link: string;
                    description: string;
                    seen?: boolean;
                    original: any;
                }[];
                newcoin: {
                    payload: {
                        message: "stake_received" | "stake_sent";
                        txid: string;
                    };
                    recipient: string;
                    type: string;
                    updated: string;
                    original: any;
                }[];
            };
        };
        payments: unknown;
        evm: unknown;
        ux: unknown;
        chromeext: unknown;
        config: {
            settings: {
                firebaseConfig: import("@newcoin-foundation/core").FirebaseConfig;
                newlife: {
                    baseUrl: string;
                    mediaBucket: any;
                    websocketsServer: any;
                };
            };
            components: {
                layout: {};
                auth: {};
                icons: {};
            };
        };
        api: {
            client: import("@newcoin-foundation/core").CreatorApi;
            auth: {
                status: import("./auth/state").AUTH_FLOW_STATUS_TYPE;
                user: import("@newlife/newlife-creator-client-api").UserReadPrivateResponse;
                moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                authorized: boolean;
                admitted: boolean;
                userDisplayHandler: string;
                attempted: boolean;
            };
            cache: {
                users: {
                    byUsername: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse & {
                        moods?: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                    }>;
                    byId: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse & {
                        moods?: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                    }>;
                };
                powerups: import("./api/state").PowerupsCache;
                posts: Record<string, import("@newlife/newlife-creator-client-api").PostReadResponse>;
                moods: Record<string, import("@newlife/newlife-creator-client-api").MoodReadResponse & {
                    promise?: Promise<any>;
                }>;
                stakeHistory: {
                    user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
                    amount: string;
                    response: any;
                    error: any;
                }[];
            };
        };
        lists: {
            creativeSearch: {
                results: {
                    _items: Record<string, {
                        image?: string;
                        meta?: {
                            date?: string;
                            summary?: string;
                            id?: number;
                            blog_name?: string;
                            tags?: string[];
                            short_url?: string;
                        };
                        aesthetics?: object;
                        content?: object;
                    }>;
                    items: {
                        image?: string;
                        meta?: {
                            date?: string;
                            summary?: string;
                            id?: number;
                            blog_name?: string;
                            tags?: string[];
                            short_url?: string;
                        };
                        aesthetics?: object;
                        content?: object;
                    }[];
                    sortKey: string;
                    page: number;
                };
                tags: {
                    _items: Record<string, string>;
                    items: string[];
                    sortKey: string;
                    page: number;
                };
                lastQueried: {
                    tags: string;
                    aesthetics: string;
                };
                isActive: boolean;
            };
            top: {
                moods: {
                    _items: Record<string, import("@newlife/newlife-creator-client-api").MoodReadResponse>;
                    items: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                    sortKey: string;
                    page: number;
                };
                users: {
                    _items: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse>;
                    items: import("@newlife/newlife-creator-client-api").UserReadPublicResponse[];
                    sortKey: string;
                    page: number;
                };
                posts: {
                    _items: Record<string, import("@newlife/newlife-creator-client-api").PostReadResponse>;
                    items: import("@newlife/newlife-creator-client-api").PostReadResponse[];
                    sortKey: string;
                    page: number;
                };
            };
            search: {
                users: {
                    query: string;
                    results: import("@newlife/newlife-creator-client-api").UserPagedListReadPublicResponse;
                };
            };
        };
        flows: import("overmind/lib/internalTypes").SubType<{
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
                        data: import("./flows/user/create/wizardStateMachine").WizardInput;
                    } | {
                        type: "PREV";
                        data: import("./flows/user/create/wizardStateMachine").WizardInput;
                    } | {
                        type: "UPDATE";
                        data: import("./flows/user/create/wizardStateMachine").WizardInput;
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
        newcoin: {
            account: any;
            pools: any;
            cache: {
                accountHistory: Record<string, import("./newcoin/types").HyperionAccountHistory>;
                pools: {
                    byCode: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                    byOwner: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                };
            };
        };
    }, object>;
    effects: import("overmind/lib/internalTypes").SubType<{
        indicators: unknown;
        auth: typeof import("./auth/effects");
        routing: {};
        firebase: {
            initialize(firebaseConfig: import("@firebase/app").FirebaseOptions): import("@firebase/auth").Auth;
            initRecaptchaVerifier(containerOrId?: string | HTMLElement): void;
            clearRecaptchaVerifier: () => void;
            requestPhoneAuthCode(v: {
                phone: string;
            }): Promise<import("@firebase/auth").ConfirmationResult>;
            requestEmailAuthCode(v: {
                email: string;
            }): Promise<void>;
            signInWithEmailLink(email: string, emailLink: string): Promise<void>;
            submitPhonVerificationCode(v: {
                phoneVerificationCode: string;
            }): Promise<import("@firebase/auth").UserCredential>;
            logout(): Promise<void>;
        };
        websockets: {
            newlife: import("./websockets/effects").WSState;
        };
        payments: unknown;
        evm: typeof import("./evm/effects");
        ux: {
            notification: import("antd/lib/notification").NotificationApi;
            message: import("antd/lib/message").MessageApi;
        };
        chromeext: {};
        config: unknown;
        api: {
            initialize(): import("@newcoin-foundation/core").CreatorApi;
            updateToken(token: string): void;
            authorize(): Promise<import("@newlife/newlife-creator-client-api").UserReadPrivateResponse>;
        };
        lists: {};
        flows: import("overmind/lib/internalTypes").SubType<{
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
        newcoin: typeof import("./newcoin/effects");
    }, object>;
    actions: import("overmind/lib/internalTypes").SubType<{
        indicators: {
            isWorking: import("@newcoin-foundation/core").Action<{
                actionName: string;
                n: number;
            }, void>;
            isWorkingActionDebounced: import("@newcoin-foundation/core").Action<{
                actionName: string;
            }, void>;
        };
        auth: typeof import("./auth/actions");
        routing: typeof import("./routing/actions");
        firebase: typeof import("./firebase/actions");
        websockets: {
            toggleWebSocket: import("@newcoin-foundation/core").Action<undefined, void>;
            processIncoming: import("@newcoin-foundation/core").Action<{
                msg: any;
            }, void>;
            processIncomingModelUpdated: import("@newcoin-foundation/core").Action<{
                event: {
                    type: "modelUpdated";
                    model: "mood" | "user" | "post";
                    payload: any;
                    updated: string;
                } & {
                    type: "modelUpdated";
                };
            }, void>;
            processIncomingNewcoin: import("@newcoin-foundation/core").Action<{
                event: {
                    type: "modelUpdated";
                    model: "mood" | "user" | "post";
                    payload: any;
                    updated: string;
                } | {
                    type: "newcoin";
                    updated: string;
                    payload: {
                        message: string;
                        amount: number;
                    };
                };
            }, void>;
        };
        payments: {
            pay: import("@newcoin-foundation/core").Action<{
                stripe?: import("@stripe/stripe-js").Stripe;
                elements?: import("@stripe/stripe-js").StripeElements;
            }, void>;
        };
        evm: typeof import("./evm/actions");
        ux: {
            showNotification: import("@newcoin-foundation/core").Action<{
                message: string;
                duration?: number;
            }, void>;
        };
        chromeext: typeof import("./chromeext/actions");
        config: unknown;
        api: {
            onInitializeOvermind: import("@newcoin-foundation/core").Action<undefined, void>;
            auth: typeof import("./api/actions/auth");
            user: typeof import("./api/actions/user");
            mood: typeof import("./api/actions/mood");
            post: typeof import("./api/actions/post");
        };
        lists: {
            creativeSearch: import("@newcoin-foundation/core").Action<{
                tags: string;
                aesthetics: string;
            }, void>;
            searchUsers: import("@newcoin-foundation/core").Action<{
                query: string;
            }, void>;
            top: {
                moods: import("@newcoin-foundation/core").Action<undefined, void>;
                users: import("@newcoin-foundation/core").Action<undefined, void>;
                posts: import("@newcoin-foundation/core").Action<undefined, void>;
            };
        };
        flows: import("overmind/lib/internalTypes").SubType<{
            user: import("overmind/lib/internalTypes").SubType<{
                create: typeof import("./flows/user/create/actions");
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
        newcoin: typeof import("./newcoin/actions");
    }, object>;
};
export declare type State = ReturnType<typeof config>["state"];
export declare type Context = IContext<ReturnType<typeof config>>;
//# sourceMappingURL=state.d.ts.map