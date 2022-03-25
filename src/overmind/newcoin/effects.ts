import { NCO_BlockchainAPI } from "@newcoin-foundation/newcoin-sdk";
// import { NCO_BlockchainAPI } from "../../../../newcoin-sdk/dist";
// import t from "@newcoin-foundation/newcoin-sdk";

const conns = {
	bc_url: "http://testnet.newcoin.org",
	hyp_url: "http://hyperion.newcoin.org",
};

console.log(NCO_BlockchainAPI);

export const newcoin = new NCO_BlockchainAPI(conns);

const HyperionClient = (url: string) => {
	return (query: string) => {
		return fetch(url + query);
	};
};

export const hyperion = HyperionClient("https://hyperion.newcoin.org");
