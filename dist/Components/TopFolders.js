"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopFoldersGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const useCached_1 = require("../hooks/useCached");
const overmind_1 = require("../overmind");
const Title_1 = __importDefault(require("../Pages/Explore/Title"));
const Closed_1 = __importDefault(require("./Icons/Folder/Closed"));
const LoadMore_1 = require("./LoadMore");
const PostWidget_1 = require("./PostWidget");
const PremiumContent_1 = require("./PremiumContent");
const TopFoldersGrid = ({ mood, postNumber, title, posts, noFolder, noFullWidth, wrap }) => {
    const m = (0, useCached_1.useCachedMood)(mood);
    const postsList = title === "Explore folders"
        ? m.posts?.slice(0, postNumber + 1)
        : title === "Moods"
            ? m.posts
            : m.posts?.slice(0, 5);
    return ((0, jsx_runtime_1.jsx)(PremiumContent_1.PremiumContent, { stakeToAccess: m.stakeToAccess, owner: m?.author, style: { width: "100%" }, link: "/folder/" + m.id, children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: `${posts === "full" ? "space-between" : ""}`,
                flexWrap: "unset",
            }, className: `${noFullWidth
                ? "nl-mood-grid-row-height"
                : "app-main-full-width"} ${title === "Moods" ? "nl-mood-grid-row-four" : ""}`, children: [!noFolder && ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/folder/${mood.id}`, className: "ant-col", children: (0, jsx_runtime_1.jsxs)(antd_1.Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: [(0, jsx_runtime_1.jsx)(Closed_1.default, { className: "text-center folder" }), (0, jsx_runtime_1.jsx)("small", { className: "folder-name", style: { paddingTop: "5px" }, children: m.title?.length > 10
                                    ? m.title?.substring(0, 3) + "..."
                                    : m?.title || "" })] }) })), postsList?.length === 0 && ((0, jsx_runtime_1.jsx)(antd_1.Col, { style: { aspectRatio: "1/1" } })), postsList?.map((p) => ((0, jsx_runtime_1.jsx)(PostWidget_1.MaybeLink, { to: !p.id
                        ? ""
                        : !mood
                            ? `/post/${p.id}`
                            : `/folder/${mood.id}/${p.id}`, className: p.contentType === "text/plain"
                        ? "maybelink ant-col"
                        : "ant-col", children: (0, jsx_runtime_1.jsx)(antd_1.Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }) })))] }) }));
};
exports.TopFoldersGrid = TopFoldersGrid;
const TopFolders = ({ maxItems, title, posts, userMoods, skipItems }) => {
    const state = (0, overmind_1.useAppState)();
    const moods = userMoods ? userMoods : state.lists.top.moods.items || [];
    const actions = (0, overmind_1.useActions)();
    maxItems = maxItems || 100;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title === undefined && ((0, jsx_runtime_1.jsx)(antd_1.Row, { style: { width: "100%" }, children: (0, jsx_runtime_1.jsx)("p", { className: "header-2 u-margin-bottom-medium", children: "Explore folders" }) })), (0, jsx_runtime_1.jsxs)("div", { children: [title ? (0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: "/top/folders" }) : "", moods
                        ?.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3))
                        .map((m, i) => ((0, jsx_runtime_1.jsx)(antd_1.Row, { className: "nl-mood-grid-row", style: posts === "full"
                            ? {
                                justifyContent: "space-between",
                                alignItems: "center",
                            }
                            : {
                                justifyContent: "start",
                                alignItems: "center",
                            }, children: (0, jsx_runtime_1.jsx)(exports.TopFoldersGrid, { mood: m, postNumber: i, title: title, posts: posts }) })))] }), !userMoods && (moods?.length || 0) < maxItems && ((0, jsx_runtime_1.jsx)(LoadMore_1.LoadMore, { loadMore: () => actions.lists.top.moods() }))] }));
};
exports.default = TopFolders;
//# sourceMappingURL=TopFolders.js.map