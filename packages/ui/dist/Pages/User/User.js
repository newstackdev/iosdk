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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.User = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var hooks_1 = require("@newcoin-foundation/hooks");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var react_1 = require("react");
var react_router_1 = require("react-router");
var ActivityStream_1 = require("../../Components/ActivityStream");
var ContentLayout_1 = require("../../Components/ContentLayout");
var Creators_1 = __importDefault(require("../../Components/Creators"));
var Deferred_1 = __importDefault(require("../../Components/Deferred"));
var Spin_1 = require("../../Components/Spin");
var TopFolders_1 = __importDefault(require("../../Components/TopFolders"));
var UserWidget_1 = require("../../Components/UserWidget");
var User = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var _l = (0, react_1.useState)("0"), activeKey = _l[0], setActiveKey = _l[1];
    var paramsUsername = (0, react_router_1.useParams)().username;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var username = paramsUsername || ((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.username);
    // const username = (id.length < 15) ? id : undefined;
    var user = (0, hooks_1.useCachedUser)({ username: username }, true);
    (0, hooks_1.useSetTitle)(user === null || user === void 0 ? void 0 : user.username);
    var moodList = user.moods || [];
    var powerups = (0, hooks_1.useCachedPowerups)(user);
    var powering = ((_c = (_b = powerups === null || powerups === void 0 ? void 0 : powerups.out) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.length) || "";
    var powered = ((_e = (_d = powerups === null || powerups === void 0 ? void 0 : powerups["in"]) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.length) || "";
    var poolInfo = (0, hooks_1.useCachedPool)({ owner: user.username });
    var symbol = poolInfo.code;
    var quantity = poolInfo.total.quantity;
    var isDAOMember = state.newcoin.pools[symbol] / 1000;
    console.log(state.indicators.specific["api.user.read"]);
    if (!user.id || !user.username)
        return ((0, jsx_runtime_1.jsx)(Deferred_1["default"], __assign({ deferTime: 200, visible: state.indicators.specific["api.user.read"] }, { children: state.indicators.specific["api.user.read"] ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) : ((0, jsx_runtime_1.jsx)(Deferred_1["default"], __assign({ deferTime: 200, visible: false }, { children: (0, jsx_runtime_1.jsxs)("div", { children: ["User not found. The user may exist in the newcoin network,", (0, jsx_runtime_1.jsx)("br", {}), "check\u00A0", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://explorer.newcoin.org/account/".concat(user.username) }, { children: "the newcoin block explorer." }))] }) }))) })));
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), (0, jsx_runtime_1.jsxs)(antd_1.Tabs, __assign({ className: "app-main-full-width", activeKey: activeKey, onChange: function (key) { return setActiveKey(key); } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Tabs.TabPane, __assign({ tab: "Social" }, { children: [(0, jsx_runtime_1.jsx)(UserWidget_1.UserSocialInfo, { user: user }), (0, jsx_runtime_1.jsx)(TopFolders_1["default"], { userMoods: moodList, title: "" })] }), "0"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Powered by  ".concat(powered ? "(".concat(powered, ")") : "") }, { children: (0, jsx_runtime_1.jsx)(Creators_1["default"], { users: (_g = (_f = powerups === null || powerups === void 0 ? void 0 : powerups["in"]) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.sort(function (a, b) { return (b.powered || 0) - (a.powered || 0); }).slice(0, 20), title: "" }) }), "1"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Powering ".concat(powering ? "(".concat(powering, ")") : "") }, { children: (0, jsx_runtime_1.jsx)(Creators_1["default"], { users: (_j = (_h = powerups === null || powerups === void 0 ? void 0 : powerups.out) === null || _h === void 0 ? void 0 : _h.value) === null || _j === void 0 ? void 0 : _j.sort(function (a, b) { return (b.powered || 0) - (a.powered || 0); }).slice(0, 20), title: "" }) }), "2"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Private" }, { children: !isDAOMember ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["This exclusive content is only available for DAO members. Join", " ", user.username, "'s DAO now for instant access!"] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(UserWidget_1.UserStake, { user: user })] }))) : ("This is private content only for DAO members") }), "3"), (0, jsx_runtime_1.jsxs)(antd_1.Tabs.TabPane, __assign({ tab: "Newcoin" }, { children: ["User on newcoin explorer:\u00A0", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://explorer.newcoin.org/account/".concat(user.username), target: "_blank" }, { children: "click here" })), (0, jsx_runtime_1.jsx)("br", {}), "Pool symbol: ", symbol, (0, jsx_runtime_1.jsx)("br", {}), "Market CAP: ", quantity, (0, jsx_runtime_1.jsx)("br", {}), "My DAO Membership value: ", isDAOMember || "", " ", isDAOMember ? symbol : "Not a member", (0, jsx_runtime_1.jsx)("br", {})] }), "4"), username === ((_k = state.api.auth.user) === null || _k === void 0 ? void 0 : _k.username) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Activity Stream" }, { children: (0, jsx_runtime_1.jsx)(ActivityStream_1.ActivityStream, {}) }), "5"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "Newcoin account" }, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinInfo, { user: user }) }), "6"), (0, jsx_runtime_1.jsx)(antd_1.Tabs.TabPane, __assign({ tab: "DAO memberships" }, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserNewcoinPoolsParticipation, { user: user }) }), "7")] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] }))] }));
};
exports.User = User;
