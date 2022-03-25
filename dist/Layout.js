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
exports.Layout = exports.TopMenu = exports.XTopMenu = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var layout_1 = require("antd/lib/layout/layout");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var AuthWidget_1 = require("./Pages/AuthWidget");
var overmind_1 = require("./overmind");
var react_1 = require("react");
var ActivityStream_1 = require("./Components/ActivityStream");
var Spin_1 = require("./Components/Spin");
var Explore_1 = __importDefault(require("./Components/Icons/Explore"));
var NavbarUpload_1 = __importDefault(require("./Components/Icons/NavbarUpload"));
var Notifications_1 = __importDefault(require("./Components/Icons/Notifications"));
var Logo_1 = __importDefault(require("./Components/Icons/Logo"));
var SearchWidget_1 = require("./Pages/Search/SearchWidget");
var Burger_1 = require("./Components/Icons/Burger");
var WHITE_BORDER = "0px white solid";
var DEBUG = false;
var ifDebug = function (v) { return (DEBUG ? v : ""); };
var ThreeBody = function (_a) {
    var left = _a.left, mid = _a.mid, right = _a.right;
    var centerWidth = "min(60vw,935px)";
    var colWidth = "auto";
    var mix = {
        paddingLeft: 6,
        paddingRight: 6,
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ justify: "start" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: {
                    width: "".concat(colWidth, "%"),
                } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: __assign({}, mix) }, { children: left || ifDebug("left") })) })), mid && ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: {
                    width: "".concat(centerWidth, "%"),
                    borderLeft: WHITE_BORDER,
                    borderRight: WHITE_BORDER,
                } }, { children: mid || ifDebug("mid") }))), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: {
                    width: "".concat(mid ? colWidth : "90%", "%"),
                } }, { children: right || ifDebug("right") }))] })));
};
var XTopMenu = function () {
    var state = (0, overmind_1.useAppState)();
    var _a = (0, react_1.useState)(false), search = _a[0], setSearch = _a[1];
    return ((0, jsx_runtime_1.jsxs)(antd_1.Menu, __assign({ mode: "horizontal", style: {
            padding: 0,
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
        } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ style: { position: "absolute", left: 0 } }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/explore", className: "nav-item nav-item-logo-left-top" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "logo-left-top-text" }, { children: "Newlife.IO" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "logo-left-top" }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) }))] })) }), "x"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ style: { width: "50vw" } }, { children: state.api.auth.authorized ? ((0, jsx_runtime_1.jsx)(SearchWidget_1.SearchWidget, { search: search, setSearch: setSearch })) : ("") })), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/explore", className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(Explore_1.default, {}) })) }, "4"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/post-create", className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)(NavbarUpload_1.default, {}) })) }, "5"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Dropdown, __assign({ overlayStyle: {}, overlay: (0, jsx_runtime_1.jsx)(ActivityStream_1.ActivityStream, { limit: 5 }) }, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/my/profile" }, { children: (0, jsx_runtime_1.jsx)(Notifications_1.default, {}) })) }) })) }, "6"), (0, jsx_runtime_1.jsx)(AuthWidget_1.AuthWidget, {})] }))
    // </div>
    );
};
exports.XTopMenu = XTopMenu;
var TopMenu = function () {
    var state = (0, overmind_1.useAppState)();
    var _a = (0, react_1.useState)(false), search = _a[0], setSearch = _a[1];
    var isAuthorized = state.api.auth.authorized;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Menu, __assign({ overflowedIndicator: (0, jsx_runtime_1.jsx)(Burger_1.Burger, {}), mode: "horizontal" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: state.api.auth.admitted ? "/explore" : "/", className: "nav-item nav-item-logo-left-top" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "logo-left-top-text" }, { children: "Newlife.IO" })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "logo-left-top" }, { children: (0, jsx_runtime_1.jsx)(state.config.components.icons.Logo, {}) }))] })) }, "tm"), isAuthorized ?
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ className: "searchbar-properties", style: !isAuthorized ? { width: "92%" } : { width: "85%" } }, { children: (0, jsx_runtime_1.jsx)(SearchWidget_1.SearchWidget, { search: search, setSearch: setSearch }) })), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ hidden: !isAuthorized }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/explore", className: "nav-item" }, { children: [(0, jsx_runtime_1.jsx)(Explore_1.default, {}), (0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-1r navbar-mobile-text" }, { children: "Explore" }))] })) }), "4"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, __assign({ className: "make-order-zero" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/post-create", className: "nav-item" }, { children: [(0, jsx_runtime_1.jsx)(NavbarUpload_1.default, {}), (0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-1r navbar-mobile-text" }, { children: "Upload" }))] })) }), "5")] }) :
                (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)(AuthWidget_1.AuthWidget, {})] }))
    // </div>
    );
};
exports.TopMenu = TopMenu;
var Main = function (_a) {
    var children = _a.children;
    var state = (0, overmind_1.useAppState)();
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "app-middle-full-height overflow-hidden" }, { children: state.auth.initialized && state.routing.isAllowed ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children })) : ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) })));
};
var Layout = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Layout, __assign({ style: { minHeight: "100vh" } }, { children: [(0, jsx_runtime_1.jsx)("div", { id: "search-dropdown-position" }), (0, jsx_runtime_1.jsx)(layout_1.Header, __assign({ className: "logo", style: { padding: 0 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { justify: "space-around", gutter: 0 }) }), "h"), (0, jsx_runtime_1.jsx)(layout_1.Content, { children: (0, jsx_runtime_1.jsx)(Main, { children: children }) }), (0, jsx_runtime_1.jsxs)(layout_1.Footer, __assign({ style: {
                    backgroundColor: "gray",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10%",
                    padding: "5% 10% 10% 10%",
                } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ justify: "space-around", align: "middle", style: {
                            width: "70%",
                            height: "20%",
                        } }, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/terms_of_service", className: "paragraph-2u" }, { children: "Terms and Conditions" })) }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/privacy_policy", className: "paragraph-2u" }, { children: "Privacy Policy" })) }), (0, jsx_runtime_1.jsx)("p", __assign({ style: { fontSize: "14px" } }, { children: " \u00A9 Newlife.io All Rights Reserved" }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
                            marginTop: "10%",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "flex-start"
                        } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    marginRight: "20px"
                                } }, { children: (0, jsx_runtime_1.jsxs)("button", __assign({ style: {
                                        backgroundColor: "gray",
                                        borderRadius: "50px",
                                        height: "100px",
                                        width: "175%",
                                        border: "white 1px solid",
                                    } }, { children: [" ", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://forms.gle/izdem2cpHfYavU3a7", target: "_blank" }, { children: "Buy $NCO" }))] })) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around"
                                } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ style: { marginBottom: "10px" } }, { children: "Q&A" })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ target: "_blank", href: "https://newforum.community/" }, { children: "New forum" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://newlife.io/", target: "_blank" }, { children: "Newlife I/O" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://t.me/joinchat/RhLwbuYJoHKJrDAZ", target: "_blank" }, { children: "Newgraph" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://merch.newlife.ai/", target: "_blank" }, { children: "Merch" })) }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around"
                                } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ style: { marginBottom: "10px" } }, { children: "Social Media" })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ target: "_blank", href: "https://twitter.com/newlifeio" }, { children: "Newlife Twitter" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ target: "_blank", href: "https://instagram.com/newcoin.nco" }, { children: "Newlife Instagram" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://t.me/newcoinprotocol", target: "_blank" }, { children: "Newlife Telegram" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ target: "_blank", href: "https://medium.com/@newlife.ai" }, { children: "Newlife Medium" })) }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around"
                                } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ style: { marginBottom: "10px" } }, { children: "Resources" })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ", target: "_blank" }, { children: "Support" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ target: "_blank" }, { children: "Info Centre" })) })), (0, jsx_runtime_1.jsx)("p", __assign({ style: { textDecoration: "underline", textUnderlineOffset: "3px" } }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/terms_of_service" }, { children: "Services Policy" })) }))] }))] }))] }))] })));
};
exports.Layout = Layout;
//# sourceMappingURL=Layout.js.map