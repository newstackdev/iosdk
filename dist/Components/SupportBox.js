import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row } from "antd";
import { Link } from "react-router-dom";
import { AppearingComponent } from "./Appearing";
const SupportBox = () => {
    return (_jsx(AppearingComponent, { seconds: 2, children: _jsxs(Row, { className: "support-box", children: [_jsx("p", { className: "paragraph-2r", children: "Need support?" }), _jsx("p", { className: "paragraph-2u", children: _jsx(Link, { to: "/", children: " Join our telegram group!" }) })] }) }));
};
export default SupportBox;
//# sourceMappingURL=SupportBox.js.map