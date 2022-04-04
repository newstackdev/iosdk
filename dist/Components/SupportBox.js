"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const Appearing_1 = require("./Appearing");
const SupportBox = () => {
    return ((0, jsx_runtime_1.jsx)(Appearing_1.AppearingComponent, { seconds: 2, children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "support-box", children: [(0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "Need support?" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2u", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: " Join our telegram group!" }) })] }) }));
};
exports.default = SupportBox;
//# sourceMappingURL=SupportBox.js.map