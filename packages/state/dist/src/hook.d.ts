import { PartialConfiguration } from "@newcoin-foundation/core";
import { Context } from "./state";
export declare const overmind: (cfg?: PartialConfiguration) => import("overmind").Overmind<{
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
            isWorking: import("./state").Action<{
                actionName: string;
                n: number;
            }, void>;
            isWorkingActionDebounced: import("./state").Action<{
                actionName: string;
            }, void>;
        };
        auth: typeof import("./auth/actions");
        routing: typeof import("./routing/actions");
        firebase: typeof import("./firebase/actions");
        websockets: {
            toggleWebSocket: import("./state").Action<undefined, void>;
            processIncoming: import("./state").Action<{
                msg: any;
            }, void>;
            processIncomingModelUpdated: import("./state").Action<{
                event: {
                    type: "modelUpdated";
                    model: "user" | "mood" | "post";
                    payload: any;
                    updated: string;
                } & {
                    type: "modelUpdated";
                };
            }, void>;
            processIncomingNewcoin: import("./state").Action<{
                event: {
                    type: "modelUpdated";
                    model: "user" | "mood" | "post";
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
            pay: import("./state").Action<{
                stripe?: import("@stripe/stripe-js").Stripe;
                elements?: import("@stripe/stripe-js").StripeElements;
            }, void>;
        };
        evm: typeof import("./evm/actions");
        ux: {
            showNotification: import("./state").Action<{
                message: string;
                duration?: number;
            }, void>;
        };
        chromeext: typeof import("./chromeext/actions");
        config: unknown;
        api: {
            onInitializeOvermind: import("./state").Action<undefined, void>;
            auth: typeof import("./api/actions/auth");
            user: typeof import("./api/actions/user");
            mood: typeof import("./api/actions/mood");
            post: typeof import("./api/actions/post");
        };
        lists: {
            creativeSearch: import("./state").Action<{
                tags: string;
                aesthetics: string;
            }, void>;
            searchUsers: import("./state").Action<{
                query: string;
            }, void>;
            top: {
                moods: import("./state").Action<undefined, void>;
                users: import("./state").Action<undefined, void>;
                posts: import("./state").Action<undefined, void>;
            };
        };
        flows: import("overmind/lib/internalTypes").SubType<{
            user: import("overmind/lib/internalTypes").SubType<{
                create: typeof import("./flows/user/create/actions");
            }, object>;
            rating: {
                deepLikeInit: import("./state").Action<undefined, void>;
                deepLikeStart: import("./state").Action<{
                    event?: Event;
                }, void>;
                deepLikeStep: import("./state").Action<undefined, void>;
                deepLikeStop: import("./state").Action<undefined, void>;
                onInitializeOvermind: import("./state").Action<undefined, void>;
            };
        }, object>;
        newcoin: typeof import("./newcoin/actions");
    }, object>;
}>;
export declare const useAppState: import("overmind-react").StateHook<Context>;
export declare const useActions: () => {
    indicators: {
        isWorking: (payload?: {
            actionName: string;
            n: number;
        }) => void | Promise<void>;
        isWorkingActionDebounced: (payload?: {
            actionName: string;
        }) => void | Promise<void>;
    };
    auth: {
        readonly logout: (payload?: {
            noRouting?: boolean;
        }) => void | Promise<void>;
        readonly resetAuthTimer: () => void | Promise<void>;
        readonly reduceTimer: () => void | Promise<void>;
        readonly fakeUserUpdate: (payload?: import("@newlife/newlife-creator-client-api").UserReadPrivateResponse) => void | Promise<void>;
    };
    routing: {
        readonly routeAfterAuth: () => void | Promise<void>;
        readonly goBack: () => void | Promise<void>;
        readonly onRouteChange: (payload?: {
            location: {
                pathname: string;
                search: string;
            };
        }) => void | Promise<void>;
        readonly setPreloginRoute: () => void | Promise<void>;
        readonly setHistory: (payload?: {
            history: import("history").History<unknown>;
        }) => void | Promise<void>;
        readonly historyPush: (payload?: {
            location: string;
            force?: boolean;
        }) => void | Promise<void>;
        readonly setBreadcrumbs: (payload?: import("@newcoin-foundation/core").Link[]) => void | Promise<void>;
        readonly setTitle: (payload?: string) => void | Promise<void>;
    };
    firebase: {
        readonly onInitializeOvermind: () => void | Promise<void>;
        readonly logout: () => void | Promise<void>;
        readonly refreshApiToken: () => void | Promise<void>;
        readonly handleAuthChange: (payload?: import("@firebase/auth").User) => void | Promise<void>;
        readonly requestEmailLink: (payload?: {
            email: string;
        }) => void | Promise<void>;
        readonly signInWithEmailLink: (payload?: {
            email: string;
        }) => boolean | Promise<boolean>;
        readonly requestToken: (payload?: {
            phone: string;
        }) => void | Promise<void>;
        readonly verifyPhone: (payload?: {
            phoneVerificationCode: string;
        }) => void | Promise<void>;
        readonly initRecaptchaVerifier: (payload?: {
            containerOrId?: string | HTMLElement;
        }) => void | Promise<void>;
        readonly setFbUser: (payload?: {
            user: import("@firebase/auth").User;
        }) => void | Promise<void>;
        default: {};
    };
    websockets: {
        toggleWebSocket: () => void | Promise<void>;
        processIncoming: (payload?: {
            msg: any;
        }) => void | Promise<void>;
        processIncomingModelUpdated: (payload?: {
            event: {
                type: "modelUpdated";
                model: "user" | "mood" | "post";
                payload: any;
                updated: string;
            } & {
                type: "modelUpdated";
            };
        }) => void | Promise<void>;
        processIncomingNewcoin: (payload?: {
            event: {
                type: "modelUpdated";
                model: "user" | "mood" | "post";
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
        }) => void | Promise<void>;
    };
    payments: {
        pay: (payload?: {
            stripe?: import("@stripe/stripe-js").Stripe;
            elements?: import("@stripe/stripe-js").StripeElements;
        }) => void | Promise<void>;
    };
    evm: never;
    ux: {
        showNotification: (payload?: {
            message: string;
            duration?: number;
        }) => void | Promise<void>;
    };
    chromeext: {
        readonly sendMessage: (payload?: {
            user: {
                username?: string;
            };
        }) => any;
    };
    api: {
        onInitializeOvermind: () => void | Promise<void>;
        auth: {
            readonly authorize: () => void | Promise<void>;
            readonly logout: (payload?: {
                keepFbUser?: boolean;
            }) => void | Promise<void>;
        };
        user: {
            readonly cache: (payload?: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
            }) => void | Promise<void>;
            readonly read: (payload?: {
                id?: string;
                username?: string;
            }) => import("@newlife/newlife-creator-client-api").UserReadPublicResponse | Promise<import("@newlife/newlife-creator-client-api").UserReadPublicResponse>;
            readonly create: (payload?: {
                noRouting?: boolean;
                user: import("@newlife/newlife-creator-client-api").UserCreateRequest;
                preregisterCreate?: boolean;
            }) => void | Promise<void>;
            readonly update: (payload?: {
                user: import("@newlife/newlife-creator-client-api").UserUpdateRequest;
                file?: any;
            }) => void | Promise<void>;
            readonly getMoods: (payload?: {
                id?: string;
            }) => void | Promise<void>;
            readonly stake: (payload?: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
                amount: string;
            }) => void | Promise<void>;
            readonly invite: (payload?: {
                userInvite: import("@newlife/newlife-creator-client-api").UserInviteRequest;
            }) => void | Promise<void>;
            readonly powerup: (payload?: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
                amount: number;
            }) => void | Promise<void>;
            readonly getPowerups: (payload?: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
            }) => void | Promise<void>;
            readonly getCurrent: () => void | Promise<void>;
        };
        mood: {
            readonly cache: (payload?: {
                moods?: (import("@newlife/newlife-creator-client-api").MoodReadResponse & {
                    promise?: Promise<any>;
                })[];
                overwrite?: boolean;
            }) => void | Promise<void>;
            readonly read: (payload?: {
                id?: string;
            }) => void | Promise<void>;
            readonly readMultiple: (payload?: {
                moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
            }) => void | Promise<void>;
            readonly getPosts: (payload?: import("@newlife/newlife-creator-client-api").MoodReadResponse) => void | Promise<void>;
            readonly create: (payload?: {
                mood: import("@newlife/newlife-creator-client-api").MoodCreateRequest;
            }) => void | Promise<void>;
        };
        post: {
            readonly read: (payload?: {
                id: string;
            }) => void | Promise<void>;
            readonly create: (payload?: {
                postForm: import("@newlife/newlife-creator-client-api").PostCreateRequest & {
                    file: any;
                };
            }) => void | import("@newlife/newlife-creator-client-api").PostReadResponse | Promise<void | import("@newlife/newlife-creator-client-api").PostReadResponse>;
            readonly attachToMoods: (payload?: {
                moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                post: import("@newlife/newlife-creator-client-api").PostReadResponse;
            }) => void | Promise<void>;
            readonly rate: (payload?: {
                post: import("@newlife/newlife-creator-client-api").PostReadResponse;
                amount: number;
            }) => void | Promise<void>;
        };
    };
    lists: {
        creativeSearch: (payload?: {
            tags: string;
            aesthetics: string;
        }) => void | Promise<void>;
        searchUsers: (payload?: {
            query: string;
        }) => void | Promise<void>;
        top: {
            moods: () => void | Promise<void>;
            users: () => void | Promise<void>;
            posts: () => void | Promise<void>;
        };
    };
    flows: {
        user: {
            create: {
                readonly onInitializeOvermind: () => void | Promise<void>;
                readonly updateForm: (payload?: Partial<import("@newlife/newlife-creator-client-api").UserCreateRequest>) => void | Promise<void>;
                readonly startLegacyImport: () => void | Promise<void>;
                readonly stopLegacyImport: (payload?: {
                    noRedirect?: boolean;
                }) => void | Promise<void>;
                readonly wizardStepPrev: () => void | Promise<void>;
                readonly _wizardReact: (payload?: import("./flows/user/create/wizardStateMachine").WizardInput) => void | Promise<void>;
                readonly wizardStepNext: () => void | Promise<void>;
                readonly preregisterCreate: (payload?: {
                    noRouting?: boolean;
                    user?: import("@newlife/newlife-creator-client-api").UserCreateRequest;
                }) => void | Promise<void>;
                readonly create: (payload?: {
                    noRouting?: boolean;
                    user: import("@newlife/newlife-creator-client-api").UserCreateRequest;
                }) => void | Promise<void>;
                readonly checkAvailability: (payload?: {
                    username: string;
                }) => void | Promise<void>;
            };
        };
        rating: {
            deepLikeInit: () => void | Promise<void>;
            deepLikeStart: (payload?: {
                event?: Event;
            }) => void | Promise<void>;
            deepLikeStep: () => void | Promise<void>;
            deepLikeStop: () => void | Promise<void>;
            onInitializeOvermind: () => void | Promise<void>;
        };
    };
    newcoin: {
        readonly getAccountBalance: (payload?: {
            user: {
                username?: string;
            };
        }) => any;
        readonly getPoolInfo: (payload?: {
            pool: {
                owner?: string;
                code?: string;
            };
        }) => void | Promise<void>;
        readonly getAccountHitory: (payload?: {
            user?: {
                username?: string;
            };
            force?: boolean;
        }) => any;
    };
};
export declare const useEffects: () => import("overmind/lib/internalTypes").SubType<{
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
export declare const useReaction: () => import("overmind").IReaction<Context>;
//# sourceMappingURL=hook.d.ts.map