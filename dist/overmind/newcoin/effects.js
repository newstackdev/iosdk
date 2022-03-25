"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hyperion = exports.newcoin = void 0;
var newcoin_sdk_1 = require("@newcoin-foundation/newcoin-sdk");
// import { NCO_BlockchainAPI } from "../../../../newcoin-sdk/dist";
// import t from "@newcoin-foundation/newcoin-sdk";
var conns = {
    bc_url: "http://testnet.newcoin.org",
    hyp_url: "http://hyperion.newcoin.org",
};
console.log(newcoin_sdk_1.NCO_BlockchainAPI);
exports.newcoin = new newcoin_sdk_1.NCO_BlockchainAPI(conns);
var HyperionClient = function (url) {
    return function (query) {
        return fetch(url + query);
    };
};
exports.hyperion = HyperionClient("https://hyperion.newcoin.org");
//# sourceMappingURL=effects.js.map