"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockExplorerLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const makeUrl = {
    blocks: (id) => !id ? "" :
        `https://local.bloks.io/transaction/${id}?` +
            "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
            "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org",
    newcoin: (id) => `https://explorer.newcoin.org/transaction/${id}`
};
const BlockExplorerLink = ({ id, explorer }) => (0, jsx_runtime_1.jsx)("div", { style: { maxWidth: "10ch", textOverflow: "ellipsis" }, children: id ? (0, jsx_runtime_1.jsx)("a", { href: makeUrl[explorer || "newcoin"](id), children: id }) : "" });
exports.BlockExplorerLink = BlockExplorerLink;
//# sourceMappingURL=Links.js.map