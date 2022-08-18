export declare const standardModules: {
    indicators: {
        state: {
            _isWorking: number;
            isWorking: boolean;
            _specific: Record<string, number>;
            specific: Record<string, any>;
        };
        actions: {
            isWorking: import("../types").Action<{
                actionName: string;
                n: number;
            }, void>;
            isWorkingActionDebounced: import("../types").Action<{
                actionName: string;
            }, void>;
        };
    };
    auth: {
        actions: typeof import("./auth/actions");
        effects: typeof import("./auth/effects");
        state: import("./auth/state").State;
    };
    routing: {
        actions: typeof import("./routing/actions");
        effects: {};
        state: {
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
    };
    websockets: {
        state: {
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
        actions: {
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
        effects: {
            newlife: import("./websockets/effects").WSState;
        };
    };
    payments: {
        actions: {
            pay: import("../types").Action<{
                stripe?: import("@stripe/stripe-js").Stripe | null | undefined;
                elements?: import("@stripe/stripe-js").StripeElements | null | undefined;
            }, void>;
        };
    };
    evm: {
        actions: typeof import("./evm/actions");
        effects: typeof import("./evm/effects");
    };
    ux: {
        actions: {
            showNotification: import("../types").Action<{
                message: string;
                duration?: number | undefined;
            }, void>;
            setLayout: import("../types").Action<{
                headerShown: boolean;
            }, void>;
            setFooterVisibility: import("../types").Action<{
                footerShown: boolean;
            }, void>;
        };
        effects: {
            notification: import("antd/lib/notification").NotificationApi;
            message: import("antd/lib/message").MessageApi;
        };
        state: {
            layout: {
                headerShown: boolean;
                footerShown: boolean;
            };
        };
    };
    chromeext: {
        actions: typeof import("./chromeext/actions");
        effects: {};
    };
    api: {
        actions: {
            onInitializeOvermind: import("../types").Action<undefined, void>;
            auth: typeof import("./api/actions/auth");
            user: typeof import("./api/actions/user");
            mood: typeof import("./api/actions/mood");
            post: typeof import("./api/actions/post");
        };
        effects: {
            initialize(baseUrl: string): import("../types").CreatorApi;
            updateToken(token: string): void;
            authorize(): Promise<import("@newcoin-foundation/iosdk-newgraph-client-js").UserReadPrivateResponse>;
        };
        state: {
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
    };
    lists: {
        state: {
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
        actions: {
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
        effects: {};
    };
    flows: {
        state: import("overmind/lib/internalTypes").SubType<{
            user: import("overmind/lib/internalTypes").SubType<{
                create: import("./flows/user/onboarding/state").IOnboarding;
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
        effects: import("overmind/lib/internalTypes").SubType<{
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
        actions: import("overmind/lib/internalTypes").SubType<{
            user: import("overmind/lib/internalTypes").SubType<{
                create: typeof import("./flows/user/onboarding/actions");
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
    };
    newcoin: {
        actions: typeof import("./newcoin/actions");
        effects: typeof import("./newcoin/effects");
        state: {
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
    };
    unsid: {
        actions: {
            onInitializeOvermind: import("../types").Action<undefined, void>;
            authorize: import("../types").Action<{
                jwt: string;
            }, void>;
            signOut: import("../types").Action<undefined, void>;
        };
        state: {
            token: string;
        };
        effects: {};
    };
};
