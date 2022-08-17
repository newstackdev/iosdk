import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
import { ContentImage } from "../Components/Image";
import { Link } from "react-router-dom";
import { LogOut } from "../Components/Icons/LogOut";
import { useActions, useAppState } from "../overmind";
import { useCachedUser } from "../hooks/useCached";
export const AuthWidget = () => {
    const state = useAppState();
    const actions = useActions();
    const isAuthorized = state.api.auth.authorized;
    const user = state.api.auth.user;
    const u = useCachedUser({ id: user?.id }, true);
    const profileLink = (mobile) => state.auth.authenticated ? (!state.api.auth.authorized ? (mobile ? (_jsx(Button, { onClick: () => actions.auth.logout(), style: { padding: 0 }, children: _jsxs(Row, { children: [_jsx("span", { className: "u-margin-right-small", children: "Sign out" }), _jsx(LogOut, {})] }) }, "sub4")) : (_jsx(Dropdown, { overlay: _jsx(Menu.Item, { onClick: () => actions.auth.logout(), style: { padding: 0 }, children: _jsxs(Row, { children: [_jsx("span", { className: "u-margin-right-small", children: "Sign out" }), _jsx(LogOut, {})] }) }, "sub4"), children: _jsx(Avatar, { src: _jsx(ContentImage, { ...u }), className: "avatar-image-header" }) }))) : (_jsxs(Row, { style: {
            justifyContent: "space-between",
            background: "transparent",
            padding: 0,
            flex: 1,
        }, children: [_jsx(Col, { children: _jsxs(Link, { to: `/user/${state.api.auth.user?.username}`, children: [_jsx(Avatar, { src: _jsx(ContentImage, { ...u, menuAvatar: true }), className: "avatar-image-header" }), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Profile" })] }) }), _jsx(Col, { className: "mobile-menu-show text-right" })] }))) : (_jsx(Button, { onClick: () => actions.routing.historyPush({ location: "/auth" }), hidden: state.routing.location === "/auth", className: "secondary-button", children: _jsx("span", { className: "paragraph-2b", children: "Sign In" }) }));
    return (_jsxs(_Fragment, { children: [_jsxs(Menu.Item, { className: "app-full-width-mobile", children: [_jsx(Menu.Item, { className: "sub-menu-show", children: profileLink() }), _jsx(Menu.Item, { className: "mobile-menu-show", style: { width: "100%", order: 1, padding: 0 }, children: profileLink() }, "pl")] }), isAuthorized && (_jsx(Menu.Item, { children: _jsx(Button, { onClick: () => actions.routing.historyPush({ location: "/user/invite" }), className: "stroke-btn-green", children: _jsx("p", { className: "paragraph-2b", style: { lineHeight: 0, margin: 0, padding: 0 }, children: "Invite a friend" }) }) }))] }));
};
//# sourceMappingURL=AuthWidget.js.map