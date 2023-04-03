import { NCO_BlockchainAPI } from "@newfound8ion/newcoin-sdk";
// import t from "@newfound8ion/newcoin-sdk";
// import { devnet_services, devnet_urls, NCO_BlockchainAPI, NCStakePool } from "../../../../newcoin-sdk/src";

// const conns = {
// 	bc_url: "http://nodeos-dev.newcoin.org",
// 	hyp_url: "https://hyperion-dev.newcoin.org",
// };

console.log(NCO_BlockchainAPI);

export const newcoin = new NCO_BlockchainAPI({
  urls: NCO_BlockchainAPI.defaults.devnet_urls,
  services: NCO_BlockchainAPI.defaults.devnet_services,
  is_proxy: false,
  debug: false,
});
export const newcoinProxy = new NCO_BlockchainAPI({
  urls: NCO_BlockchainAPI.defaults.devnet_urls,
  services: NCO_BlockchainAPI.defaults.devnet_services,
  is_proxy: true,
  debug: true,
});
export const newcoinProxyProd = new NCO_BlockchainAPI({
  urls: NCO_BlockchainAPI.defaults.devnet_urls_prod,
  services: NCO_BlockchainAPI.defaults.devnet_services,
  is_proxy: true,
  debug: true,
});

const HyperionClient = (url: string) => {
  const get = (query: string) => {
    return fetch(url + query);
  };
  const post = (body: any) => {
    fetch(url, { method: "POST", body });
  };

  return {
    get,
    post,
  };
};

export const hyperion = HyperionClient("https://hyperion.newcoin.org");
