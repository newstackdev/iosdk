/// <reference types="@stripe/stripe-js/types/stripe-js/checkout" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/base" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card-number" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card-expiry" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card-cvc" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/iban" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/ideal-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/fpx-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/payment-request-button" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/au-bank-account" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/eps-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/p24-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/affirm-message" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/afterpay-clearpay-message" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/payment" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/link-authentication" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/shipping-address" />
/// <reference types="@stripe/stripe-js/types/stripe-js/payment-intents" />
/// <reference types="@stripe/stripe-js/types/stripe-js/setup-intents" />
/// <reference types="@stripe/stripe-js/types/stripe-js/payment-request" />
/// <reference types="@stripe/stripe-js/types/stripe-js/token-and-sources" />
/// <reference types="@stripe/stripe-js/types/api/shared" />
/// <reference types="@stripe/stripe-js/types/api/PaymentMethods" />
/// <reference types="@stripe/stripe-js/types/api/PaymentIntents" />
/// <reference types="@stripe/stripe-js/types/api/SetupIntents" />
/// <reference types="@stripe/stripe-js/types/api/Sources" />
/// <reference types="@stripe/stripe-js/types/api/Tokens" />
/// <reference types="@stripe/stripe-js/types/api/BankAccounts" />
/// <reference types="@stripe/stripe-js/types/api/Cards" />
/// <reference types="@stripe/stripe-js/types/api/VerificationSessions" />
/// <reference types="@stripe/stripe-js" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements" />
/// <reference types="@stripe/stripe-js/types/stripe-js" />
/// <reference types="@stripe/react-stripe-js" />
import { Context } from './overmind';
export declare const overmind: (cfg?: import("type-fest/source/partial-deep").PartialObjectDeep<{
    settings: {
        app: {
            newgraph: {
                apiKey: string;
            };
            newcoin: {
                domain: string;
                poolSymbol: string;
            };
        };
        firebaseConfig: import("../types").FirebaseConfig;
        newlife: {
            baseUrl: string;
            mediaBucket: any;
            websocketsServer: any;
        };
        routing: {
            routeAccessLevels: Record<string, (st: import("./auth/state").AUTH_FLOW_STATUS_TYPE) => boolean>;
        };
    };
    routes: {
        useDefaultRoutes: boolean;
        overrides: {};
        noBackButton: string[];
    };
    components: {
        layout: {
            Layout: import("../types").GenericComponent;
            TopMenu: import("../types").GenericComponent;
        };
        auth: {
            AuthWidget: import("../types").GenericComponent;
        };
        icons: {
            Logo: import("../types").GenericComponent;
        };
    };
}> | undefined) => import("overmind").Overmind<{
    state: import("overmind/lib/internalTypes").SubType<{
        config: {
            settings: {
                app: {
                    newgraph: {
                        apiKey: string;
                    };
                    newcoin: {
                        domain: string;
                        poolSymbol: string;
                    };
                };
                firebaseConfig: import("../types").FirebaseConfig;
                newlife: {
                    baseUrl: string;
                    mediaBucket: any;
                    websocketsServer: any;
                };
                routing: {
                    routeAccessLevels: Record<string, (st: import("./auth/state").AUTH_FLOW_STATUS_TYPE) => boolean>;
                };
            };
            routes: {
                useDefaultRoutes: boolean;
                overrides: {};
                noBackButton: string[];
            };
            components: {
                layout: {
                    Layout: import("../types").GenericComponent;
                    TopMenu: import("../types").GenericComponent;
                };
                auth: {
                    AuthWidget: import("../types").GenericComponent;
                };
                icons: {
                    Logo: import("../types").GenericComponent;
                };
            };
        };
        indicators: {
            _isWorking: number;
            isWorking: boolean;
            _specific: Record<string, number>;
            specific: Record<string, any>;
        };
        auth: import("./auth/state").State;
        routing: {
            preLoginRoute: string;
            breadcrumbs: import("../types").Link[];
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
            user: import("@firebase/auth").User | null;
        };
        websockets: {
            socket: WebSocket | null;
            url: string;
            messages: {
                incoming: any[];
                activityStream: {
                    title: string;
                    link: string;
                    description: string;
                    seen?: boolean | undefined;
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
        api: {
            client: import("../types").CreatorApi;
            auth: {
                status: import("./auth/state").AUTH_FLOW_STATUS_TYPE;
                user: import("@newlife/newlife-creator-client-api").UserReadPrivateResponse | null;
                moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                authorized: boolean;
                admitted: boolean;
                userDisplayHandler: string;
                attempted: boolean;
            };
            cache: {
                users: {
                    byUsername: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse & {
                        moods?: import("@newlife/newlife-creator-client-api").MoodReadResponse[] | undefined;
                    }>;
                    byId: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse & {
                        moods?: import("@newlife/newlife-creator-client-api").MoodReadResponse[] | undefined;
                    }>;
                };
                powerups: import("./api/state").PowerupsCache;
                posts: Record<string, import("@newlife/newlife-creator-client-api").PostReadResponse>;
                moods: Record<string, import("@newlife/newlife-creator-client-api").MoodReadResponse & {
                    promise?: Promise<any> | null | undefined;
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
                        image?: string | undefined;
                        meta?: {
                            date?: string | undefined;
                            summary?: string | undefined;
                            id?: number | undefined;
                            blog_name?: string | undefined;
                            tags?: string[] | undefined;
                            short_url?: string | undefined;
                        } | undefined;
                        aesthetics?: object | undefined;
                        content?: object | undefined;
                    }>;
                    items: {
                        image?: string | undefined;
                        meta?: {
                            date?: string | undefined;
                            summary?: string | undefined;
                            id?: number | undefined;
                            blog_name?: string | undefined;
                            tags?: string[] | undefined;
                            short_url?: string | undefined;
                        } | undefined;
                        aesthetics?: object | undefined;
                        content?: object | undefined;
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
            postsSearch: {};
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
                    results: import("@newlife/newlife-creator-client-api").UserPagedListReadPublicResponse | null;
                };
                posts: {
                    query: string;
                    results: import("@newlife/newlife-creator-client-api").PostPagedListReadPublicResponse | null;
                    lastQueried: {
                        tags: string;
                        aesthetics: string;
                    };
                    isActive: boolean;
                    tags: {
                        _items: Record<string, string>;
                        items: string[];
                        sortKey: string;
                        page: number;
                    };
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
                    start: (f: import("../types").EventHandler) => void;
                    stop: () => void;
                };
                keyBinding: {
                    remove: () => void;
                    setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                        onKeyUp: import("../types").EventHandler;
                        onKeyDown: import("../types").EventHandler;
                    }) => void;
                };
            };
            userJourney: {
                flags: Record<string, string>;
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
        config: unknown;
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
            }): Promise<import("@firebase/auth").UserCredential | undefined>;
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
        api: {
            initialize(): import("../types").CreatorApi;
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
                    start: (f: import("../types").EventHandler) => void;
                    stop: () => void;
                };
                onceKeyBinding: (keyCodes: number[]) => {
                    remove: () => void;
                    setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                        onKeyUp: import("../types").EventHandler;
                        onKeyDown: import("../types").EventHandler;
                    }) => void;
                };
            };
            userJourney: unknown;
        }, object>;
        newcoin: typeof import("./newcoin/effects");
    }, object>;
    actions: import("overmind/lib/internalTypes").SubType<{
        config: unknown;
        indicators: {
            isWorking: import("../types").Action<{
                actionName: string;
                n: number;
            }, void>;
            isWorkingActionDebounced: import("../types").Action<{
                actionName: string;
            }, void>;
        };
        auth: typeof import("./auth/actions");
        routing: typeof import("./routing/actions");
        firebase: typeof import("./firebase/actions");
        websockets: {
            toggleWebSocket: import("../types").Action<undefined, void>;
            processIncoming: import("../types").Action<{
                msg: any;
            }, void>;
            processIncomingModelUpdated: import("../types").Action<{
                event: {
                    type: "modelUpdated";
                    model: "user" | "mood" | "post";
                    payload: any;
                    updated: string;
                } & {
                    type: "modelUpdated";
                };
            }, void>;
            processIncomingNewcoin: import("../types").Action<{
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
            pay: import("../types").Action<{
                stripe?: import("@stripe/stripe-js").Stripe | null | undefined;
                elements?: import("@stripe/stripe-js").StripeElements | null | undefined;
            }, void>;
        };
        evm: typeof import("./evm/actions");
        ux: {
            showNotification: import("../types").Action<{
                message: string;
                duration?: number | undefined;
            }, void>;
        };
        chromeext: typeof import("./chromeext/actions");
        api: {
            onInitializeOvermind: import("../types").Action<undefined, void>;
            auth: typeof import("./api/actions/auth");
            user: typeof import("./api/actions/user");
            mood: typeof import("./api/actions/mood");
            post: typeof import("./api/actions/post");
        };
        lists: {
            creativeSearch: import("../types").Action<{
                tags: string;
                aesthetics: string;
            }, void>;
            searchUsers: import("../types").Action<{
                query: string;
            }, void>;
            searchPosts: import("../types").Action<{
                tags: string;
            }, void>;
            top: {
                moods: import("../types").Action<undefined, void>;
                users: import("../types").Action<undefined, void>;
                posts: import("../types").Action<undefined, void>;
            };
        };
        flows: import("overmind/lib/internalTypes").SubType<{
            user: import("overmind/lib/internalTypes").SubType<{
                create: typeof import("./flows/user/create/actions");
            }, object>;
            rating: {
                deepLikeInit: import("../types").Action<undefined, void>;
                deepLikeStart: import("../types").Action<{
                    event?: Event | undefined;
                }, void>;
                deepLikeStep: import("../types").Action<undefined, void>;
                deepLikeStop: import("../types").Action<undefined, void>;
                onInitializeOvermind: import("../types").Action<undefined, void>;
            };
            userJourney: {
                setFlag: import("../types").Action<{
                    flag: string;
                    value: string;
                }, void>;
                onInitializeOvermind: import("../types").Action<undefined, void>;
            };
        }, object>;
        newcoin: typeof import("./newcoin/actions");
    }, object>;
}>;
export declare const useAppState: import("overmind-react").StateHook<Context>;
export declare const useActions: () => {
    auth: {
        readonly logout: (payload?: {
            noRouting?: boolean | undefined;
        } | undefined) => void | Promise<void>;
        readonly resetAuthTimer: (payload?: undefined) => void | Promise<void>;
        readonly reduceTimer: (payload?: undefined) => void | Promise<void>;
        readonly fakeUserUpdate: (payload: import("@newlife/newlife-creator-client-api").UserReadPrivateResponse) => void | Promise<void>;
    };
    indicators: {
        isWorking: (payload: {
            actionName: string;
            n: number;
        }) => void | Promise<void>;
        isWorkingActionDebounced: (payload: {
            actionName: string;
        }) => void | Promise<void>;
    };
    routing: {
        readonly routeAfterAuth: (payload?: undefined) => void | Promise<void>;
        readonly goBack: (payload?: undefined) => void | Promise<void>;
        readonly onRouteChange: (payload: {
            location: {
                pathname: string;
                search: string;
            };
        }) => void | Promise<void>;
        readonly setPreloginRoute: (payload?: undefined) => void | Promise<void>;
        readonly setHistory: (payload: {
            history: import("history").History<unknown>;
        }) => void | Promise<void>;
        readonly historyPush: (payload: {
            location: string;
            force?: boolean | undefined;
        }) => void | Promise<void>;
        readonly setBreadcrumbs: (payload: import("../types").Link[]) => void | Promise<void>;
        readonly setTitle: (payload?: string | undefined) => void | Promise<void>;
    };
    firebase: {
        readonly onInitializeOvermind: (payload?: undefined) => void | Promise<void>;
        readonly logout: (payload?: undefined) => void | Promise<void>;
        readonly refreshApiToken: (payload?: undefined) => void | Promise<void>;
        readonly handleAuthChange: (payload: import("@firebase/auth").User | null) => void | Promise<void>;
        readonly requestEmailLink: (payload: {
            email: string;
        }) => void | Promise<void>;
        readonly signInWithEmailLink: (payload: {
            email: string;
        }) => boolean | Promise<boolean>;
        readonly requestToken: (payload: {
            phone: string;
        }) => void | Promise<void>;
        readonly verifyPhone: (payload: {
            phoneVerificationCode: string;
        }) => void | Promise<void>;
        readonly initRecaptchaVerifier: (payload: {
            containerOrId?: string | HTMLElement | undefined;
        }) => void | Promise<void>;
        readonly setFbUser: (payload: {
            user: import("@firebase/auth").User;
        }) => void | Promise<void>;
        default: {};
    };
    websockets: {
        toggleWebSocket: (payload?: undefined) => void | Promise<void>;
        processIncoming: (payload: {
            msg: any;
        }) => void | Promise<void>;
        processIncomingModelUpdated: (payload: {
            event: {
                type: "modelUpdated";
                model: "user" | "mood" | "post";
                payload: any;
                updated: string;
            } & {
                type: "modelUpdated";
            };
        }) => void | Promise<void>;
        processIncomingNewcoin: (payload: {
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
        pay: (payload: {
            stripe?: import("@stripe/stripe-js").Stripe | null | undefined;
            elements?: import("@stripe/stripe-js").StripeElements | null | undefined;
        }) => void | Promise<void>;
    };
    evm: never;
    ux: {
        showNotification: (payload: {
            message: string;
            duration?: number | undefined;
        }) => void | Promise<void>;
    };
    chromeext: {
        readonly sendMessage: (payload: {
            user: {
                username?: string | undefined;
            };
        }) => any;
    };
    api: {
        onInitializeOvermind: (payload?: undefined) => void | Promise<void>;
        auth: {
            readonly authorize: (payload?: undefined) => void | Promise<void>;
            readonly logout: (payload?: {
                keepFbUser?: boolean | undefined;
            } | undefined) => void | Promise<void>;
        };
        user: {
            readonly cache: (payload: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
            }) => void | Promise<void>;
            readonly read: (payload: {
                id?: string | undefined;
                username?: string | undefined;
            }) => import("@newlife/newlife-creator-client-api").UserReadPublicResponse | Promise<import("@newlife/newlife-creator-client-api").UserReadPublicResponse>;
            readonly create: (payload: {
                noRouting?: boolean | undefined;
                user: import("@newlife/newlife-creator-client-api").UserCreateRequest;
                preregisterCreate?: boolean | undefined;
            }) => void | Promise<void>;
            readonly update: (payload: {
                user: import("@newlife/newlife-creator-client-api").UserUpdateRequest;
                file?: any;
            }) => void | Promise<void>;
            readonly getMoods: (payload: {
                id?: string | undefined;
            }) => void | Promise<void>;
            readonly stake: (payload: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
                amount: string;
            }) => void | Promise<void>;
            readonly invite: (payload: {
                userInvite: import("@newlife/newlife-creator-client-api").UserInviteRequest;
            }) => void | Promise<void>;
            readonly powerup: (payload: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
                amount: number;
            }) => void | Promise<void>;
            readonly getPowerups: (payload: {
                user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
            }) => void | Promise<void>;
            readonly getCurrent: (payload?: undefined) => void | Promise<void>;
        };
        mood: {
            readonly cache: (payload: {
                moods?: (import("@newlife/newlife-creator-client-api").MoodReadResponse & {
                    promise?: Promise<any> | undefined;
                })[] | undefined;
                overwrite?: boolean | undefined;
            }) => void | Promise<void>;
            readonly read: (payload: {
                id?: string | undefined;
            }) => void | Promise<void>;
            readonly readMultiple: (payload: {
                moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
            }) => void | Promise<void>;
            readonly getPosts: (payload: import("@newlife/newlife-creator-client-api").MoodReadResponse) => void | Promise<void>;
            readonly create: (payload: {
                mood: import("@newlife/newlife-creator-client-api").MoodCreateRequest;
            }) => void | Promise<void>;
        };
        post: {
            readonly read: (payload: {
                id: string;
            }) => void | Promise<void>;
            readonly create: (payload: {
                postForm: import("@newlife/newlife-creator-client-api").PostCreateRequest & {
                    file: any;
                };
            }) => void | import("@newlife/newlife-creator-client-api").PostReadResponse | Promise<void | import("@newlife/newlife-creator-client-api").PostReadResponse>;
            readonly attachToMoods: (payload: {
                moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                post: import("@newlife/newlife-creator-client-api").PostReadResponse;
            }) => void | Promise<void>;
            readonly rate: (payload: {
                post: import("@newlife/newlife-creator-client-api").PostReadResponse;
                amount: number;
                contextType: string;
                contextValue: string;
            }) => void | Promise<void>;
        };
    };
    lists: {
        creativeSearch: (payload: {
            tags: string;
            aesthetics: string;
        }) => void | Promise<void>;
        searchUsers: (payload: {
            query: string;
        }) => void | Promise<void>;
        searchPosts: (payload: {
            tags: string;
        }) => void | Promise<void>;
        top: {
            moods: (payload?: undefined) => void | Promise<void>;
            users: (payload?: undefined) => void | Promise<void>;
            posts: (payload?: undefined) => void | Promise<void>;
        };
    };
    flows: {
        user: {
            create: {
                readonly onInitializeOvermind: () => void | Promise<void>;
                readonly updateForm: (payload: Partial<import("@newlife/newlife-creator-client-api").UserCreateRequest>) => void | Promise<void>;
                readonly startLegacyImport: (payload?: undefined) => void | Promise<void>;
                readonly stopLegacyImport: (payload?: {
                    noRedirect?: boolean | undefined;
                } | undefined) => void | Promise<void>;
                readonly wizardStepPrev: (payload?: undefined) => void | Promise<void>;
                readonly _wizardReact: (payload: import("./flows/user/create/wizardStateMachine").WizardInput) => void | Promise<void>;
                readonly wizardStepNext: (payload?: undefined) => void | Promise<void>;
                readonly preregisterCreate: (payload: {
                    noRouting?: boolean | undefined;
                    user?: import("@newlife/newlife-creator-client-api").UserCreateRequest | undefined;
                }) => void | Promise<void>;
                readonly create: (payload: {
                    noRouting?: boolean | undefined;
                    user: import("@newlife/newlife-creator-client-api").UserCreateRequest;
                }) => void | Promise<void>;
                readonly checkAvailability: (payload: {
                    username: string;
                }) => void | Promise<void>;
            };
        };
        rating: {
            deepLikeInit: (payload?: undefined) => void | Promise<void>;
            deepLikeStart: (payload: {
                event?: Event | undefined;
            }) => void | Promise<void>;
            deepLikeStep: (payload?: undefined) => void | Promise<void>;
            deepLikeStop: (payload?: undefined) => void | Promise<void>;
            onInitializeOvermind: (payload?: undefined) => void | Promise<void>;
        };
        userJourney: {
            setFlag: (payload: {
                flag: string;
                value: string;
            }) => void | Promise<void>;
            onInitializeOvermind: (payload?: undefined) => void | Promise<void>;
        };
    };
    newcoin: {
        readonly getAccountBalance: (payload: {
            user: {
                username?: string | undefined;
            };
        }) => any;
        readonly getPoolInfo: (payload: {
            pool: {
                owner?: string | undefined;
                code?: string | undefined;
            };
        }) => void | Promise<void>;
        readonly getAccountHitory: (payload: {
            user?: {
                username?: string | undefined;
            } | undefined;
            force?: boolean | undefined;
        }) => any;
    };
};
export declare const useEffects: () => import("overmind/lib/internalTypes").SubType<{
    config: unknown;
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
        }): Promise<import("@firebase/auth").UserCredential | undefined>;
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
    api: {
        initialize(): import("../types").CreatorApi;
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
                start: (f: import("../types").EventHandler) => void;
                stop: () => void;
            };
            onceKeyBinding: (keyCodes: number[]) => {
                remove: () => void;
                setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                    onKeyUp: import("../types").EventHandler;
                    onKeyDown: import("../types").EventHandler;
                }) => void;
            };
        };
        userJourney: unknown;
    }, object>;
    newcoin: typeof import("./newcoin/effects");
}, object>;
export declare const useReaction: () => import("overmind").IReaction<Context>;
