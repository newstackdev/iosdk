import { Action } from "../../../types";
import { MoodReadResponse, UserCreateRequest, UserInviteRequest, UserReadPublicResponse, UserUpdateRequest } from "@newcoin-foundation/iosdk-newgraph-client-js";
export declare const cache: Action<{
    user: UserReadPublicResponse & {
        moods?: MoodReadResponse[];
    };
    force?: boolean;
    moods?: MoodReadResponse;
}>;
export declare const read: Action<{
    id?: string;
    username?: string;
}, UserReadPublicResponse>;
export declare const create: Action<{
    noRouting?: boolean;
    user: UserCreateRequest;
    preregisterCreate?: boolean;
}>;
export declare const update: Action<{
    user: UserUpdateRequest;
    file?: any;
}>;
export declare const getMoods: Action<{
    id?: string;
}>;
export declare const stake: Action<{
    user: UserReadPublicResponse;
    amount: string;
}, any>;
export declare const invite: Action<{
    userInvite: UserInviteRequest;
}, string | undefined>;
export declare const getUserInvitesList: Action<any, void>;
export declare const powerup: Action<{
    user: UserReadPublicResponse;
    amount: number;
}>;
export declare const powerUpMultiple: Action<{
    users: UserReadPublicResponse[];
    amount?: number;
}>;
export declare const getPowerups: Action<{
    user: UserReadPublicResponse;
}>;
export declare const getCurrent: Action<undefined>;
export declare const checkLinkHash: Action<{
    hash: string;
}>;
export declare const checkNft: Action<{
    collectionAddr: string;
    nftId: number;
}>;
