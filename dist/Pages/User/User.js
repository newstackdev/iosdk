import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ActivityStream } from "../../Components/ActivityStream";
import { Spin } from "../../Components/Spin";
import { Tabs } from "antd";
import { UserNewcoinInfo, UserNewcoinPoolsParticipation, UserWidgetHeading } from "../../Components/UserWidget";
import { json } from "overmind";
import { useActions, useAppState } from "../../overmind";
import { useCachedPool, useCachedPowerups, useCachedUser } from "../../hooks/useCached";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetTitle } from "../../hooks/useSetTitle";
import Creators, { CreatorsList } from "../../Components/Creators";
import Deferred from "../../Components/Deferred";
import TopFolders from "../../Components/TopFolders";
export const User = () => {
    const [activeKey, setActiveKey] = useState("Folders");
    let { username: paramsUsername } = useParams();
    const state = useAppState();
    const actions = useActions();
    let username = paramsUsername || state.api.auth.user?.username || "";
    useEffect(() => {
        actions.api.user.getMoods({ id: state.api.auth.user?.id || "" });
        setActiveKey("Folders");
    }, [username]);
    // const username = (id.length < 15) ? id : undefined;
    const user = useCachedUser({ username }, true);
    useSetTitle(user?.username);
    // const moodList = user.moods || [];
    // const cachedMoods = state.api.cache.moods[user?.id || ""];
    const moodList = json(user.moods || []).sort((m1, m2) => (m1.stakeToAccess || 0) - (m2.stakeToAccess || 0));
    const powerups = useCachedPowerups(user, true);
    const powering = powerups?.out?.value?.length || "";
    const powered = powerups?.in?.value?.length || "";
    const poolInfo = useCachedPool({ owner: user.username });
    const symbol = poolInfo.code;
    const quantity = poolInfo.total.quantity;
    const isDAOMember = ((state.newcoin.pools || {})[symbol] || 0) / 1000;
    console.log(state.indicators.specific["api.user.read"]);
    if (!user.id || !user.username)
        return (_jsx(Deferred, { deferTime: 200, visible: state.indicators.specific["api.user.read"], children: state.indicators.specific["api.user.read"] ? (_jsx(Spin, {})) : (_jsx(Deferred, { deferTime: 200, visible: false, children: _jsxs("div", { children: ["User not found. The user may exist in the newcoin network,", _jsx("br", {}), "check\u00A0", _jsx("a", { href: `https://explorer-dev.newcoin.org/account/${user.username}`, children: "the newcoin block explorer." })] }) })) }));
    switch (activeKey) {
        case "Folders":
            return (_jsxs(_Fragment, { children: [_jsx(UserWidgetHeading, { user: user, setActiveKey: setActiveKey, activeKey: activeKey }), _jsx(TopFolders, { userMoods: moodList, maxPostsToShow: 5, title: "" })] }));
        case "Powered":
            return (_jsxs(_Fragment, { children: [_jsx(UserWidgetHeading, { user: user, setActiveKey: setActiveKey, activeKey: activeKey }), _jsx(Creators, { users: powerups?.in?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)).slice(0, 20) || [], title: "" })] }));
        case "Powering":
            return (_jsxs(_Fragment, { children: [_jsx(UserWidgetHeading, { user: user, setActiveKey: setActiveKey, activeKey: activeKey }), _jsx(CreatorsList, { users: powerups?.out?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)).slice(0, 20) || [], title: "", to: "top/creators" })] }));
        default:
            return _jsx(UserWidgetHeading, { user: user, setActiveKey: setActiveKey, activeKey: activeKey });
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Tabs.TabPane, { tab: "Newcoin", children: ["User on newcoin explorer:\u00A0", _jsx("a", { href: `https://explorer-dev.newcoin.org/account/${user.username}`, target: "_blank", rel: "noreferrer", children: "click here" }), _jsx("br", {}), "Pool symbol: ", symbol, _jsx("br", {}), "Market CAP: ", quantity, _jsx("br", {}), "My DAO Membership value: ", isDAOMember || "", " ", isDAOMember ? symbol : "Not a member", _jsx("br", {})] }, "4"), username === state.api.auth.user?.username ? (_jsxs(_Fragment, { children: [_jsx(Tabs.TabPane, { tab: "Activity Stream", children: _jsx(ActivityStream, {}) }, "5"), _jsx(Tabs.TabPane, { tab: "Newcoin account", children: _jsx(UserNewcoinInfo, { user: user }) }, "6"), _jsx(Tabs.TabPane, { tab: "DAO memberships", children: _jsx(UserNewcoinPoolsParticipation, { user: user }) }, "8")] })) : (_jsx(_Fragment, {}))] }));
};
//# sourceMappingURL=User.js.map