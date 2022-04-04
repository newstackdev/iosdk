"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const Title_1 = __importDefault(require("../Pages/Explore/Title"));
const overmind_1 = require("../overmind");
const PostWidget_1 = require("./PostWidget");
const random_1 = require("../utils/random");
const SpotlightGrid = ({ maxItems, title }) => {
    // const m = useCachedMood(mood);
    // const postsList = m.posts?.slice(0, 1);
    // const username = "newdomain.io";
    // const m = useCachedMood(mood);
    // const postsList = m.posts?.slice(0, 1);
    const moodsList = (0, random_1.fischerYates)((0, overmind_1.useAppState)().lists.top.moods.items || [], maxItems || 6);
    const postsList = moodsList.map((m) => (0, random_1.fischerYates)(m.posts || [], 1)[0]);
    return ((0, jsx_runtime_1.jsx)("div", { style: { width: "100%", height: "100%", display: "flex" }, children: postsList?.map((p, i) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }, className: "bg-hover", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { className: "spotlight", children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: moodsList[i], post: p, username: p.author?.username, aspectRatio: p.aspectRatio, isSpotlight: true }) }), (0, jsx_runtime_1.jsx)("p", { className: title === undefined
                        ? "spotlight-username paragraph-2b font-variant-none"
                        : "spotlight-username paragraph-1b font-variant-none", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${p?.author?.username || p.author?.displayName}`, children: title === undefined
                            ? p?.author?.username.substring(0, 7) + "..." ||
                                p?.author?.displayName.substring(0, 7) + "..."
                            : p?.author?.username }) })] }))) }));
};
const Spotlights = ({ title, maxRows, maxItems }) => {
    const state = (0, overmind_1.useAppState)();
    const moods = state.lists.top.moods.items;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title === undefined && ((0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)("p", { className: "header-2 u-margin-bottom-medium", children: "Spotlights" }) })), (0, jsx_runtime_1.jsxs)("div", { children: [title ? (0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: "/spotlights" }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)("div", { className: "spotlight-flex-container", children: moods?.slice(0, maxRows || moods.length).map((m) => ((0, jsx_runtime_1.jsx)(antd_1.Row, { className: "nl-mood-grid-row spotlight-row", children: (0, jsx_runtime_1.jsx)(SpotlightGrid, { maxItems: maxItems, title: title }) }))) })] })] }));
};
exports.default = Spotlights;
//# sourceMappingURL=Spotlights.js.map