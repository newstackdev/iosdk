"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowCheckbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const RowCheckbox = ({ children, onChange, disabled, title, }) => ((0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "full-width", style: title === "report-checkbox"
        ? {
            justifyContent: "space-between",
            flexDirection: "row-reverse",
        }
        : { justifyContent: "flex-start" }, align: "bottom", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { span: 2, title: title, children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, { disabled: disabled, onChange: onChange }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 18, className: "text-left", children: children })] }));
exports.RowCheckbox = RowCheckbox;
//# sourceMappingURL=RowCheckbox.js.map