"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareButton = exports.Share = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Modal_1 = __importDefault(require("antd/lib/modal/Modal"));
const react_1 = require("react");
const overmind_1 = require("../overmind");
const CrossCircle_1 = require("./Icons/CrossCircle");
const Share = ({ url }) => ((0, jsx_runtime_1.jsx)(antd_1.Input, { value: url }));
exports.Share = Share;
const ShareButton = () => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const state = (0, overmind_1.useAppState)();
    const url = [
        window.location.protocol,
        "//",
        window.location.host,
        state.routing.location,
    ].join("");
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isVisible ? ((0, jsx_runtime_1.jsx)(Modal_1.default, { closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), visible: isVisible, onCancel: () => setIsVisible(false), onOk: () => setIsVisible(false), className: "nl-white-box-modal", children: (0, jsx_runtime_1.jsx)(exports.Share, { url: url }) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => setIsVisible(true), children: "Share link" })] }));
};
exports.ShareButton = ShareButton;
//# sourceMappingURL=Share.js.map