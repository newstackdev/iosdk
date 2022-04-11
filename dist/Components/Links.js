"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockExplorerLink = exports.blockExplorerUrl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
exports.blockExplorerUrl = {
    blocks: (id) => !id ? "" :
        `https://local.bloks.io/transaction/${id}?` +
            "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
            "hyperionUrl=http%3A%2F%2Fhyperion-dev.newcoin.org",
    newcoin: (id) => `https://explorer-dev.newcoin.org/transaction/${id}`
};
const BlockExplorerLink = ({ id, explorer }) => id ? (0, jsx_runtime_1.jsx)("a", { href: exports.blockExplorerUrl[explorer || "newcoin"](id), target: "_blank", children: id }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
exports.BlockExplorerLink = BlockExplorerLink;
//# sourceMappingURL=Links.js.map