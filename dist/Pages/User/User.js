"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const overmind_1 = require("overmind");
const react_1 = require("react");
const react_router_1 = require("react-router");
const ActivityStream_1 = require("../../Components/ActivityStream");
const Creators_1 = __importStar(require("../../Components/Creators"));
const Deferred_1 = __importDefault(require("../../Components/Deferred"));
const Spin_1 = require("../../Components/Spin");
const TopFolders_1 = __importDefault(require("../../Components/TopFolders"));
const UserWidget_1 = require("../../Components/UserWidget");
const useCached_1 = require("../../hooks/useCached");
const useSetTitle_1 = require("../../hooks/useSetTitle");
const overmind_2 = require("../../overmind");
const User = () => {
    const [activeKey, setActiveKey] = (0, react_1.useState)("0");
    let { username: paramsUsername } = (0, react_router_1.useParams)();
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    let username = paramsUsername || state.api.auth.user?.username;
    // const username = (id.length < 15) ? id : undefined;
    const user = (0, useCached_1.useCachedUser)({ username }, true);
    (0, useSetTitle_1.useSetTitle)(user?.username);
    // const moodList = user.moods || [];
    const moodList = (0, overmind_1.json)((user.moods || [])).sort((m1, m2) => (m1.stakeToAccess || 0) - (m2.stakeToAccess || 0));
    const powerups = (0, useCached_1.useCachedPowerups)(user, true);
    const powering = powerups?.out?.value?.length || "";
    const powered = powerups?.in?.value?.length || "";
    const poolInfo = (0, useCached_1.useCachedPool)({ owner: user.username });
    const symbol = poolInfo.code;
    const quantity = poolInfo.total.quantity;
    const isDAOMember = state.newcoin.pools[symbol] / 1000;
    console.log(state.indicators.specific["api.user.read"]);
    if (!user.id || !user.username)
        return ((0, jsx_runtime_1.jsx)(Deferred_1.default, { deferTime: 200, visible: state.indicators.specific["api.user.read"], children: state.indicators.specific["api.user.read"] ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) : ((0, jsx_runtime_1.jsx)(Deferred_1.default, { deferTime: 200, visible: false, children: (0, jsx_runtime_1.jsxs)("div", { children: ["User not found. The user may exist in the newcoin network,", (0, jsx_runtime_1.jsx)("br", {}), "check\u00A0", (0, jsx_runtime_1.jsx)("a", { href: `https://explorer-dev.newcoin.org/account/${user.username}`, children: "the newcoin block explorer." })] }) })) }));
    // if(true)
    // 	return <>boo</>
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), (0, jsx_runtime_1.jsxs)(antd_1.Tabs, { className: "app-main-full-width", activeKey: activeKey, onChange: (key) => setActiveKey(key), children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Folders", children: (0, jsx_runtime_1.jsx)(TopFolders_1.default, { userMoods: moodList, title: "" }) }, "0"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: `Powered by  ${powered ? `(${powered})` : ""}`, children: (0, jsx_runtime_1.jsx)(Creators_1.default, { users: powerups?.in?.value
                                ?.sort((a, b) => (b.powered || 0) - (a.powered || 0))
                                .slice(0, 20) || [], title: "" }) }, "1"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: `Powering ${powering ? `(${powering})` : ""}`, children: (0, jsx_runtime_1.jsx)(Creators_1.CreatorsList, { users: powerups?.out?.value
                                ?.sort((a, b) => (b.powered || 0) - (a.powered || 0))
                                .slice(0, 20) || [], title: "" }) }, "2"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Private", children: !isDAOMember ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: ["This exclusive content is only available for DAO members. Join ", user.username, "'s DAO now for instant access!"] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(UserWidget_1.UserStake, { user: user })] })) : ("This is private content only for DAO members") }, "3"), (0, jsx_runtime_1.jsxs)(antd_1.Tabs.TabPane, { tab: "Newcoin", children: ["User on newcoin explorer:\u00A0", (0, jsx_runtime_1.jsx)("a", { href: `https://explorer-dev.newcoin.org/account/${user.username}`, target: "_blank", children: "click here" }), (0, jsx_runtime_1.jsx)("br", {}), "Pool symbol: ", symbol, (0, jsx_runtime_1.jsx)("br", {}), "Market CAP: ", quantity, (0, jsx_runtime_1.jsx)("br", {}), "My DAO Membership value: ", isDAOMember || "", " ", isDAOMember ? symbol : "Not a member", (0, jsx_runtime_1.jsx)("br", {})] }, "4"), username === state.api.auth.user?.username ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Activity Stream", children: (0, jsx_runtime_1.jsx)(ActivityStream_1.ActivityStream, {}) }, "5"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "Newcoin account", children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinInfo, { user: user }) }, "6"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, { tab: "DAO memberships", children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinPoolsParticipation, { user: user }) }, "7")] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] })] }));
};
exports.User = User;
//# sourceMappingURL=User.js.map