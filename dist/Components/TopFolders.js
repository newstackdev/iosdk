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
exports.TopFoldersGrid = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var useCached_1 = require("../hooks/useCached");
var overmind_1 = require("../overmind");
var Title_1 = __importDefault(require("../Pages/Explore/Title"));
var ContentLayout_1 = require("./ContentLayout");
var Closed_1 = __importDefault(require("./Icons/Folder/Closed"));
var LargeArrowBack_1 = require("./Icons/LargeArrowBack");
var PostWidget_1 = require("./PostWidget");
var TopFoldersGrid = function (_a) {
    var _b, _c, _d, _e;
    var mood = _a.mood, postNumber = _a.postNumber, title = _a.title, posts = _a.posts, noFolder = _a.noFolder, noFullWidth = _a.noFullWidth, wrap = _a.wrap;
    var m = (0, useCached_1.useCachedMood)(mood);
    var postsList = title === "Explore folders"
        ? (_b = m.posts) === null || _b === void 0 ? void 0 : _b.slice(0, postNumber + 1)
        : title === "Moods"
            ? m.posts
            : (_c = m.posts) === null || _c === void 0 ? void 0 : _c.slice(0, 5);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "100%" }, className: title === "Moods" ? "scrollable-content" : "" }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "".concat(posts === "full" ? "space-between" : ""),
            }, className: "".concat(noFullWidth
                ? "nl-mood-grid-row-height"
                : "app-main-full-width", " ").concat(title === "Moods" ? "nl-mood-grid-row-four" : "") }, { children: [!noFolder && ((0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ style: {
                        justifyContent: "center",
                        flexDirection: "column",
                        aspectRatio: "1/1",
                        height: "100%",
                    }, className: "bg-hover" }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/folder/".concat(mood.id) }, { children: (0, jsx_runtime_1.jsx)(Closed_1.default, { className: "text-center folder" }) })), (0, jsx_runtime_1.jsx)("small", __assign({ className: "folder-name", style: { paddingTop: "5px" } }, { children: ((_d = m.title) === null || _d === void 0 ? void 0 : _d.length) > 10
                                ? ((_e = m.title) === null || _e === void 0 ? void 0 : _e.substring(0, 3)) + "..."
                                : (m === null || m === void 0 ? void 0 : m.title) || "" }))] }))), (postsList === null || postsList === void 0 ? void 0 : postsList.length) === 0 && ((0, jsx_runtime_1.jsx)(antd_1.Col, { style: { aspectRatio: "1/1" } })), postsList === null || postsList === void 0 ? void 0 : postsList.map(function (p) { return ((0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "bg-hover", style: { aspectRatio: "1/1" } }, { children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }))); })] })) })));
};
exports.TopFoldersGrid = TopFoldersGrid;
var TopFolders = function (_a) {
    var maxItems = _a.maxItems, title = _a.title, posts = _a.posts, userMoods = _a.userMoods, skipItems = _a.skipItems;
    var state = (0, overmind_1.useAppState)();
    var moods = userMoods ? userMoods : state.lists.top.moods.items || [];
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [title === undefined && ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { width: "100%", marginTop: "20px" } }, { children: [(0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-2", style: { marginLeft: "40px" } }, { children: "Explore folders" }))] }))), (0, jsx_runtime_1.jsxs)("div", __assign({ className: maxItems === undefined && !userMoods
                    ? "section-divider scrollable-content"
                    : "section-divider" }, { children: [title ? (0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: "/top/folders" }) : "", moods === null || moods === void 0 ? void 0 : moods.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3)).map(function (m, i) { return ((0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ className: "nl-mood-grid-row", style: posts === "full"
                            ? {
                                justifyContent: "space-between",
                                alignItems: "center",
                            }
                            : {
                                justifyContent: "start",
                                alignItems: "center",
                            } }, { children: (0, jsx_runtime_1.jsx)(exports.TopFoldersGrid, { mood: m, postNumber: i, title: title, posts: posts }) }))); })] }))] }));
};
exports.default = TopFolders;
//# sourceMappingURL=TopFolders.js.map