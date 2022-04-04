"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashDisplay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TextArea_1 = __importDefault(require("antd/lib/input/TextArea"));
// a unified way to display long hashes
const HashDisplay = ({ hash }) => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(TextArea_1.default, { rows: 3, value: hash || "" }) });
exports.HashDisplay = HashDisplay;
//# sourceMappingURL=CryptoEntities.js.map