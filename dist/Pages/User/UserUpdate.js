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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdate = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var form_1 = __importDefault(require("antd/lib/form"));
var overmind_1 = require("../../overmind");
var Form_1 = require("antd/lib/form/Form");
var PicturesWall_1 = require("../../Components/PicturesWall");
var RowCheckbox_1 = require("../../Components/RowCheckbox");
var lodash_1 = require("lodash");
var react_1 = require("react");
var Image_1 = require("../../Components/Image");
var ContentLayout_1 = require("../../Components/ContentLayout");
var UserUpdate = function (_a) {
    var 
    // hideUsername,
    // noRouing,
    embedded = _a.embedded, setNext = _a.setNext;
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var effects = (0, overmind_1.useEffects)();
    var form = (0, Form_1.useForm)()[0];
    (0, react_1.useEffect)(function () {
        actions.api.user.getCurrent();
    }, []);
    var onFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Success:", values);
                    return [4 /*yield*/, actions.api.user.update({
                            user: (0, lodash_1.omit)(values, "file"),
                            file: (_a = values.file) === null || _a === void 0 ? void 0 : _a.fileList[0],
                        })];
                case 1:
                    _b.sent();
                    actions.routing.historyPush({ location: "/my/profile" });
                    return [2 /*return*/];
            }
        });
    }); };
    var onFinishFailed = function (errorInfo) {
        console.log("Failed:", errorInfo);
        effects.ux.message.error(JSON.stringify(errorInfo));
    };
    var sf = state.api.auth.user || {};
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { children: (0, jsx_runtime_1.jsxs)(form_1.default, __assign({ name: "basic", wrapperCol: { span: 24 }, className: "text-center", form: form, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", initialValues: sf }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ justify: "center", gutter: 12, className: "full-width-only" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 8 }, { children: (0, jsx_runtime_1.jsx)(form_1.default.Item, { children: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, sf, { neverHide: true })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 14 }, { children: (0, jsx_runtime_1.jsx)(form_1.default.Item
                            // label="Avatar"
                            , __assign({ 
                                // label="Avatar"
                                name: "file" }, { children: (0, jsx_runtime_1.jsx)(PicturesWall_1.PictureWallFormItem, { uploadText: "Upload avatar" }) })) }))] })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "username" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { readOnly: true }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "firstName", rules: [
                        {
                            required: true,
                            message: "Username must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "name" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "lastName", rules: [
                        { required: true, message: "Please input your last name!" },
                    ] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "last name" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "email", required: true, rules: [{ required: true, message: "Please enter your email" }] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "description" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { placeholder: "bio" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "website" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "website" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "instagram", rules: [{ required: true, message: "Your instagram please" }] }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "instagram" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item
                // label="Tumblr"
                , __assign({ 
                    // label="Tumblr"
                    name: "tumblr" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "tumblr" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "soundcloud" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "soundcloud" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "twitter" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "twitter" }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "consentPrivacyPolicy", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 } }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: 0 } }, { children: "I agree to Newlife's privacy policy" })) }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, rules: [
                        {
                            required: true,
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: 0 } }, { children: "I consent to email communications" })) }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 } }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: 0 } }, { children: "I'd like to join the beta group!" })) }) }))] })) }));
};
exports.UserUpdate = UserUpdate;
//# sourceMappingURL=UserUpdate.js.map