"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const SubMenu_1 = __importDefault(require("antd/lib/menu/SubMenu"));
const react_router_dom_1 = require("react-router-dom");
const overmind_1 = require("../overmind");
const Image_1 = require("../Components/Image");
const useCached_1 = require("../hooks/useCached");
const LogOut_1 = require("../Components/Icons/LogOut");
const AuthWidget = () => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const user = state.api.auth.user;
    const u = (0, useCached_1.useCachedUser)({ id: user?.id }, true);
    const profileLink = (title = state.api.auth.userDisplayHandler) => state.auth.authenticated ? (!state.api.auth.authorized ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...u }), className: "avatar-image-header" })) : ((0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
            justifyContent: "space-between",
            background: "transparent",
        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/user/${state.api.auth.user?.username}`, children: [(0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...u }), className: "avatar-image-header" }), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-1r navbar-mobile-text", children: "Profile" })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { className: "mobile-menu-show", children: (0, jsx_runtime_1.jsx)("span", { hidden: !state.auth.authenticated, onClick: () => actions.auth.logout(), children: (0, jsx_runtime_1.jsx)(LogOut_1.LogOut, {}) }) })] }))) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => actions.routing.historyPush({ location: "/auth" }), hidden: state.routing.location === "/auth", className: "secondary-button", children: (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2b", children: "Sign In" }) }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SubMenu_1.default, { className: "sub-menu-show", title: profileLink(), style: {
                    opacity: 1,
                    position: "relative",
                    pointerEvents: "all",
                    overflowY: "inherit",
                }, children: state.auth.authenticated ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { hidden: state.api.auth.authorized, children: state.api.auth.authorized ? ("") : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state.api.auth.userDisplayHandler })) }, "sub3"), !/^(www\.)?newlife\.io$/.test(window.location.host) ? ((0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { hidden: !state.auth.authenticated, 
                            // onClick={() => actions.evm.connect()}
                            className: "submenu-text submenu-text-disabled", children: "Metamask" }, "sub31"
                        // onClick={() => actions.evm.connect()}
                        )) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsxs)(antd_1.Menu.Item, { onClick: () => actions.auth.logout(), className: "submenu-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "u-margin-right-small", children: "Sign out" }), (0, jsx_runtime_1.jsx)(LogOut_1.LogOut, {})] }, "sub4")] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})) }, "sub1"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { className: "mobile-menu-show", style: { width: "100%" }, children: profileLink() }, "pl")] }));
};
exports.AuthWidget = AuthWidget;
//# sourceMappingURL=AuthWidget.js.map