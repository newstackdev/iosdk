import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BackArrow } from "../../Components/Icons/BackArrow";
import { Button, Col, Row } from "antd";
import { ForwardArrow } from "../../Components/Icons/ForwardArrow";
import { Link } from "react-router-dom";
const Title = ({ title, href, navigationPrevRef, navigationNextRef, deeplikeActions, deepLikeContainer, setVisible, visible, }) => {
    return (_jsxs(Row, { justify: "space-between", align: "middle", className: "title", children: [title && (_jsx(Col, { children: _jsx("h2", { className: "paragraph-1b", children: title }) })), _jsxs(Row, { children: [navigationPrevRef && navigationNextRef && (_jsxs(Row, { children: [_jsx("div", { style: { cursor: "pointer" }, className: "u-margin-right-medium", ref: navigationPrevRef, children: _jsx(BackArrow, {}) }), _jsx("div", { style: { cursor: "pointer" }, className: "u-margin-right-medium", ref: navigationNextRef, children: _jsx(ForwardArrow, {}) })] })), href && (_jsx(Link, { className: "paragraph-2b", to: href || "", children: _jsx(Button, { className: "secondary-button", children: _jsx("span", { className: "paragraph-2b", children: "See all" }) }) })), deeplikeActions && setVisible && (_jsxs(Row, { align: "middle", children: [_jsx("span", { className: "paragraph-2b u-margin-right-medium cursor-pointer", onClick: () => setVisible((p) => !p), children: visible ? "Hide" : "See all" }), _jsx(Button, { className: "secondary-button", htmlType: "submit", children: _jsx("span", { className: "paragraph-2b", children: "Next" }) })] }))] })] }));
};
export default Title;
//# sourceMappingURL=Title.js.map