import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Result, Row } from "antd";
import { useEffect } from "react";
import { Spin } from "./Spin";
import { useAppState } from "../overmind";
import useVisibility from "../hooks/useVisibility";
export const ItemGrid = ({ items, render, title, titleLink, loadMore, limit, noEmptyResults, wrapAt, deeplikeActions, deepLikeContainer, gridRow, }) => {
    const [isVisible, currentElement] = useVisibility(200);
    const state = useAppState();
    useEffect(() => {
        loadMore && loadMore();
    }, [isVisible]);
    items = items && limit ? items.slice(0, limit) : items ? items.slice(0, items.length) : [];
    const tagsInSources = items
        .filter(Boolean)
        .map((p) => (p.tags || [])?.map((t) => t.value))
        .reduce((r, c) => [...r, ...c], []);
    if (state.indicators.isWorking === false && !items.length)
        return noEmptyResults ? _jsx(_Fragment, {}) : _jsx(Result, { icon: _jsx(_Fragment, {}), children: "nothing here" });
    return (_jsxs(_Fragment, { children: [items.length ? (_jsx(Row, { wrap: true, className: wrapAt === 3 ? "nl-mood-grid-row-three" : "nl-mood-grid-row-responzive", align: "top", children: items.map((item, index) => (_jsx(Col, { children: render(item, index) }, `item${index}`))) })) : (""), _jsx("div", { ref: currentElement, children: state.indicators.isWorking === true && loadMore ? _jsx(Spin, {}) : "" })] }));
};
{
    /* <Masonry columnGutter={18} columnWidth={280} items={post.moods || []} render={({ data }) => <MoodWidget mood={data} />} /> */
}
//# sourceMappingURL=ItemGrid.js.map