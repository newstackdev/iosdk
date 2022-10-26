import { App } from "./App";
import { overmind } from "./overmind";
export { App };
export { overmind };
declare const _default: {
    App: import("./types").NLView<{
        overmind: import("overmind").Overmind<{
            state: import("overmind/lib/internalTypes").SubType<{
                firebase: {
                    token: string;
                    user: import("@firebase/auth").User | null;
                };
                config: {
                    env: {
                        env: string;
                        stage: string;
                    };
                    settings: {
                        app: {
                            name: string;
                            currentHost: string;
                        };
                        newsafe: {
                            currentHost: string;
                        };
                        newcoin: {
                            daoId: string;
                            daoDomain: string;
                            displayDaoDomain: string;
                            poolId: string;
                        };
                        firebaseConfig: import("./types").FirebaseConfig;
                        newgraph: {
                            baseUrl: string;
                            mediaBucket: any;
                            websocketsServer: any;
                        };
                        routing: {
                            routeAccessLevels: Record<string, (st: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE, gst: import("overmind/lib/internalTypes").SubType<any, object>) => boolean>;
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
                            Layout: import("./types").GenericComponent;
                            TopMenu: import("./types").GenericComponent;
                            Header: import("./types").GenericComponent;
                        };
                        auth: {
                            AuthWidget: import("./types").GenericComponent;
                        };
                        icons: {
                            Logo: import("./types").GenericComponent;
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
                auth: import("./overmind/auth/state").State;
                routing: {
                    preLoginRoute: string;
                    breadcrumbs: import("./types").Link[];
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
                        footerShown: boolean;
                    };
                };
                chromeext: unknown;
                api: {
                    client: import("./types").CreatorApi;
                    auth: {
                        status: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE;
                        user: import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse;
                        moods: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
                        authorized: boolean;
                        admitted: boolean;
                        userDisplayHandler: string;
                        attempted: boolean;
                        inviteesList: import("@newstackdev/iosdk-newgraph-client-js").UserInvitationPagedListReadPublicResponse;
                    };
                    cache: {
                        users: {
                            byUsername: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse & {
                                moods?: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                            }>;
                            byId: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse & {
                                moods?: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                            }>;
                        };
                        powerups: import("./overmind/api/state").PowerupsCache;
                        posts: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                        videoPosts: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                        moods: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse & {
                            promise?: Promise<any> | null | undefined;
                        }>;
                        stakeHistory: {
                            user: import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse;
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
                            _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse>;
                            items: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
                            sortKey: string;
                            page: number;
                        };
                        users: {
                            _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse>;
                            items: import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse[];
                            sortKey: string;
                            page: number;
                        };
                        posts: {
                            _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                            items: import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse[];
                            sortKey: string;
                            page: number;
                        };
                        videoPosts: {
                            _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                            items: import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse[];
                            sortKey: string;
                            page: number;
                        };
                        isNextMoodsAvailable: boolean;
                        isNextPostsAvailable: boolean;
                        isNextUsersAvailable: boolean;
                    };
                    selectedUser: {
                        moods: {
                            _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse>;
                            items: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
                            sortKey: string;
                            page: number;
                        };
                        posts: {
                            _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                            items: import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse[];
                            sortKey: string;
                            page: number;
                        };
                        isNextMoodsAvailable: boolean;
                        isNextPostsAvailable: boolean;
                    };
                    search: {
                        users: {
                            query: string;
                            results: import("@newstackdev/iosdk-newgraph-client-js").UserPagedListReadPublicResponse | null;
                        };
                        posts: {
                            query: string;
                            results: import("@newstackdev/iosdk-newgraph-client-js").PostPagedListReadPublicResponse | null;
                            lastQueried: {
                                tags: string;
                                aesthetics: string;
                            };
                            isActive: boolean;
                            page: number;
                        };
                        tags: {
                            query: string;
                            results: import("@newstackdev/iosdk-newgraph-client-js").PostTagsSearchPublicResponse | null;
                            lastQueried: string;
                            isActive: boolean;
                            page: number;
                        };
                    };
                };
                flows: import("overmind/lib/internalTypes").SubType<{
                    user: import("overmind/lib/internalTypes").SubType<{
                        create: import("./overmind/flows/user/onboarding/state").IOnboarding;
                    }, object>;
                    rating: {
                        _value: number;
                        value: number;
                        startTime: number;
                        isRating: boolean;
                        rated: boolean;
                        interval: {
                            start: (f: import("./types").EventHandler) => void;
                            stop: () => void;
                        };
                        keyBinding: {
                            remove: () => void;
                            setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                                onKeyUp: import("./types").EventHandler;
                                onKeyDown: import("./types").EventHandler;
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
                    daos: Record<string, import("./overmind/newcoin/state").DaoState>;
                    cache: {
                        accountHistory: Record<string, import("./overmind/newcoin/types").HyperionAccountHistory>;
                        pools: {
                            byCode: Record<string, import("@newfound8ion/newcoin-sdk").NCPoolsInfo>;
                            byOwner: Record<string, import("@newfound8ion/newcoin-sdk").NCPoolsInfo>;
                        };
                        votes: Record<string, import("@newstackdev/iosdk-newgraph-client-js").BcDaoProposalVoteResponse>;
                    };
                };
                newsafe: {
                    token: string;
                };
                cache: {
                    readonly db: {
                        ready: boolean;
                        nodes: import("dexie").Dexie;
                        edges: import("dexie").Dexie.Table<any, any>;
                    };
                    ready: boolean;
                    _db: () => {
                        nodes: import("dexie").Dexie;
                        edges: import("dexie").Dexie.Table<any, any>;
                    };
                };
            }, object>;
            effects: import("overmind/lib/internalTypes").SubType<{
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
                config: unknown;
                indicators: unknown;
                auth: typeof import("./overmind/auth/effects");
                routing: {};
                websockets: {
                    newlife: import("./overmind/websockets/effects").WSState;
                };
                payments: unknown;
                evm: typeof import("./overmind/evm/effects");
                ux: {
                    notification: import("antd/lib/notification").NotificationApi;
                    message: import("antd/lib/message").MessageApi;
                };
                chromeext: {};
                api: {
                    initialize(baseUrl: string): import("./types").CreatorApi;
                    updateToken(token: string): void;
                    authorize(): Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
                };
                lists: {};
                flows: import("overmind/lib/internalTypes").SubType<{
                    user: import("overmind/lib/internalTypes").SubType<{
                        create: {};
                    }, object>;
                    rating: {
                        initInterval: (ms: number) => {
                            start: (f: import("./types").EventHandler) => void;
                            stop: () => void;
                        };
                        onceKeyBinding: (keyCodes: number[]) => {
                            remove: () => void;
                            setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                                onKeyUp: import("./types").EventHandler;
                                onKeyDown: import("./types").EventHandler;
                            }) => void;
                        };
                    };
                    userJourney: unknown;
                    stake: unknown;
                    vote: unknown;
                }, object>;
                newcoin: typeof import("./overmind/newcoin/effects");
                newsafe: {};
                cache: typeof import("./overmind/cache/effects");
            }, object>;
            actions: import("overmind/lib/internalTypes").SubType<{
                firebase: typeof import("./overmind/firebase/actions");
                config: unknown;
                indicators: {
                    isWorking: import("./types").Action<{
                        actionName: string;
                        n: number;
                    }, void>;
                    isWorkingActionDebounced: import("./types").Action<{
                        actionName: string;
                    }, void>;
                };
                auth: typeof import("./overmind/auth/actions");
                routing: typeof import("./overmind/routing/actions");
                websockets: {
                    toggleWebSocket: import("./types").Action<undefined, void>;
                    processIncoming: import("./types").Action<{
                        msg: any;
                    }, void>;
                    processIncomingModelUpdated: import("./types").Action<{
                        event: {
                            type: "modelUpdated";
                            model: "user" | "mood" | "post";
                            payload: any;
                            updated: string;
                        } & {
                            type: "modelUpdated";
                        };
                    }, void>;
                    processIncomingNewcoin: import("./types").Action<{
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
                    pay: import("./types").Action<{
                        stripe?: import("@stripe/stripe-js").Stripe | null | undefined;
                        elements?: import("@stripe/stripe-js").StripeElements | null | undefined;
                    }, void>;
                };
                evm: typeof import("./overmind/evm/actions");
                ux: {
                    showNotification: import("./types").Action<{
                        message: string;
                        duration?: number | undefined;
                    }, void>;
                    setLayout: import("./types").Action<{
                        headerShown: boolean;
                    }, void>;
                    setFooterVisibility: import("./types").Action<{
                        footerShown: boolean;
                    }, void>;
                };
                chromeext: typeof import("./overmind/chromeext/actions");
                api: {
                    onInitializeOvermind: import("./types").Action<undefined, void>;
                    auth: typeof import("./overmind/api/actions/auth");
                    user: typeof import("./overmind/api/actions/user");
                    mood: typeof import("./overmind/api/actions/mood");
                    post: typeof import("./overmind/api/actions/post");
                };
                lists: {
                    creativeSearch: import("./types").Action<{
                        tags: string;
                        aesthetics: string;
                    }, void>;
                    searchUsers: import("./types").Action<{
                        query: string;
                    }, void>;
                    searchPosts: import("./types").Action<{
                        tags: string;
                        force?: boolean | undefined;
                    }, void>;
                    searchTags: import("./types").Action<{
                        query: string;
                    }, void>;
                    resetMoodAndPostAvailability: import("./types").Action<undefined, void>;
                    top: {
                        moods: import("./types").Action<{
                            requestedPage?: number | undefined;
                        }, void>;
                        users: import("./types").Action<{
                            requestedPage?: number | undefined;
                        }, void>;
                        posts: import("./types").Action<import("./types").ContentType | undefined, void>;
                    };
                };
                flows: import("overmind/lib/internalTypes").SubType<{
                    user: import("overmind/lib/internalTypes").SubType<{
                        create: typeof import("./overmind/flows/user/onboarding/actions");
                    }, object>;
                    rating: {
                        deepLikeInit: import("./types").Action<undefined, void>;
                        deepLikeStart: import("./types").Action<{
                            event?: Event | undefined;
                        }, void>;
                        deepLikeStep: import("./types").Action<undefined, void>;
                        deepLikeStop: import("./types").Action<undefined, void>;
                        onInitializeOvermind: import("./types").Action<undefined, void>;
                    };
                    userJourney: {
                        setFlag: import("./types").Action<{
                            flag: string;
                            value: string;
                        }, void>;
                        onInitializeOvermind: import("./types").Action<undefined, void>;
                    };
                    stake: typeof import("./overmind/flows/stake/actions");
                    vote: typeof import("./overmind/flows/vote/actions");
                }, object>;
                newcoin: typeof import("./overmind/newcoin/actions");
                newsafe: {
                    onInitializeOvermind: import("./types").Action<undefined, void>;
                    authorize: import("./types").Action<{
                        jwt: string;
                    }, void>;
                    navigateToNewsafeAuthUrl: import("./types").Action<{
                        redirectUrl?: string | undefined;
                        redirectPath: string;
                    } | undefined, void>;
                    signIn: import("./types").Action<{
                        redirectUrl?: string | undefined;
                        redirectPath: string;
                    } | undefined, void>;
                    newsafeAuthUrl: import("./types").Action<{
                        redirectUrl?: string | undefined;
                        redirectPath: string;
                    } | undefined, string>;
                    signOut: import("./types").Action<undefined, void>;
                };
                cache: typeof import("./overmind/cache/actions");
            }, object>;
        }>;
        config?: import("type-fest/source/partial-deep").PartialObjectDeep<{
            env: {
                env: string;
                stage: string;
            };
            settings: {
                app: {
                    name: string;
                    currentHost: string;
                };
                newsafe: {
                    currentHost: string;
                };
                newcoin: {
                    daoId: string;
                    daoDomain: string;
                    displayDaoDomain: string;
                    poolId: string;
                };
                firebaseConfig: import("./types").FirebaseConfig;
                newgraph: {
                    baseUrl: string;
                    mediaBucket: any;
                    websocketsServer: any;
                };
                routing: {
                    routeAccessLevels: Record<string, (st: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE, gst: import("overmind/lib/internalTypes").SubType<any, object>) => boolean>;
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
                    Layout: import("./types").GenericComponent;
                    TopMenu: import("./types").GenericComponent;
                    Header: import("./types").GenericComponent;
                };
                auth: {
                    AuthWidget: import("./types").GenericComponent;
                };
                icons: {
                    Logo: import("./types").GenericComponent;
                };
            };
            featureFlags: {
                onboarding: {
                    premiumDomains: boolean;
                };
            };
        }> | undefined;
    }>;
    overmind: (cfg?: import("type-fest/source/partial-deep").PartialObjectDeep<{
        env: {
            env: string;
            stage: string;
        };
        settings: {
            app: {
                name: string;
                currentHost: string;
            };
            newsafe: {
                currentHost: string;
            };
            newcoin: {
                daoId: string;
                daoDomain: string;
                displayDaoDomain: string;
                poolId: string;
            };
            firebaseConfig: import("./types").FirebaseConfig;
            newgraph: {
                baseUrl: string;
                mediaBucket: any;
                websocketsServer: any;
            };
            routing: {
                routeAccessLevels: Record<string, (st: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE, gst: import("overmind/lib/internalTypes").SubType<any, object>) => boolean>;
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
                Layout: import("./types").GenericComponent;
                TopMenu: import("./types").GenericComponent;
                Header: import("./types").GenericComponent;
            };
            auth: {
                AuthWidget: import("./types").GenericComponent;
            };
            icons: {
                Logo: import("./types").GenericComponent;
            };
        };
        featureFlags: {
            onboarding: {
                premiumDomains: boolean;
            };
        };
    }> | undefined) => import("overmind").Overmind<{
        state: import("overmind/lib/internalTypes").SubType<{
            firebase: {
                token: string;
                user: import("@firebase/auth").User | null;
            };
            config: {
                env: {
                    env: string;
                    stage: string;
                };
                settings: {
                    app: {
                        name: string;
                        currentHost: string;
                    };
                    newsafe: {
                        currentHost: string;
                    };
                    newcoin: {
                        daoId: string;
                        daoDomain: string;
                        displayDaoDomain: string;
                        poolId: string;
                    };
                    firebaseConfig: import("./types").FirebaseConfig;
                    newgraph: {
                        baseUrl: string;
                        mediaBucket: any;
                        websocketsServer: any;
                    };
                    routing: {
                        routeAccessLevels: Record<string, (st: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE, gst: import("overmind/lib/internalTypes").SubType<any, object>) => boolean>;
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
                        Layout: import("./types").GenericComponent;
                        TopMenu: import("./types").GenericComponent;
                        Header: import("./types").GenericComponent;
                    };
                    auth: {
                        AuthWidget: import("./types").GenericComponent;
                    };
                    icons: {
                        Logo: import("./types").GenericComponent;
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
            auth: import("./overmind/auth/state").State;
            routing: {
                preLoginRoute: string;
                breadcrumbs: import("./types").Link[];
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
                    footerShown: boolean;
                };
            };
            chromeext: unknown;
            api: {
                client: import("./types").CreatorApi;
                auth: {
                    status: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE;
                    user: import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse;
                    moods: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
                    authorized: boolean;
                    admitted: boolean;
                    userDisplayHandler: string;
                    attempted: boolean;
                    inviteesList: import("@newstackdev/iosdk-newgraph-client-js").UserInvitationPagedListReadPublicResponse;
                };
                cache: {
                    users: {
                        byUsername: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse & {
                            moods?: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                        }>;
                        byId: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse & {
                            moods?: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[] | undefined;
                        }>;
                    };
                    powerups: import("./overmind/api/state").PowerupsCache;
                    posts: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                    videoPosts: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                    moods: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse & {
                        promise?: Promise<any> | null | undefined;
                    }>;
                    stakeHistory: {
                        user: import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse;
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
                        _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse>;
                        items: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                    users: {
                        _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse>;
                        items: import("@newstackdev/iosdk-newgraph-client-js").UserReadPublicResponse[];
                        sortKey: string;
                        page: number;
                    };
                    posts: {
                        _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                        items: import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                    videoPosts: {
                        _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                        items: import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                    isNextMoodsAvailable: boolean;
                    isNextPostsAvailable: boolean;
                    isNextUsersAvailable: boolean;
                };
                selectedUser: {
                    moods: {
                        _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse>;
                        items: import("@newstackdev/iosdk-newgraph-client-js").MoodReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                    posts: {
                        _items: Record<string, import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse>;
                        items: import("@newstackdev/iosdk-newgraph-client-js").PostReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                    isNextMoodsAvailable: boolean;
                    isNextPostsAvailable: boolean;
                };
                search: {
                    users: {
                        query: string;
                        results: import("@newstackdev/iosdk-newgraph-client-js").UserPagedListReadPublicResponse | null;
                    };
                    posts: {
                        query: string;
                        results: import("@newstackdev/iosdk-newgraph-client-js").PostPagedListReadPublicResponse | null;
                        lastQueried: {
                            tags: string;
                            aesthetics: string;
                        };
                        isActive: boolean;
                        page: number;
                    };
                    tags: {
                        query: string;
                        results: import("@newstackdev/iosdk-newgraph-client-js").PostTagsSearchPublicResponse | null;
                        lastQueried: string;
                        isActive: boolean;
                        page: number;
                    };
                };
            };
            flows: import("overmind/lib/internalTypes").SubType<{
                user: import("overmind/lib/internalTypes").SubType<{
                    create: import("./overmind/flows/user/onboarding/state").IOnboarding;
                }, object>;
                rating: {
                    _value: number;
                    value: number;
                    startTime: number;
                    isRating: boolean;
                    rated: boolean;
                    interval: {
                        start: (f: import("./types").EventHandler) => void;
                        stop: () => void;
                    };
                    keyBinding: {
                        remove: () => void;
                        setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                            onKeyUp: import("./types").EventHandler;
                            onKeyDown: import("./types").EventHandler;
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
                daos: Record<string, import("./overmind/newcoin/state").DaoState>;
                cache: {
                    accountHistory: Record<string, import("./overmind/newcoin/types").HyperionAccountHistory>;
                    pools: {
                        byCode: Record<string, import("@newfound8ion/newcoin-sdk").NCPoolsInfo>;
                        byOwner: Record<string, import("@newfound8ion/newcoin-sdk").NCPoolsInfo>;
                    };
                    votes: Record<string, import("@newstackdev/iosdk-newgraph-client-js").BcDaoProposalVoteResponse>;
                };
            };
            newsafe: {
                token: string;
            };
            cache: {
                readonly db: {
                    ready: boolean;
                    nodes: import("dexie").Dexie;
                    edges: import("dexie").Dexie.Table<any, any>;
                };
                ready: boolean;
                _db: () => {
                    nodes: import("dexie").Dexie;
                    edges: import("dexie").Dexie.Table<any, any>;
                };
            };
        }, object>;
        effects: import("overmind/lib/internalTypes").SubType<{
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
            config: unknown;
            indicators: unknown;
            auth: typeof import("./overmind/auth/effects");
            routing: {};
            websockets: {
                newlife: import("./overmind/websockets/effects").WSState;
            };
            payments: unknown;
            evm: typeof import("./overmind/evm/effects");
            ux: {
                notification: import("antd/lib/notification").NotificationApi;
                message: import("antd/lib/message").MessageApi;
            };
            chromeext: {};
            api: {
                initialize(baseUrl: string): import("./types").CreatorApi;
                updateToken(token: string): void;
                authorize(): Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
            };
            lists: {};
            flows: import("overmind/lib/internalTypes").SubType<{
                user: import("overmind/lib/internalTypes").SubType<{
                    create: {};
                }, object>;
                rating: {
                    initInterval: (ms: number) => {
                        start: (f: import("./types").EventHandler) => void;
                        stop: () => void;
                    };
                    onceKeyBinding: (keyCodes: number[]) => {
                        remove: () => void;
                        setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                            onKeyUp: import("./types").EventHandler;
                            onKeyDown: import("./types").EventHandler;
                        }) => void;
                    };
                };
                userJourney: unknown;
                stake: unknown;
                vote: unknown;
            }, object>;
            newcoin: typeof import("./overmind/newcoin/effects");
            newsafe: {};
            cache: typeof import("./overmind/cache/effects");
        }, object>;
        actions: import("overmind/lib/internalTypes").SubType<{
            firebase: typeof import("./overmind/firebase/actions");
            config: unknown;
            indicators: {
                isWorking: import("./types").Action<{
                    actionName: string;
                    n: number;
                }, void>;
                isWorkingActionDebounced: import("./types").Action<{
                    actionName: string;
                }, void>;
            };
            auth: typeof import("./overmind/auth/actions");
            routing: typeof import("./overmind/routing/actions");
            websockets: {
                toggleWebSocket: import("./types").Action<undefined, void>;
                processIncoming: import("./types").Action<{
                    msg: any;
                }, void>;
                processIncomingModelUpdated: import("./types").Action<{
                    event: {
                        type: "modelUpdated";
                        model: "user" | "mood" | "post";
                        payload: any;
                        updated: string;
                    } & {
                        type: "modelUpdated";
                    };
                }, void>;
                processIncomingNewcoin: import("./types").Action<{
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
                pay: import("./types").Action<{
                    stripe?: import("@stripe/stripe-js").Stripe | null | undefined;
                    elements?: import("@stripe/stripe-js").StripeElements | null | undefined;
                }, void>;
            };
            evm: typeof import("./overmind/evm/actions");
            ux: {
                showNotification: import("./types").Action<{
                    message: string;
                    duration?: number | undefined;
                }, void>;
                setLayout: import("./types").Action<{
                    headerShown: boolean;
                }, void>;
                setFooterVisibility: import("./types").Action<{
                    footerShown: boolean;
                }, void>;
            };
            chromeext: typeof import("./overmind/chromeext/actions");
            api: {
                onInitializeOvermind: import("./types").Action<undefined, void>;
                auth: typeof import("./overmind/api/actions/auth");
                user: typeof import("./overmind/api/actions/user");
                mood: typeof import("./overmind/api/actions/mood");
                post: typeof import("./overmind/api/actions/post");
            };
            lists: {
                creativeSearch: import("./types").Action<{
                    tags: string;
                    aesthetics: string;
                }, void>;
                searchUsers: import("./types").Action<{
                    query: string;
                }, void>;
                searchPosts: import("./types").Action<{
                    tags: string;
                    force?: boolean | undefined;
                }, void>;
                searchTags: import("./types").Action<{
                    query: string;
                }, void>;
                resetMoodAndPostAvailability: import("./types").Action<undefined, void>;
                top: {
                    moods: import("./types").Action<{
                        requestedPage?: number | undefined;
                    }, void>;
                    users: import("./types").Action<{
                        requestedPage?: number | undefined;
                    }, void>;
                    posts: import("./types").Action<import("./types").ContentType | undefined, void>;
                };
            };
            flows: import("overmind/lib/internalTypes").SubType<{
                user: import("overmind/lib/internalTypes").SubType<{
                    create: typeof import("./overmind/flows/user/onboarding/actions");
                }, object>;
                rating: {
                    deepLikeInit: import("./types").Action<undefined, void>;
                    deepLikeStart: import("./types").Action<{
                        event?: Event | undefined;
                    }, void>;
                    deepLikeStep: import("./types").Action<undefined, void>;
                    deepLikeStop: import("./types").Action<undefined, void>;
                    onInitializeOvermind: import("./types").Action<undefined, void>;
                };
                userJourney: {
                    setFlag: import("./types").Action<{
                        flag: string;
                        value: string;
                    }, void>;
                    onInitializeOvermind: import("./types").Action<undefined, void>;
                };
                stake: typeof import("./overmind/flows/stake/actions");
                vote: typeof import("./overmind/flows/vote/actions");
            }, object>;
            newcoin: typeof import("./overmind/newcoin/actions");
            newsafe: {
                onInitializeOvermind: import("./types").Action<undefined, void>;
                authorize: import("./types").Action<{
                    jwt: string;
                }, void>;
                navigateToNewsafeAuthUrl: import("./types").Action<{
                    redirectUrl?: string | undefined;
                    redirectPath: string;
                } | undefined, void>;
                signIn: import("./types").Action<{
                    redirectUrl?: string | undefined;
                    redirectPath: string;
                } | undefined, void>;
                newsafeAuthUrl: import("./types").Action<{
                    redirectUrl?: string | undefined;
                    redirectPath: string;
                } | undefined, string>;
                signOut: import("./types").Action<undefined, void>;
            };
            cache: typeof import("./overmind/cache/actions");
        }, object>;
    }>;
};
export default _default;
