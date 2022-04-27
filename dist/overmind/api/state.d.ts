import { MoodReadResponse, PagedRatedResponseUser, PostReadResponse, UserReadPrivateResponse, UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { CreatorApi } from "../../types";
import { AUTH_FLOW_STATUS_TYPE } from "../auth/state";
export declare const api: CreatorApi;
export declare type PowerupsCacheItem = {
    in: PagedRatedResponseUser;
    out: PagedRatedResponseUser;
    promise?: Promise<PowerupsCacheItem>;
};
export declare type PowerupsCache = Record<string, PowerupsCacheItem>;
declare type State = {
    client: CreatorApi;
    auth: {
        status: AUTH_FLOW_STATUS_TYPE;
        user: UserReadPrivateResponse | null;
        moods: MoodReadResponse[];
        authorized: boolean;
        admitted: boolean;
        userDisplayHandler: string;
        attempted: boolean;
    };
    cache: {
        users: {
            byUsername: Record<string, UserReadPublicResponse & {
                moods?: MoodReadResponse[];
            }>;
            byId: Record<string, UserReadPublicResponse & {
                moods?: MoodReadResponse[];
            }>;
        };
        powerups: PowerupsCache;
        posts: Record<string, PostReadResponse>;
        moods: Record<string, MoodReadResponse & {
            promise?: Promise<any> | null;
        }>;
        stakeHistory: {
            user: UserReadPublicResponse;
            amount: string;
            response: any;
            error: any;
        }[];
    };
};
declare const _default: State;
export default _default;
