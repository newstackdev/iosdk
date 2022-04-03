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
exports.NewcoinWidget = exports.UserHistoryControl = exports.StakeControl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var hooks_1 = require("@newcoin-foundation/hooks");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var StakeControl = function (_a) {
    var stakeInfo = _a.stakeInfo;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ justify: "space-between", className: "app-main-full-width" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { children: stakeInfo.owner }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: stakeInfo.total.quantity })] })) }));
};
exports.StakeControl = StakeControl;
var UserHistoryControl = function (_a) {
    var _b;
    var user = _a.user;
    var history = (0, hooks_1.useCachedNewconAccountHistory)(user);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Hist", " ", (_b = history === null || history === void 0 ? void 0 : history.actions) === null || _b === void 0 ? void 0 : _b.map(function (h) { return ((0, jsx_runtime_1.jsx)("pre", __assign({ style: { fontSize: 10 } }, { children: JSON.stringify(h, null, "\t") }))); })] }));
};
exports.UserHistoryControl = UserHistoryControl;
var NewcoinWidget = function (_a) {
    var _b;
    var username = _a.user.username;
    var state = (0, state_1.useAppState)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(exports.UserHistoryControl, { user: { username: username } }), "Account: ", JSON.stringify(state.newcoin.account), (0, jsx_runtime_1.jsx)("h3", { children: "Pools" }), JSON.stringify((_b = state.newcoin) === null || _b === void 0 ? void 0 : _b.cache.pools)] }));
};
exports.NewcoinWidget = NewcoinWidget;
