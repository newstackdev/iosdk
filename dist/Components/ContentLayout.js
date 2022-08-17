import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Spin } from "./Spin";
import { useAppState } from "../overmind";
const ContentLayoutHorizontal = ({ header, info, children, isWorking, }) => (_jsxs(_Fragment, { children: [_jsx("h2", { children: header }), _jsxs(Row, { gutter: 18, wrap: true, children: [_jsx(Col, { xs: 24, sm: 8, lg: 4, children: info }), _jsx(Col, { xs: 24, sm: 14, lg: 20, children: children })] }), isWorking ? _jsx(Spin, {}) : ""] }));
const ContentLayoutVertical = ({ header, info, children, isWorking, }) => {
    const state = useAppState();
    return (_jsxs("div", { className: "app-main-full-width", children: [_jsx("div", { children: info }), _jsx("h2", { children: header }), _jsx("div", { children: children })] }));
};
const ContentLayoutHorizontal3col = ({ header, info, children, isWorking, customClass = "", position = "", isPost, isMood, isVote, }) => {
    const state = useAppState();
    let customPosition = "";
    switch (position) {
        case "top":
            customPosition = "app-content-align-vertically-top";
            break;
        default:
            customPosition = "app-content-align-vertically";
            break;
    }
    const layoutWrapperClassName = "app-main-full-width app-content-layout";
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
    return (_jsxs(Row, { justify: "space-between", gutter: 16, className: isVote ? layoutWrapperClassName + " " + "app-post-page-layout" : layoutWrapperClassName, style: { margin: 0, height: "100%" }, children: [header && (_jsx(Col, { xs: 24, lg: isVote ? 5 : isPost ? 7 : isMood ? 1 : 4, className: isVote ? "text-left post-notification-column" : "text-left", style: isVote ? { display: "flex", padding: 0, marginTop: 10 } : {}, children: header })), _jsx(Col, { xs: 24, lg: isPost || isVote ? 18 - extrasSpan : isMood ? 27 - extrasSpan : 24 - extrasSpan, className: `${customClass}`, style: isVote
                    ? {
                        width: "100%",
                        padding: 0,
                        display: "flex",
                    }
                    : extrasSpan
                        ? { display: "flex" }
                        : {
                            width: "100%",
                            padding: 0,
                            display: "flex",
                        }, children: _jsx("div", { className: `app-main-full-height ${customPosition}`, children: children }) }), info ? (_jsx(Col, { xs: 24, lg: isVote ? 9 : isPost ? 7 : 4, style: isVote ? { display: "flex", padding: 0 } : { display: "flex" }, children: _jsx("div", { style: isVote ? { width: "100%", display: "flex", justifyContent: "end" } : { width: "100%" }, className: "text-left", children: info }) })) : ("")] }));
};
export const ContentLayout = ContentLayoutHorizontal3col;
//# sourceMappingURL=ContentLayout.js.map