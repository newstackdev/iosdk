"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.RowCheckbox = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var RowCheckbox = function (_a) {
    var children = _a.children, onChange = _a.onChange, disabled = _a.disabled, title = _a.title;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "full-width", style: title === "report-checkbox"
            ? {
                justifyContent: "space-between",
                flexDirection: "row-reverse"
            }
            : { justifyContent: "flex-start" }, align: "bottom" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 2, title: title }, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, { disabled: disabled, onChange: onChange }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 18, className: "text-left" }, { children: children }))] })));
};
exports.RowCheckbox = RowCheckbox;
