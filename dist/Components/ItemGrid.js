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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemGrid = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var useVisibility_1 = __importDefault(require("../hooks/useVisibility"));
var overmind_1 = require("../overmind");
var Title_1 = __importDefault(require("../Pages/Explore/Title"));
var MoodCreate_1 = require("../Pages/Mood/MoodCreate");
var LargeArrowBack_1 = require("./Icons/LargeArrowBack");
var Spin_1 = require("./Spin");
var ItemGrid = function (_a) {
    var items = _a.items, render = _a.render, title = _a.title, titleLink = _a.titleLink, loadMore = _a.loadMore, selectedFolder = _a.selectedFolder, setSelectedFolder = _a.setSelectedFolder, limit = _a.limit;
    var _b = (0, useVisibility_1.default)(200), isVisible = _b[0], currentElement = _b[1];
    var state = (0, overmind_1.useAppState)();
    (0, react_1.useEffect)(function () {
        loadMore && loadMore();
    }, [isVisible]);
    items =
        items && limit
            ? items.slice(0, limit)
            : items
                ? items.slice(0, items.length)
                : [];
    if (state.indicators.isWorking === false && !items.length)
        return (0, jsx_runtime_1.jsx)(antd_1.Result, __assign({ icon: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }, { children: "nothing here" }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title === undefined ?
                (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { width: "100%", marginTop: "20px" } }, { children: [(0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-2", style: { marginLeft: "40px" } }, { children: title }))] })) :
                (0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: titleLink }), items.length ? ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ wrap: true, className: limit
                    ? "nl-mood-grid-row-three app-main-full-width-only"
                    : "nl-mood-grid-row app-main-full-width-only", style: {
                    justifyContent: "space-between",
                    alignItems: " baseline",
                    width: "100%",
                } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "share-folder " }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                                textAlign: "center",
                                color: "white",
                                width: "100%",
                                border: "none",
                                padding: "10px",
                            } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "90%", margin: "0 auto" } }, { children: (0, jsx_runtime_1.jsx)(MoodCreate_1.MoodCreateModal, {}) })) })) })), items.map(function (item, index) { return ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "share-folder", style: { borderRadius: "25px" } }, { children: render(item, index) }), "item".concat(index))); })] }))) : (""), (0, jsx_runtime_1.jsx)("div", __assign({ ref: currentElement }, { children: state.indicators.isWorking === true && loadMore ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, {})) : ("") }))] }));
};
exports.ItemGrid = ItemGrid;
{
    /* <Masonry columnGutter={18} columnWidth={280} items={post.moods || []} render={({ data }) => <MoodWidget mood={data} />} /> */
}
//# sourceMappingURL=ItemGrid.js.map