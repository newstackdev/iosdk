import { Context } from "./overmind";
import { PartialConfiguration } from "../config";
export declare const overmind: (cfg?: PartialConfiguration) => import("overmind").Overmind<{
    state: import("overmind/lib/internalTypes").SubType<{
        config: {
            env: {
                stage: string;
            };
            settings: {
                newcoin: {
                    daoId: string;
                    daoDomain: string;
                    displayDaoDomain: string;
                    poolId: string;
                };
                firebaseConfig: import("../types").FirebaseConfig;
                newgraph: {
                    baseUrl: string;
                    mediaBucket: any;
                    websocketsServer: any;
                };
                routing: {
                    routeAccessLevels: Record<string, (st: import("./auth/state").AUTH_FLOW_STATUS_TYPE) => boolean>;
                };
                stripe: {
                    publicKey: any;
                };
                indicators: {
                    isWatchable: (actionName: string) => boolean;
                };
            };
            routes: {
                useDefaultRoutes: boolean;
                overrides: {};
                noBackButton: string[];
                defaultRoute: {
                    condition: (state: any) => any;
                    defaultLocation: (_state: any) => string;
                };
            };
            components: {
                layout: {
                    Layout: import("../types").GenericComponent;
                    TopMenu: import("../types").GenericComponent;
                    Header: import("../types").GenericComponent;
                };
                auth: {
                    AuthWidget: import("../types").GenericComponent;
                };
                icons: {
                    Logo: import("../types").GenericComponent;
                };
            };
            featureFlags: {
                onboarding: {
                    premiumDomains: boolean;
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
        ux: {
            layout: {
                headerShown: boolean;
            };
        };
        chromeext: unknown;
        api: {
            client: import("../types").CreatorApi;
            auth: {
                status: import("./auth/state").AUTH_FLOW_STATUS_TYPE;
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPrivateResponse;
                moods: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse[];
                authorized: boolean;
                admitted: boolean;
                userDisplayHandler: string;
                attempted: boolean;
            };
            cache: {
                users: {
                    byUsername: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse & {
                        moods?: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                    }>;
                    byId: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse & {
                        moods?: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                    }>;
                };
                powerups: import("./api/state").PowerupsCache;
                posts: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse>;
                moods: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse & {
                    promise?: Promise<any> | null | undefined;
                }>;
                stakeHistory: {
                    user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse;
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
                    _items: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse>;
                    items: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse[];
                    sortKey: string;
                    page: number;
                };
                users: {
                    _items: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse>;
                    items: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse[];
                    sortKey: string;
                    page: number;
                };
                posts: {
                    _items: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse>;
                    items: import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse[];
                    sortKey: string;
                    page: number;
                };
            };
            search: {
                users: {
                    query: string;
                    results: import("@newcoin-foundation/iosdk-newgraph-client-js").UserPagedListReadPublicResponse | null;
                };
                posts: {
                    query: string;
                    results: import("@newcoin-foundation/iosdk-newgraph-client-js").PostPagedListReadPublicResponse | null;
                    lastQueried: {
                        tags: string;
                        aesthetics: string;
                    };
                    isActive: boolean;
                    page: number;
                };
                tags: {
                    query: string;
                    results: import("@newcoin-foundation/iosdk-newgraph-client-js").PostTagsSearchPublicResponse | null;
                    lastQueried: string;
                    isActive: boolean;
                    page: number;
                };
            };
        };
        flows: import("overmind/lib/internalTypes").SubType<{
            user: import("overmind/lib/internalTypes").SubType<{
                create: {
                    form: Partial<import("@newcoin-foundation/iosdk-newgraph-client-js").UserCreateRequest & {
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
            stake: {
                options: {
                    stakingContainer: any;
                };
                latestMode: number;
            };
            vote: {
                options: {
                    votingContainer: any;
                };
                latestMode: number;
            };
        }, object>;
        newcoin: {
            account: any;
            pools: any;
            mainPool: any;
            daos: Record<string, import("./newcoin/state").DaoState>;
            cache: {
                accountHistory: Record<string, import("./newcoin/types").HyperionAccountHistory>;
                pools: {
                    byCode: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                    byOwner: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                };
                votes: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").BcDaoProposalVoteResponse>;
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
            initialize(baseUrl: string): import("../types").CreatorApi;
            updateToken(token: string): void;
            authorize(): Promise<import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPrivateResponse>;
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
            stake: unknown;
            vote: unknown;
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
            setLayout: import("../types").Action<{
                headerShown: boolean;
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
                force?: boolean | undefined;
            }, void>;
            searchTags: import("../types").Action<{
                query: string;
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
            stake: typeof import("./flows/stake/actions");
            vote: typeof import("./flows/vote/actions");
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
        readonly fakeUserUpdate: (payload: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPrivateResponse) => void | Promise<void>;
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
        setLayout: (payload: {
            headerShown: boolean;
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
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse;
                force?: boolean | undefined;
                moods?: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse | undefined;
            }) => void | Promise<void>;
            readonly read: (payload: {
                id?: string | undefined;
                username?: string | undefined;
            }) => import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse | Promise<import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse>;
            readonly create: (payload: {
                noRouting?: boolean | undefined;
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserCreateRequest;
                preregisterCreate?: boolean | undefined;
            }) => void | Promise<void>;
            readonly update: (payload: {
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserUpdateRequest;
                file?: any;
            }) => void | Promise<void>;
            readonly getMoods: (payload: {
                id?: string | undefined;
            }) => void | Promise<void>;
            readonly stake: (payload: {
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse;
                amount: string;
            }) => any;
            readonly invite: (payload: {
                userInvite: import("@newcoin-foundation/iosdk-newgraph-client-js").UserInviteRequest;
            }) => void | Promise<void>;
            readonly powerup: (payload: {
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse;
                amount: number;
            }) => void | Promise<void>;
            readonly powerUpMultiple: (payload: {
                users: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse[];
                amount?: number | undefined;
            }) => void | Promise<void>;
            readonly getPowerups: (payload: {
                user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPublicResponse;
            }) => void | Promise<void>;
            readonly getCurrent: (payload?: undefined) => void | Promise<void>;
            readonly checkLinkHash: (payload: {
                hash: string;
            }) => void | Promise<void>;
            readonly checkNft: (payload: {
                collectionAddr: string;
                nftId: number;
            }) => void | Promise<void>;
        };
        mood: {
            readonly cache: (payload: {
                moods?: (import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse & {
                    promise?: Promise<any> | undefined;
                })[] | undefined;
                overwrite?: boolean | undefined;
            }) => void | Promise<void>;
            readonly read: (payload: {
                id?: string | undefined;
            }) => void | Promise<void>;
            readonly readMultiple: (payload: {
                moods: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse[];
            }) => void | Promise<void>;
            readonly getPosts: (payload: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse) => void | Promise<void>;
            readonly create: (payload: {
                mood: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodCreateRequest;
            }) => import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse | Promise<import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse>;
        };
        post: {
            readonly read: (payload: {
                id: string;
            }) => void | Promise<void>;
            readonly create: (payload: {
                postForm: import("@newcoin-foundation/iosdk-newgraph-client-js").PostCreateRequest & {
                    file: any;
                };
            }) => void | import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse | Promise<void | import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse>;
            readonly attachToMoods: (payload: {
                moods: import("@newcoin-foundation/iosdk-newgraph-client-js").MoodReadResponse[];
                post: import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse;
            }) => void | Promise<void>;
            readonly rate: (payload: {
                post: import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse;
                amount: number;
                contextType: string;
                contextValue: string;
            }) => void | Promise<void>;
            readonly getRemoteMeta: (payload: {
                url: string;
            }) => import("@newcoin-foundation/iosdk-newgraph-client-js").PostRemoteMetaProxyResponse | Promise<import("@newcoin-foundation/iosdk-newgraph-client-js").PostRemoteMetaProxyResponse>;
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
            force?: boolean | undefined;
        }) => void | Promise<void>;
        searchTags: (payload: {
            query: string;
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
                readonly updateForm: (payload: Partial<import("@newcoin-foundation/iosdk-newgraph-client-js").UserCreateRequest & {
                    couponCode?: string | undefined;
                }>) => void | Promise<void>;
                readonly startLegacyImport: (payload?: undefined) => void | Promise<void>;
                readonly stopLegacyImport: (payload?: {
                    noRedirect?: boolean | undefined;
                } | undefined) => void | Promise<void>;
                readonly wizardStepPrev: (payload?: undefined) => void | Promise<void>;
                readonly _wizardReact: (payload: import("./flows/user/create/wizardStateMachine").WizardInput) => void | Promise<void>;
                readonly wizardStepNext: (payload?: undefined) => void | Promise<void>;
                readonly preregisterCreate: (payload: {
                    noRouting?: boolean | undefined;
                    user?: import("@newcoin-foundation/iosdk-newgraph-client-js").UserCreateRequest | undefined;
                }) => void | Promise<void>;
                readonly create: (payload: {
                    noRouting?: boolean | undefined;
                    user: import("@newcoin-foundation/iosdk-newgraph-client-js").UserCreateRequest;
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
        stake: {
            readonly setOptions: (payload?: {
                stakingContainer: any;
            } | undefined) => void | Promise<void>;
            readonly setLatestMode: (payload: {
                stakingMode: number;
            }) => void | Promise<void>;
        };
        vote: {
            readonly setOptions: (payload?: {
                votingContainer: any;
            } | undefined) => void | Promise<void>;
            readonly setLatestMode: (payload: {
                votingMode: number;
            }) => void | Promise<void>;
        };
    };
    newcoin: {
        readonly progressTest: (payload?: undefined) => void | Promise<void>;
        readonly getAccountBalance: (payload?: {
            user?: {
                username?: string | undefined;
            } | undefined;
        } | undefined) => any;
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
        readonly daoGetProposals: (payload: {
            daoId?: string | undefined;
            daoOwner: string;
            proposal_id?: string | undefined;
        }) => any;
        readonly daoGetWhitelistProposals: (payload: {
            daoId?: string | undefined;
            daoOwner: string;
            proposal_id?: string | undefined;
        }) => any;
        readonly daoCreate: (payload: import("@newcoin-foundation/iosdk-newgraph-client-js").BcCreateDaoRequest) => any;
        readonly daoCreateProposal: (payload: import("@newcoin-foundation/iosdk-newgraph-client-js").BcCreateDaoProposal) => any;
        readonly daoCreateWhitelistProposal: (payload: import("@newcoin-foundation/iosdk-newgraph-client-js").BcCreateWhitelistDaoProposal) => any;
        readonly daoApproveProposal: (payload: {
            dao_owner: string;
            proposal_id: string;
        }) => any;
        readonly daoApproveWhitelistProposal: (payload: {
            dao_owner: string;
            proposal_id: string;
        }) => any;
        readonly daoVoteProposal: (payload: {
            dao_owner: any;
            proposal_id: any;
            option: any;
            quantity: any;
            proposal_type: any;
        }) => any;
        readonly voterListVotes: (payload?: {
            voter?: string | undefined;
        } | undefined) => any;
        readonly daoGetWhitelist: (payload?: {
            daoOwner?: string | undefined;
        } | undefined) => any;
        readonly daoExecuteWhitelistProposal: (payload: {
            dao_id: string;
            proposal_id: number;
            proposal_author: string;
        }) => any;
        readonly daoExecuteProposal: (payload: {
            dao_owner: string;
            dao_id: string;
            proposal_id: number;
            proposal_author: string;
        }) => any;
        readonly daoWithdrawVoteDeposit: (payload: {
            vote_id: string;
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
        initialize(baseUrl: string): import("../types").CreatorApi;
        updateToken(token: string): void;
        authorize(): Promise<import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPrivateResponse>;
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
        stake: unknown;
        vote: unknown;
    }, object>;
    newcoin: typeof import("./newcoin/effects");
}, object>;
export declare const useReaction: () => import("overmind").IReaction<Context>;
