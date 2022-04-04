"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchItemWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const aestheticList_1 = require("../overmind/lists/SearchCreative/aestheticList");
const overmind_1 = require("../overmind");
const SearchItemWidget = ({ item, index }) => {
    const state = (0, overmind_1.useAppState)();
    return (0, jsx_runtime_1.jsxs)(antd_1.Card, { style: { width: "100%" }, 
        // title={}
        cover: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/search-creative/vote?${state.routing.location}&index=${index.toString()}`, children: (0, jsx_runtime_1.jsx)(antd_1.Image, { width: "100%", preview: false, src: item.image }) }), children: [(0, jsx_runtime_1.jsx)("small", { children: (0, jsx_runtime_1.jsx)("a", { href: item?.meta?.short_url, target: "_new", children: item?.meta?.short_url }) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("small", { children: ["by", " ", (0, jsx_runtime_1.jsx)("a", { href: `${item?.meta?.short_url}`, target: "_new", children: item?.meta?.blog_name })] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("small", { children: Object.entries(item?.aesthetics ?? {})
                    .filter(kvp => aestheticList_1.aestheticList.includes(kvp[0]))
                    .map(kvp => (0, jsx_runtime_1.jsxs)("p", { style: { textAlign: "center" }, children: [kvp[0], (0, jsx_runtime_1.jsx)("div", { className: "nl-rating-bar", style: {
                                textAlign: "left",
                                opacity: 100,
                                width: `${kvp[1] * 100 || 0}%`,
                            } })] })) })] });
};
exports.SearchItemWidget = SearchItemWidget;
//# sourceMappingURL=SearchItemWidget.js.map