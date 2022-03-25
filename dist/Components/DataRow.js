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
exports.DataRow = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var DataRow = function (_a) {
    var title = _a.title, value = _a.value, link = _a.link, target = _a.target;
    return !value ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "no value" }) :
        (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { width: "100%", marginBottom: 24 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ push: 0, span: 8 }, { children: title })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ push: 2, span: 14, style: {
                        textOverflow: "ellipsis",
                        textAlign: "right",
                        overflow: "hidden"
                    } }, { children: link ?
                        (0, jsx_runtime_1.jsx)("a", __assign({ href: link, target: target === undefined ? "_new" : target }, { children: value }))
                        :
                            value }))] }));
};
exports.DataRow = DataRow;
//# sourceMappingURL=DataRow.js.map