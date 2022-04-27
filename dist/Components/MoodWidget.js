"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodWidget = exports.MoodFolderWidget = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@ant-design/icons");
const useCached_1 = require("../hooks/useCached");
const overmind_1 = require("../overmind");
const Image_1 = require("./Image");
const Closed_1 = require("./Icons/Folder/Closed");
const MoodFolderWidget = ({ mood, onClick, selected, force, }) => {
    const state = (0, overmind_1.useAppState)();
    const m = (0, useCached_1.useCachedMood)(mood, force);
    const url = m.contentUrl || m.posts?.find((p) => p.contentUrl)?.contentUrl;
    const p = (m?.posts && m.posts[0]) || {};
    return ((0, jsx_runtime_1.jsxs)("div", { ...(onClick ? { onClick: () => onClick() } : {}), style: {
            textAlign: "center",
            color: "white",
            width: "100%",
            border: "none",
        }, className: selected
            ? "selected-folder bg-selected-folder"
            : "selectable-folder bg-hover", children: [(0, jsx_runtime_1.jsx)("div", { style: { width: "90%", margin: "0 auto" }, children: (0, jsx_runtime_1.jsx)(Closed_1.FolderClosed, {}) }), (0, jsx_runtime_1.jsx)("p", { className: "folder-name", children: m.title })] }));
};
exports.MoodFolderWidget = MoodFolderWidget;
const MoodWidget = ({ mood, onClick, selected, force }) => {
    const state = (0, overmind_1.useAppState)();
    const m = (0, useCached_1.useCachedMood)(mood, force);
    const url = m.contentUrl || m.posts?.find((p) => p.contentUrl)?.contentUrl;
    const p = (m?.posts && m.posts[0]) || {};
    return ((0, jsx_runtime_1.jsx)("div", { className: selected ? "selected" : "", ...(onClick ? { onClick: () => onClick() } : {}), children: (0, jsx_runtime_1.jsx)(Image_1.ContentImage
        // src={url && `1000x1000/${url}`}
        // href={`/mood/${m.id}`}
        // {...m}
        , { ...p, 
            // contentUrl={onClick ? "" : `/mood/${m.id}${m.posts?.length ? `/${m.posts[0].id}` : ""}`}
            mask: (0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(icons_1.CaretRightFilled, { style: { fontSize: "35px", color: "white" } }) }), (0, jsx_runtime_1.jsx)("p", { children: m.title })] }) }) }));
    // return <Card
    //     style={{ maxWidth: "clamp(300, 20vw, 400)" }}
    //     // title={<Link to={`/mood/${mood.id}`}>{mood.title}</Link>}
    //     cover={<ContentImage width="100%" src={mood.contentUrl || get(mood, "posts[0].contentUrl") || ""} />}
    // />
};
exports.MoodWidget = MoodWidget;
//# sourceMappingURL=MoodWidget.js.map