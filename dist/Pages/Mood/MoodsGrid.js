import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Row, Col } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FolderClosed from "../../Components/Icons/Folder/Closed";
import { PostWidget } from "../../Components/PostWidget";
import { Spin } from "../../Components/Spin";
import { useCachedMood } from "../../hooks/useCached";
import useVisibility, { useVisibilityOnce } from "../../hooks/useVisibility";
import { useActions, useAppState } from "../../overmind";
const complementTo4 = (p = []) => p;
export const MoodsGridRow = ({ mood, maxItems, noFullWidth, noFolder, wrap }) => {
    const [isVisible, currentElement] = useVisibilityOnce(-100);
    const state = useAppState();
    const actions = useActions();
    const m = useCachedMood(mood); //state.api.cache.moods[mood.id || ""] || {};
    useEffect(() => {
        const pc = m?.posts?.length || 0;
        console.log("Visible: ", isVisible);
        isVisible &&
            mood &&
            (pc === 0 || (pc < 4 && !maxItems)) &&
            actions.api.mood.getPosts(mood);
    }, [isVisible]);
    const postsList = maxItems ? m.posts?.slice(0, maxItems) : m.posts;
    console.log(postsList);
    return (_jsxs(Row, { ref: currentElement, wrap: wrap, className: `nl-mood-grid-row  ${noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"} ${wrap ? "wrap" : ""}`, justify: wrap ? "start" : "start", align: "middle", children: [noFolder ? ("") : (_jsx(Col, { xs: 8, children: _jsx("div", { style: { width: "100%" }, children: _jsxs(Link, { to: `/folder/${mood.id}`, children: [_jsx(FolderClosed, { width: "min(66px,100%)", height: "auto", className: "text-center" }), _jsx("br", {}), _jsx("small", { className: "paragraph-2r", children: m.title || "" }), _jsx("br", {})] }) }) })), complementTo4(postsList).map((p) => (_jsx(Col, { className: wrap ? "wrap" : "", children: _jsx(PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }))), postsList?.length === 0 ? _jsx(Col, {}) : ""] }));
};
export const MoodsGrid = ({ moods, title, loadMore, }) => {
    const [isVisible, currentElement] = useVisibility(-200);
    const state = useAppState();
    useEffect(() => {
        isVisible && loadMore && loadMore();
    }, [isVisible]);
    return (_jsxs(_Fragment, { children: [title && _jsx("h2", { className: "app-main-full-width header-2", children: title }), moods?.map((m, i) => (_jsx(MoodsGridRow, { mood: m, maxItems: 4, delay: i * 1000 }))), _jsxs("div", { ref: currentElement, style: { minHeight: 100, minWidth: 100 }, children: [_jsx("br", {}), state.indicators.isWorking && loadMore ? _jsx(Spin, {}) : "", _jsx("br", {})] })] }));
};
//# sourceMappingURL=MoodsGrid.js.map