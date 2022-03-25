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
exports.ContentLayout = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var Spin_1 = require("../Components/Spin");
var overmind_1 = require("../overmind");
var ContentLayoutHorizontal = function (_a) {
    var header = _a.header, info = _a.info, children = _a.children, isWorking = _a.isWorking;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: header }), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ gutter: 18, wrap: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, sm: 8, lg: 4 }, { children: info })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, sm: 14, lg: 20 }, { children: children }))] })), isWorking ? (0, jsx_runtime_1.jsx)(Spin_1.Spin, {}) : ""] }));
};
var ContentLayoutVertical = function (_a) {
    var header = _a.header, info = _a.info, children = _a.children, isWorking = _a.isWorking;
    var state = (0, overmind_1.useAppState)();
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "app-main-full-width", style: { minHeight: "90vh" } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: info }), (0, jsx_runtime_1.jsx)("h2", { children: header }), (0, jsx_runtime_1.jsx)("div", { children: children })] })));
};
var ContentLayoutHorizontal3col = function (_a) {
    var header = _a.header, info = _a.info, children = _a.children, isWorking = _a.isWorking, _b = _a.customClass, customClass = _b === void 0 ? "" : _b, isPost = _a.isPost, isMood = _a.isMood;
    var state = (0, overmind_1.useAppState)();
    // return <div className="app-main-full-width" style={{ minHeight: "90vh" }}>
    //     <div>{info}</div>
    //     <h2>{header}</h2>
    //     <div>{childlgren}</div>
    //     {/* {(isWorking !== undefined) && state.indicators.isWorking ? <Spin /> : ""} */}
    // </div>;
    if (isWorking)
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    // const spanSum = (header ? 4 : 0) + (info ? 4 : 0);
    // const mainSpan = 24 - spanSum
    var extrasSpan = (header ? 4 : 0) + (info ? 4 : 0);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ justify: "space-between", gutter: 16, className: "app-main-full-width", style: { margin: 0, height: "100%" } }, { children: [header ? ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, lg: isPost ? 7 : isMood ? 6 : 4, className: isPost
                    ? "text-left post-notification-column"
                    : "text-left", style: isPost ? { display: "flex" } : {} }, { children: header }))) : (""), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, lg: isPost
                    ? 18 - extrasSpan
                    : isMood
                        ? 20 - extrasSpan
                        : 24 - extrasSpan, className: "".concat(customClass), style: extrasSpan
                    ? { display: "flex" }
                    : { width: "100%", padding: 0, display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "app-main-full-height" }, { children: children })) })), info ? ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 24, lg: isPost ? 7 : isMood ? 6 : 4, style: { display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "100%" }, className: "text-left" }, { children: info })) }))) : ("")] })));
};
exports.ContentLayout = ContentLayoutHorizontal3col;
//# sourceMappingURL=ContentLayout.js.map