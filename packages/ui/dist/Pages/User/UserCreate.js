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
exports.UserCreate = exports.CrossCircleErr = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var form_1 = __importDefault(require("antd/lib/form"));
var react_1 = require("react");
var Form_1 = require("antd/lib/form/Form");
var RowCheckbox_1 = require("../../Components/RowCheckbox");
var ContentLayout_1 = require("../../Components/ContentLayout");
var ProgressButton_1 = require("../../Components/ProgressButton");
var CrossCircle_1 = require("../../Components/Icons/CrossCircle");
var state_1 = require("@newcoin-foundation/state");
// ({ embedded, setNext } : React.PropsWithChildren<EmbeddableControl>) => {
var CrossCircleErr = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [children, (0, jsx_runtime_1.jsx)("div", __assign({ className: "error-circle-form " }, { children: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) }))] }));
};
exports.CrossCircleErr = CrossCircleErr;
var UserCreate = function (_a) {
    var hideUsername = _a.hideUsername, noRouing = _a.noRouing, embedded = _a.embedded, setNext = _a.setNext, setIsErrorSubmit = _a.setIsErrorSubmit;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var effects = (0, state_1.useEffects)();
    var form = (0, Form_1.useForm)()[0];
    var username = state.flows.user.create.form.username;
    (0, react_1.useEffect)(function () {
        actions.routing.setBreadcrumbs([{ text: "Create your profile" }]);
    }, []);
    var setNextEmbedded = function () {
        var _a;
        (!((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.username) || state.flows.user.create.legacyToken) && //["invited", "imported", "known"].includes(state.api.auth.user.status || "") &&
            setNext &&
            setNext({
                text: "Next",
                command: function () { return form.submit(); }
            });
        return function () { return setNext && setNext(undefined); };
    };
    var sf = state.flows.user.create.form;
    (0, react_1.useEffect)(setNextEmbedded, [sf]);
    var onFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Creating:", values);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, form.validateFields()];
                case 2:
                    _a.sent();
                    setIsErrorSubmit(false);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1.errorFields.length);
                    setIsErrorSubmit(true);
                    return [2 /*return*/];
                case 4:
                    actions.flows.user.create.create({
                        noRouting: !!noRouing,
                        user: values
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    //     effects.ux.message.error(JSON.stringify(errorInfo))
    // };
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "super-size font-variant-none", style: { marginBottom: "40px" } }, { children: username })), (0, jsx_runtime_1.jsxs)(form_1["default"], __assign({ name: "sign-up-form", form: form, 
                // labelCol={{ span: 6 }}
                wrapperCol: { span: 24 }, 
                // value={{ state }}
                onFinish: onFinish, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off", onFieldsChange: function (_ch, all) {
                    var upd = _ch.reduce(function (r, c) {
                        var _a;
                        // @ts-ignore
                        return (__assign(__assign({}, r), (_a = {}, _a[c.name[0]] = c.value || c.values, _a)));
                    }, sf);
                    actions.flows.user.create.updateForm(upd);
                }, initialValues: sf }, { children: [(0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "username", hidden: hideUsername, rules: [
                            {
                                required: !hideUsername,
                                validator: function (_, v) {
                                    return /^[A-Za-z0-9\.]{4,12}$/.test(v)
                                        ? Promise.resolve()
                                        : Promise.reject();
                                },
                                // validator: (_, v) => (/^[\w](?!.*?\.{2})[\w.]{1,9}[\w]$/.test(v)) ? Promise.resolve() : Promise.reject(),
                                message: "Please input your username!"
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "username", suffix: (0, jsx_runtime_1.jsx)(exports.CrossCircleErr, {}) }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "displayName", rules: [
                            {
                                required: false
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "name", suffix: (0, jsx_runtime_1.jsx)(exports.CrossCircleErr, {}) }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "email", rules: [
                            {
                                pattern: new RegExp(re),
                                message: "Please input valid email."
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email", suffix: (0, jsx_runtime_1.jsx)(exports.CrossCircleErr, {}) }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "description" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { placeholder: "bio" }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "website" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "website" }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "instagram" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "instagram" }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "tumblr" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "tumblr" }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "soundcloud" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "soundcloud" }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "twitter" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "twitter" }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "consentPrivacyPolicy", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 } }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: 0 } }, { children: "I agree to Newlife's privacy policy" })) }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, rules: [
                            {
                                required: true
                            },
                        ] }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: 0 } }, { children: "I consent to email communications" })) }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 } }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: 0 } }, { children: "I'd like to join the beta group!" })) }) })), (0, jsx_runtime_1.jsx)(form_1["default"].Item, __assign({ hidden: embedded, wrapperCol: { offset: 8, span: 16 } }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.user.create", type: "primary", htmlType: "submit" }, { children: "Submit" })) }))] }))] }));
};
exports.UserCreate = UserCreate;
