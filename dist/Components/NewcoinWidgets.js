import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { useCachedNewconAccountHistory } from "../hooks/useCached";
import { useAppState } from "../overmind";
export const StakeControl = ({ stakeInfo }) => {
    return _jsx(_Fragment, { children: _jsxs(Row, { justify: "space-between", className: "app-main-full-width", children: [_jsx(Col, { children: stakeInfo.owner }), _jsx(Col, { children: stakeInfo.total.quantity })] }) });
};
export const UserHistoryControl = ({ user }) => {
    const history = useCachedNewconAccountHistory(user);
    return _jsxs(_Fragment, { children: ["Hist ", history?.actions?.map(h => _jsx("pre", { style: { fontSize: 10 }, children: JSON.stringify(h, null, "\t") }))] });
};
export const NewcoinWidget = ({ user: { username } }) => {
    const state = useAppState();
    return _jsxs(_Fragment, { children: [_jsx(UserHistoryControl, { user: { username } }), "Account: ", JSON.stringify(state.newcoin.account), _jsx("h3", { children: "Pools" }), JSON.stringify(state.newcoin?.cache.pools)] });
};
//# sourceMappingURL=NewcoinWidgets.js.map