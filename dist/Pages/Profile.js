import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row, Tabs, Tooltip } from "antd";
import { useState } from "react";
import { ContentLayout } from "../Components/ContentLayout";
import { UserNewcoinInfo, UserNewcoinPoolsParticipation, UserSocialInfoRow, UserWidgetHeading } from "../Components/UserWidget";
import { useAppState } from "../overmind";
// const BlocksioLink = (tx: string | undefined) => {
// 	const link = !tx
// 		? ""
// 		: `https://local.bloks.io/transaction/${tx}?` +
// 		  "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
// 		  "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org";
// 	return (
// 		<a href={link} target="_new">
// 			{tx}
// 		</a>
// 	);
// };
// export const NewcoinLink: NLView<{ tx?: string }> = ({ tx, children }) => {
// 	return (
// 		<a href={"http://explorer-dev.newcoin.org/transaction/" + tx} target="_new">
// 			{children}
// 		</a>
// 	);
// };
const ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
};
export const ProfileDetails = () => {
    const state = useAppState();
    const [activeKey, setActiveKey] = useState("0");
    const user = state.api.auth.user || {};
    if (!user)
        return _jsx("div", { children: "\"Must be logged in\"" });
    return (_jsx(ContentLayout, { children: _jsxs("div", { className: "app-main-full-width", children: [_jsx(UserWidgetHeading, { user: user }), _jsx(UserSocialInfoRow, { user: user }), _jsxs(Tabs, { className: "app-main-full-width-only", children: [_jsx(Tabs.TabPane, { tab: "Activity Stream", children: _jsx(ActivityStream, {}) }, "0"), _jsx(Tabs.TabPane, { tab: "Newcoin account", children: _jsx(UserNewcoinInfo, { user: user }) }, "1"), _jsx(Tabs.TabPane, { tab: "DAO memberships", children: _jsx(UserNewcoinPoolsParticipation, { user: user }) }, "2")] }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), false && (_jsxs(_Fragment, { children: [_jsxs(Row, { children: [_jsx(Col, { span: 12, children: "username" }), _jsx(Col, { span: 12, children: user.username })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "id" }), _jsx(Col, { span: 12, children: user.id })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "subscription status" }), _jsx(Col, { span: 12, style: ellipsisStyle, children: _jsx(Tooltip, { title: user.subscriptionStatus, children: user.subscriptionStatus }) })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "status" }), _jsx(Col, { span: 12, children: user.status })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "newcoin acc" }), _jsx(Col, { span: 12, children: user.newcoinAccTx })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "newcoin pool id" }), _jsx(Col, { span: 12, children: user.newcoinPoolId })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "newcoin pool tx" }), _jsx(Col, { span: 12, children: user.newcoinPoolTx })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "firstName" }), _jsx(Col, { span: 12, children: user.firstName })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "lastName" }), _jsx(Col, { span: 12, children: user.lastName })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "phone" }), _jsx(Col, { span: 12, children: user.phone })] })] }))] }) }));
};
const ActivityStream = () => {
    const state = useAppState();
    const moods = state.lists.top.moods.items;
    const postsList = moods.map((m) => m.posts)[0];
    return (_jsx("div", { className: "notifications-wrapper " }));
};
export const Profile = () => {
    const state = useAppState();
    const [activeKey, setActiveKey] = useState("0");
    const user = state.api.auth.user || {};
    if (!user || !user.id)
        return _jsx("div", { children: "Must be logged in" });
    return (_jsx(ContentLayout, { children: _jsxs("div", { className: "app-main-full-width", children: [_jsx(UserWidgetHeading, { user: user }), _jsx(UserSocialInfoRow, { user: user }), _jsxs(Tabs, { className: "app-main-full-width-only", children: [_jsx(Tabs.TabPane, { tab: "Activity Stream", children: _jsx(ActivityStream, {}) }, "0"), _jsx(Tabs.TabPane, { tab: "Newcoin account", children: _jsx(UserNewcoinInfo, { user: user }) }, "1"), _jsx(Tabs.TabPane, { tab: "DAO memberships", children: _jsx(UserNewcoinPoolsParticipation, { user: user }) }, "2")] }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), false && (_jsxs(_Fragment, { children: [_jsxs(Row, { children: [_jsx(Col, { span: 12, children: "username" }), _jsx(Col, { span: 12, children: user.username })] }), _jsx(ProfileDetails, {}), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "status" }), _jsx(Col, { span: 12, children: user.status })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "newcoin acc" }), _jsx(Col, { span: 12, children: user.newcoinAccTx })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "newcoin pool id" }), _jsx(Col, { span: 12, children: user.newcoinPoolId })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "newcoin pool tx" }), _jsx(Col, { span: 12, children: user.newcoinPoolTx })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "firstName" }), _jsx(Col, { span: 12, children: user.firstName })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "lastName" }), _jsx(Col, { span: 12, children: user.lastName })] }), _jsxs(Row, { children: [_jsx(Col, { span: 12, children: "phone" }), _jsx(Col, { span: 12, children: user.phone })] })] }))] }) }));
};
//# sourceMappingURL=Profile.js.map