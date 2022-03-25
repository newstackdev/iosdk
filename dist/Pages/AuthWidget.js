"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWidget = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var SubMenu_1 = __importDefault(require("antd/lib/menu/SubMenu"));
var react_router_dom_1 = require("react-router-dom");
var overmind_1 = require("../overmind");
var Image_1 = require("../Components/Image");
var useCached_1 = require("../hooks/useCached");
var LogOut_1 = require("../Components/Icons/LogOut");
var AuthWidget = function (props) {
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var user = state.api.auth.user;
    var u = (0, useCached_1.useCachedUser)({ id: user === null || user === void 0 ? void 0 : user.id }, true);
    var profileLink = function (title) {
        var _a;
        if (title === void 0) { title = state.api.auth.userDisplayHandler; }
        return state.auth.authenticated ? (!state.api.auth.authorized ?
            (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, u)), className: "avatar-image-header" })
            :
                (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
                        justifyContent: "space-between",
                        background: "transparent",
                    } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/user/".concat((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.username) }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, u)), className: "avatar-image-header" }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-1r navbar-mobile-text" }, { children: "Profile" }))] })) }), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "mobile-menu-show" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ hidden: !state.auth.authenticated, onClick: function () { return actions.auth.logout(); } }, { children: (0, jsx_runtime_1.jsx)(LogOut_1.LogOut, {}) })) }))] }))) :
            ((0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: function () {
                    return actions.routing.historyPush({ location: "/auth" });
                }, hidden: state.routing.location === "/auth", style: {
                    borderWidth: "2px",
                    fontWeight: "bold",
                    height: "33px",
                    lineHeight: "0",
                    width: "140px",
                } }, { children: "Sign In" })));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SubMenu_1.default, __assign({ className: "sub-menu-show", title: profileLink(), style: {
                    opacity: 1,
                    position: "relative",
                    pointerEvents: "all",
                    overflowY: "inherit",
                } }, { children: state.auth.authenticated ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ hidden: state.api.auth.authorized }, { children: state.api.auth.authorized ? "" : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state.api.auth.userDisplayHandler }) }), "sub3"), !/^(www\.)?newlife\.io$/.test(window.location.host)
                                ?
                                    (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ hidden: !state.auth.authenticated, 
                                        // onClick={() => actions.evm.connect()}
                                        className: "logout" }, { children: "metamask" }), "sub31"
                                    // onClick={() => actions.evm.connect()}
                                    ) :
                                (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsxs)(antd_1.Menu.Item, __assign({ onClick: function () { return actions.auth.logout(); }, className: "logout" }, { children: ["Sign out\u00A0", (0, jsx_runtime_1.jsx)(LogOut_1.LogOut, {})] }), "sub4")] }) :
                    (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }), "sub1"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ className: "mobile-menu-show", style: { width: "100%" } }, { children: profileLink() }), "pl")] }));
};
exports.AuthWidget = AuthWidget;
//# sourceMappingURL=AuthWidget.js.map