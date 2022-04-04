"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevealInfo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@ant-design/icons");
const react_1 = require("react");
const RevealInfo = ({ children }) => {
    const [show, setShow] = (0, react_1.useState)(false);
    return show ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) : (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, { onClick: () => setShow(true) });
};
exports.RevealInfo = RevealInfo;
//# sourceMappingURL=RevealInfo.js.map