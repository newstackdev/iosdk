"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewcoinWidget = exports.UserHistoryControl = exports.StakeControl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const useCached_1 = require("../hooks/useCached");
const overmind_1 = require("../overmind");
const StakeControl = ({ stakeInfo }) => {
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { justify: "space-between", className: "app-main-full-width", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { children: stakeInfo.owner }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: stakeInfo.total.quantity })] }) });
};
exports.StakeControl = StakeControl;
const UserHistoryControl = ({ user }) => {
    const history = (0, useCached_1.useCachedNewconAccountHistory)(user);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Hist ", history?.actions?.map(h => (0, jsx_runtime_1.jsx)("pre", { style: { fontSize: 10 }, children: JSON.stringify(h, null, "\t") }))] });
};
exports.UserHistoryControl = UserHistoryControl;
const NewcoinWidget = ({ user: { username } }) => {
    const state = (0, overmind_1.useAppState)();
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(exports.UserHistoryControl, { user: { username } }), "Account: ", JSON.stringify(state.newcoin.account), (0, jsx_runtime_1.jsx)("h3", { children: "Pools" }), JSON.stringify(state.newcoin?.cache.pools)] });
};
exports.NewcoinWidget = NewcoinWidget;
//# sourceMappingURL=NewcoinWidgets.js.map