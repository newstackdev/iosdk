import { Action } from "../../types";
import { BcCreateDaoProposal, BcCreateDaoRequest, BcCreateWhitelistDaoProposal } from "@newcoin-foundation/iosdk-newgraph-client-js";
export declare const progressTest: Action;
export declare const getAccountBalance: Action<{
    user?: {
        username?: string;
    };
} | undefined, any>;
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
export declare const daoGetWhitelistProposals: Action<{
    daoId?: string;
    daoOwner: string;
    proposal_id?: string;
}, any>;
export declare const daoCreate: Action<BcCreateDaoRequest, any>;
export declare const daoCreateProposal: Action<BcCreateDaoProposal, any>;
export declare const daoCreateWhitelistProposal: Action<BcCreateWhitelistDaoProposal, any>;
export declare const daoApproveProposal: Action<{
    dao_owner: string;
    proposal_id: string;
}, any>;
export declare const daoApproveWhitelistProposal: Action<{
    dao_owner: string;
    proposal_id: string;
}, any>;
export declare const daoVoteProposal: Action<{
    dao_owner: any;
    proposal_id: any;
    option: any;
    quantity: any;
    proposal_type: any;
}, any>;
export declare const voterListVotes: Action<{
    voter?: string;
} | undefined, any>;
export declare const daoGetWhitelist: Action<{
    daoOwner?: string;
} | undefined, any>;
export declare const daoExecuteWhitelistProposal: Action<{
    dao_id: string;
    proposal_id: number;
    proposal_author: string;
}, any>;
export declare const daoExecuteProposal: Action<{
    dao_owner: string;
    dao_id: string;
    proposal_id: number;
    proposal_author: string;
}, any>;
export declare const daoWithdrawVoteDeposit: Action<{
    vote_id: string;
}, any>;
