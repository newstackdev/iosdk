"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = exports.TopMenu = exports.XTopMenu = exports.Header = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_1 = require("antd/lib/layout/layout");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const AuthWidget_1 = require("../Pages/AuthWidget");
const overmind_1 = require("../overmind");
const react_1 = require("react");
const ActivityStream_1 = require("../Components/ActivityStream");
const Spin_1 = require("../Components/Spin");
const Explore_1 = __importDefault(require("../Components/Icons/Explore"));
const NavbarUpload_1 = __importDefault(require("../Components/Icons/NavbarUpload"));
const Notifications_1 = __importDefault(require("../Components/Icons/Notifications"));
const Logo_1 = __importDefault(require("../Components/Icons/Logo"));
const SearchWidget_1 = require("../Pages/Search/SearchWidget");
const Burger_1 = require("../Components/Icons/Burger");
const LargeArrowBack_1 = require("src/Components/Icons/LargeArrowBack");
const DAO_1 = require("src/Components/Icons/DAO");
const Wallet_1 = require("src/Components/Wallet");
const WHITE_BORDER = "0px white solid";
const DEBUG = false;
const ifDebug = (v) => (DEBUG ? v : "");
const ThreeBody = ({ left, mid, right }) => {
    const centerWidth = "min(60vw,935px)";
    const colWidth = "auto";
    const mix = {
        paddingLeft: 6,
        paddingRight: 6,
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { justify: "start", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { style: {
                    width: `${colWidth}%`,
                }, children: (0, jsx_runtime_1.jsx)("div", { style: { ...mix }, children: left || ifDebug("left") }) }), mid && ((0, jsx_runtime_1.jsx)(antd_1.Col, { style: {
                    width: `${centerWidth}%`,
                    borderLeft: WHITE_BORDER,
                    borderRight: WHITE_BORDER,
                }, children: mid || ifDebug("mid") })), (0, jsx_runtime_1.jsx)(antd_1.Col, { style: {
                    width: `${mid ? colWidth : "90%"}%`,
                }, children: right || ifDebug("right") })] }));
};
const Header = () => {
    const state = (0, overmind_1.useAppState)();
    if (!state.ux.layout.headerShown)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return (0, jsx_runtime_1.jsx)(layout_1.Header, { className: "logo", style: { padding: 0 }, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { justify: "space-around", gutter: 0, children: (0, jsx_runtime_1.jsx)("div", { className: "header", style: { width: "100%", padding: "0 20px" }, children: (0, jsx_runtime_1.jsx)(state.config.components.layout.TopMenu, {}) }) }) }, "h");
};
exports.Header = Header;
const XTopMenu = () => {
    const state = (0, overmind_1.useAppState)();
    const [search, setSearch] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Menu, { mode: "horizontal", style: {
            padding: 0,
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { style: { position: "absolute", left: 0 }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/explore", className: "nav-item nav-item-logo-left-top", children: [(0, jsx_runtime_1.jsx)("div", { className: "logo-left-top-text", children: "Newlife.IO" }), (0, jsx_runtime_1.jsx)("div", { className: "logo-left-top", children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) })] }) }, "x"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { style: { width: "50vw" }, children: state.api.auth.authorized ? ((0, jsx_runtime_1.jsx)(SearchWidget_1.SearchWidget, { search: search, setSearch: setSearch })) : ("") }), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/explore", className: "nav-item", children: (0, jsx_runtime_1.jsx)(Explore_1.default, {}) }) }, "4"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/post-create", className: "nav-item", children: (0, jsx_runtime_1.jsx)(NavbarUpload_1.default, {}) }) }, "5"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Dropdown, { overlayStyle: {}, overlay: (0, jsx_runtime_1.jsx)(ActivityStream_1.ActivityStream, { limit: 5 }), children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/my/profile", children: (0, jsx_runtime_1.jsx)(Notifications_1.default, {}) }) }) }) }, "6"), (0, jsx_runtime_1.jsx)(AuthWidget_1.AuthWidget, {})] })
    // </div>
    );
};
exports.XTopMenu = XTopMenu;
const TopMenu = () => {
    const state = (0, overmind_1.useAppState)();
    const [search, setSearch] = (0, react_1.useState)(false);
    const isAuthorized = state.api.auth.authorized;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Menu, { overflowedIndicator: (0, jsx_runtime_1.jsx)(Burger_1.Burger, {}), mode: "horizontal", children: [(0, jsx_runtime_1.jsxs)(antd_1.Menu.Item, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: state.api.auth.admitted ? "/explore" : "/", className: "nav-item nav-item-logo-left-top", children: [(0, jsx_runtime_1.jsx)("div", { className: "logo-left-top-text", children: "Newlife.IO" }), (0, jsx_runtime_1.jsx)("div", { className: "logo-left-top", children: (0, jsx_runtime_1.jsx)(state.config.components.icons.Logo, {}) })] }), (0, jsx_runtime_1.jsx)("div", { className: "large-arrow-back-mobile", children: !state.config.routes.noBackButton.includes(state.routing.location) &&
                            isAuthorized && (0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}) })] }, "tm"), isAuthorized ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Menu.Item, { className: "searchbar-properties", style: !isAuthorized ? { width: "92%" } : { width: "85%" }, children: [(0, jsx_runtime_1.jsx)(SearchWidget_1.SearchWidget, { search: search, setSearch: setSearch }), (0, jsx_runtime_1.jsx)("div", { className: "large-arrow-back-wide-screen", children: !state.config.routes.noBackButton.includes(state.routing.location) && (0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}) })] }), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { hidden: !isAuthorized, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/explore", className: "nav-item", children: [(0, jsx_runtime_1.jsx)(Explore_1.default, {}), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-1r navbar-mobile-text", children: "Explore" })] }) }, "4"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { className: "make-order-zero", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/post-create", className: "nav-item", children: [(0, jsx_runtime_1.jsx)(NavbarUpload_1.default, {}), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-1r navbar-mobile-text", children: "Upload" })] }) }, "5"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { style: { order: 1 }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/newlife-dao", className: "nav-item", children: [(0, jsx_runtime_1.jsx)(DAO_1.DAO, {}), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-1r navbar-mobile-text", children: "DAO" })] }) }, "6"), (0, jsx_runtime_1.jsx)(antd_1.Menu.Item, { children: (0, jsx_runtime_1.jsx)(Wallet_1.WalletWidget, {}) }, "6")] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)(AuthWidget_1.AuthWidget, {})] })
    // </div>
    );
};
exports.TopMenu = TopMenu;
const Main = ({ children }) => {
    const state = (0, overmind_1.useAppState)();
    return ((0, jsx_runtime_1.jsx)("div", { className: "app-middle-full-height overflow-hidden", children: state.auth.initialized && state.routing.isAllowed ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children })) : ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) }));
};
const Layout = ({ children }) => {
    return ((0, jsx_runtime_1.jsxs)(antd_1.Layout, { style: { minHeight: "100vh" }, children: [(0, jsx_runtime_1.jsx)("div", { id: "search-dropdown-position" }), (0, jsx_runtime_1.jsx)(layout_1.Content, { children: (0, jsx_runtime_1.jsx)(Main, { children: children }) }), (0, jsx_runtime_1.jsxs)(layout_1.Footer, { className: "footer", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { justify: "space-around", align: "middle", style: {
                            width: "70%",
                            height: "20%",
                        }, children: [(0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/terms_of_service", className: "paragraph-2u", children: "Terms and Conditions" }) }), (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/privacy_policy", className: "paragraph-2u", children: "Privacy Policy" }) }), (0, jsx_runtime_1.jsxs)("p", { style: { fontSize: "14px" }, children: [" ", "\u00A9 Newlife.io All Rights Reserved"] })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
                            marginTop: "10%",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    marginRight: "20px",
                                }, children: (0, jsx_runtime_1.jsxs)("button", { style: {
                                        backgroundColor: "gray",
                                        borderRadius: "50px",
                                        height: "100px",
                                        width: "175%",
                                        border: "white 1px solid",
                                    }, children: [" ", (0, jsx_runtime_1.jsx)("a", { href: "https://forms.gle/izdem2cpHfYavU3a7", target: "_blank", rel: "noreferrer", children: "Buy $GNCO" })] }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }, children: [(0, jsx_runtime_1.jsx)("p", { style: { marginBottom: "10px" }, children: "Q&A" }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { target: "_blank", href: "https://newforum.community/", rel: "noreferrer", children: "New forum" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { href: "https://newlife.io/", target: "_blank", rel: "noreferrer", children: "Newlife I/O" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { href: "https://t.me/joinchat/RhLwbuYJoHKJrDAZ", target: "_blank", rel: "noreferrer", children: "Newgraph" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { href: "https://merch.newlife.ai/", target: "_blank", rel: "noreferrer", children: "Merch" }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }, children: [(0, jsx_runtime_1.jsx)("p", { style: { marginBottom: "10px" }, children: "Social Media" }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { target: "_blank", href: "https://twitter.com/newlifeio", rel: "noreferrer", children: "Newlife Twitter" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { target: "_blank", href: "https://instagram.com/newcoin.nco", rel: "noreferrer", children: "Newlife Instagram" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { href: "https://t.me/newcoinprotocol", target: "_blank", rel: "noreferrer", children: "Newlife Telegram" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { target: "_blank", href: "https://medium.com/@newlife.ai", rel: "noreferrer", children: "Newlife Medium" }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }, children: [(0, jsx_runtime_1.jsx)("p", { style: { marginBottom: "10px" }, children: "Resources" }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { href: "https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ", target: "_blank", children: "Support" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)("a", { target: "_blank", children: "Info Centre" }) }), (0, jsx_runtime_1.jsx)("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/terms_of_service", children: "Services Policy" }) })] })] })] })] }));
};
exports.Layout = Layout;
//# sourceMappingURL=Layout.js.map