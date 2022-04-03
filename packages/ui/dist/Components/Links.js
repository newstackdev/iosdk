"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.BlockExplorerLink = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var makeUrl = {
    blocks: function (id) {
        return !id
            ? ""
            : "https://local.bloks.io/transaction/".concat(id, "?") +
                "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
                "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org";
    },
    newcoin: function (id) { return "https://explorer.newcoin.org/transaction/".concat(id); }
};
var BlockExplorerLink = function (_a) {
    var id = _a.id, explorer = _a.explorer;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { maxWidth: "10ch", textOverflow: "ellipsis" } }, { children: id ? (0, jsx_runtime_1.jsx)("a", __assign({ href: makeUrl[explorer || "newcoin"](id) }, { children: id })) : "" })));
};
exports.BlockExplorerLink = BlockExplorerLink;
