import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { APP_DOMAIN } from "../config";
import { CrossCircle } from "../Components/Icons/CrossCircle";
import { Link } from "react-router-dom";
import { UserStake } from "../Components/UserWidget";
import { useActions, useAppState } from "../overmind";
import { useState } from "react";
import Modal from "antd/lib/modal/Modal";
export const JoinDaoWidget = ({ embedded, setNext }) => {
    const state = useAppState();
    const actions = useActions();
    const justStaked = [...state.api.cache.stakeHistory].reverse().find((h) => h.user.username === APP_DOMAIN);
    const isStaking = state.indicators.specific["api.user.stake"];
    const APP_USER = { username: APP_DOMAIN };
    const [visible, setVisible] = useState(true);
    // const [staking, setStaking] = useState(false);
    const currentStake = (state.newcoin.pools || {})["CGY"];
    const isMember = currentStake >= 1087;
    const done = ({ stakeDelta, stakeValue, preStakeValue } = {
        stakeDelta: 0,
        stakeValue: 0,
        preStakeValue: 0,
    }) => {
        if (isMember &&
            ((!preStakeValue && stakeDelta && state.flows.user.create.justCreated) || !state.flows.user.create.justCreated) &&
            /^\/?$/.test(state.routing.location)
        // !justStaked &&
        // !isStaking
        ) {
            actions.routing.historyPush({ location: "/explore" });
            return _jsx(_Fragment, {});
        }
    };
    done();
    if (!state.newcoin.pools || !state.api.auth.user?.id)
        return _jsx(_Fragment, {});
    if (!state.api.auth.authorized)
        //  || state.indicators.isWorking
        return _jsx(_Fragment, {});
    const minValue = isMember ? 100 : 1087;
    return (_jsxs(Modal, { visible: visible, className: "nl-white-box-modal text-center", footer: false, closeIcon: isMember ? _jsx(CrossCircle, {}) : _jsx(_Fragment, {}), onCancel: () => {
            if (!isMember)
                return;
            setVisible(false);
            actions.routing.historyPush({ location: "/explore" });
        }, children: [isMember ? (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-left text-bold", children: "You are a member of the Newlife DAO" }), _jsxs("div", { style: { textAlign: "left" }, children: ["You may increase your stake or visit the ", _jsxs(Link, { to: `/user/${APP_DOMAIN}`, children: ["$", APP_DOMAIN] }), " home page."] })] })) : (_jsxs(_Fragment, { children: [_jsx("h2", { style: { width: "100%", textAlign: "start" }, className: "header-2", children: "Join the Newlife DAO" }), _jsx("p", { style: { textAlign: "left", margin: "0" }, className: "paragraph-1r", children: "Newlife is governed by the community. To join the app, you need to own at least 1000 $LIFE on your account." }), _jsxs("div", { style: { padding: "20px 0" }, children: [_jsx("p", { className: "header-1b", style: { margin: 0 }, children: "1087" }), _jsx("p", { className: "paragraph-1r", style: { margin: 0 }, children: "$GNCO" })] }), _jsx("p", { style: { textAlign: "left", margin: "0" }, className: "paragraph-1r", children: "By clicking \"Stake\" you will deposit 1087 $GNCO into the DAO to receive 1000 $LIFE tokens. You can recover them anytime minus the stake 10% fee." }), _jsx("div", { className: "text-center" })] })), _jsx(UserStake, { user: APP_USER, value: minValue, 
                // mode={isStaking ? STAKE_STEPS.CONFIRM : STAKE_STEPS.DISABLED}
                minValue: minValue, onDone: done, 
                // onCancel={() => setStaking(false)}
                buttonText: !isMember ? "Join the DAO" : "Stake more" }), _jsxs("p", { style: { margin: 0, textAlign: "left", width: "100%" }, className: "paragraph-1r", children: ["Learn more about ", _jsx("span", { className: "paragraph-2u", children: " app staking" })] })] }));
};
export const JoinDao = JoinDaoWidget;
//# sourceMappingURL=JoinDao.js.map