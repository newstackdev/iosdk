import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Col, Form, Input, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { Link } from "react-router-dom";
import { ProgressButton } from "../../Components/ProgressButton";
import { Spin } from "../../Components/Spin";
import { capFirst } from "../../utils/capFirst";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import SupportBox from "../../Components/SupportBox";
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
            setError(capFirst(ex.code.replace(/^auth\//, "").replace(/-/g, " ")));
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
            if (!state.api.auth.authorized && state.api.auth.user?.id && state.api.auth.user?.status !== "imported") {
                // actions.routing.historyPush({ location: "/" });
                setStatus(STATUS.AUTHENTICATED_CANTPROCEED);
                actions.auth.logout();
            }
        }
        setStatus(state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.NONE);
    }, []);
    useEffect(() => {
        if (!(oobCode && state.auth.status > 0) || state.indicators.specific["auth.handleAuthChange"]) {
            return;
        }
        const st = state.auth.authenticated && (state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.AUTHENTICATED_CANTPROCEED);
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
        return (_jsxs("div", { className: "text-left", children: [_jsxs("h2", { className: "header-2", children: ["Oops! ", error] }), _jsx("div", { className: "section-divider" }), _jsx(Col, { className: "u-margin-bottom-mega", children: _jsx(Button, { onClick: tryAgain, className: "secondary-button", children: _jsx("span", { className: "paragraph-2r", children: "Try again" }) }) }), _jsx(Col, { children: _jsxs("p", { className: "paragraph-2r", onClick: () => actions.routing.historyPush({
                            location: "/",
                        }), children: ["Try", _jsx("span", { className: "paragraph-2u", children: " on mobile" })] }) })] }));
    return (_jsxs(_Fragment, { children: [state.auth.authenticated ? (_jsx(_Fragment, { children: state.api.auth.authorized ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "section-divider" }), _jsxs("h2", { children: ["Hi ", state.api.auth.user?.username || state.api.auth.user?.displayName, ", we've been missing you!"] }), _jsx("div", { className: "section-divider" }), _jsx("p", { children: "Please take a few steps to access the brand new version of Newlife." }), _jsx("div", { className: "section-divider" }), _jsx(Button, { onClick: () => {
                                actions.flows.user.create.startLegacyImport();
                            }, children: "Continue" })] })) : status == STATUS.AUTHENTICATED_CANTPROCEED ? (_jsxs("div", { className: "text-left", children: [_jsx("p", { className: "header-2", children: "Oops! Looks like you didn\u2019t have an existing account." }), _jsx("br", {}), _jsxs("ul", { style: { padding: 0 }, children: [_jsxs("li", { className: "u-margin-bottom-mega", children: [email ? (_jsxs(_Fragment, { children: ["You used the email ", email, _jsx("br", {})] })) : (""), _jsx("b", { children: "Please check your email address is correct." }), _jsx("div", { className: "section-divider" }), _jsx(Button, { onClick: tryAgain, className: "secondary-button", children: _jsx("span", { className: "paragraph-2r", children: "Try again" }) })] }), _jsxs("li", { children: [_jsx("b", { children: "Or make sure you haven\u2019t already connected to Newlife.IO" }), _jsx("div", { className: "section-divider" }), _jsxs(Row, { children: [_jsx(Button, { onClick: () => actions.routing.historyPush({
                                                        location: "/auth",
                                                    }), className: "secondary-button u-margin-right-medium", children: "Sign in" }), _jsx(Button, { onClick: () => actions.routing.historyPush({
                                                        location: "/",
                                                    }), className: "secondary-button", children: _jsxs("p", { className: "paragraph-2r", children: ["Join ", _jsx("span", { className: "paragraph-2u", children: "on mobile" })] }) })] })] })] }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsxs("span", { className: "paragraph-2b", children: ["Still having issues? Email ", _jsx("span", { className: "paragraph-2u", children: "info@newlife.io" })] })] })) : (_jsx(_Fragment, {})) })) : (_jsx(_Fragment, {})), status === STATUS.LINK_REQUESTED && (_jsxs(ContentLayout, { customClass: "app-content-layout", children: [_jsx("p", { className: "super-size text-center nl-legacyImport-title", children: "check your inbox" }), _jsx("div", { className: "nl-onboarding-form" }), _jsx("div", { className: "nl-onboarding-footer", children: _jsxs("p", { className: "paragraph-3b text-center nl-legacyImport-checkYourEmail-description", children: [_jsx(Link, { to: "/", children: "I don't have an account yet!" }), _jsx("div", { className: "section-divider" }), _jsx(SupportBox, {})] }) })] })), status === STATUS.NONE && !state.api.auth.user?.id ? (_jsx(_Fragment, { children: _jsxs(ContentLayout, { customClass: "app-content-layout", children: [_jsx("p", { className: "super-size text-center nl-legacyImport-title", children: "Import account" }), _jsx(Form, { form: form, name: "basic", initialValues: { email: "" }, onFinish: onFinish, 
                            // onFinishFailed={onFinishFailed}
                            autoComplete: "off", className: "nl-onboarding-form", children: _jsx(Form.Item, { name: "email", rules: [
                                    {
                                        pattern: new RegExp(regexEmail),
                                        message: "Please input valid email.",
                                    },
                                ], className: "nl-onboarding-form-item", children: _jsx(Input, { placeholder: "e-mail", className: "nl-onboarding-input nl-legacyImport-email-input" }) }) }), _jsxs("div", { className: "nl-onboarding-footer", children: [_jsx("div", { className: "text-center", children: _jsx(ProgressButton, { actionName: "auth.firebaseRequestEmailLink", type: "primary", htmlType: "submit", progressText: "Connecting...", children: "Connect my account" }) }), _jsxs("div", { children: [_jsx("p", { className: "paragraph-2b text-center", children: _jsx(Link, { to: "/", children: "I don't have an account yet!" }) }), _jsx("div", { className: "section-divider" }), _jsx(SupportBox, {})] })] })] }) })) : (_jsx(_Fragment, {}))] }));
};
export const LegacyImport = () => {
    return _jsx(LegacyLogin, {});
};
//# sourceMappingURL=LegacyImport.js.map