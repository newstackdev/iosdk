interface VoteQuantity {
  quantity?: number | string | undefined;
  contract?: string;
}
export interface ProposalOnChain {
  id?: number;
  url?: string;
  title?: string;
  summary?: string;
  status?: string;
  vote_no?: VoteQuantity;
  vote_yes?: VoteQuantity;
  vote_start?: string;
  vote_end?: string;
  proposer?: string;
  more?: object;
  next_key?: string;
  list?: any;
}

export interface ProposalOnUI {
  list?: any;
  id: number;
  url: string;
  title: string;
  summary: string;
  status: string;
  vote_start: string;
  vote_end: string;
  vote_threshold: number;
  vote_yes: VoteQuantity;
  vote_no: VoteQuantity;
  time_left: string;
  proposer: string;
}

export interface WhitelistProposalOnChain {
  id: number;
  proposer: string;
  status: string;
  user: string;
  vote_no?: VoteQuantity;
  vote_yes?: VoteQuantity;
  vote_start?: string;
  vote_end?: string;
}

export interface WhitelistProposalOnUI {
  id: number;
  proposer: string;
  status: string;
  user: string;
  vote_no?: VoteQuantity;
  vote_yes?: VoteQuantity;
  vote_start?: string;
  vote_end?: string;
  list?: any;
}
