import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export const blockExplorerUrl = {
    blocks: (id) => !id
        ? ""
        : `https://local.bloks.io/transaction/${id}?` +
            "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
            "hyperionUrl=http%3A%2F%2Fhyperion-dev.newcoin.org",
    newcoin: (id) => `https://newscan.live/transaction/${id}`,
    //  `https://explorer-dev.newcoin.org/transaction/${id}`,
};
export const BlockExplorerLink = ({ id, explorer }) => id ? (_jsx("a", { href: blockExplorerUrl[explorer || "newcoin"](id), target: "_blank", rel: "noreferrer", children: id })) : (_jsx(_Fragment, {}));
//# sourceMappingURL=Links.js.map