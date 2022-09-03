import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Header as ADHeader, Content } from "antd/lib/layout/layout";
import { Layout as AntdLayout, Col, Dropdown, Menu, Row } from "antd";
import { AuthWidget } from "../Pages/AuthWidget";
import { Link } from "react-router-dom";
import { useActions, useAppState } from "../overmind";
import { useState } from "react";
import { ActivityStream } from "../Components/ActivityStream";
import { Burger } from "../Components/Icons/Burger";
import { DAO } from "../Components/Icons/DAO";
import { LargeArrowBack } from "../Components/Icons/LargeArrowBack";
import { NLFooter } from "./NLFooter";
import { SearchWidget } from "../Pages/Search/SearchWidget";
import { Spin } from "../Components/Spin";
import { WalletWidget } from "../Components/Wallet";
import Explore from "../Components/Icons/Explore";
import Logo from "../Components/Icons/Logo";
import NavbarUpload from "../Components/Icons/NavbarUpload";
import Notifications from "../Components/Icons/Notifications";
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
        }, children: [_jsx(Menu.Item, { style: { position: "absolute", left: 0 }, children: _jsxs(Link, { to: "/explore", className: "nav-item nav-item-logo-left-top", children: [_jsx("div", { className: "logo-left-top-text", children: "Newlife.IO" }), _jsx("div", { className: "logo-left-top", children: _jsx(Logo, {}) })] }) }, "2"), _jsx(Menu.Item, { style: { width: "50vw" }, children: state.api.auth.authorized ? _jsx(SearchWidget, {}) : "" }, "3"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/explore", className: "nav-item", children: _jsx(Explore, {}) }) }, "4"), _jsx(Menu.Item, { children: _jsx(Link, { to: "/post-create", className: "nav-item nav-item-upload", children: _jsx(NavbarUpload, {}) }) }, "5"), _jsx(Menu.Item, { children: _jsx(Dropdown, { overlayStyle: {}, overlay: _jsx(ActivityStream, { limit: 5 }), children: _jsx("div", { children: _jsx(Link, { to: "/my/profile", children: _jsx(Notifications, {}) }) }) }) }, "6"), _jsx(AuthWidget, {})] })
    // </div>
    );
};
export const TopMenu = () => {
    const state = useAppState();
    const [selection, setSelection] = useState("");
    // const [search, setSearch] = useState<boolean>(false);
    const actions = useActions();
    const isAuthorized = state.api.auth.authorized;
    // const setVisible = (v: boolean) =>
    //   actions.flows.userJourney.setFlag({
    //     flag: "walletShown",
    //     value: v ? "true" : "",
    //   });
    // const walletShown = !!state.flows.userJourney.flags.walletShown;
    const routes = state.flows.user.create.isLegacyUpdateOngoing
        ? [...state.config.routes.noBackButton, "/signup/create"]
        : state.config.routes.noBackButton;
    const isAllowedPath = !routes.find((r) => state.routing.location.includes(r));
    return (_jsxs(Menu, { overflowedIndicator: _jsx(Burger, {}), mode: "horizontal", children: [_jsxs(Menu.Item, { children: [_jsxs(Link, { to: state.api.auth.admitted ? "/explore" : "/", className: "nav-item nav-item-logo-left-top", children: [_jsx("div", { className: "logo-left-top-text", children: "Newlife.IO" }), _jsx("div", { className: "logo-left-top", children: _jsx(state.config.components.icons.Logo, {}) })] }), _jsx("div", { className: "large-arrow-back-mobile", children: isAllowedPath && isAuthorized && _jsx(LargeArrowBack, {}) }), _jsx("span", { className: "large-arrow-back-wide-screen", children: isAllowedPath && _jsx(LargeArrowBack, {}) })] }, "tm"), isAuthorized ? (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { className: "searchbar-properties", style: !isAuthorized ? { width: "92%" } : { width: "70%" }, children: _jsx(SearchWidget, { searchUsers: true, searchTags: true, setSelection: setSelection }) }), _jsx(Menu.Item, { hidden: !isAuthorized, children: _jsxs(Link, { to: "/explore", className: "nav-item", children: [_jsx(Explore, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Explore" })] }) }, "4"), _jsx(Menu.Item, { className: "make-order-zero", children: _jsxs(Link, { to: "/post-create", className: "nav-item", children: [_jsx(NavbarUpload, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Upload" })] }) }, "5"), _jsx(Menu.Item, { children: _jsxs(Link, { to: `/dao/${state.config.settings.newcoin.daoDomain}/proposals`, className: "nav-item", children: [_jsx(DAO, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "DAO" })] }) }, "6"), _jsxs(Menu.Item, { children: [_jsx(WalletWidget, {}), _jsx("span", { className: "paragraph-1r navbar-mobile-text", children: "Wallet" })] }, "8")] })) : (_jsx(_Fragment, {})), _jsx(AuthWidget, {})] }));
};
const Main = ({ children }) => {
    const state = useAppState();
    return (_jsx("div", { className: "app-middle-full-height overflow-hidden", children: state.auth.initialized && state.routing.isAllowed ? _jsx(_Fragment, { children: children }) : _jsx(Spin, {}) }));
};
export const Layout = ({ children }) => {
    const state = useAppState();
    return (_jsxs(AntdLayout, { style: state.ux.layout.headerShown ? { minHeight: "100vh" } : { minHeight: "100vh", margin: "0px" }, children: [_jsx("div", { id: "search-dropdown-position" }), _jsx(Content, { children: _jsx(Main, { children: children }) }), state.ux.layout.footerShown && _jsx(NLFooter, {})] }));
};
//# sourceMappingURL=Layout.js.map