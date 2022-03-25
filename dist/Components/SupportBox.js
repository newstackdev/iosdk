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
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var Appearing_1 = require("./Appearing");
var SupportBox = function () {
    return ((0, jsx_runtime_1.jsx)(Appearing_1.AppearingComponent, __assign({ seconds: 5 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "support-box" }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "Need support?" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2u" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/" }, { children: " Join our telegram group!" })) }))] })) })));
};
exports.default = SupportBox;
//# sourceMappingURL=SupportBox.js.map