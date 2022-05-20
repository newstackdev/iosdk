import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { ThreeDots } from "../../Components/Icons/ThreeDots";
import { RowCheckbox } from "../../Components/RowCheckbox";
const PostReportModal = ({ children }) => {
    const [visible, setVisible] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { visible: visible, okText: "Close", onOk: () => setVisible(false), onCancel: () => setVisible(false), cancelButtonProps: { hidden: true }, footer: false, className: "nl-white-box-modal post-modal", closeIcon: _jsx(CrossCircle, {}), children: _jsx("div", { className: "text-left", style: { width: "100%" }, children: _jsxs(Row, { gutter: 48, children: [_jsxs(Col, { span: 24, children: [_jsx("br", {}), _jsx("p", { className: "header-3", children: "Report content" })] }), _jsxs("div", { className: "report-checkbox-wrapper", children: [_jsxs(Col, { span: 24, children: [_jsx("br", {}), _jsx("p", { className: "paragraph-2r", children: "Thanks for keeping the community safe." })] }), _jsx(Col, { span: 24, children: _jsx(RowCheckbox, { title: "report-checkbox", children: _jsx("p", { className: "header-5", children: "Nudity" }) }) }), _jsx(Col, { span: 24, children: _jsx(RowCheckbox, { title: "report-checkbox", children: _jsx("p", { className: "header-5", children: "Violence" }) }) }), _jsx(Col, { span: 24, children: _jsx(RowCheckbox, { title: "report-checkbox", children: _jsx("p", { className: "header-5", children: "Harassment" }) }) }), _jsx(Col, { span: 24, children: _jsx(RowCheckbox, { title: "report-checkbox", children: _jsx("p", { className: "header-5", children: "Spam" }) }) }), _jsx(Col, { span: 24, children: _jsx(RowCheckbox, { title: "report-checkbox", children: _jsx("p", { className: "header-5", children: "Copyright" }) }) }), _jsx(Col, { span: 24, children: _jsx(RowCheckbox, { title: "report-checkbox", children: _jsx("p", { className: "header-5", children: "Self-injury" }) }) })] }), _jsx(Col, { span: 24, style: {
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: "40px",
                                }, children: _jsx(Button, { type: "primary", children: "Report" }) })] }) }) }), _jsx("div", { onClick: () => setVisible(true), children: _jsx(ThreeDots, {}) })] }));
};
export default PostReportModal;
//# sourceMappingURL=PostModal.js.map