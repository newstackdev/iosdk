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
exports.PostCreate = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var form_1 = __importDefault(require("antd/lib/form"));
var react_1 = require("react");
var lodash_1 = require("lodash");
var overmind_1 = require("../../overmind");
var constants_1 = require("../../constants");
var SelectMood_1 = require("../../Components/SelectMood");
var ContentLayout_1 = require("../../Components/ContentLayout");
var ProgressButton_1 = require("../../Components/ProgressButton");
var AddButton_1 = require("../../Components/Icons/AddButton");
var react_switch_1 = __importDefault(require("react-switch"));
var Info_1 = require("../../Components/Icons/Info");
var Form_1 = require("antd/lib/form/Form");
var PostCreateHeader_1 = __importDefault(require("./PostCreateHeader"));
var PostCreateInfo_1 = __importDefault(require("./PostCreateInfo"));
var ExitButton_1 = require("../../Components/Icons/ExitButton");
var Modal_1 = __importDefault(require("antd/lib/modal/Modal"));
var CrossCircle_1 = require("../../Components/Icons/CrossCircle");
var NFTLargeIcon_1 = require("../../Components/Icons/NFTLargeIcon");
var avatar_1 = __importDefault(require("antd/lib/avatar/avatar"));
var Image_1 = require("../../Components/Image");
var initialLicense = { name: constants_1.LICENSES[0][0], value: constants_1.LICENSES[0][1] };
var mintNTFcolor = {
    white: "#FCFCF3",
    purple: "#c46ef7",
    green: "#b3ff00",
    default: "#888888",
};
var PostCreate = function (props) {
    var _a;
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var effects = (0, overmind_1.useEffects)();
    var form = (0, Form_1.useForm)()[0];
    var _b = (0, react_1.useState)(false), mintConfirmationOpen = _b[0], setMintConfirmationOpen = _b[1];
    var _c = (0, react_1.useState)({ name: constants_1.LICENSES[0][0], value: constants_1.LICENSES[0][1] }), selectedLicense = _c[0], setSelectedLicense = _c[1];
    var _d = (0, react_1.useState)(false), isLicense = _d[0], setIsLicense = _d[1];
    var _e = (0, react_1.useState)(""), errMsg = _e[0], setErrMsg = _e[1];
    var _f = (0, react_1.useState)(false), moodMode = _f[0], setMoodMode = _f[1];
    var _g = (0, react_1.useState)(""), contentType = _g[0], setContentType = _g[1];
    var _h = (0, react_1.useState)(false), mintNFTswitch = _h[0], setMintNFTswitch = _h[1];
    var user = state.api.auth.user;
    // balance check
    var balances = ((_a = state.newcoin.account) === null || _a === void 0 ? void 0 : _a.acc_balances) || [];
    var ncoBalance = Number((balances[0] || "").replace(/ NCO$/, "")) || 0;
    // const [moods, setMoods] = useState<MoodReadResponse[]>([]);
    var _j = (0, react_1.useState)({}), post = _j[0], setPost = _j[1];
    var moods = state.api.auth.moods || [];
    actions.routing.setTitle("Create Post");
    (0, react_1.useEffect)(function () {
        actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
    }, []);
    var onFinish = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var f, postForm, p, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Success:", values);
                    if (mintNFTswitch && !mintConfirmationOpen)
                        return [2 /*return*/, setMintConfirmationOpen(true)];
                    setMintConfirmationOpen(false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    if (!contentType) {
                        f = values.file[0];
                        // const contentType = mime.lookup(extname(f.));
                        if (!f.type) {
                            return [2 /*return*/, effects.ux.message.warning("Unrecognized/unsupported content type. Upload something else.")];
                        }
                    }
                    postForm = __assign(__assign({}, values), { contentType: contentType, doMint: mintNFTswitch ? "true" : "", license: selectedLicense.value });
                    return [4 /*yield*/, actions.api.post.create({ postForm: postForm })];
                case 2:
                    p = _a.sent();
                    if (!p)
                        return [2 /*return*/];
                    setMoodMode(true);
                    setPost(p);
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    setErrMsg((0, lodash_1.get)(ex_1, "error.errorMessage.details") ||
                        (0, lodash_1.get)(ex_1, "message") ||
                        "unknown error");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onFinishFailed = function (errorInfo) {
        console.log("Failed:", errorInfo);
    };
    var gtfooh = function (v) {
        actions.api.post.attachToMoods({ moods: v.moods, post: post });
        actions.routing.historyPush({ location: "/post/".concat(post.id) });
        setMoodMode(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "section-divider" }, { children: [(0, jsx_runtime_1.jsx)(form_1.default, __assign({ hidden: moodMode || !post, name: "basic", form: form, initialValues: { remember: true, licence: "BY-0" }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off" }, { children: (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, __assign({ isPost: true, header: (0, jsx_runtime_1.jsx)(PostCreateHeader_1.default, { selectedLicense: selectedLicense, ncoBalance: ncoBalance, contentType: contentType, setContentType: setContentType }), info: (0, jsx_runtime_1.jsx)(PostCreateInfo_1.default, { selectedLicense: selectedLicense, setSelectedLicense: setSelectedLicense, isLicense: isLicense, setIsLicense: setIsLicense, mintConfirmationOpen: mintConfirmationOpen, ncoBalance: ncoBalance }) }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "post-create-form-width" }, { children: [(0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ required: true, name: "title", rules: [
                                    {
                                        required: true,
                                        message: "A couple of words here please",
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5", style: { marginBottom: "20px" } }, { children: "Title" })), (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "A few words\uD83C\uDF19" })] }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ required: true, name: contentType ? "content" : "description", rules: [
                                    {
                                        required: true,
                                        message: "A couple of words here please",
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5", style: { marginBottom: "20px" } }, { children: contentType ? "Post" : "Description" })), (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { placeholder: contentType
                                                ? "A new idea?✨"
                                                : "What's it about?✨" })] }) })), (0, jsx_runtime_1.jsxs)(form_1.default.Item, __assign({ name: "doMint" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", style: {
                                            marginBottom: "10px",
                                        } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Mint NFT" })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ placement: "right", title: ncoBalance === 0
                                                    ? "You do not have enough balance to mint your NFT! Top up!"
                                                    : "Mint your content as an NFT on the Newcoin Network! For now, you can't trade this!", overlayClassName: ncoBalance === 0
                                                    ? "tooltip-zero-balance"
                                                    : "" }, { children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Info_1.Info, { color: ncoBalance === 0
                                                            ? mintNTFcolor.purple
                                                            : mintNTFcolor.white }) }) }))] })), (0, jsx_runtime_1.jsx)(react_switch_1.default, { onChange: function () { return setMintNFTswitch(function (p) { return !p; }); }, checked: mintNFTswitch, checkedIcon: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), uncheckedIcon: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), onColor: ncoBalance === 0
                                            ? mintNTFcolor.purple
                                            : mintNTFcolor.green, offColor: ncoBalance === 0
                                            ? mintNTFcolor.purple
                                            : mintNTFcolor.default, disabled: ncoBalance === 0 ? true : false })] })), (0, jsx_runtime_1.jsxs)(form_1.default.Item, __assign({ name: "license", style: {
                                    marginBottom: "40px",
                                    height: "15vh",
                                } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", style: {
                                            marginBottom: "10px",
                                        } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Creative License" })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, __assign({ placement: "right", title: "Share your content with No Rights Reserved with Creative Commons." }, { children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Info_1.Info, { color: mintNTFcolor.white }) }) }))] })), !isLicense && selectedLicense ? ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "licence-box" }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2b", style: { width: "200px" } }, { children: selectedLicense.name })), (0, jsx_runtime_1.jsx)("span", __assign({ onClick: function () {
                                                    // setSelectedLicense({ name: "");
                                                    setIsLicense(true);
                                                } }, { children: (0, jsx_runtime_1.jsx)(ExitButton_1.ExitButton, {}) }))] }))) : ((0, jsx_runtime_1.jsx)("span", __assign({ onClick: function () {
                                            setSelectedLicense(initialLicense);
                                            setIsLicense(true);
                                        } }, { children: (0, jsx_runtime_1.jsx)(AddButton_1.AddButton, {}) })))] })), (0, jsx_runtime_1.jsx)(form_1.default.Item, { label: "", className: "text-center" })] })) })) })), (0, jsx_runtime_1.jsxs)(Modal_1.default, __assign({ visible: mintConfirmationOpen, onOk: function () { return setMintConfirmationOpen(false); }, onCancel: function () { return setMintConfirmationOpen(false); }, footer: false, 
                //@ts-ignore
                // getContainer={() =>
                // 	document.getElementById("basic")
                // }
                className: "nl-white-box-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { width: "100%" } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: { marginRight: "20px" } }, { children: (0, jsx_runtime_1.jsx)(avatar_1.default, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, user)), className: "avatar-image-top-creators" }) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-1r" }, { children: "your NFT" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-1b" }, { children: user === null || user === void 0 ? void 0 : user.username }))] })] })), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: { marginBottom: "20px" } }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-3" }, { children: "Ready to mint!" })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: { marginBottom: "20px" } }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "You are about to mint your NFT on Newcoin Protocol!" })) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "Summary:" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "1087 $NCO" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "\u2014 5% creator fee" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "\u2014 3% DAO fee" }))] })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ justify: "space-between" }, { children: (0, jsx_runtime_1.jsx)(NFTLargeIcon_1.NFTLargeIcon, {}) })), (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.post.create", type: "primary", 
                        // htmlType="submit"
                        onClick: function () {
                            form.submit();
                        }, className: !selectedLicense
                            ? "disabled-submit-button"
                            : "", disabled: !selectedLicense || ncoBalance === 0
                            ? true
                            : false }, { children: "Mint" }))] })), (0, jsx_runtime_1.jsxs)(form_1.default, __assign({ className: "app-main-full-width", hidden: !moodMode, onFinish: gtfooh }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5", style: { marginBottom: "40px" } }, { children: "Share to your folders" })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "moods", style: { marginBottom: "40px" } }, { children: (0, jsx_runtime_1.jsx)(SelectMood_1.SelectMood, { moods: moods }) })), (0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ label: "", wrapperCol: { offset: 0, span: 24 }, className: "text-right" }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.post.create", type: "primary", htmlType: "submit" }, { children: "Share" })) }))] }))] })));
};
exports.PostCreate = PostCreate;
//# sourceMappingURL=PostCreate.js.map