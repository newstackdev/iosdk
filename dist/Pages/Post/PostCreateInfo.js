import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, Col, Row } from "antd";
import { ContentPreview } from "../../Components/EmbedContent/ContentPreview";
import { LICENSES } from "../../constants";
import { ProgressButton } from "../../Components/ProgressButton";
import isEmpty from "lodash/isEmpty";
const PostCreateInfo = ({ selectedLicense, setSelectedLicense, isLicense, setIsLicense, mintConfirmationOpen, content, embedSwitch, contentType, isLoading, ncoBalance, }) => {
    return (_jsx(_Fragment, { children: isLicense ? (_jsx(AddLicense, { selectedLicense: selectedLicense, setSelectedLicense: setSelectedLicense, isLicense: isLicense, setIsLicense: setIsLicense })) : !mintConfirmationOpen ? (_jsxs("div", { style: {
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "end",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
            }, children: [embedSwitch && contentType === "text/plain" && !isEmpty(content) && !isLoading && _jsx(ContentPreview, { content: content }), _jsx(ProgressButton, { actionName: "api.post.create", type: "primary", progressText: "Creating post...", htmlType: "submit", className: !selectedLicense ? "disabled-submit-button" : "", disabled: !selectedLicense, children: "Share" })] })) : (false) }));
};
const AddLicense = ({ selectedLicense, setSelectedLicense, isLicense, setIsLicense }) => {
    return (_jsxs(_Fragment, { children: [_jsx("p", { className: "header-5", style: {
                    marginBottom: "20px",
                    textAlign: "center",
                }, children: "Add license" }), _jsx("div", { className: "scrollable-licences", children: _jsx(Checkbox.Group, { value: [selectedLicense.value], children: LICENSES.map((license) => (_jsx(LicenceContent, { description: license[2], shortcut: license[1], type: license[0], link: license[3], setSelectedLicense: setSelectedLicense, setIsLicense: setIsLicense, isLicense: isLicense }))) }) })] }));
};
const LicenceContent = ({ type, description, shortcut, link, setSelectedLicense, setIsLicense, isLicense }) => (_jsxs(_Fragment, { children: [_jsxs(Row, { style: { flexDirection: "row-reverse" }, justify: "space-between", align: "middle", children: [_jsx(Col, { sm: 2, children: _jsx(Checkbox, { value: type, onChange: () => {
                            setSelectedLicense({ name: type, value: shortcut });
                            setIsLicense(!isLicense);
                        } }) }), _jsx(Col, { sm: 18, children: _jsxs("p", { className: "paragraph-2b", style: {
                            margin: 0,
                            flexDirection: "row-reverse",
                        }, children: ["(", shortcut, ") ", type] }) })] }), _jsx("p", { className: "paragraph-2r", style: { margin: "40px 0 20px 0", color: "#959595" }, children: description }), _jsx("a", { href: link, target: "_blank", rel: "noreferrer", children: _jsx("p", { className: "paragraph-2u", style: {
                    marginBottom: "40px",
                    color: "#959595",
                    wordBreak: "break-all",
                }, children: link }) })] }));
export default PostCreateInfo;
//# sourceMappingURL=PostCreateInfo.js.map