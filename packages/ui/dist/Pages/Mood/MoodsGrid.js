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
exports.__esModule = true;
exports.MoodsGrid = exports.MoodsGridRow = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var hooks_1 = require("@newcoin-foundation/hooks");
var useVisibility_1 = __importDefault(require("@newcoin-foundation/hooks/dist/src/useVisibility"));
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Closed_1 = __importDefault(require("../../Components/Icons/Folder/Closed"));
var PostWidget_1 = require("../../Components/PostWidget");
var Spin_1 = require("../../Components/Spin");
var complementTo4 = function (p) {
    if (p === void 0) { p = []; }
    return p;
};
var MoodsGridRow = function (_a) {
    var _b;
    var mood = _a.mood, maxItems = _a.maxItems, noFullWidth = _a.noFullWidth, noFolder = _a.noFolder, wrap = _a.wrap;
    var _c = (0, hooks_1.useVisibilityOnce)(-100), isVisible = _c[0], currentElement = _c[1];
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var m = (0, hooks_1.useCachedMood)(mood); //state.api.cache.moods[mood.id || ""] || {};
    (0, react_1.useEffect)(function () {
        var _a;
        var pc = ((_a = m === null || m === void 0 ? void 0 : m.posts) === null || _a === void 0 ? void 0 : _a.length) || 0;
        console.log("Visible: ", isVisible);
        isVisible &&
            mood &&
            (pc === 0 || (pc < 4 && !maxItems)) &&
            actions.api.mood.getPosts(mood);
    }, [isVisible]);
    var postsList = maxItems ? (_b = m.posts) === null || _b === void 0 ? void 0 : _b.slice(0, maxItems) : m.posts;
    console.log(postsList);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ ref: currentElement, wrap: wrap, className: "nl-mood-grid-row scrollable-content ".concat(noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width", " ").concat(wrap ? "wrap" : ""), justify: wrap ? "start" : "start", align: "middle" }, { children: [noFolder ? ("") : ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ xs: 8 }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "100%" } }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/folder/".concat(mood.id) }, { children: [(0, jsx_runtime_1.jsx)(Closed_1["default"], { width: "min(66px,100%)", height: "auto", className: "text-center" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("small", __assign({ className: "paragraph-2r" }, { children: m.title || "" })), (0, jsx_runtime_1.jsx)("br", {})] })) })) }))), complementTo4(postsList).map(function (p) { return ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: wrap ? "wrap" : "" }, { children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }))); }), (postsList === null || postsList === void 0 ? void 0 : postsList.length) === 0 ? (0, jsx_runtime_1.jsx)(antd_1.Col, {}) : ""] })));
};
exports.MoodsGridRow = MoodsGridRow;
var MoodsGrid = function (_a) {
    var moods = _a.moods, title = _a.title, loadMore = _a.loadMore;
    var _b = (0, useVisibility_1["default"])(-200), isVisible = _b[0], currentElement = _b[1];
    var state = (0, state_1.useAppState)();
    (0, react_1.useEffect)(function () {
        isVisible && loadMore && loadMore();
    }, [isVisible]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title && (0, jsx_runtime_1.jsx)("h2", __assign({ className: "app-main-full-width header-2" }, { children: title })), moods === null || moods === void 0 ? void 0 : moods.map(function (m, i) { return ((0, jsx_runtime_1.jsx)(exports.MoodsGridRow, { mood: m, maxItems: 4, delay: i * 1000 })); }), (0, jsx_runtime_1.jsxs)("div", __assign({ ref: currentElement, style: { minHeight: 100, minWidth: 100 } }, { children: [(0, jsx_runtime_1.jsx)("br", {}), state.indicators.isWorking && loadMore ? (0, jsx_runtime_1.jsx)(Spin_1.Spin, {}) : "", (0, jsx_runtime_1.jsx)("br", {})] }))] }));
};
exports.MoodsGrid = MoodsGrid;
