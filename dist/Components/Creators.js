import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useCachedUser } from "../hooks/useCached";
import { useActions, useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import { ContentImage } from "./Image";
import { LoadMore } from "./LoadMore";
import { UserPowerup } from "./UserWidget";
// export const Creator: NLView
export const CreatorWidget = ({ creator, avatarClassName }) => {
    const user = useCachedUser(creator);
    avatarClassName = avatarClassName || "avatar-image-top-creators";
    return _jsxs(Row, { className: "bg-hover  app-full-width", style: { alignItems: "center" }, children: [_jsxs(Col, { className: "top-creators-first-col", children: [_jsx(Col, { children: _jsx(Link, { to: `/user/${user.username}`, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: avatarClassName }) }) }), _jsx(Col, { className: "top-creators-username", children: _jsx(Link, { to: `/user/${user.username}`, children: _jsx("p", { className: "header-1r font-variant-none", style: {
                                    margin: "0",
                                    textAlign: "center",
                                }, children: user.username }) }) })] }), _jsxs(Col, { className: "top-creators-second-col", children: [_jsx(Col, { className: "top-creators-number", children: _jsx("p", { className: "header-1r top-creators-powered", style: {
                                margin: "0",
                                justifyContent: "end",
                                display: "flex",
                            }, children: creator.powered }) }), _jsx(Col, { children: _jsx(UserPowerup, { user: creator }) })] })] });
};
export const CreatorsList = ({ title, maxItems, users }) => {
    const state = useAppState();
    maxItems = maxItems || 100;
    users = maxItems
        ? users?.slice(0, Math.min(users?.length, maxItems))
        : users;
    // const creators =
    // 	!users ? state.lists.top.users.items : maxUsers;
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { style: { width: "100%" }, children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: "Explore top creators" }) })), _jsxs("div", { children: [maxItems && maxItems !== 100 ? (_jsx(Title, { title: title, href: "/top/creators" })) : (_jsx(_Fragment, {})), _jsx("div", { className: "top-creators-wrapper", children: users?.map((creator) => (_jsx(CreatorWidget, { creator: creator }))) })] })] }));
};
export const Creators = (props) => {
    return _jsx(CreatorsList, { ...props });
};
export const TopCreators = ({ maxItems, title }) => {
    const state = useAppState();
    const actions = useActions();
    const creators = maxItems
        ? state.lists.top.users.items.slice(0, maxItems)
        : state.lists.top.users.items;
    return (_jsxs(_Fragment, { children: [_jsx(CreatorsList, { users: creators, maxItems: maxItems, title: title }), creators && (creators?.length || 0) < (maxItems || 100) && (_jsx(LoadMore, { loadMore: () => actions.lists.top.users() }))] }));
};
export default Creators;
//# sourceMappingURL=Creators.js.map