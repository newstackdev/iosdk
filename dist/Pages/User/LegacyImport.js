"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyImport = exports.LegacyLogin = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Form_1 = require("antd/lib/form/Form");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const ContentLayout_1 = require("../../Components/ContentLayout");
const ProgressButton_1 = require("../../Components/ProgressButton");
const Spin_1 = require("../../Components/Spin");
const SupportBox_1 = __importDefault(require("../../Components/SupportBox"));
const overmind_1 = require("../../overmind");
const capFirst_1 = require("../../utils/capFirst");
const STATUS = {
    NONE: 0,
    LINK_NO_EMAIL: 1,
    LINK_EMAIL: 2,
    LINK_REQUESTED: 3,
    ERROR: 4,
    AUTHENTICATED_CANTPROCEED: 5,
    AUTHORIZED: 6,
};
const LegacyLogin = () => {
    const [form] = (0, Form_1.useForm)();
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    const [status, setStatus] = (0, react_1.useState)(STATUS.NONE);
    const [email, setEmail] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)("");
    // const indicators = state.indicators.specific;
    // const authorizing = state.auth.status > 0 && !state.auth.authorized && !state.auth.authenticated;
    // oobCode &&
    // ["auth.newlifeAuthorize", "auth.refreshApiToken", "auth.firebaseSignInWithEmailLink"]
    //     .find(n => indicators[n]);
    const oobCode = new URLSearchParams(window.location.search).get("oobCode");
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const signIn = async (email) => {
        try {
            await actions.firebase.signInWithEmailLink({ email });
        }
        catch (ex) {
            setStatus(STATUS.ERROR);
            setError((0, capFirst_1.capFirst)(ex.code
                .replace(/^auth\//, "")
                .replace(/-/g, " ")));
            actions.auth.logout({ noRouting: true });
        }
    };
    const tryAgain = () => {
        actions.routing.historyPush({ location: "/auth/newlife-members" });
        setStatus(STATUS.NONE);
        setError("");
        actions.auth.logout({ noRouting: true });
    };
    (0, react_1.useEffect)(() => {
        if (state.flows.user.create.legacyToken)
            actions.flows.user.create.stopLegacyImport({ noRedirect: true });
        if (oobCode) {
            const email = window.localStorage.getItem("emailForSignIn") || "";
            setStatus(email ? STATUS.LINK_EMAIL : STATUS.LINK_NO_EMAIL);
            email && signIn(email);
        }
        else if (state.auth.authenticated) {
            if (!state.api.auth.authorized &&
                state.api.auth.user?.id &&
                state.api.auth.user?.status !== "imported") {
                // actions.routing.historyPush({ location: "/" });
                setStatus(STATUS.AUTHENTICATED_CANTPROCEED);
                actions.auth.logout();
            }
        }
        setStatus(state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.NONE);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!(oobCode && state.auth.status > 0) ||
            state.indicators.specific["auth.handleAuthChange"]) {
            return;
        }
        const st = state.auth.authenticated &&
            (state.api.auth.authorized
                ? STATUS.AUTHORIZED
                : STATUS.AUTHENTICATED_CANTPROCEED);
        if (st) {
            setStatus(st);
        }
    }, [state.auth.status, state.api.auth.authorized]);
    const onFinish = ({ email }) => {
        switch (status) {
            case STATUS.NONE:
                window.localStorage.setItem("emailForSignIn", email);
                setStatus(STATUS.LINK_REQUESTED);
                setEmail(email);
                actions.firebase.requestEmailLink({ email });
                break;
            case STATUS.LINK_NO_EMAIL:
                signIn(email);
        }
    };
    if (state.indicators.isWorking)
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    if (error)
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h2", { className: "heading-2", children: ["Error: ", error] }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, xxl: 12, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: tryAgain, children: "Try again" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, xxl: 12, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => actions.routing.historyPush({ location: "/" }), children: "Get onboarded using your phone" }) })] })] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [state.auth.authenticated ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state.api.auth.authorized ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsxs)("h2", { children: ["Hi", " ", state.api.auth.user?.username ||
                                    state.api.auth.user?.displayName, ", we've been missing you!"] }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)("p", { children: "Please take a few steps to access the brand new version of Newlife." }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => actions.flows.user.create.startLegacyImport(), children: "Continue" })] })) : (status == STATUS.AUTHENTICATED_CANTPROCEED ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Email authorization is only available for existing users of Newlife V1." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { children: ["We could not find your email in our database.", (0, jsx_runtime_1.jsxs)("ul", { className: "app-ul-simple", children: [(0, jsx_runtime_1.jsxs)("li", { children: [email ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["You used the email ", email, (0, jsx_runtime_1.jsx)("br", {})] })) : (""), "Please make sure you are using the same email you were using to access Newlife V1. You may want to", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: tryAgain, children: "Try again" })] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Please make sure you have not migrated your account to v2 yet. If you had", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => actions.routing.historyPush({
                                                            location: "/auth",
                                                        }), children: "Sign in using your phone" })] }), (0, jsx_runtime_1.jsx)("li", { children: "If you still believe this is an error please contact Newlife at info@newlife.io and we will try to help." }), (0, jsx_runtime_1.jsxs)("li", { children: ["Otherwise", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => actions.routing.historyPush({
                                                            location: "/",
                                                        }), children: "Get onboard using your phone" })] })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {})] })] }) :
                    (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), status === STATUS.LINK_REQUESTED && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "super-size font-variant-none", children: "check your inbox" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { style: { width: "30%" }, children: (0, jsx_runtime_1.jsx)(SupportBox_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-3b text-center", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "#", children: "I don't have an account yet!" }) })] })), status === STATUS.NONE && !state.api.auth.user?.id ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "super-size text-center", children: "join newlife.IO" }), (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { customClass: "app-content-layout", children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, name: "basic", initialValues: { email: "" }, onFinish: onFinish, 
                            // onFinishFailed={onFinishFailed}
                            autoComplete: "off", children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "email", rules: [
                                        {
                                            pattern: new RegExp(regexEmail),
                                            message: "Please input valid email.",
                                        },
                                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email" }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-center", children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "auth.firebaseRequestEmailLink", type: "primary", htmlType: "submit", progressText: "Connecting...", children: "Connect my account" }) }) }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b text-center", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: "I don't have an account yet!" }) }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(SupportBox_1.default, {})] }) })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] }));
};
exports.LegacyLogin = LegacyLogin;
const LegacyImport = () => {
    return (0, jsx_runtime_1.jsx)(exports.LegacyLogin, {});
};
exports.LegacyImport = LegacyImport;
//# sourceMappingURL=LegacyImport.js.map