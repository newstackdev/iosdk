"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.ProfileDetails = exports.NewcoinLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
// import { ActivityStream } from "../Components/ActivityStream";
const ContentLayout_1 = require("../Components/ContentLayout");
const UserWidget_1 = require("../Components/UserWidget");
const overmind_1 = require("../overmind");
const BlocksioLink = (tx) => {
    const link = !tx
        ? ""
        : `https://local.bloks.io/transaction/${tx}?` +
            "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
            "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org";
    return ((0, jsx_runtime_1.jsx)("a", { href: link, target: "_new", children: tx }));
};
const NewcoinLink = ({ tx, children }) => {
    return ((0, jsx_runtime_1.jsx)("a", { href: "http://explorer.newcoin.org/transaction/" + tx, target: "_new", children: children }));
};
exports.NewcoinLink = NewcoinLink;
const ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
};
const ProfileDetails = () => {
    const state = (0, overmind_1.useAppState)();
    const [activeKey, setActiveKey] = (0, react_1.useState)("0");
    const user = state.api.auth.user || {};
    if (!user)
        return (0, jsx_runtime_1.jsx)("div", { children: "\"Must be logged in\"" });
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { children: (0, jsx_runtime_1.jsxs)("div", { className: "app-main-full-width", children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), (0, jsx_runtime_1.jsx)(UserWidget_1.UserSocialInfoRow, { user: user }), (0, jsx_runtime_1.jsxs)(antd_1.Tabs, { className: "app-main-full-width-only", children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Activity Stream", children: (0, jsx_runtime_1.jsx)(ActivityStream, {}) }, "0"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Newcoin account", children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinInfo, { user: user }) }, "1"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "DAO memberships", children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinPoolsParticipation, { user: user }) }, "2")] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), false && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "username" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.username })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "id" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.id })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "subscription status" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, style: ellipsisStyle, children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: user.subscriptionStatus, children: user.subscriptionStatus }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "status" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.status })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "newcoin acc" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.newcoinAccTx })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "newcoin pool id" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.newcoinPoolId })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "newcoin pool tx" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.newcoinPoolTx })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "firstName" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.firstName })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "lastName" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.lastName })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "phone" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.phone })] })] }))] }) }));
};
exports.ProfileDetails = ProfileDetails;
const ActivityStream = () => {
    const state = (0, overmind_1.useAppState)();
    const moods = state.lists.top.moods.items;
    const postsList = moods.map((m) => m.posts)[0];
    return ((0, jsx_runtime_1.jsx)("div", { className: "notifications-wrapper " }));
};
const Profile = () => {
    const state = (0, overmind_1.useAppState)();
    const [activeKey, setActiveKey] = (0, react_1.useState)("0");
    const user = state.api.auth.user || {};
    if (!user || !user.id)
        return (0, jsx_runtime_1.jsx)("div", { children: "Must be logged in" });
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { children: (0, jsx_runtime_1.jsxs)("div", { className: "app-main-full-width", children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), (0, jsx_runtime_1.jsx)(UserWidget_1.UserSocialInfoRow, { user: user }), (0, jsx_runtime_1.jsxs)(antd_1.Tabs, { className: "app-main-full-width-only", children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Activity Stream", children: (0, jsx_runtime_1.jsx)(ActivityStream, {}) }, "0"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Newcoin account", children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinInfo, { user: user }) }, "1"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "DAO memberships", children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinPoolsParticipation, { user: user }) }, "2")] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), false && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "username" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.username })] }), (0, jsx_runtime_1.jsx)(exports.ProfileDetails, {}), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "status" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.status })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "newcoin acc" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.newcoinAccTx })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "newcoin pool id" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.newcoinPoolId })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "newcoin pool tx" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.newcoinPoolTx })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "firstName" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.firstName })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "lastName" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.lastName })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: "phone" }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 12, children: user.phone })] })] }))] }) }));
};
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map