import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Result, Row } from "antd";
import { useEffect } from "react";
import { Spin } from "./Spin";
import { useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import useVisibility from "../hooks/useVisibility";
export const ItemGrid = ({ items, render, title, titleLink, loadMore, limit, noEmptyResults, tagPreview, gridRow, }) => {
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
    return (_jsxs(_Fragment, { children: [title === undefined ? (_jsx(Row, { style: { width: "100%", marginTop: "20px" }, children: _jsx("p", { className: "header-2", style: { marginLeft: "40px" }, children: title }) })) : (_jsx(Title, { title: title, href: titleLink })), items.length ? (_jsx(Row, { wrap: true, className: "nl-mood-grid-row-three app-main-full-width-only", style: {
                    justifyContent: "space-between",
                    alignItems: " baseline",
                    width: "100%",
                }, children: items.map((item, index) => (_jsx(Col, { 
                    // className={"share-folder"}
                    style: !tagPreview ? { borderRadius: "8px", marginBottom: "20px" } : { borderRadius: "8px", height: "155px" }, children: render(item, index) }, `item${index}`))) })) : (""), _jsx("div", { ref: currentElement, children: state.indicators.isWorking === true && loadMore ? _jsx(Spin, {}) : "" })] }));
};
{
    /* <Masonry columnGutter={18} columnWidth={280} items={post.moods || []} render={({ data }) => <MoodWidget mood={data} />} /> */
}
//# sourceMappingURL=ItemGrid.js.map