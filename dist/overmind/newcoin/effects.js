"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hyperion = exports.newcoin = void 0;
const newcoin_sdk_1 = require("@newcoin-foundation/newcoin-sdk");
// import { NCO_BlockchainAPI } from "../../../../newcoin-sdk/dist";
// import t from "@newcoin-foundation/newcoin-sdk";
const conns = {
    bc_url: "http://nodeos-dev.newcoin.org",
    hyp_url: "https://hyperion-dev.newcoin.org",
};
console.log(newcoin_sdk_1.NCO_BlockchainAPI);
exports.newcoin = new newcoin_sdk_1.NCO_BlockchainAPI(conns);
const HyperionClient = (url) => {
    return (query) => {
        return fetch(url + query);
    };
};
exports.hyperion = HyperionClient("https://hyperion.newcoin.org");
//# sourceMappingURL=effects.js.map