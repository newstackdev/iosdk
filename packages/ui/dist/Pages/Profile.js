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
exports.Profile = exports.ProfileDetails = exports.NewcoinLink = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var react_1 = require("react");
// import { ActivityStream } from "../Components/ActivityStream";
var ContentLayout_1 = require("../Components/ContentLayout");
var UserWidget_1 = require("../Components/UserWidget");
var BlocksioLink = function (tx) {
    var link = !tx
        ? ""
        : "https://local.bloks.io/transaction/".concat(tx, "?") +
            "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
            "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org";
    return ((0, jsx_runtime_1.jsx)("a", __assign({ href: link, target: "_new" }, { children: tx })));
};
var NewcoinLink = function (_a) {
    var tx = _a.tx, children = _a.children;
    return ((0, jsx_runtime_1.jsx)("a", __assign({ href: "http://explorer.newcoin.org/transaction/" + tx, target: "_new" }, { children: children })));
};
exports.NewcoinLink = NewcoinLink;
var ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
};
var ProfileDetails = function () {
    var state = (0, state_1.useAppState)();
    var _a = (0, react_1.useState)("0"), activeKey = _a[0], setActiveKey = _a[1];
    var user = state.api.auth.user || {};
    if (!user)
        return (0, jsx_runtime_1.jsx)("div", { children: "\"Must be logged in\"" });
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "app-main-full-width" }, { children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), (0, jsx_runtime_1.jsx)(UserWidget_1.UserSocialInfoRow, { user: user }), (0, jsx_runtime_1.jsxs)(antd_1.Tabs, __assign({ className: "app-main-full-width-only" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Activity Stream" }, { children: (0, jsx_runtime_1.jsx)(ActivityStream, {}) }), "0"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Newcoin account" }, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinInfo, { user: user }) }), "1"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "DAO memberships" }, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinPoolsParticipation, { user: user }) }), "2")] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), false && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "username" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.username }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "id" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.id }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "subscription status" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12, style: ellipsisStyle }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ title: user.subscriptionStatus }, { children: user.subscriptionStatus })) }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "status" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.status }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "newcoin acc" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.newcoinAccTx }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "newcoin pool id" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.newcoinPoolId }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "newcoin pool tx" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.newcoinPoolTx }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "firstName" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.firstName }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "lastName" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.lastName }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "phone" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.phone }))] })] }))] })) }));
};
exports.ProfileDetails = ProfileDetails;
var ActivityStream = function () {
    var state = (0, state_1.useAppState)();
    var moods = state.lists.top.moods.items;
    var postsList = moods.map(function (m) { return m.posts; })[0];
    return ((0, jsx_runtime_1.jsx)("div", { className: "notifications-wrapper scrollable-content" }));
};
var Profile = function () {
    var state = (0, state_1.useAppState)();
    var _a = (0, react_1.useState)("0"), activeKey = _a[0], setActiveKey = _a[1];
    var user = state.api.auth.user || {};
    if (!user || !user.id)
        return (0, jsx_runtime_1.jsx)("div", { children: "Must be logged in" });
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "app-main-full-width" }, { children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), (0, jsx_runtime_1.jsx)(UserWidget_1.UserSocialInfoRow, { user: user }), (0, jsx_runtime_1.jsxs)(antd_1.Tabs, __assign({ className: "app-main-full-width-only" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Activity Stream" }, { children: (0, jsx_runtime_1.jsx)(ActivityStream, {}) }), "0"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Newcoin account" }, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinInfo, { user: user }) }), "1"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "DAO memberships" }, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinPoolsParticipation, { user: user }) }), "2")] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), false && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "username" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.username }))] }), (0, jsx_runtime_1.jsx)(exports.ProfileDetails, {}), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "status" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.status }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "newcoin acc" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.newcoinAccTx }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "newcoin pool id" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.newcoinPoolId }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "newcoin pool tx" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.newcoinPoolTx }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "firstName" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.firstName }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "lastName" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.lastName }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: "phone" })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12 }, { children: user.phone }))] })] }))] })) }));
};
exports.Profile = Profile;
