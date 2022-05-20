import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Row } from "antd";
import { Link } from "react-router-dom";
const Title = ({ title, href }) => {
    return (_jsxs(Row, { justify: "space-between", align: "middle", className: "title", children: [title && _jsx("h2", { className: "header-2", children: title }), href ? (_jsx(Link, { className: "paragraph-2b", to: href || "", children: _jsx(Button, { className: "secondary-button", children: _jsx("span", { className: "paragraph-2b", children: "See all" }) }) })) : (_jsx(_Fragment, {}))] }));
};
export default Title;
//# sourceMappingURL=Title.js.map