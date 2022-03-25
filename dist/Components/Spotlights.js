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
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var Title_1 = __importDefault(require("../Pages/Explore/Title"));
var overmind_1 = require("../overmind");
var PostWidget_1 = require("./PostWidget");
var ContentLayout_1 = require("./ContentLayout");
var LargeArrowBack_1 = require("./Icons/LargeArrowBack");
var random_1 = require("../utils/random");
var SpotlightGrid = function (_a) {
    var maxItems = _a.maxItems, title = _a.title;
    // const m = useCachedMood(mood);
    // const postsList = m.posts?.slice(0, 1);
    // const username = "newdomain.io";
    // const m = useCachedMood(mood);
    // const postsList = m.posts?.slice(0, 1);
    var moodsList = (0, random_1.fischerYates)((0, overmind_1.useAppState)().lists.top.moods.items || [], maxItems || 6);
    var postsList = moodsList.map(function (m) { return (0, random_1.fischerYates)(m.posts || [], 1)[0]; });
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "100%", height: "100%", display: "flex" } }, { children: postsList === null || postsList === void 0 ? void 0 : postsList.map(function (p, i) {
            var _a, _b, _c, _d, _e, _f;
            return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }, className: "bg-hover" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "spotlight" }, { children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: moodsList[i], post: p, username: (_a = p.author) === null || _a === void 0 ? void 0 : _a.username, aspectRatio: p.aspectRatio, isSpotlight: true }) })), (0, jsx_runtime_1.jsx)("p", __assign({ className: title === undefined
                            ? "spotlight-username paragraph-2b font-variant-none"
                            : "spotlight-username paragraph-1b font-variant-none" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(((_b = p === null || p === void 0 ? void 0 : p.author) === null || _b === void 0 ? void 0 : _b.username) || ((_c = p.author) === null || _c === void 0 ? void 0 : _c.displayName)) }, { children: title === undefined
                                ? ((_d = p === null || p === void 0 ? void 0 : p.author) === null || _d === void 0 ? void 0 : _d.username.substring(0, 7)) + "..." ||
                                    ((_e = p === null || p === void 0 ? void 0 : p.author) === null || _e === void 0 ? void 0 : _e.displayName.substring(0, 7)) + "..."
                                : (_f = p === null || p === void 0 ? void 0 : p.author) === null || _f === void 0 ? void 0 : _f.username })) }))] })));
        }) })));
};
var Spotlights = function (_a) {
    var title = _a.title, maxRows = _a.maxRows, maxItems = _a.maxItems;
    var state = (0, overmind_1.useAppState)();
    var moods = state.lists.top.moods.items;
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [title === undefined && ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                } }, { children: [(0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-2", style: { marginLeft: "40px" } }, { children: "Spotlights" }))] }))), (0, jsx_runtime_1.jsxs)("div", __assign({ className: title === undefined
                    ? "scrollable-content section-divider"
                    : " section-divider" }, { children: [title ? (0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: "/spotlights" }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)("div", __assign({ className: "spotlight-flex-container" }, { children: moods === null || moods === void 0 ? void 0 : moods.slice(0, maxRows || moods.length).map(function (m) { return ((0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ className: "nl-mood-grid-row spotlight-row" }, { children: (0, jsx_runtime_1.jsx)(SpotlightGrid, { maxItems: maxItems, title: title }) }))); }) }))] }))] }));
};
exports.default = Spotlights;
//# sourceMappingURL=Spotlights.js.map