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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var form_1 = __importDefault(require("antd/lib/form"));
var LargeArrowBack_1 = require("../../Components/Icons/LargeArrowBack");
var PicturesWall_1 = require("../../Components/PicturesWall");
var Text_1 = require("../../Components/Icons/Text");
var Image_1 = require("../../Components/Icons/Image");
var Video_1 = require("../../Components/Icons/Video");
var SupportBox_1 = __importDefault(require("../../Components/SupportBox"));
var PostCreateHeader = function (_a) {
    var selectedLicense = _a.selectedLicense, ncoBalance = _a.ncoBalance, contentType = _a.contentType, setContentType = _a.setContentType;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "post-create-header-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "post-back-arrow", style: { padding: "0px 20px" } }, { children: (0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}) })), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-center header-5", style: { margin: "0 auto 20px auto" } }, { children: "Upload node" })) }), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { flex: 1, flexDirection: "column" } }, { children: [!contentType ? ((0, jsx_runtime_1.jsx)(form_1.default.Item, __assign({ name: "file", valuePropName: "fileList", getValueFromEvent: function (ev) {
                                    var _a;
                                    return ((_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.files) || [];
                                }, rules: [
                                    {
                                        required: !contentType,
                                        message: "What are you uploading?",
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: { margin: "auto" } }, { children: (0, jsx_runtime_1.jsxs)(PicturesWall_1.PicturesWall, __assign({ name: "avatar", listType: "picture-card", className: "avatar-uploader", showUploadList: false, 
                                        // setContentType={setContentType}
                                        contentType: contentType }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: { marginRight: "20px", cursor: "pointer" }, onClick: function (e) {
                                                    e.stopPropagation();
                                                    setContentType("text/plain");
                                                } }, { children: (0, jsx_runtime_1.jsx)(Text_1.Text, {}) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: { marginRight: "20px" } }, { children: (0, jsx_runtime_1.jsx)(Image_1.Image, {}) })), (0, jsx_runtime_1.jsx)(Video_1.Video, {})] })) })) }))) : ((0, jsx_runtime_1.jsxs)(form_1.default.Item, __assign({ name: "content", style: {
                                    alignItems: "center",
                                    display: "flex",
                                    flex: 1,
                                } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: {
                                            marginBottom: "100px",
                                            textAlign: "center",
                                        } }, { children: (0, jsx_runtime_1.jsx)(Text_1.Text, {}) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ onClick: function () { return setContentType(""); } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: {
                                                    marginRight: "20px",
                                                    cursor: "pointer",
                                                } }, { children: (0, jsx_runtime_1.jsx)(Image_1.Image, {}) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: {
                                                    cursor: "pointer",
                                                } }, { children: (0, jsx_runtime_1.jsx)(Video_1.Video, {}) }))] }))] }))), (0, jsx_runtime_1.jsx)(SupportBox_1.default, {})] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {})] }))] })));
};
exports.default = PostCreateHeader;
//# sourceMappingURL=PostCreateHeader.js.map