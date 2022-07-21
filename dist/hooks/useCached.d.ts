import { HyperionAccountHistory } from "../overmind/newcoin/types";
import { MoodReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { PowerupsCacheItem } from "../overmind/api/state";
export declare const useCachedUser: (user?: {
    id?: string;
    username?: string;
}, force?: boolean) => {
    moods: MoodReadResponse[] | undefined;
    newcoinTicker?: string | undefined;
    youtube?: string | undefined;
    powered?: number | undefined;
    displayName?: string | undefined;
    newcoinAccTx?: string | undefined;
    latitude?: number | undefined;
    description?: string | undefined;
    newcoinPoolId?: string | undefined;
    tumblr?: string | undefined;
    aspectRatio?: number | undefined;
    instagram?: string | undefined;
    medium?: string | undefined;
    newcoinActivePublicKey?: string | undefined;
    soundcloud?: string | undefined;
    newcoinPublicKey?: string | undefined;
    powering?: number | undefined;
    snapchat?: string | undefined;
    apple?: string | undefined;
    twitter?: string | undefined;
    newcoinOwnerPublicKey?: string | undefined;
    tiktok?: string | undefined;
    reddit?: string | undefined;
    youtubeId?: string | undefined;
    id?: string | undefined;
    newcoinPoolStake?: number | undefined;
    contentType?: string | undefined;
    signal?: string | undefined;
    longitude?: number | undefined;
    newcoinPublisherPublicKey?: string | undefined;
    website?: string | undefined;
    created?: string | undefined;
    spotify?: string | undefined;
    facebook?: string | undefined;
    facebookId?: string | undefined;
    fullName?: string | undefined;
    telegram?: string | undefined;
    pinterest?: string | undefined;
    verifiedSocialIds?: string[] | undefined;
    newcoinPoolTx?: string | undefined;
    license?: string | undefined;
    contentUrl?: string | undefined;
    discord?: string | undefined;
    blurHash?: string | undefined;
    consentEmail?: string | undefined;
    updated?: string | undefined;
    username?: string | undefined;
};
export declare const useCachedPost: ({ id }: {
    id?: string | undefined;
}, force?: boolean) => import("@newcoin-foundation/iosdk-newgraph-client-js").PostReadResponse;
export declare const useCachedMood: ({ id }: {
    id?: string | undefined;
}, force?: boolean) => MoodReadResponse & {
    promise?: Promise<any> | null | undefined;
};
export declare const useCachedMoodPosts: ({ id }: {
    id?: string | undefined;
}, force?: boolean) => MoodReadResponse & {
    promise?: Promise<any> | null | undefined;
};
export declare const useCachedMoods: (moods?: {
    id?: string;
}[], force?: boolean) => MoodReadResponse[];
export declare const useCachedPowerups: (user?: {
    id?: string;
}, force?: boolean) => "" | PowerupsCacheItem;
export declare const useCachedNewconAccountHistory: (user: {
    username?: string;
}, force?: boolean) => HyperionAccountHistory;
export declare const useCachedPool: (pool?: {
    owner?: string;
    code?: string;
}, force?: boolean) => import("@newcoin-foundation/newcoin-sdk/dist/types").NCPoolInfo | {
    owner: string;
    code: string;
    total: {
        quantity: number;
    };
};
export declare const useCachedPoolByCode: (pool: {
    code?: string;
}, force?: boolean) => "" | import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo | undefined;
export declare const useCachedDaoProposals: (params?: {
    daoOwner?: string;
}) => {
    daoOwner: string;
    more?: object | undefined;
    dao_id?: string | undefined;
    next_key?: string | undefined;
    rows?: {
        summary?: string | undefined;
        proposer?: string | undefined;
        vote_start?: string | undefined;
        more?: object | undefined;
        next_key?: string | undefined;
        vote_end?: string | undefined;
        id?: number | undefined;
        title?: string | undefined;
        vote_no?: {
            quantity?: string | undefined;
            contract?: string | undefined;
        } | undefined;
        url?: string | undefined;
        vote_yes?: {
            quantity?: string | undefined;
            contract?: string | undefined;
        } | undefined;
        status?: string | undefined;
    }[] | undefined;
};
export declare const useCachedDaoWhitelistProposals: (params?: {
    daoOwner?: string;
}) => {
    daoOwner: string;
    more?: object | undefined;
    dao_id?: string | undefined;
    next_key?: string | undefined;
    rows?: {
        summary?: string | undefined;
        proposer?: string | undefined;
        vote_start?: string | undefined;
        more?: object | undefined;
        next_key?: string | undefined;
        vote_end?: string | undefined;
        id?: number | undefined;
        title?: string | undefined;
        vote_no?: {
            quantity?: string | undefined;
            contract?: string | undefined;
        } | undefined;
        url?: string | undefined;
        vote_yes?: {
            quantity?: string | undefined;
            contract?: string | undefined;
        } | undefined;
        status?: string | undefined;
    }[] | undefined;
};
export declare const useCachedDaoWhitelist: (params?: {
    daoOwner?: string;
}) => any;
export declare const useCachedDaoProposal: ({ daoOwner, proposalId }: {
    daoOwner?: string | undefined;
    proposalId?: string | undefined;
}) => {
    daoOwner: string;
    more?: object | undefined;
    dao_id?: string | undefined;
    next_key?: string | undefined;
    summary?: string | undefined;
    proposer?: string | undefined;
    vote_start?: string | undefined;
    vote_end?: string | undefined;
    id?: number | undefined;
    title?: string | undefined;
    vote_no?: {
        quantity?: string | undefined;
        contract?: string | undefined;
    } | undefined;
    url?: string | undefined;
    vote_yes?: {
        quantity?: string | undefined;
        contract?: string | undefined;
    } | undefined;
    status?: string | undefined;
};
export declare const useCachedDaoWhitelistProposal: ({ daoOwner, proposalId }: {
    daoOwner?: string | undefined;
    proposalId?: string | undefined;
}) => {
    daoOwner: string;
    more?: object | undefined;
    dao_id?: string | undefined;
    next_key?: string | undefined;
    summary?: string | undefined;
    proposer?: string | undefined;
    vote_start?: string | undefined;
    vote_end?: string | undefined;
    id?: number | undefined;
    title?: string | undefined;
    vote_no?: {
        quantity?: string | undefined;
        contract?: string | undefined;
    } | undefined;
    url?: string | undefined;
    vote_yes?: {
        quantity?: string | undefined;
        contract?: string | undefined;
    } | undefined;
    status?: string | undefined;
};
