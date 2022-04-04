"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spin = exports.SpaceSpin = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SpinLogo_1 = require("./Icons/SpinLogo");
const SpaceSpin = ({ title, isRotating, }) => ((0, jsx_runtime_1.jsxs)("div", { style: { width: "100%", textAlign: "center", margin: "14px auto" }, children: [(0, jsx_runtime_1.jsx)("div", { className: "rotating", style: { fontSize: 41, height: "50px" }, children: isRotating ? (0, jsx_runtime_1.jsx)(SpinLogo_1.SpinLogo, {}) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }), title ? (0, jsx_runtime_1.jsx)("div", { children: title }) : ""] }));
exports.SpaceSpin = SpaceSpin;
const Spin = ({ title, }) => (0, jsx_runtime_1.jsx)(exports.SpaceSpin, { isRotating: true, title: title });
exports.Spin = Spin;
//# sourceMappingURL=Spin.js.map