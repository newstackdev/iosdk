import { NCO_BlockchainAPI } from "@newcoin-foundation/newcoin-sdk";
// import t from "@newcoin-foundation/newcoin-sdk";
// import { devnet_services, devnet_urls, NCO_BlockchainAPI, NCStakePool } from "../../../../newcoin-sdk/src";
// const conns = {
// 	bc_url: "http://nodeos-dev.newcoin.org",
// 	hyp_url: "https://hyperion-dev.newcoin.org",
// };
console.log(NCO_BlockchainAPI);
export const newcoin = new NCO_BlockchainAPI(NCO_BlockchainAPI.defaults.devnet_urls, NCO_BlockchainAPI.defaults.devnet_services);
const HyperionClient = (url) => {
    return (query) => {
        return fetch(url + query);
    };
};
export const hyperion = HyperionClient("https://hyperion.newcoin.org");
//# sourceMappingURL=effects.js.map