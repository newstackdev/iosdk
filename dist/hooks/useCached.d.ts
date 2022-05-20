import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { PowerupsCacheItem } from "../overmind/api/state";
import { HyperionAccountHistory } from "../overmind/newcoin/types";
export declare const useCachedUser: (user?: {
    id?: string | undefined;
    username?: string | undefined;
} | undefined, force?: boolean | undefined) => {
    moods: MoodReadResponse[] | undefined;
    newcoinTicker?: string | undefined;
    powered?: number | undefined;
    displayName?: string | undefined;
    newcoinAccTx?: string | undefined;
    latitude?: number | undefined;
    tumblr?: string | undefined;
    description?: string | undefined;
    newcoinPoolId?: string | undefined;
    aspectRatio?: number | undefined;
    instagram?: string | undefined;
    soundcloud?: string | undefined;
    newcoinActivePublicKey?: string | undefined;
    newcoinPublicKey?: string | undefined;
    powering?: number | undefined;
    twitter?: string | undefined;
    newcoinOwnerPublicKey?: string | undefined;
    tiktok?: string | undefined;
    id?: string | undefined;
    newcoinPoolStake?: number | undefined;
    contentType?: string | undefined;
    longitude?: number | undefined;
    newcoinPublisherPublicKey?: string | undefined;
    website?: string | undefined;
    created?: string | undefined;
    fullName?: string | undefined;
    newcoinPoolTx?: string | undefined;
    license?: string | undefined;
    contentUrl?: string | undefined;
    blurHash?: string | undefined;
    consentEmail?: string | undefined;
    updated?: string | undefined;
    username?: string | undefined;
};
export declare const useCachedPost: ({ id }: {
    id?: string | undefined;
}, force?: boolean | undefined) => import("@newlife/newlife-creator-client-api").PostReadResponse;
export declare const useCachedMood: ({ id }: {
    id?: string | undefined;
}, force?: boolean | undefined) => MoodReadResponse & {
    promise?: Promise<any> | null | undefined;
};
export declare const useCachedMoodPosts: ({ id }: {
    id?: string | undefined;
}, force?: boolean | undefined) => MoodReadResponse & {
    promise?: Promise<any> | null | undefined;
};
export declare const useCachedMoods: (moods?: {
    id?: string | undefined;
}[] | undefined, force?: boolean | undefined) => MoodReadResponse[];
export declare const useCachedPowerups: (user?: {
    id?: string | undefined;
} | undefined, force?: boolean | undefined) => "" | PowerupsCacheItem;
export declare const useCachedNewconAccountHistory: (user: {
    username?: string;
}, force?: boolean | undefined) => HyperionAccountHistory;
export declare const useCachedPool: (pool?: {
    owner?: string | undefined;
    code?: string | undefined;
} | undefined, force?: boolean | undefined) => import("@newcoin-foundation/newcoin-sdk").NCPoolInfo | {
    owner: string;
    code: string;
    total: {
        quantity: number;
    };
};
export declare const useCachedPoolByCode: (pool: {
    code?: string;
}, force?: boolean | undefined) => "" | import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo | undefined;
export declare const useCachedDaoProposals: (params?: {
    daoOwner?: string | undefined;
} | undefined) => {
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
export declare const useCachedDaoProposal: ({ daoOwner, proposalId }: {
    daoOwner?: string | undefined;
    proposalId?: string | undefined;
}) => any;
