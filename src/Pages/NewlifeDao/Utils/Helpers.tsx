import { ProposalOnChain, ProposalOnUI } from "./Models";

let randomStatus = () => {
	const statuses = [ "approved", "declined", "expired", "live" ];
	const randomIndex = Math.floor( Math.random() * statuses.length );
	return statuses[ randomIndex ];
}
let randomNumber = () => {
	return Math.floor(Math.random()*100);
}
let mockUIProposal: ProposalOnUI = {
	"id":0,
	"url": "###",
	"title": "Coworking Spaces",
	"summary":"This is a proposal to make newlife great",
	"status": "",
	"vote_start": "Tue, 11 Feb 2022",
	"vote_end": "Tue, 11 Feb 2022",
	"vote_threshold": 5,
	"vote_yes": {
		"quantity": "",
	},
	"vote_no": {
		"quantity": "",
	},
	"time_left": "5 hours",
	"proposer": {
		"username": "newdomain.io",
		"full_name": "Kadine James",
		"power": randomNumber()
	},
}

export const createSeedProposalsForUI = ( amt=10 ): Array<ProposalOnUI> => {
	const mockProposals : Array<ProposalOnUI> = [];
	for( let i=0; i<amt; i++) {
		mockUIProposal["id"]=i;
		mockProposals.push(mockUIProposal);
	}
	return mockProposals;
}
export const convertDaoProposalsForUI = ( proposalsFromBacked: Array<ProposalOnChain> ): Array<ProposalOnUI> => {
	let convertedProposals : Array<ProposalOnUI> = [];
	proposalsFromBacked.map( (proposal) => {
		let convertedProposal = mockUIProposal;
		// .toDateString()); toLocaleTimeString();
		proposal.id && (convertedProposal["id"]=proposal.id);
		proposal.url && (convertedProposal["url"]=proposal.url);
		proposal.title && (convertedProposal["title"]=proposal.title);
		proposal.summary && (convertedProposal["summary"]=proposal.summary);
		convertedProposal["status"] = proposal.status || randomStatus()
		proposal.vote_start && (convertedProposal["vote_start_time"]=proposal.vote_start);
		proposal.vote_end && (convertedProposal["vote_start_time"]=proposal.vote_end);
		convertedProposal["vote_yes"].quantity = proposal.vote_yes?.quantity || randomNumber();
		convertedProposal["vote_no"].quantity = proposal.vote_no?.quantity || randomNumber();
		// convertedProposal["threshold"]="20"
		// convertedProposal["time_left"]="5 days 3 hours 20 mins"
		// convertedProposal["proposer"]=proposal.proposer;
		convertedProposals.push(convertedProposal);
	});
	return convertedProposals;
}