import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SpinLogo } from "./Icons/SpinLogo";
export const SpaceSpin = ({ title, isRotating }) => (_jsxs("div", { style: { width: "100%", textAlign: "center", margin: "14px auto" }, children: [_jsx("div", { className: "rotating", style: { fontSize: 41, height: "50px" }, children: isRotating ? _jsx(SpinLogo, {}) : _jsx(_Fragment, {}) }), title ? _jsx("div", { children: title }) : ""] }));
export const Spin = ({ title }) => _jsx(SpaceSpin, { isRotating: true, title: title });
//# sourceMappingURL=Spin.js.map