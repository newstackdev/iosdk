import { BcDaoProposalVoteResponse, BcListDaoProposalsResponse, BcListDaoWhitelistResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { HyperionAccountHistory } from "./types";
import { NCPoolsInfo } from "@newfound8ion/newcoin-sdk";
export interface PoolInfo {
    rows: Row[];
    more: boolean;
    next_key: string;
}
export interface Row {
    id: number;
    code: string;
    owner: string;
    description: string;
    total: Total;
    creation_date: Date;
    last_update_date: Date;
}
export interface Total {
    quantity: string;
    contract: string;
}
export declare type DaoState = {
    proposals: BcListDaoProposalsResponse;
    whitelistProposals: BcListDaoProposalsResponse;
    whitelist: BcListDaoWhitelistResponse;
};
declare const _default: {
    account: any;
    pools: any;
    mainPool: any;
    daos: Record<string, DaoState>;
    cache: {
        accountHistory: Record<string, HyperionAccountHistory>;
        pools: {
            byCode: Record<string, NCPoolsInfo>;
            byOwner: Record<string, NCPoolsInfo>;
        };
        votes: Record<string, BcDaoProposalVoteResponse>;
    };
};
export default _default;
