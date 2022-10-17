import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Col, Row } from "antd";
import { Button } from "antd/lib/radio";
import { ContentImage } from "./Image";
import { CopyClipboardHashInput } from "./CopyClipboardHashInput";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { UserPowerup, UserStake } from "./UserWidget";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedUser } from "../hooks/useCached";
import { useState } from "react";
import { useVerified } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";
// export const Creator: NLView
export const CreatorWidget = ({ creator, avatarClassName, buttonType, setAddedUsers, addedUsers, stakeMode = false }) => {
    const [activeButton, setActiveButton] = useState(false);
    const user = useCachedUser(creator);
    const { verifiedUsers } = useVerified([user.username || ""]);
    const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);
    avatarClassName = avatarClassName || "avatar-image-top-creators";
    const buttonClassName = activeButton ? "primary-green-btn" : "secondary-button";
    const buttonName = activeButton ? "Added!" : "Add";
    const poolInfo = useCachedPool({ owner: user?.username });
    const symbol = poolInfo.code;
    return (_jsxs(Row, { className: "bg-hover app-full-width", style: { alignItems: "center", justifyContent: "space-between" }, children: [_jsxs(Col, { className: "top-creators-first-col u-margin-left-medium", xs: 13, children: [_jsx(Col, { children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: avatarClassName }) }), _jsx(Row, { align: "bottom", style: { overflow: "hidden" }, children: _jsxs(Col, { className: "top-creators-username", style: { overflow: "hidden" }, children: [_jsx(Link, { to: `/user/${user.username || user.fullName}`, style: { width: "100%" }, children: _jsxs("p", { className: "top-creators-username__paragraph typography-overflow", children: [user.username || user.fullName, isUserVerified ? (_jsx("span", { className: "u-margin-left-medium", children: _jsx(VerifiedIcon, {}) })) : (false)] }) }), symbol && (_jsxs("p", { className: "paragraph-1r typography-overflow", children: [stakeMode ? "staking" : "powering", creator.powering, " $", symbol] }))] }) })] }), _jsxs(Col, { className: "top-creators-second-col", xl: 10, children: [creator.invitation && creator.invitation.hash && _jsx(CopyClipboardHashInput, { hash: creator.invitation.hash }), _jsx(Col, { className: "top-creators-number", children: _jsx("p", { className: "header-1r top-creators-powered", style: {
                                margin: "0",
                                display: "flex",
                                minWidth: "64px",
                            }, children: creator.powered }) }), _jsx(Col, { style: { display: "flex", justifyContent: "flex-end", zIndex: 9999 }, children: buttonType === "addUser" ? (_jsx(Button, { onClick: () => {
                                if (addedUsers.includes(user.username)) {
                                    const arr = [...addedUsers];
                                    const index = arr.indexOf(user.username);
                                    index !== -1 && arr.splice(index, 1);
                                    setAddedUsers(arr);
                                }
                                else {
                                    setAddedUsers((p) => [...p, user.username]);
                                }
                                setActiveButton(!activeButton);
                            }, className: `${buttonClassName} u-margin-bottom-medium`, children: _jsx("span", { className: "paragraph-2b", children: buttonName }) })) : stakeMode ? (_jsx("div", { onClick: (e) => e.preventDefault(), children: _jsx(UserStake, { user: creator }) })) : (_jsx("div", { onClick: (e) => e.preventDefault(), children: _jsx(UserPowerup, { user: creator }) })) })] })] }));
};
export const CreatorsList = ({ title, maxItems, users, buttonType, addedUsers, setAddedUsers, to }) => {
    users = maxItems ? users?.slice(0, Math.min(users?.length, maxItems)) : users;
    const t = users.find((creator) => creator.invitation) ? "My invited members" : "Explore top creators";
    // const creators =
    // 	!users ? state.lists.top.users.items : maxUsers;
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { style: { width: "100%" }, children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: t }) })), _jsxs("div", { style: { width: "100%" }, children: [maxItems ? _jsx(Title, { title: title, href: to }) : _jsx(_Fragment, {}), _jsx("div", { className: "top-creators-wrapper", style: title ? { display: "flex", flexWrap: "wrap" } : {}, children: users?.map((creator) => (_jsx("div", { children: _jsx(CreatorWidget, { creator: creator, buttonType: buttonType, setAddedUsers: setAddedUsers, addedUsers: addedUsers }) }))) })] })] }));
};
export const Creators = (props) => {
    return _jsx(CreatorsList, { ...props });
};
export const TopCreators = ({ maxItems, title, buttonType, setAddedUsers, addedUsers, to }) => {
    const state = useAppState();
    const actions = useActions();
    const creators = maxItems ? state.lists.top.users.items.slice(0, maxItems) : state.lists.top.users.items;
    return (_jsxs(_Fragment, { children: [_jsx(CreatorsList, { users: creators, maxItems: maxItems, title: title, buttonType: buttonType, setAddedUsers: setAddedUsers, addedUsers: addedUsers, to: to }), creators && (creators?.length || 0) < (maxItems || 100) && _jsx(LoadMore, { loadMore: () => actions.lists.top.users() })] }));
};
export default Creators;
//# sourceMappingURL=Creators.js.map