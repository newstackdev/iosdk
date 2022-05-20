import { BcCreateDaoProposal, BcCreateDaoRequest } from "@newlife/newlife-creator-client-api";
import { Action } from "../../types";
export declare const getAccountBalance: Action<{
    user: {
        username?: string;
    };
}, any>;
export declare const getPoolInfo: Action<{
    pool: {
        owner?: string;
        code?: string;
    };
}>;
export declare const getAccountHitory: Action<{
    user?: {
        username?: string;
    };
    force?: boolean;
}, any>;
export declare const daoGetProposals: Action<{
    daoId?: string;
    daoOwner: string;
    proposal_id?: string;
}, any>;
export declare const daoCreate: Action<BcCreateDaoRequest, any>;
export declare const daoCreateProposal: Action<BcCreateDaoProposal, any>;
export declare const daoApproveProposal: Action<{
    daoOwner: string;
    proposalId: string;
}, any>;
export declare const daoVoteProposal: Action<{
    dao_owner: any;
    proposal_id: any;
    option: any;
    quantity: any;
}, any>;
export declare const voterListVotes: Action<{
    voter?: string;
} | undefined, any>;
