"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentLayout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const Spin_1 = require("../Components/Spin");
const overmind_1 = require("../overmind");
const ContentLayoutHorizontal = ({ header, info, children, isWorking }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: header }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: 18, wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 8, lg: 4, children: info }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 14, lg: 20, children: children })] }), isWorking ? (0, jsx_runtime_1.jsx)(Spin_1.Spin, {}) : ""] }));
const ContentLayoutVertical = ({ header, info, children, isWorking }) => {
    const state = (0, overmind_1.useAppState)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app-main-full-width", style: { minHeight: "90vh" }, children: [(0, jsx_runtime_1.jsx)("div", { children: info }), (0, jsx_runtime_1.jsx)("h2", { children: header }), (0, jsx_runtime_1.jsx)("div", { children: children })] }));
};
const ContentLayoutHorizontal3col = ({ header, info, children, isWorking, customClass = "", isPost, isMood, }) => {
    const state = (0, overmind_1.useAppState)();
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
    const extrasSpan = (header ? 4 : 0) + (info ? 4 : 0);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { justify: "space-between", gutter: 16, className: "app-main-full-width app-content-layout", style: { margin: 0, height: "100%" }, children: [header ? ((0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, lg: isPost ? 7 : isMood ? 6 : 4, className: isPost
                    ? "text-left post-notification-column"
                    : "text-left", style: isPost ? { display: "flex" } : {}, children: header })) : (""), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, lg: isPost
                    ? 18 - extrasSpan
                    : isMood
                        ? 20 - extrasSpan
                        : 24 - extrasSpan, className: `${customClass}`, style: extrasSpan
                    ? { display: "flex" }
                    : { width: "100%", padding: 0, display: "flex" }, children: (0, jsx_runtime_1.jsx)("div", { className: "app-main-full-height", children: children }) }), info ? ((0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, lg: isPost ? 7 : isMood ? 6 : 4, style: { display: "flex" }, children: (0, jsx_runtime_1.jsx)("div", { style: { width: "100%" }, className: "text-left", children: info }) })) : ("")] }));
};
exports.ContentLayout = ContentLayoutHorizontal3col;
//# sourceMappingURL=ContentLayout.js.map