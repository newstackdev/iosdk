"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodsGrid = exports.MoodsGridRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Closed_1 = __importDefault(require("../../Components/Icons/Folder/Closed"));
const PostWidget_1 = require("../../Components/PostWidget");
const Spin_1 = require("../../Components/Spin");
const useCached_1 = require("../../hooks/useCached");
const useVisibility_1 = __importStar(require("../../hooks/useVisibility"));
const overmind_1 = require("../../overmind");
const complementTo4 = (p = []) => p;
const MoodsGridRow = ({ mood, maxItems, noFullWidth, noFolder, wrap }) => {
    const [isVisible, currentElement] = (0, useVisibility_1.useVisibilityOnce)(-100);
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const m = (0, useCached_1.useCachedMood)(mood); //state.api.cache.moods[mood.id || ""] || {};
    (0, react_1.useEffect)(() => {
        const pc = m?.posts?.length || 0;
        console.log("Visible: ", isVisible);
        isVisible &&
            mood &&
            (pc === 0 || (pc < 4 && !maxItems)) &&
            actions.api.mood.getPosts(mood);
    }, [isVisible]);
    const postsList = maxItems ? m.posts?.slice(0, maxItems) : m.posts;
    console.log(postsList);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { ref: currentElement, wrap: wrap, className: `nl-mood-grid-row  ${noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"} ${wrap ? "wrap" : ""}`, justify: wrap ? "start" : "start", align: "middle", children: [noFolder ? ("") : ((0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 8, children: (0, jsx_runtime_1.jsx)("div", { style: { width: "100%" }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/folder/${mood.id}`, children: [(0, jsx_runtime_1.jsx)(Closed_1.default, { width: "min(66px,100%)", height: "auto", className: "text-center" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("small", { className: "paragraph-2r", children: m.title || "" }), (0, jsx_runtime_1.jsx)("br", {})] }) }) })), complementTo4(postsList).map((p) => ((0, jsx_runtime_1.jsx)(antd_1.Col, { className: wrap ? "wrap" : "", children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }))), postsList?.length === 0 ? (0, jsx_runtime_1.jsx)(antd_1.Col, {}) : ""] }));
};
exports.MoodsGridRow = MoodsGridRow;
const MoodsGrid = ({ moods, title, loadMore, }) => {
    const [isVisible, currentElement] = (0, useVisibility_1.default)(-200);
    const state = (0, overmind_1.useAppState)();
    (0, react_1.useEffect)(() => {
        isVisible && loadMore && loadMore();
    }, [isVisible]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title && (0, jsx_runtime_1.jsx)("h2", { className: "app-main-full-width header-2", children: title }), moods?.map((m, i) => ((0, jsx_runtime_1.jsx)(exports.MoodsGridRow, { mood: m, maxItems: 4, delay: i * 1000 }))), (0, jsx_runtime_1.jsxs)("div", { ref: currentElement, style: { minHeight: 100, minWidth: 100 }, children: [(0, jsx_runtime_1.jsx)("br", {}), state.indicators.isWorking && loadMore ? (0, jsx_runtime_1.jsx)(Spin_1.Spin, {}) : "", (0, jsx_runtime_1.jsx)("br", {})] })] }));
};
exports.MoodsGrid = MoodsGrid;
//# sourceMappingURL=MoodsGrid.js.map