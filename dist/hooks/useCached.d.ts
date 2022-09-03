import { HyperionAccountHistory } from "../overmind/newcoin/types";
import { MoodReadResponse, UserInvitationPagedListReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { PowerupsCacheItem } from "../overmind/api/state";
import { useCachedMood, useCachedMoodPosts, useCachedPost, useCachedUser } from "./useCached1";
export { useCachedMood, useCachedMoodPosts, useCachedPost, useCachedUser };
export declare const useCachedMoods: (moods?: {
    id?: string;
}[], force?: boolean) => never[] | Record<string, MoodReadResponse & {
    promise?: Promise<any> | null | undefined;
}>;
export declare const useCachedPowerups: (user?: {
    id?: string;
}, force?: boolean) => "" | PowerupsCacheItem;
export declare const useCachedNewconAccountHistory: (user: {
    username?: string;
}, force?: boolean) => HyperionAccountHistory;
export declare const useCachedPool: (pool?: {
    owner?: string;
    code?: string;
}, force?: boolean) => import("@newfound8ion/newcoin-sdk/dist/types").NCPoolInfo | {
    owner: string;
    code: string;
    total: {
        quantity: number;
    };
};
export declare const useCachedPoolByCode: (pool: {
    code?: string;
}, force?: boolean) => "" | import("@newfound8ion/newcoin-sdk").NCPoolsInfo | undefined;
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
export declare const useCachedInvitees: () => UserInvitationPagedListReadPublicResponse;
