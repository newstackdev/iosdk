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
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var CrossCircle_1 = require("../../Components/Icons/CrossCircle");
var ThreeDots_1 = require("../../Components/Icons/ThreeDots");
var RowCheckbox_1 = require("../../Components/RowCheckbox");
var PostReportModal = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), visible = _b[0], setVisible = _b[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, __assign({ visible: visible, okText: "Close", onOk: function () { return setVisible(false); }, onCancel: function () { return setVisible(false); }, cancelButtonProps: { hidden: true }, footer: false, className: "nl-white-box-modal post-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "text-left", style: { width: "100%" } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ gutter: 48 }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 24 }, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-3" }, { children: "Report content" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "report-checkbox-wrapper" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 24 }, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "Thanks for keeping the community safe." }))] })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, __assign({ title: "report-checkbox" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Nudity" })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, __assign({ title: "report-checkbox" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Violence" })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, __assign({ title: "report-checkbox" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Harassment" })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, __assign({ title: "report-checkbox" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Spam" })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, __assign({ title: "report-checkbox" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Copyright" })) })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, __assign({ title: "report-checkbox" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5" }, { children: "Self-injury" })) })) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24, style: {
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "40px"
                                } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ type: "primary" }, { children: "Report" })) }))] })) })) })), (0, jsx_runtime_1.jsx)("div", __assign({ onClick: function () { return setVisible(true); } }, { children: (0, jsx_runtime_1.jsx)(ThreeDots_1.ThreeDots, {}) }))] }));
};
exports["default"] = PostReportModal;
