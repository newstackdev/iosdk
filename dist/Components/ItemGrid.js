"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const useVisibility_1 = __importDefault(require("../hooks/useVisibility"));
const overmind_1 = require("../overmind");
const Title_1 = __importDefault(require("../Pages/Explore/Title"));
const Spin_1 = require("./Spin");
const ItemGrid = ({ items, render, title, titleLink, loadMore, limit, noEmptyResults }) => {
    const [isVisible, currentElement] = (0, useVisibility_1.default)(200);
    const state = (0, overmind_1.useAppState)();
    (0, react_1.useEffect)(() => {
        loadMore && loadMore();
    }, [isVisible]);
    items =
        items && limit
            ? items.slice(0, limit)
            : items
                ? items.slice(0, items.length)
                : [];
    if (state.indicators.isWorking === false && !items.length)
        return noEmptyResults ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) : (0, jsx_runtime_1.jsx)(antd_1.Result, { icon: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), children: "nothing here" });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title === undefined ? ((0, jsx_runtime_1.jsx)(antd_1.Row, { style: { width: "100%", marginTop: "20px" }, children: (0, jsx_runtime_1.jsx)("p", { className: "header-2", style: { marginLeft: "40px" }, children: title }) })) : ((0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: titleLink })), items.length ? ((0, jsx_runtime_1.jsx)(antd_1.Row, { wrap: true, className: limit
                    ? "nl-mood-grid-row-three app-main-full-width-only"
                    : "nl-mood-grid-row app-main-full-width-only", style: {
                    justifyContent: "space-between",
                    alignItems: " baseline",
                    width: "100%",
                }, children: items.map((item, index) => ((0, jsx_runtime_1.jsx)(antd_1.Col, { 
                    // className={"share-folder"}
                    style: { borderRadius: "25px" }, children: render(item, index) }, `item${index}`))) })) : (""), (0, jsx_runtime_1.jsx)("div", { ref: currentElement, children: state.indicators.isWorking === true && loadMore ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) : ("") })] }));
};
exports.ItemGrid = ItemGrid;
{
    /* <Masonry columnGutter={18} columnWidth={280} items={post.moods || []} render={({ data }) => <MoodWidget mood={data} />} /> */
}
//# sourceMappingURL=ItemGrid.js.map