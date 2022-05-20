import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { Spin } from "../../Components/Spin";
import SupportBox from "../../Components/SupportBox";
import { useActions, useAppState } from "../../overmind";
import { capFirst } from "../../utils/capFirst";
const STATUS = {
    NONE: 0,
    LINK_NO_EMAIL: 1,
    LINK_EMAIL: 2,
    LINK_REQUESTED: 3,
    ERROR: 4,
    AUTHENTICATED_CANTPROCEED: 5,
    AUTHORIZED: 6,
};
export const LegacyLogin = () => {
    const [form] = useForm();
    const actions = useActions();
    const state = useAppState();
    const [status, setStatus] = useState(STATUS.NONE);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
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
            setError(capFirst(ex.code
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
    useEffect(() => {
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
    useEffect(() => {
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
        return _jsx(Spin, {});
    if (error)
        return (_jsxs(_Fragment, { children: [_jsxs("h2", { className: "heading-2", children: ["Error: ", error] }), _jsx("div", { className: "section-divider" }), _jsxs(Row, { children: [_jsx(Col, { xs: 24, xxl: 12, children: _jsx(Button, { onClick: tryAgain, children: "Try again" }) }), _jsx(Col, { xs: 24, xxl: 12, children: _jsx(Button, { onClick: () => actions.routing.historyPush({ location: "/" }), children: "Get onboarded using your phone" }) })] })] }));
    return (_jsxs(_Fragment, { children: [state.auth.authenticated ? (_jsx(_Fragment, { children: state.api.auth.authorized ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "section-divider" }), _jsxs("h2", { children: ["Hi", " ", state.api.auth.user?.username ||
                                    state.api.auth.user?.displayName, ", we've been missing you!"] }), _jsx("div", { className: "section-divider" }), _jsx("p", { children: "Please take a few steps to access the brand new version of Newlife." }), _jsx("div", { className: "section-divider" }), _jsx(Button, { onClick: () => actions.flows.user.create.startLegacyImport(), children: "Continue" })] })) : (status == STATUS.AUTHENTICATED_CANTPROCEED ?
                    _jsxs(_Fragment, { children: [_jsx("h2", { children: "Email authorization is only available for existing users of Newlife V1." }), _jsx("br", {}), _jsxs("p", { children: ["We could not find your email in our database.", _jsxs("ul", { className: "app-ul-simple", children: [_jsxs("li", { children: [email ? (_jsxs(_Fragment, { children: ["You used the email ", email, _jsx("br", {})] })) : (""), "Please make sure you are using the same email you were using to access Newlife V1. You may want to", _jsx("div", { className: "section-divider" }), _jsx(Button, { onClick: tryAgain, children: "Try again" })] }), _jsxs("li", { children: ["Please make sure you have not migrated your account to v2 yet. If you had", _jsx("div", { className: "section-divider" }), _jsx(Button, { onClick: () => actions.routing.historyPush({
                                                            location: "/auth",
                                                        }), children: "Sign in using your phone" })] }), _jsx("li", { children: "If you still believe this is an error please contact Newlife at info@newlife.io and we will try to help." }), _jsxs("li", { children: ["Otherwise", _jsx("div", { className: "section-divider" }), _jsx(Button, { onClick: () => actions.routing.historyPush({
                                                            location: "/",
                                                        }), children: "Get onboard using your phone" })] })] }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {})] })] }) :
                    _jsx(_Fragment, {})) })) : (_jsx(_Fragment, {})), status === STATUS.LINK_REQUESTED && (_jsxs(_Fragment, { children: [_jsx("p", { className: "super-size font-variant-none", children: "check your inbox" }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("div", { style: { width: "30%" }, children: _jsx(SupportBox, {}) }), _jsx("div", { className: "section-divider" }), _jsx("p", { className: "paragraph-3b text-center", children: _jsx(Link, { to: "#", children: "I don't have an account yet!" }) })] })), status === STATUS.NONE && !state.api.auth.user?.id ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "super-size text-center", children: "join newlife.IO" }), _jsx(ContentLayout, { customClass: "app-content-layout", children: _jsxs(Form, { form: form, name: "basic", initialValues: { email: "" }, onFinish: onFinish, 
                            // onFinishFailed={onFinishFailed}
                            autoComplete: "off", children: [_jsx(Form.Item, { name: "email", rules: [
                                        {
                                            pattern: new RegExp(regexEmail),
                                            message: "Please input valid email.",
                                        },
                                    ], children: _jsx(Input, { placeholder: "email" }) }), _jsx(Form.Item, { children: _jsx("div", { className: "text-center", children: _jsx(ProgressButton, { actionName: "auth.firebaseRequestEmailLink", type: "primary", htmlType: "submit", progressText: "Connecting...", children: "Connect my account" }) }) }), _jsx("p", { className: "paragraph-2b text-center", children: _jsx(Link, { to: "/", children: "I don't have an account yet!" }) }), _jsx("div", { className: "section-divider" }), _jsx(SupportBox, {})] }) })] })) : (_jsx(_Fragment, {}))] }));
};
export const LegacyImport = () => {
    return _jsx(LegacyLogin, {});
};
//# sourceMappingURL=LegacyImport.js.map