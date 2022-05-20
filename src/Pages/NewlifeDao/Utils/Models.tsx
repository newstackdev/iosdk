interface VoteQuantity {
	quantity?: number | string | undefined;
}

interface Proposer {
	username: string;
	full_name: string;
	power: number;
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
}

export interface ProposalOnUI {
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
	proposer: Proposer;
}




