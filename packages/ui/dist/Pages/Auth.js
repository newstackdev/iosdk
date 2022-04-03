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
exports.__esModule = true;
exports.Auth = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var form_1 = __importDefault(require("antd/lib/form"));
// import '../App.css';
var react_1 = require("react");
var ProgressButton_1 = require("../Components/ProgressButton");
var UserCreate_1 = require("./User/UserCreate");
var IndeterminateProgress_1 = require("../Components/IndeterminateProgress");
var state_1 = require("@newcoin-foundation/state");
var state_2 = require("@newcoin-foundation/state/dist/src/auth/state");
var layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
};
var Auth = function (_a) {
    var embedded = _a.embedded, setNext = _a.setNext, setIsErrorSubmit = _a.setIsErrorSubmit;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var phoneForm = form_1["default"].useForm()[0];
    var codeForm = form_1["default"].useForm()[0];
    var _b = (0, react_1.useState)(false), authFormErr = _b[0], setAuthFormErr = _b[1];
    (0, react_1.useEffect)(function () {
        actions.routing.setBreadcrumbs([{ text: "Auth" }]);
    }, []);
    (0, react_1.useEffect)(function () {
        if (state.api.auth.authorized && state.routing.location === "/auth")
            actions.routing.historyPush({ location: "/explore" });
    }, [state.api.auth.authorized, state.routing.location]);
    var _setNext = function () {
        embedded &&
            setNext &&
            setNext(state.auth.status === state_2.AUTH_FLOW_STATUS.ANONYMOUS
                ? {
                    text: "Send verification",
                    command: function () { return phoneForm.submit(); }
                }
                : state.auth.status === state_2.AUTH_FLOW_STATUS.RECEIVED
                    ? { text: "Verify", command: function () { return codeForm.submit(); } }
                    : undefined);
        return function () { return setNext && setNext(undefined); };
    };
    (0, react_1.useEffect)(_setNext, [state.auth.status]);
    (0, react_1.useEffect)(_setNext, []);
    // if (state.auth.authenticated && state.api.auth.user.id)
    // 	if (state.auth.authenticated)
    // 		return (
    // 			<p>
    // 				You are logged in. Go <Link to="/explore">explore</Link>!
    // 			</p>
    // 		);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "app-main-centered" }, { children: [(0, jsx_runtime_1.jsx)("div", { id: "sign-in-button" }), (0, jsx_runtime_1.jsxs)(form_1["default"], __assign({ form: phoneForm, hidden: state.auth.status != state_2.AUTH_FLOW_STATUS.ANONYMOUS }, layout, { name: "basic", initialValues: { phone: "+420111111111" }, onFinish: function (_a) {
                    var phone = _a.phone;
                    actions.firebase.requestToken({ phone: phone });
                    // phoneForm.resetFields();
                }, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off" }, { children: [(0, jsx_runtime_1.jsx)(form_1["default"].Item
                    // label="Phone"
                    , __assign({ 
                        // label="Phone"
                        name: "phone", rules: [
                            {
                                required: true,
                                message: "The phone number is invalid.",
                                pattern: new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,7}$")
                            },
                        ], style: { height: "50px" } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { className: "text-center", placeholder: "enter phone number", suffix: (0, jsx_runtime_1.jsx)(UserCreate_1.CrossCircleErr, {}), onChange: function () {
                                return phoneForm
                                    .validateFields()
                                    .then(function () {
                                    setIsErrorSubmit(false);
                                })["catch"](function (e) {
                                    var _a, _b;
                                    console.log((_a = e.errorFields) === null || _a === void 0 ? void 0 : _a.length);
                                    if ((_b = e.errorFields) === null || _b === void 0 ? void 0 : _b.length) {
                                        setIsErrorSubmit(true);
                                    }
                                    else
                                        ;
                                });
                            } }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ wrapperCol: __assign(__assign({}, layout.wrapperCol), { offset: layout.labelCol.span }), hidden: embedded }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ hidden: embedded, type: "primary", htmlType: "submit" }, { children: "Send verification" })) }))] })), (0, jsx_runtime_1.jsxs)(form_1["default"], __assign({ form: codeForm }, layout, { hidden: state.auth.status !== state_2.AUTH_FLOW_STATUS.RECEIVED, name: "basic", initialValues: { phoneVerificationCode: "" }, onFinish: function (_a) {
                    var phoneVerificationCode = _a.phoneVerificationCode;
                    return actions.firebase.verifyPhone({
                        phoneVerificationCode: phoneVerificationCode
                    });
                }, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off" }, { children: [(0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ label: "Phone verification", name: "phoneVerificationCode", rules: [
                            {
                                required: true,
                                message: "Enter your verification code"
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { className: "text-center", placeholder: "enter verification code", suffix: (0, jsx_runtime_1.jsx)(UserCreate_1.CrossCircleErr, {}), onChange: function () {
                                return codeForm
                                    .validateFields()
                                    .then(function () {
                                    setIsErrorSubmit(false);
                                })["catch"](function (e) {
                                    var _a, _b;
                                    console.log((_a = e.errorFields) === null || _a === void 0 ? void 0 : _a.length);
                                    if ((_b = e.errorFields) === null || _b === void 0 ? void 0 : _b.length) {
                                        setIsErrorSubmit(true);
                                    }
                                });
                            } }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ wrapperCol: __assign(__assign({}, layout.wrapperCol), { offset: layout.labelCol.span }), hidden: embedded }, { children: !embedded && ((0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "auth.firebaseVerifyPhone", type: "primary", htmlType: "submit" }, { children: "Submit" }))) }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ style: { maxWidth: 640, margin: "auto" } }, { children: (0, jsx_runtime_1.jsx)(IndeterminateProgress_1.IndeterminateProgressAction, { actionName: "auth.firebaseVerifyPhone" }) }))] })));
};
exports.Auth = Auth;
