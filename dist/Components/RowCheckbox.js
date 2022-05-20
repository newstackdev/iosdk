import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Col, Row } from "antd";
export const RowCheckbox = ({ children, onChange, disabled, title, }) => (_jsxs(Row, { className: "full-width", style: title === "report-checkbox"
        ? {
            justifyContent: "space-between",
            flexDirection: "row-reverse",
        }
        : { justifyContent: "flex-start" }, align: "bottom", children: [_jsx(Col, { span: 2, title: title, children: _jsx(Checkbox, { disabled: disabled, onChange: onChange }) }), _jsx(Col, { span: 18, className: "text-left", children: children })] }));
//# sourceMappingURL=RowCheckbox.js.map