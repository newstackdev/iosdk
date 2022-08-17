import { FirebaseConfig, GenericComponent } from "./types";
import { PartialDeep } from "type-fest";
export declare const stage: string;
export declare const APP_DOMAIN = "life.nco";
export declare const firebaseConfig: FirebaseConfig;
export declare const apiBaseUrl: string;
export declare const mediaBucket: any;
export declare const stripeKey: any;
export declare const config: {
    env: {
        stage: string;
    };
    settings: {
        app: {
            name: string;
            currentHost: string;
        };
        newcoin: {
            daoId: string;
            daoDomain: string;
            displayDaoDomain: string;
            poolId: string;
        };
        firebaseConfig: FirebaseConfig;
        newgraph: {
            baseUrl: string;
            mediaBucket: any;
            websocketsServer: any;
        };
        routing: {
            routeAccessLevels: Record<string, (st: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE, gst: import("overmind/lib/internalTypes").SubType<{
                firebase: {
                    token: string;
                    user: import("@firebase/auth").User | null;
                };
                config: any;
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
                        powerups: import("./overmind/api/state").PowerupsCache;
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
                            byCode: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                            byOwner: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                        };
                        votes: Record<string, import("@newcoin-foundation/iosdk-newgraph-client-js").BcDaoProposalVoteResponse>;
                    };
                };
                unsid: {
                    token: string;
                };
            }, object>) => boolean>;
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
            Layout: GenericComponent;
            TopMenu: GenericComponent;
            Header: GenericComponent;
        };
        auth: {
            AuthWidget: GenericComponent;
        };
        icons: {
            Logo: GenericComponent;
        };
    };
    featureFlags: {
        onboarding: {
            premiumDomains: boolean;
        };
    };
};
export declare type Configuration<T = {}> = typeof config & T;
export declare type PartialConfiguration<T = {}> = PartialDeep<Configuration<T>>;
