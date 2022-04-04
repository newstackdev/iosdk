"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const PicturesWall_1 = require("../../Components/PicturesWall");
const Text_1 = require("../../Components/Icons/Text");
const Image_1 = require("../../Components/Icons/Image");
const Video_1 = require("../../Components/Icons/Video");
const SupportBox_1 = __importDefault(require("../../Components/SupportBox"));
const PostCreateHeader = ({ contentType, setContentType }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "post-create-header-wrapper", children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
                flex: 1,
                justifyContent: "space-between",
                flexDirection: "column",
            }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto" }, children: "Upload node" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: { flex: 1, flexDirection: "column" }, children: [!contentType ? ((0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "file", valuePropName: "fileList", getValueFromEvent: (ev) => {
                                return ev?.target?.files || [];
                            }, rules: [
                                {
                                    required: !contentType,
                                    message: "What are you uploading?",
                                },
                            ], children: (0, jsx_runtime_1.jsx)("div", { style: { margin: "auto" }, children: (0, jsx_runtime_1.jsxs)(PicturesWall_1.PicturesWall, { name: "uploadNode", listType: "picture-card", className: "avatar-uploader", showUploadList: false, 
                                    // setContentType={setContentType}
                                    contentType: contentType, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                marginRight: "20px",
                                                cursor: "pointer",
                                            }, onClick: (e) => {
                                                e.stopPropagation();
                                                setContentType("text/plain");
                                            }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, {}) }), (0, jsx_runtime_1.jsx)("span", { style: { marginRight: "20px" }, children: (0, jsx_runtime_1.jsx)(Image_1.Image, {}) }), (0, jsx_runtime_1.jsx)(Video_1.Video, {})] }) }) })) : ((0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "content", children: (0, jsx_runtime_1.jsx)("div", { style: { margin: "auto" }, className: "content-uploader", children: (0, jsx_runtime_1.jsxs)(PicturesWall_1.PicturesWall, { children: [(0, jsx_runtime_1.jsx)("span", { onClick: (e) => {
                                                e.stopPropagation();
                                            }, children: (0, jsx_runtime_1.jsx)(Text_1.Text, {}) }), (0, jsx_runtime_1.jsxs)("div", { onClick: (e) => {
                                                e.stopPropagation();
                                                setContentType("");
                                            }, style: {
                                                bottom: 0,
                                                left: 0,
                                                position: "absolute",
                                            }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                        marginRight: "20px",
                                                        cursor: "pointer",
                                                    }, children: (0, jsx_runtime_1.jsx)(Image_1.Image, {}) }), (0, jsx_runtime_1.jsx)("span", { style: {
                                                        cursor: "pointer",
                                                    }, children: (0, jsx_runtime_1.jsx)(Video_1.Video, {}) })] })] }) }) })), (0, jsx_runtime_1.jsx)(SupportBox_1.default, {})] })] }) }));
};
exports.default = PostCreateHeader;
//# sourceMappingURL=PostCreateHeader.js.map