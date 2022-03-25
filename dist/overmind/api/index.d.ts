declare const _default: {
    actions: {
        onInitializeOvermind: import("../../types").Action<undefined, void>;
        auth: typeof import("./actions/auth");
        user: typeof import("./actions/user");
        mood: typeof import("./actions/mood");
        post: typeof import("./actions/post");
    };
    effects: {
        initialize(): import("../../types").CreatorApi;
        updateToken(token: string): void;
        authorize(): Promise<import("@newlife/newlife-creator-client-api").UserReadPrivateResponse>;
    };
    state: {
        client: import("../../types").CreatorApi;
        auth: {
            status: import("../auth/state").AUTH_FLOW_STATUS_TYPE;
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
            powerups: import("./state").PowerupsCache;
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
};
export default _default;
