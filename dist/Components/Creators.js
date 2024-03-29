import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Col, Row, Tooltip } from "antd";
import { Button } from "antd/lib/radio";
import { ContentImage } from "./Image";
import { CopyClipboardHashInput } from "./CopyClipboardHashInput";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { UserPowerup } from "./UserWidget";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedUser } from "../hooks/useCached";
import { useState } from "react";
import { useVerified } from "../hooks/useVerified";
import BadgeWidget from "./BadgeWidget";
import CountUp from "react-countup";
import PowerupDialog from "../Components/PowerupDialog";
import Title from "../Pages/Explore/Title";
// export const Creator: NLView
export const CreatorWidget = ({ creator, avatarClassName, buttonType, setAddedUsers, addedUsers, newPowerup = true, thumbnailOnly = false }) => {
    const state = useAppState();
    const [activeButton, setActiveButton] = useState(false);
    const user = useCachedUser(creator); //TODO: use this later when we have infinite load
    const { verifiedUsers } = useVerified([creator.username || ""]);
    const isUserVerified = verifiedUsers && creator.username && verifiedUsers.includes(creator.username);
    avatarClassName = avatarClassName || "avatar-image-top-creators";
    const buttonClassName = activeButton ? "primary-green-btn" : "secondary-button";
    const buttonName = activeButton ? "Added!" : "Add";
    const poolInfo = useCachedPool({ owner: creator?.username });
    const symbol = poolInfo.code;
    return (_jsxs(Row, { className: "bg-hover app-full-width", style: { alignItems: "center", justifyContent: "space-between" }, children: [_jsxs(Col, { className: "top-creators-first-col", xs: 13, children: [_jsx(Col, { children: _jsx(Tooltip, { title: creator.username, children: _jsx(Link, { to: `/user/${creator.username || creator.fullName}`, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...creator }), className: avatarClassName }) }) }) }), !thumbnailOnly && (_jsx(Row, { align: "bottom", style: { overflow: "hidden" }, children: _jsxs(Col, { className: "top-creators-username", style: { overflow: "hidden" }, children: [_jsx(Row, { justify: "center", children: _jsx(Link, { to: `/user/${creator.username || creator.fullName}`, style: { width: "100%" }, children: _jsxs("p", { className: "top-creators-username__paragraph typography-overflow", children: [creator.username || creator.fullName, isUserVerified ? (_jsx("span", { className: "u-margin-left-medium", children: _jsx(VerifiedIcon, {}) })) : (false)] }) }) }), state.routing.location === "/user/invite" && (_jsx(Row, { justify: "center", children: _jsx(BadgeWidget, { user: creator, className: "nl-badges-creators" }) }))] }) }))] }), !thumbnailOnly && (_jsxs(Col, { className: "top-creators-second-col", xl: 10, children: [creator.invitation && creator.invitation.hash && _jsx(CopyClipboardHashInput, { hash: creator.invitation.hash }), _jsx(Col, { className: "top-creators-number", children: _jsx("p", { className: "header-1r top-creators-powered", style: {
                                margin: "0",
                                display: "flex",
                                minWidth: "64px",
                            }, children: _jsx(CountUp, { delay: 1, end: creator.watts }) }) }), _jsx(Col, { style: { display: "flex", justifyContent: "flex-end", zIndex: 9999 }, children: buttonType === "addUser" ? (_jsx(Button, { onClick: () => {
                                if (addedUsers.includes(creator.username)) {
                                    const arr = [...addedUsers];
                                    const index = arr.indexOf(creator.username);
                                    index !== -1 && arr.splice(index, 1);
                                    setAddedUsers(arr);
                                }
                                else {
                                    setAddedUsers((p) => [...p, creator.username]);
                                }
                                setActiveButton(!activeButton);
                            }, className: `${buttonClassName} u-margin-bottom-medium`, children: _jsx("span", { className: "paragraph-2b", children: buttonName }) })) : newPowerup ? (_jsx("div", { onClick: (e) => e.preventDefault(), children: _jsx(PowerupDialog, { user: creator }) })) : (_jsx("div", { onClick: (e) => e.preventDefault(), children: _jsx(UserPowerup, { user: creator }) })) })] }))] }));
};
export const CreatorsList = ({ title, maxItems, users, buttonType, addedUsers, setAddedUsers, to, newPowerup, columns, thumbnailOnly, }) => {
    users = maxItems ? users?.slice(0, Math.min(users?.length, maxItems)) : users;
    const t = users.find((creator) => creator.invitation) ? "My invited members" : "Explore top creators";
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { style: { width: "100%" }, children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: t }) })), thumbnailOnly ? (_jsxs(_Fragment, { children: [maxItems ? _jsx(Title, { title: title, href: to }) : _jsx(_Fragment, {}), users?.map((creator) => (_jsx("div", { children: _jsx(CreatorWidget, { creator: creator, buttonType: buttonType, setAddedUsers: setAddedUsers, addedUsers: addedUsers, newPowerup: newPowerup, thumbnailOnly: thumbnailOnly }) })))] })) : (_jsxs("div", { style: { width: "100%" }, children: [maxItems ? _jsx(Title, { title: title, href: to }) : _jsx(_Fragment, {}), _jsx("div", { className: columns ? "top-creators-columns" : "", style: title ? { display: "flex", flexWrap: "wrap" } : {}, children: users?.map((creator) => (_jsx("div", { children: _jsx(CreatorWidget, { creator: creator, buttonType: buttonType, setAddedUsers: setAddedUsers, addedUsers: addedUsers, newPowerup: newPowerup, thumbnailOnly: thumbnailOnly }) }))) })] }))] }));
};
export const Creators = (props) => {
    return _jsx(CreatorsList, { ...props });
};
export const TopCreators = ({ maxItems, title, buttonType, setAddedUsers, addedUsers, to }) => {
    const state = useAppState();
    const actions = useActions();
    const creators = maxItems ? state.lists.top.users.items.slice(0, maxItems) : state.lists.top.users.items;
    return (_jsxs(_Fragment, { children: [_jsx(CreatorsList, { users: creators, maxItems: maxItems, title: title, buttonType: buttonType, setAddedUsers: setAddedUsers, addedUsers: addedUsers, to: to, columns: true }), creators && (creators?.length || 0) < (maxItems || 100) && _jsx(LoadMore, { loadMore: () => actions.lists.top.users({}) })] }));
};
export default Creators;
//# sourceMappingURL=Creators.js.map