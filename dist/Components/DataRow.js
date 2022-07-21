import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Row } from "antd";
export const DataRow = ({ title, value, link, target, collapse, }) => !value ? (_jsx(_Fragment, { children: "no value" })) : (_jsxs(Row, { style: { width: "100%", marginBottom: 24 }, children: [_jsx(Col, { push: 0, span: collapse ? 24 : 8, children: title }), _jsx(Col, { push: collapse ? 0 : 2, span: collapse ? 24 : 14, style: {
                textOverflow: "ellipsis",
                textAlign: "right",
                overflow: "hidden",
            }, children: link ? (_jsx("a", { href: link, target: target === undefined ? "_new" : target, children: value })) : (value) })] }));
//# sourceMappingURL=DataRow.js.map