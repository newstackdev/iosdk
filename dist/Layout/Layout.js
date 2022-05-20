import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Header as ADHeader, Content, Footer } from "antd/lib/layout/layout";
import { Row, Col, Layout as AntdLayout, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AuthWidget } from "../Pages/AuthWidget";
import { useAppState } from "../overmind";
import { useState } from "react";
import { ActivityStream } from "../Components/ActivityStream";
import { Spin } from "../Components/Spin";
import Explore from "../Components/Icons/Explore";
import NavbarUpload from "../Components/Icons/NavbarUpload";
import Notifications from "../Components/Icons/Notifications";
import Logo from "../Components/Icons/Logo";
import { SearchWidget } from "../Pages/Search/SearchWidget";
import { Burger } from "../Components/Icons/Burger";
import { LargeArrowBack } from "../Components/Icons/LargeArrowBack";
import { DAO } from "../Components/Icons/DAO";
import { WalletWidget } from "../Components/Wallet";
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
    return (_jsxs(Row, { justify: "start", children: [_jsx(Col, { style: {
                    width: `${colWidth}%`,
                }, children: _jsx("div", { style: { ...mix }, children: left || ifDebug("left") }) }), mid && (_jsx(Col, { style: {
                    width: `${centerWidth}%`,
                    borderLeft: WHITE_BORDER,
                    borderRight: WHITE_BORDER,
                }, children: mid || ifDebug("mid") })), _jsx(Col, { style: {
                    width: `${mid ? colWidth : "90%"}%`,
                }, children: right || ifDebug("right") })] }));
};
export const Header = () => {
    const state = useAppState();
    if (!state.ux.layout.headerShown)
        return _jsx(_Fragment, {});
    return (_jsx(ADHeader, { className: "logo", style: { padding: 0 }, children: _jsx(Row, { justify: "space-around", gutter: 0, children: _jsx("div", { className: "header", style: { width: "100%", padding: "0 20px" }, children: _jsx(state.config.components.layout.TopMenu, {}) }) }) }, "h"));
};
export const XTopMenu = () => {
    const state = useAppState();
    const [search, setSearch] = useState(false);
    return (_jsxs(Menu, { mode: "horizontal", style: {
            padding: 0,
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
        }, children: [_jsx(Menu.Item, { style: { position: "absolute", left: 0 }, children: _jsxs(Link, { to: "/explore", className: "nav-item nav-item-logo-left-top", children: [_jsx("div", { className: "logo-left-top-text", children: "Newlife.IO" }), _jsx("div", { className: "logo-left-top", children: _jsx(Logo, {}) })] }) }, "x"), _jsx(Menu.Item, { style: { width: "50vw" }, children: state.api.auth.authorized ? (_jsx(SearchWidget, {})) : ("") }), _jsx(Menu.Item, { children: _jsx(Link, { to: "/explore", className: "nav-item", children: _jsx(Explore, {}) }) }, "4"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/post-create", className: "nav-item", children: _jsx(NavbarUpload, {}) }) }, "5"), _jsx(Menu.Item, { children: _jsx(Dropdown, { overlayStyle: {}, overlay: _jsx(ActivityStream, { limit: 5 }), children: _jsx("div", { children: _jsx(Link, { to: "/my/profile", children: _jsx(Notifications, {}) }) }) }) }, "6"), _jsx(AuthWidget, {})] })
    // </div>
    );
};
export const TopMenu = () => {
    const state = useAppState();
    // const [search, setSearch] = useState<boolean>(false);
    const isAuthorized = state.api.auth.authorized;
    return (_jsxs(Menu, { overflowedIndicator: _jsx(Burger, {}), mode: "horizontal", children: [_jsxs(Menu.Item, { children: [_jsxs(Link, { to: state.api.auth.admitted ? "/explore" : "/", className: "nav-item nav-item-logo-left-top", children: [_jsx("div", { className: "logo-left-top-text", children: "Newlife.IO" }), _jsx("div", { className: "logo-left-top", children: _jsx(state.config.components.icons.Logo, {}) })] }), _jsx("div", { className: "large-arrow-back-mobile", children: !state.config.routes.noBackButton.includes(state.routing.location) &&
                            isAuthorized && _jsx(LargeArrowBack, {}) })] }, "tm"), isAuthorized ? (_jsxs(_Fragment, { children: [_jsxs(Menu.Item, { className: "searchbar-properties", style: !isAuthorized ? { width: "92%" } : { width: "85%" }, children: [_jsx(SearchWidget, {}), _jsx("div", { className: "large-arrow-back-wide-screen", children: !state.config.routes.noBackButton.includes(state.routing.location) && _jsx(LargeArrowBack, {}) })] }), _jsx(Menu.Item, { hidden: !isAuthorized, children: _jsxs(Link, { to: "/explore", className: "nav-item", children: [_jsx(Explore, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Explore" })] }) }, "4"), _jsx(Menu.Item, { className: "make-order-zero", children: _jsxs(Link, { to: "/post-create", className: "nav-item", children: [_jsx(NavbarUpload, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Upload" })] }) }, "5"), _jsx(Menu.Item, { style: { order: 1 }, children: _jsxs(Link, { to: "/newlife-dao", className: "nav-item", children: [_jsx(DAO, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "DAO" })] }) }, "6"), _jsx(Menu.Item, { children: _jsx(WalletWidget, {}) }, "6")] })) : (_jsx(_Fragment, {})), _jsx(AuthWidget, {})] })
    // </div>
    );
};
const Main = ({ children }) => {
    const state = useAppState();
    return (_jsx("div", { className: "app-middle-full-height overflow-hidden", children: state.auth.initialized && state.routing.isAllowed ? (_jsx(_Fragment, { children: children })) : (_jsx(Spin, {})) }));
};
export const Layout = ({ children }) => {
    const state = useAppState();
    console.log(state.ux.layout.headerShown);
    return (_jsxs(AntdLayout, { style: state.ux.layout.headerShown
            ? { minHeight: "100vh" }
            : { minHeight: "100vh", margin: "20px" }, children: [_jsx("div", { id: "search-dropdown-position" }), _jsx(Content, { children: _jsx(Main, { children: children }) }), _jsxs(Footer, { className: "footer", children: [_jsxs(Row, { justify: "space-around", align: "middle", style: {
                            width: "70%",
                            height: "20%",
                        }, children: [_jsx("p", { children: _jsx(Link, { to: "/terms_of_service", className: "paragraph-2u", children: "Terms and Conditions" }) }), _jsx("p", { children: _jsx(Link, { to: "/privacy_policy", className: "paragraph-2u", children: "Privacy Policy" }) }), _jsxs("p", { style: { fontSize: "14px" }, children: [" ", "\u00A9 Newlife.io All Rights Reserved"] })] }), _jsxs(Row, { style: {
                            marginTop: "10%",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }, children: [_jsx(Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    marginRight: "20px",
                                }, children: _jsxs("button", { style: {
                                        backgroundColor: "gray",
                                        borderRadius: "50px",
                                        height: "100px",
                                        width: "175%",
                                        border: "white 1px solid",
                                    }, children: [" ", _jsx("a", { href: "https://forms.gle/izdem2cpHfYavU3a7", target: "_blank", rel: "noreferrer", children: "Buy $GNCO" })] }) }), _jsxs(Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }, children: [_jsx("p", { style: { marginBottom: "10px" }, children: "Q&A" }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { target: "_blank", href: "https://newforum.community/", rel: "noreferrer", children: "New forum" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { href: "https://newlife.io/", target: "_blank", rel: "noreferrer", children: "Newlife I/O" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { href: "https://t.me/joinchat/RhLwbuYJoHKJrDAZ", target: "_blank", rel: "noreferrer", children: "Newgraph" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { href: "https://merch.newlife.ai/", target: "_blank", rel: "noreferrer", children: "Merch" }) })] }), _jsxs(Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }, children: [_jsx("p", { style: { marginBottom: "10px" }, children: "Social Media" }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { target: "_blank", href: "https://twitter.com/newlifeio", rel: "noreferrer", children: "Newlife Twitter" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { target: "_blank", href: "https://instagram.com/newcoin.nco", rel: "noreferrer", children: "Newlife Instagram" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { href: "https://t.me/newcoinprotocol", target: "_blank", rel: "noreferrer", children: "Newlife Telegram" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { target: "_blank", href: "https://medium.com/@newlife.ai", rel: "noreferrer", children: "Newlife Medium" }) })] }), _jsxs(Col, { style: {
                                    height: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }, children: [_jsx("p", { style: { marginBottom: "10px" }, children: "Resources" }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { href: "https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ", target: "_blank", children: "Support" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx("a", { target: "_blank", children: "Info Centre" }) }), _jsx("p", { style: {
                                            textDecoration: "underline",
                                            textUnderlineOffset: "3px",
                                        }, children: _jsx(Link, { to: "/terms_of_service", children: "Services Policy" }) })] })] })] })] }));
};
//# sourceMappingURL=Layout.js.map