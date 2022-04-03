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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LegacyImport = exports.LegacyLogin = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@newcoin-foundation/core");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var Form_1 = require("antd/lib/form/Form");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ProgressButton_1 = require("../../Components/ProgressButton");
var Spin_1 = require("../../Components/Spin");
var SupportBox_1 = __importDefault(require("../../Components/SupportBox"));
var STATUS = {
    NONE: 0,
    LINK_NO_EMAIL: 1,
    LINK_EMAIL: 2,
    LINK_REQUESTED: 3,
    ERROR: 4,
    AUTHENTICATED_CANTPROCEED: 5,
    AUTHORIZED: 6
};
var LegacyLogin = function () {
    var _a, _b;
    var form = (0, Form_1.useForm)()[0];
    var actions = (0, state_1.useActions)();
    var state = (0, state_1.useAppState)();
    var _c = (0, react_1.useState)(STATUS.NONE), status = _c[0], setStatus = _c[1];
    var _d = (0, react_1.useState)(""), email = _d[0], setEmail = _d[1];
    var _e = (0, react_1.useState)(""), error = _e[0], setError = _e[1];
    // const indicators = state.indicators.specific;
    // const authorizing = state.auth.status > 0 && !state.auth.authorized && !state.auth.authenticated;
    // oobCode &&
    // ["auth.newlifeAuthorize", "auth.refreshApiToken", "auth.firebaseSignInWithEmailLink"]
    //     .find(n => indicators[n]);
    var oobCode = new URLSearchParams(window.location.search).get("oobCode");
    var signIn = function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, actions.firebase.signInWithEmailLink({ email: email })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    ex_1 = _a.sent();
                    setStatus(STATUS.ERROR);
                    setError((0, core_1.capFirst)(ex_1.code
                        .replace(/^auth\//, "")
                        .replace(/-/g, " ")));
                    actions.auth.logout({ noRouting: true });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var tryAgain = function () {
        actions.routing.historyPush({ location: "/auth/legacy" });
        setStatus(STATUS.NONE);
        setError("");
        actions.auth.logout({ noRouting: true });
    };
    (0, react_1.useEffect)(function () {
        var _a;
        if (state.flows.user.create.legacyToken)
            actions.flows.user.create.stopLegacyImport({ noRedirect: true });
        if (oobCode) {
            var email_1 = window.localStorage.getItem("emailForSignIn") || "";
            setStatus(email_1 ? STATUS.LINK_EMAIL : STATUS.LINK_NO_EMAIL);
            email_1 && signIn(email_1);
        }
        else if (state.auth.authenticated) {
            if (!state.api.auth.authorized &&
                ((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.status) !== "imported") {
                // actions.routing.historyPush({ location: "/" });
                setStatus(STATUS.AUTHENTICATED_CANTPROCEED);
                actions.auth.logout();
            }
        }
        setStatus(state.api.auth.authorized ? STATUS.AUTHORIZED : STATUS.NONE);
    }, []);
    (0, react_1.useEffect)(function () {
        if (!(oobCode && state.auth.status > 0) ||
            state.indicators.specific["auth.handleAuthChange"]) {
            return;
        }
        var st = state.auth.authenticated &&
            (state.api.auth.authorized
                ? STATUS.AUTHORIZED
                : STATUS.AUTHENTICATED_CANTPROCEED);
        if (st) {
            setStatus(st);
        }
    }, [state.auth.status, state.api.auth.authorized]);
    var onFinish = function (_a) {
        var email = _a.email;
        switch (status) {
            case STATUS.NONE:
                window.localStorage.setItem("emailForSignIn", email);
                setStatus(STATUS.LINK_REQUESTED);
                setEmail(email);
                actions.firebase.requestEmailLink({ email: email });
                break;
            case STATUS.LINK_NO_EMAIL:
                signIn(email);
        }
    };
    if (state.indicators.isWorking)
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    if (error)
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h2", __assign({ className: "heading-2" }, { children: ["Error: ", error] })), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, xxl: 12 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: tryAgain }, { children: "Try again" })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, xxl: 12 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: function () { return actions.routing.historyPush({ location: "/" }); } }, { children: "Get onboarded using your phone" })) }))] })] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [state.auth.authenticated ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: state.api.auth.authorized ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsxs)("h2", { children: ["Hi", " ", (_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.username
                                // TODO: investigate model
                                //  || state.api.auth.user?.displayName
                                , ", we've been missing you!"] }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)("p", { children: "Please take a few steps to access the brand new version of Newlife." }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: function () { return actions.flows.user.create.startLegacyImport(); } }, { children: "Continue" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Email authorization is only available for existing users of Newlife V1." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", { children: ["We could not find your email in our database.", (0, jsx_runtime_1.jsxs)("ul", __assign({ className: "app-ul-simple" }, { children: [(0, jsx_runtime_1.jsxs)("li", { children: [email ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["You used the email ", email, (0, jsx_runtime_1.jsx)("br", {})] })) : (""), "Please make sure you are using the same email you were using to access Newlife V1. You may want to", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: tryAgain }, { children: "Try again" }))] }), (0, jsx_runtime_1.jsxs)("li", { children: ["Please make sure you have not migrated your account to v2 yet. If you had", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: function () {
                                                        return actions.routing.historyPush({
                                                            location: "/auth"
                                                        });
                                                    } }, { children: "Sign in using your phone" }))] }), (0, jsx_runtime_1.jsx)("li", { children: "If you still believe this is an error please contact Newlife at info@newlife.io and we will try to help." }), (0, jsx_runtime_1.jsxs)("li", { children: ["Otherwise", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: function () {
                                                        return actions.routing.historyPush({
                                                            location: "/"
                                                        });
                                                    } }, { children: "Get onboard using your phone" }))] })] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {})] })] })) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), status == STATUS.LINK_REQUESTED ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Please check your inbox at ", email] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), status === STATUS.NONE && !((_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.id) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "super-size font-variant-none" }, { children: "join NewLife.IO" })), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsxs)(antd_1.Form, __assign({ form: form, name: "basic", initialValues: { email: "" }, onFinish: onFinish, 
                        // onFinishFailed={onFinishFailed}
                        autoComplete: "off" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "email", rules: [{ required: true, message: "Enter your email" }] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email" }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "text-center" }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "auth.firebaseRequestEmailLink", type: "primary", htmlType: "submit" }, { children: "Connect my account" })) })) }), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r text-center" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/" }, { children: "I don't have an account yet!" })) })), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(SupportBox_1["default"], {})] }))] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] }));
};
exports.LegacyLogin = LegacyLogin;
var LegacyImport = function () {
    return (0, jsx_runtime_1.jsx)(exports.LegacyLogin, {});
};
exports.LegacyImport = LegacyImport;
