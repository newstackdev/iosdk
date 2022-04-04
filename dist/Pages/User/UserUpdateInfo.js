"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const form_1 = __importDefault(require("antd/lib/form"));
const ProgressButton_1 = require("../../Components/ProgressButton");
const UserUpdateInfo = ({ embedded, }) => {
    return ((0, jsx_runtime_1.jsx)(form_1.default.Item, { hidden: embedded, style: { height: "100%", display: "flex", alignItems: "end" }, children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.user.update", type: "primary", htmlType: "submit", progressText: "Updating info...", children: "Save" }) }));
};
exports.default = UserUpdateInfo;
//# sourceMappingURL=UserUpdateInfo.js.map