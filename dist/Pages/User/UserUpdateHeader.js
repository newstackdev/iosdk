"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const SupportBox_1 = __importDefault(require("../../Components/SupportBox"));
const PicturesWall_1 = require("../../Components/PicturesWall");
const overmind_1 = require("../../overmind");
const UserUpdateHeader = () => {
    const state = (0, overmind_1.useAppState)();
    const sf = state.api.auth.user || {};
    return ((0, jsx_runtime_1.jsxs)("div", { className: "post-create-header-wrapper", children: [(0, jsx_runtime_1.jsx)("div", { className: "post-back-arrow", style: { padding: "0px 20px" } }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "column",
                }, children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { style: { flexDirection: "column" }, children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto" }, children: "Edit Profile" }), (0, jsx_runtime_1.jsx)(antd_1.Row, { justify: "center", className: "full-width-only", children: (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 18, children: (0, jsx_runtime_1.jsx)(form_1.default.Item
                                    // label="Avatar"
                                    , { 
                                        // label="Avatar"
                                        name: "file", children: (0, jsx_runtime_1.jsx)(PicturesWall_1.PictureWallFormItem, { uploadText: "Upload avatar" }) }) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { readOnly: true, placeholder: "your domain" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "displayName", rules: [
                                    {
                                        required: true,
                                        message: "Display name must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "display name" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "description", children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { placeholder: "bio" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "email", required: true, rules: [
                                    {
                                        required: true,
                                        message: "Please enter your email",
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "email" }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, { style: { flex: 1, flexDirection: "column" }, children: (0, jsx_runtime_1.jsx)(SupportBox_1.default, {}) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {})] })] }));
};
exports.default = UserUpdateHeader;
//# sourceMappingURL=UserUpdateHeader.js.map