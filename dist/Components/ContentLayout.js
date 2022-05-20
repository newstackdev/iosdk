import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col } from "antd";
import { Spin } from "../Components/Spin";
import { useAppState } from "../overmind";
const ContentLayoutHorizontal = ({ header, info, children, isWorking }) => (_jsxs(_Fragment, { children: [_jsx("h2", { children: header }), _jsxs(Row, { gutter: 18, wrap: true, children: [_jsx(Col, { xs: 24, sm: 8, lg: 4, children: info }), _jsx(Col, { xs: 24, sm: 14, lg: 20, children: children })] }), isWorking ? _jsx(Spin, {}) : ""] }));
const ContentLayoutVertical = ({ header, info, children, isWorking }) => {
    const state = useAppState();
    return (_jsxs("div", { className: "app-main-full-width", style: { minHeight: "90vh" }, children: [_jsx("div", { children: info }), _jsx("h2", { children: header }), _jsx("div", { children: children })] }));
};
const ContentLayoutHorizontal3col = ({ header, info, children, isWorking, customClass = "", isPost, isMood, }) => {
    const state = useAppState();
    // return <div className="app-main-full-width" style={{ minHeight: "90vh" }}>
    //     <div>{info}</div>
    //     <h2>{header}</h2>
    //     <div>{childlgren}</div>
    //     {/* {(isWorking !== undefined) && state.indicators.isWorking ? <Spin /> : ""} */}
    // </div>;
    if (isWorking)
        return _jsx(Spin, {});
    // const spanSum = (header ? 4 : 0) + (info ? 4 : 0);
    // const mainSpan = 24 - spanSum
    const extrasSpan = (header ? 4 : 0) + (info ? 4 : 0);
    return (_jsxs(Row, { justify: "space-between", gutter: 16, className: "app-main-full-width app-content-layout", style: { margin: 0, height: "100%" }, children: [header ? (_jsx(Col, { xs: 24, lg: isPost ? 7 : isMood ? 6 : 4, className: isPost ? "text-left post-notification-column" : "text-left", style: isPost ? { display: "flex" } : {}, children: header })) : (""), _jsx(Col, { xs: 24, lg: isPost ? 18 - extrasSpan : isMood ? 20 - extrasSpan : 24 - extrasSpan, className: `${customClass}`, style: extrasSpan
                    ? { display: "flex" }
                    : {
                        width: "100%",
                        padding: 0,
                        display: "flex",
                    }, children: _jsx("div", { className: "app-main-full-height", children: children }) }), info ? (_jsx(Col, { xs: 24, lg: isPost ? 7 : isMood ? 6 : 4, style: { display: "flex" }, children: _jsx("div", { style: { width: "100%" }, className: "text-left", children: info }) })) : ("")] }));
};
export const ContentLayout = ContentLayoutHorizontal3col;
//# sourceMappingURL=ContentLayout.js.map