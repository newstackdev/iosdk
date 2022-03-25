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
var Title = function (_a) {
    var title = _a.title, href = _a.href;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ justify: "space-between", align: "middle" }, { children: [title && (0, jsx_runtime_1.jsx)("h2", __assign({ className: "header-2" }, { children: title })), href ?
                (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ className: "paragraph-2b", to: href || "" }, { children: "See all" })) :
                (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})] })));
};
exports.default = Title;
//# sourceMappingURL=Title.js.map