"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spin = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var SpinLogo_1 = require("./Icons/SpinLogo");
var Spin = function (_a) {
    var title = _a.title;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { width: "100%", textAlign: "center", margin: "14px auto" } }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "rotating", style: { fontSize: 41 } }, { children: (0, jsx_runtime_1.jsx)(SpinLogo_1.SpinLogo, {}) })), title ? (0, jsx_runtime_1.jsx)("div", { children: title }) : ""] })));
};
exports.Spin = Spin;
//# sourceMappingURL=Spin.js.map