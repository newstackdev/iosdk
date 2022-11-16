import {
  BcDaoProposalVoteResponse,
  BcListDaoProposalsResponse,
  BcListDaoWhitelistResponse,
} from "@newstackdev/iosdk-newgraph-client-js";
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

export type DaoState = {
  proposals: BcListDaoProposalsResponse;
  whitelistProposals: BcListDaoProposalsResponse;
  whitelist: BcListDaoWhitelistResponse;
};

export default {
  account: {} as any,
  pools: {} as any,
  mainPool: {} as any,
  daos: {} as Record<string, DaoState>,
  cache: {
    accountHistory: {} as Record<string, HyperionAccountHistory>,
    pools: {
      byCode: {} as Record<string, NCPoolsInfo>,
      byOwner: {} as Record<string, NCPoolsInfo>,
    },
    votes: {} as Record<string, BcDaoProposalVoteResponse>,
  },
};
