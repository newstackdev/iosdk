"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const Title = ({ title, href }) => {
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { justify: "space-between", align: "middle", className: "title", children: [title && (0, jsx_runtime_1.jsx)("h2", { className: "header-2", children: title }), href ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { className: "paragraph-2b", to: href || "", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { className: "secondary-button", children: (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2b", children: "See all" }) }) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] }));
};
exports.default = Title;
//# sourceMappingURL=Title.js.map