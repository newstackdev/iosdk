import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Avatar, Button, Col, Menu, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";
import { useAppState, useActions } from "../overmind";
import { ContentImage } from "../Components/Image";
import { useCachedUser } from "../hooks/useCached";
import { LogOut } from "../Components/Icons/LogOut";
export const AuthWidget = () => {
    const state = useAppState();
    const actions = useActions();
    const user = state.api.auth.user;
    const u = useCachedUser({ id: user?.id }, true);
    const profileLink = (title = state.api.auth.userDisplayHandler) => state.auth.authenticated ? (!state.api.auth.authorized ? (_jsx(Avatar, { src: _jsx(ContentImage, { ...u }), className: "avatar-image-header" })) : (_jsxs(Row, { style: {
            justifyContent: "space-between",
            background: "transparent",
        }, children: [_jsx(Col, { children: _jsxs(Link, { to: `/user/${state.api.auth.user?.username}`, children: [_jsx(Avatar, { src: _jsx(ContentImage, { ...u }), className: "avatar-image-header" }), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Profile" })] }) }), _jsx(Col, { className: "mobile-menu-show", children: _jsx("span", { hidden: !state.auth.authenticated, onClick: () => actions.auth.logout(), children: _jsx(LogOut, {}) }) })] }))) : (_jsx(Button, { onClick: () => actions.routing.historyPush({ location: "/auth" }), hidden: state.routing.location === "/auth", className: "secondary-button", children: _jsx("span", { className: "paragraph-2b", children: "Sign In" }) }));
    return (_jsxs(_Fragment, { children: [_jsx(SubMenu, { className: "sub-menu-show", title: profileLink(), style: {
                    opacity: 1,
                    position: "relative",
                    pointerEvents: "all",
                    overflowY: "inherit",
                }, children: state.auth.authenticated ? (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { hidden: state.api.auth.authorized, children: state.api.auth.authorized ? ("") : (_jsx(_Fragment, { children: state.api.auth.userDisplayHandler })) }, "sub3"), !/^(www\.)?newlife\.io$/.test(window.location.host) ? (_jsx(Menu.Item, { hidden: !state.auth.authenticated, 
                            // onClick={() => actions.evm.connect()}
                            className: "submenu-text submenu-text-disabled", children: "Metamask" }, "sub31"
                        // onClick={() => actions.evm.connect()}
                        )) : (_jsx(_Fragment, {})), _jsxs(Menu.Item, { onClick: () => actions.auth.logout(), className: "submenu-text", children: [_jsx("span", { className: "u-margin-right-small", children: "Sign out" }), _jsx(LogOut, {})] }, "sub4")] })) : (_jsx(_Fragment, {})) }, "sub1"), _jsx(Menu.Item, { className: "mobile-menu-show", style: { width: "100%" }, children: profileLink() }, "pl")] }));
};
//# sourceMappingURL=AuthWidget.js.map