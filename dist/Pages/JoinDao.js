"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinDao = exports.JoinDaoWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Modal_1 = __importDefault(require("antd/lib/modal/Modal"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const CrossCircle_1 = require("../Components/Icons/CrossCircle");
const UserWidget_1 = require("../Components/UserWidget");
const config_1 = require("../config");
const overmind_1 = require("../overmind");
const JoinDaoWidget = ({ embedded, setNext, }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const justStaked = [...state.api.cache.stakeHistory]
        .reverse()
        .find((h) => h.user.username === config_1.APP_DOMAIN);
    const isStaking = state.indicators.specific["api.user.stake"];
    const APP_USER = { username: config_1.APP_DOMAIN };
    const [visible, setVisible] = (0, react_1.useState)(true);
    // const [staking, setStaking] = useState(false);
    const currentStake = (state.newcoin.pools || {})["CGY"];
    const isMember = currentStake >= 1087;
    const done = ({ stakeDelta, stakeValue, preStakeValue, } = {
        stakeDelta: 0,
        stakeValue: 0,
        preStakeValue: 0,
    }) => {
        if (isMember &&
            ((!preStakeValue &&
                stakeDelta &&
                state.flows.user.create.justCreated) ||
                !state.flows.user.create.justCreated) &&
            /^\/?$/.test(state.routing.location)
        // !justStaked &&
        // !isStaking
        ) {
            actions.routing.historyPush({ location: "/explore" });
            return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
        }
    };
    done();
    if (!state.newcoin.pools || !state.api.auth.user?.id)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (!state.api.auth.authorized)
        //  || state.indicators.isWorking
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    const minValue = isMember ? 100 : 1087;
    return ((0, jsx_runtime_1.jsxs)(Modal_1.default, { visible: visible, className: "nl-white-box-modal text-center", footer: false, closeIcon: isMember ? (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), onCancel: () => {
            if (!isMember)
                return;
            setVisible(false);
            actions.routing.historyPush({ location: "/explore" });
        }, children: [isMember ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-left text-bold", children: "You are a member of the Newlife DAO" }), (0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "left" }, children: ["You may increase your stake or visit the", " ", (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/user/${config_1.APP_DOMAIN}`, children: ["$", config_1.APP_DOMAIN] }), " ", "home page."] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { style: { width: "100%", textAlign: "start" }, className: "header-2", children: "Join the Newlife DAO" }), (0, jsx_runtime_1.jsx)("p", { style: { textAlign: "left", margin: "0" }, className: "paragraph-1r", children: "Newlife is governed by the community. To join the app, you need to own at least 1000 $LIFE on your account." }), (0, jsx_runtime_1.jsxs)("div", { style: { padding: "20px 0" }, children: [(0, jsx_runtime_1.jsx)("p", { className: "header-1b", style: { margin: 0 }, children: "1087" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-1r", style: { margin: 0 }, children: "$GNCO" })] }), (0, jsx_runtime_1.jsx)("p", { style: { textAlign: "left", margin: "0" }, className: "paragraph-1r", children: "By clicking \"Stake\" you will deposit 1087 $GNCO into the DAO to receive 1000 $LIFE tokens. You can recover them anytime minus the stake 10% fee." }), (0, jsx_runtime_1.jsx)("div", { className: "text-center" })] })), (0, jsx_runtime_1.jsx)(UserWidget_1.UserStake, { user: APP_USER, value: minValue, 
                // mode={isStaking ? STAKE_STEPS.CONFIRM : STAKE_STEPS.DISABLED}
                minValue: minValue, onDone: done, 
                // onCancel={() => setStaking(false)}
                buttonText: !isMember ? "Join the DAO" : "Stake more" }), (0, jsx_runtime_1.jsxs)("p", { style: { margin: 0, textAlign: "left", width: "100%" }, className: "paragraph-1r", children: ["Learn more about", " ", (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2u", children: " app staking" })] })] }));
};
exports.JoinDaoWidget = JoinDaoWidget;
exports.JoinDao = exports.JoinDaoWidget;
//# sourceMappingURL=JoinDao.js.map