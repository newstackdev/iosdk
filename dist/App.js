"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const overmind_react_1 = require("overmind-react");
const overmind_1 = require("./overmind");
const CommunityHistory_1 = __importDefault(require("./Pages/NewlifeDao/CommunityHistory"));
const layout_1 = require("antd/lib/layout/layout");
const antd_1 = require("antd");
const CrossCircle_1 = require("./Components/Icons/CrossCircle");
const react_1 = require("react");
const defaultRoutes_1 = require("./defaultRoutes");
// history.js
const AppShell = ({ children }) => {
    const state = (0, overmind_1.useAppState)();
    const history = (0, react_router_dom_1.useHistory)();
    const actions = (0, overmind_1.useActions)();
    const flags = state.flows.userJourney.flags;
    (0, react_1.useEffect)(() => {
        // setTimeout(() => {
        const cancel = history.listen((location) => actions.routing.onRouteChange({ location: location }));
        actions.routing.onRouteChange({ location: window.location });
        actions.routing.setHistory({ history });
        // })
        return cancel;
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: { position: "sticky", top: "10px", zIndex: 999 }, children: [!flags["bannerDisabled"] && ((0, jsx_runtime_1.jsx)("div", { id: "rssBlock", children: (0, jsx_runtime_1.jsx)("div", { className: flags["banner"]
                                ? "banner banner-expand"
                                : "banner", children: (0, jsx_runtime_1.jsxs)("div", { className: "banner-text-box", children: [!flags["banner"] ? ((0, jsx_runtime_1.jsxs)("p", { style: { overflow: "hidden" }, children: [(0, jsx_runtime_1.jsx)("span", { className: "paragraph-1r marqueeStyle", children: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Any voting actions and proposals you hand in will only be beta tests on the Newcoin Testnet. Go to our Telegram group to hear more about the next steps and the Newcoin Testnet. Your username on testnet is however your username on mainnet. Pick your name and reserve it now!" }), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-1r marqueeStyle2", children: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Any voting actions and proposals you hand in will only be beta tests on the Newcoin Testnet. Go to our Telegram group to hear more about the next steps and the Newcoin Testnet. Your username on testnet is however your username on mainnet. Pick your name and reserve it now!" })] })) : ((0, jsx_runtime_1.jsx)("p", { className: "paragraph-1r", style: { margin: "10px" }, children: "Any voting actions and proposals you hand in will only be beta tests on the Newcoin Testnet. Go to our Telegram group to hear more about the next steps and the Newcoin Testnet. Your username on testnet is however your username on mainnet. Pick your name and reserve it now!" })), (0, jsx_runtime_1.jsx)("span", { style: {
                                            marginLeft: "20px",
                                            display: "flex",
                                            cursor: "pointer",
                                        }, onClick: () => actions.flows.userJourney.setFlag({
                                            flag: "banner",
                                            value: "true",
                                        }), children: !flags["banner"] ? ((0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {})) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { className: "secondary-button", onClick: () => actions.flows.userJourney.setFlag({
                                                flag: "bannerDisabled",
                                                value: "true",
                                            }), children: (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2b", children: "I understand" }) })) })] }) }) })), (0, jsx_runtime_1.jsx)(layout_1.Header, { className: "logo", style: { padding: 0 }, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { justify: "space-around", gutter: 0, children: (0, jsx_runtime_1.jsx)("div", { className: "header", style: { width: "100%", padding: "0 20px" }, children: (0, jsx_runtime_1.jsx)(state.config.components.layout.TopMenu, {}) }) }) }, "h")] }), (0, jsx_runtime_1.jsx)("div", { className: "App app-layout-wrapper", children: (0, jsx_runtime_1.jsxs)(state.config.components.layout.Layout, { children: [state.config.routes.useDefaultRoutes ? defaultRoutes_1.DEFAULT_ROUTES : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), children] }) })] }));
};
const overmindSampleCustomConfig = {
    components: {
        icons: {
            Logo: () => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "THIS IS THE LOGO DUDE" })
        },
        layout: {
            TopMenu: () => (0, jsx_runtime_1.jsx)("div", { children: "Custom top menu!" }),
            Layout: () => (0, jsx_runtime_1.jsx)("div", { children: "Custom layout" })
        }
    }
};
const App = ({ children, overmind }) => {
    return ((0, jsx_runtime_1.jsx)(overmind_react_1.Provider, { value: overmind, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(AppShell, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Switch, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [children || [], (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: "/newlife-dao", component: CommunityHistory_1.default }, "ds")] }) }) }) }) }));
};
exports.App = App;
exports.default = exports.App;
//# sourceMappingURL=App.js.map