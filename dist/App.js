import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "antd";
import { CrossCircle } from "./Components/Icons/CrossCircle";
import { DEFAULT_ROUTES } from "./defaultRoutes";
import { Provider } from "overmind-react";
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { useActions, useAppState } from "./overmind";
import { useEffect } from "react";
const AppShell = ({ children }) => {
    const state = useAppState();
    const history = useHistory();
    const actions = useActions();
    const flags = state.flows.userJourney.flags;
    useEffect(() => {
        // setTimeout(() => {
        const cancel = history.listen((location) => actions.routing.onRouteChange({ location: location }));
        actions.routing.onRouteChange({ location: window.location });
        actions.routing.setHistory({ history });
        // })
        return cancel;
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { style: { position: "sticky", zIndex: 999 }, children: [!flags["bannerDisabled"] && (_jsx("div", { id: "rssBlock", children: _jsx("div", { className: flags["banner"] ? "banner banner-expand" : "banner", children: _jsxs("div", { className: "banner-text-box", children: [!flags["banner"] ? (_jsxs("p", { style: { overflow: "hidden" }, children: [_jsx("span", { className: "paragraph-1r marqueeStyle", children: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Any voting actions and proposals you hand in will only be beta tests on the Newcoin Testnet. Go to our Telegram group to hear more about the next steps and the Newcoin Testnet. Your username on testnet is however your username on mainnet. Pick your name and reserve it now!" }), _jsx("span", { className: "paragraph-1r marqueeStyle2", children: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Any voting actions and proposals you hand in will only be beta tests on the Newcoin Testnet. Go to our Telegram group to hear more about the next steps and the Newcoin Testnet. Your username on testnet is however your username on mainnet. Pick your name and reserve it now!" })] })) : (_jsx("p", { className: "paragraph-1r", style: { margin: "10px" }, children: "Any voting actions and proposals you hand in will only be beta tests on the Newcoin Testnet. Go to our Telegram group to hear more about the next steps and the Newcoin Testnet. Your username on testnet is however your username on mainnet. Pick your name and reserve it now!" })), _jsx("span", { style: {
                                            marginLeft: "20px",
                                            display: "flex",
                                            cursor: "pointer",
                                        }, onClick: () => actions.flows.userJourney.setFlag({
                                            flag: "banner",
                                            value: "true",
                                        }), children: !flags["banner"] ? (_jsx(CrossCircle, {})) : (_jsx(Button, { className: "secondary-button", onClick: () => actions.flows.userJourney.setFlag({
                                                flag: "bannerDisabled",
                                                value: "true",
                                            }), children: _jsx("span", { className: "paragraph-2b", children: "I understand" }) })) })] }) }) })), _jsx(state.config.components.layout.Header, {})] }), _jsx("div", { className: `App ${state.ux.layout.headerShown ? "app-layout-wrapper" : ""}`, children: _jsxs(state.config.components.layout.Layout, { children: [state.config.routes.useDefaultRoutes ? DEFAULT_ROUTES : _jsx(_Fragment, {}), children] }) })] }));
};
const overmindSampleCustomConfig = {
    components: {
        icons: {
            Logo: () => _jsx(_Fragment, { children: "THIS IS THE LOGO DUDE" }),
        },
        layout: {
            TopMenu: () => _jsx("div", { children: "Custom top menu!" }),
            Layout: () => _jsx("div", { children: "Custom layout" }),
        },
    },
};
export const App = ({ children, overmind }) => {
    return (_jsx(Provider, { value: overmind, children: _jsx(Router, { children: _jsx(AppShell, { children: _jsx(Switch, { children: children || [] }) }) }) }));
};
export default App;
//# sourceMappingURL=App.js.map