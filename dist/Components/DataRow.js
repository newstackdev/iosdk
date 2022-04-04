"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const DataRow = ({ title, value, link, target }) => !value ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "no value" }) :
    (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: { width: "100%", marginBottom: 24 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { push: 0, span: 8, children: title }), (0, jsx_runtime_1.jsx)(antd_1.Col, { push: 2, span: 14, style: {
                    textOverflow: "ellipsis",
                    textAlign: "right",
                    overflow: "hidden"
                }, children: link ?
                    (0, jsx_runtime_1.jsx)("a", { href: link, target: target === undefined ? "_new" : target, children: value })
                    :
                        value })] });
exports.DataRow = DataRow;
//# sourceMappingURL=DataRow.js.map