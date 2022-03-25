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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinDao = exports.JoinDaoWidget = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Modal_1 = __importDefault(require("antd/lib/modal/Modal"));
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var CrossCircle_1 = require("../Components/Icons/CrossCircle");
var UserWidget_1 = require("../Components/UserWidget");
var config_1 = require("../config");
var overmind_1 = require("../overmind");
var JoinDaoWidget = function (_a) {
    var _b;
    var embedded = _a.embedded, setNext = _a.setNext;
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var justStaked = __spreadArray([], state.api.cache.stakeHistory, true).reverse()
        .find(function (h) { return h.user.username === config_1.APP_DOMAIN; });
    var isStaking = state.indicators.specific["api.user.stake"];
    var APP_USER = { username: config_1.APP_DOMAIN };
    var _c = (0, react_1.useState)(true), visible = _c[0], setVisible = _c[1];
    // const [staking, setStaking] = useState(false);
    var currentStake = (state.newcoin.pools || {})["CGY"];
    var isMember = currentStake >= 1087;
    var done = function (_a) {
        var _b = _a === void 0 ? { stakeDelta: 0, stakeValue: 0, preStakeValue: 0 } : _a, stakeDelta = _b.stakeDelta, stakeValue = _b.stakeValue, preStakeValue = _b.preStakeValue;
        if (isMember &&
            ((!preStakeValue && stakeDelta && state.flows.user.create.justCreated) || (!state.flows.user.create.justCreated)) &&
            /^\/?$/.test(state.routing.location)
        // !justStaked &&
        // !isStaking
        ) {
            actions.routing.historyPush({ location: "/explore" });
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        }
    };
    done();
    if (!state.newcoin.pools || !((_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.id))
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (!state.api.auth.authorized)
        //  || state.indicators.isWorking
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    var minValue = isMember ? 100 : 1087;
    return ((0, jsx_runtime_1.jsxs)(Modal_1.default, __assign({ visible: visible, className: "nl-white-box-modal text-center", footer: false, closeIcon: isMember ? (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), onCancel: function () {
            if (!isMember)
                return;
            setVisible(false);
            actions.routing.historyPush({ location: "/explore" });
        } }, { children: [isMember ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-left text-bold" }, { children: "You are a member of the Newlife DAO" })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { textAlign: "left" } }, { children: ["You may increase your stake or visit the", " ", (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/user/".concat(config_1.APP_DOMAIN) }, { children: ["$", config_1.APP_DOMAIN] })), " ", "home page."] }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ style: { width: "100%", textAlign: "start" }, className: "header-2" }, { children: "Join the Newlife DAO" })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textAlign: "left", margin: "0" }, className: "paragraph-1r" }, { children: "Newlife is governed by the community. To join the app, you need to own at least 1000 $LIFE on your account." })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { padding: "20px 0" } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-1b", style: { margin: 0 } }, { children: "1087" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-1r", style: { margin: 0 } }, { children: "$NCO" }))] })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textAlign: "left", margin: "0" }, className: "paragraph-1r" }, { children: "By clicking \"Stake\" you will deposit 1087 $NCO into the DAO to receive 1000 $LIFE tokens. You can recover them anytime minus the stake 10% fee." })), (0, jsx_runtime_1.jsx)("div", { className: "text-center" })] })), (0, jsx_runtime_1.jsx)(UserWidget_1.UserStake, { user: APP_USER, value: minValue, 
                // mode={isStaking ? STAKE_STEPS.CONFIRM : STAKE_STEPS.DISABLED}
                minValue: minValue, onDone: done, 
                // onCancel={() => setStaking(false)}
                buttonText: !isMember ? "Join the DAO" : "Stake more" }), (0, jsx_runtime_1.jsxs)("p", __assign({ style: { margin: 0, textAlign: "left", width: "100%" }, className: "paragraph-1r" }, { children: ["Learn more about", " ", (0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-2u" }, { children: " app staking" }))] }))] })));
};
exports.JoinDaoWidget = JoinDaoWidget;
exports.JoinDao = exports.JoinDaoWidget;
//# sourceMappingURL=JoinDao.js.map