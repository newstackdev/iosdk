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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var ProgressButton_1 = require("../../Components/ProgressButton");
var constants_1 = require("../../constants");
var PostCreateInfo = function (_a) {
    var selectedLicense = _a.selectedLicense, setSelectedLicense = _a.setSelectedLicense, isLicense = _a.isLicense, setIsLicense = _a.setIsLicense, mintConfirmationOpen = _a.mintConfirmationOpen, ncoBalance = _a.ncoBalance;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            flexDirection: "column",
            textAlign: "center",
        } }, { children: [isLicense ? ((0, jsx_runtime_1.jsx)(AddLicense, { selectedLicense: selectedLicense, setSelectedLicense: setSelectedLicense, isLicense: isLicense, setIsLicense: setIsLicense })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)("div", __assign({ style: { marginTop: "20px" } }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ hidden: mintConfirmationOpen || isLicense }, { children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.post.create", type: "primary", htmlType: "submit", className: !selectedLicense ? "disabled-submit-button" : "", disabled: !selectedLicense }, { children: "Share" })) })) }))] })));
};
var AddLicense = function (_a) {
    var selectedLicense = _a.selectedLicense, setSelectedLicense = _a.setSelectedLicense, isLicense = _a.isLicense, setIsLicense = _a.setIsLicense;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { width: "100%", marginTop: "20px" } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "header-5", style: {
                    marginBottom: "20px",
                    textAlign: "center",
                } }, { children: "Add license" })), (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                    height: "60vh",
                    overflow: "auto",
                    paddingRight: "20px",
                    textAlign: "initial",
                } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox.Group, __assign({ value: [selectedLicense.value] }, { children: constants_1.LICENSES.map(function (license) { return ((0, jsx_runtime_1.jsx)(LicenceContent, { description: license[2], shortcut: license[1], type: license[0], link: license[3], setSelectedLicense: setSelectedLicense, setIsLicense: setIsLicense, isLicense: isLicense })); }) })) }))] })));
};
var LicenceContent = function (_a) {
    var type = _a.type, description = _a.description, shortcut = _a.shortcut, link = _a.link, setSelectedLicense = _a.setSelectedLicense, setIsLicense = _a.setIsLicense, isLicense = _a.isLicense;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { flexDirection: "row-reverse" }, justify: "space-between", align: "middle" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 2 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, { value: type, onChange: function () {
                                setSelectedLicense({ name: type, value: shortcut });
                                setIsLicense(!isLicense);
                            } }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 18 }, { children: (0, jsx_runtime_1.jsxs)("p", __assign({ className: "paragraph-2b", style: {
                                margin: 0,
                                flexDirection: "row-reverse",
                            } }, { children: ["(", shortcut, ") ", type] })) }))] })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r", style: { margin: "40px 0 20px 0", color: "#959595" } }, { children: description })), (0, jsx_runtime_1.jsx)("a", __assign({ href: link, target: "_blank", rel: "noreferrer" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2u", style: {
                        marginBottom: "40px",
                        color: "#959595",
                        wordBreak: "break-all",
                    } }, { children: link })) }))] }));
};
exports.default = PostCreateInfo;
//# sourceMappingURL=PostCreateInfo.js.map