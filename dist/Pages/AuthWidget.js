import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Button, Col, Menu, Row } from "antd";
import { ContentImage } from "../Components/Image";
import { Link } from "react-router-dom";
import { useActions, useAppState } from "../overmind";
import { useCachedUser } from "../hooks/useCached";
export const AuthWidget = () => {
    const state = useAppState();
    const actions = useActions();
    const isAuthorized = state.api.auth.authorized;
    const user = state.api.auth.user;
    const u = useCachedUser({ id: user?.id }, true);
    const profileLink = () => state.auth.authenticated ? (!state.api.auth.authorized ? (_jsx(Button, { className: "secondary-button", onClick: () => actions.auth.logout(), children: _jsx("span", { className: "paragraph-2b", children: "Sign out" }) })) : (_jsx(Row, { style: {
            justifyContent: "space-between",
            background: "transparent",
            padding: 0,
            flex: 1,
        }, children: _jsx(Col, { children: _jsxs(Link, { className: "navbar-profile-link-btn", to: `/user/${state.api.auth.user?.username}`, children: [_jsx(Avatar, { src: _jsx(ContentImage, { ...u, menuAvatar: true }), className: "avatar-image-header" }), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Profile" })] }) }) }))) : (_jsxs("div", { className: "navbar-signin-wrapper", children: [_jsx(Button, { onClick: () => {
                    actions.routing.historyPush({ location: "/auth" });
                    actions.flows.user.create.stopMetamaskFlow();
                }, className: "secondary-button", children: _jsx("span", { className: "paragraph-2b", children: "Sign In" }) }), _jsx(Button, { className: "secondary-button", onClick: () => actions.routing.historyPush({ location: "/signup/metamask" }), children: _jsx("span", { className: "paragraph-2b", children: "Metamask" }) })] }));
    return (_jsxs(_Fragment, { children: [_jsxs(Menu.Item, { className: "app-full-width-mobile", children: [_jsx(Menu.Item, { className: "sub-menu-show", children: profileLink() }), _jsx(Menu.Item, { className: "mobile-menu-show", style: { width: "100%", order: 1, padding: 0 }, children: profileLink() }, "pl")] }), isAuthorized && (_jsx(Menu.Item, { children: _jsx(Button, { onClick: () => actions.routing.historyPush({ location: "/user/invite" }), className: "stroke-btn-green", children: _jsx("p", { className: "paragraph-2b", style: { lineHeight: 0, margin: 0, padding: 0 }, children: "Invite a friend" }) }) }))] }));
};
//# sourceMappingURL=AuthWidget.js.map