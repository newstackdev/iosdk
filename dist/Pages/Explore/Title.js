import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BackArrow } from "../../Components/Icons/BackArrow";
import { Button, Col, Row } from "antd";
import { ForwardArrow } from "../../Components/Icons/ForwardArrow";
import { Link } from "react-router-dom";
const Title = ({ title, href, navigationPrevRef, navigationNextRef, }) => {
    return (_jsxs(Row, { justify: "space-between", align: "middle", className: "title", style: { width: "100%" }, children: [_jsx(Col, { children: title && _jsx("h2", { className: "header-2", children: title }) }), _jsxs(Row, { children: [navigationPrevRef && navigationNextRef && (_jsxs(Row, { children: [_jsx("div", { style: { cursor: "pointer" }, className: "u-margin-right-medium", ref: navigationPrevRef, children: _jsx(BackArrow, {}) }), _jsx("div", { style: { cursor: "pointer" }, className: "u-margin-right-medium", ref: navigationNextRef, children: _jsx(ForwardArrow, {}) })] })), href ? (_jsx(Link, { className: "paragraph-2b", to: href || "", children: _jsx(Button, { className: "secondary-button", children: _jsx("span", { className: "paragraph-2b", children: "See all" }) }) })) : (_jsx(_Fragment, {}))] })] }));
};
export default Title;
//# sourceMappingURL=Title.js.map