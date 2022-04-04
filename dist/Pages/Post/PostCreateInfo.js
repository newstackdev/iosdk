"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const ProgressButton_1 = require("../../Components/ProgressButton");
const constants_1 = require("../../constants");
const PostCreateInfo = ({ selectedLicense, setSelectedLicense, isLicense, setIsLicense, mintConfirmationOpen, ncoBalance, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
            flexDirection: "column",
            textAlign: "center",
        }, children: [isLicense ? ((0, jsx_runtime_1.jsx)(AddLicense, { selectedLicense: selectedLicense, setSelectedLicense: setSelectedLicense, isLicense: isLicense, setIsLicense: setIsLicense })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("span", { hidden: mintConfirmationOpen || isLicense, children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.post.create", type: "primary", progressText: "Creating post...", htmlType: "submit", className: !selectedLicense ? "disabled-submit-button" : "", disabled: !selectedLicense, children: "Share" }) }) })] }));
};
const AddLicense = ({ selectedLicense, setSelectedLicense, isLicense, setIsLicense }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "header-5", style: {
                    marginBottom: "20px",
                    textAlign: "center",
                }, children: "Add license" }), (0, jsx_runtime_1.jsx)("div", { className: "scrollable-licences", children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox.Group, { value: [selectedLicense.value], children: constants_1.LICENSES.map((license) => ((0, jsx_runtime_1.jsx)(LicenceContent, { description: license[2], shortcut: license[1], type: license[0], link: license[3], setSelectedLicense: setSelectedLicense, setIsLicense: setIsLicense, isLicense: isLicense }))) }) })] }));
};
const LicenceContent = ({ type, description, shortcut, link, setSelectedLicense, setIsLicense, isLicense, }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { style: { flexDirection: "row-reverse" }, justify: "space-between", align: "middle", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 2, children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, { value: type, onChange: () => {
                            setSelectedLicense({ name: type, value: shortcut });
                            setIsLicense(!isLicense);
                        } }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 18, children: (0, jsx_runtime_1.jsxs)("p", { className: "paragraph-2b", style: {
                            margin: 0,
                            flexDirection: "row-reverse",
                        }, children: ["(", shortcut, ") ", type] }) })] }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", style: { margin: "40px 0 20px 0", color: "#959595" }, children: description }), (0, jsx_runtime_1.jsx)("a", { href: link, target: "_blank", rel: "noreferrer", children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2u", style: {
                    marginBottom: "40px",
                    color: "#959595",
                    wordBreak: "break-all",
                }, children: link }) })] }));
exports.default = PostCreateInfo;
//# sourceMappingURL=PostCreateInfo.js.map