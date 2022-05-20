import { NCPoolsInfo } from "@newcoin-foundation/newcoin-sdk";
import { BcDaoProposalVoteResponse, BcListDaoProposalsResponse } from "@newlife/newlife-creator-client-api";
import { HyperionAccountHistory } from "./types";
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
declare const _default: {
    account: any;
    pools: any;
    mainPool: any;
    daos: Record<string, {
        proposals: BcListDaoProposalsResponse;
    }>;
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
