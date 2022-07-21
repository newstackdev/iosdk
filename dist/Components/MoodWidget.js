import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CaretRightFilled } from "@ant-design/icons";
import { ContentImage } from "./Image";
import { FolderClosed } from "./Icons/Folder/Closed";
import { useAppState } from "../overmind";
import { useCachedMood } from "../hooks/useCached";
export const MoodFolderWidget = ({ mood, onClick, selected, force }) => {
    const state = useAppState();
    const m = useCachedMood(mood, force);
    const url = m.contentUrl || m.posts?.find((p) => p.contentUrl)?.contentUrl;
    const p = (m?.posts && m.posts[0]) || {};
    return (_jsxs("div", { ...(onClick ? { onClick: () => onClick() } : {}), style: {
            textAlign: "center",
            color: "white",
            width: "100%",
            border: "none",
        }, className: selected ? "selected-folder bg-selected-folder" : "selectable-folder bg-hover", children: [_jsx("div", { style: { width: "90%", margin: "0 auto" }, children: _jsx(FolderClosed, {}) }), _jsx("p", { className: "folder-name", children: m.title?.length > 10 ? m.title?.substring(0, 3) + "..." : m?.title || "" })] }));
};
export const MoodWidget = ({ mood, onClick, selected, force }) => {
    const state = useAppState();
    const m = useCachedMood(mood, force);
    const url = m.contentUrl || m.posts?.find((p) => p.contentUrl)?.contentUrl;
    const p = (m?.posts && m.posts[0]) || {};
    return (_jsx("div", { className: selected ? "selected" : "", ...(onClick ? { onClick: () => onClick() } : {}), children: _jsx(ContentImage
        // src={url && `1000x1000/${url}`}
        // href={`/mood/${m.id}`}
        // {...m}
        , { ...p, 
            // contentUrl={onClick ? "" : `/mood/${m.id}${m.posts?.length ? `/${m.posts[0].id}` : ""}`}
            mask: _jsxs("div", { style: { textAlign: "center" }, children: [_jsx("div", { children: _jsx(CaretRightFilled, { style: { fontSize: "35px", color: "white" } }) }), _jsx("p", { children: m.title })] }) }) }));
    // return <Card
    //     style={{ maxWidth: "clamp(300, 20vw, 400)" }}
    //     // title={<Link to={`/mood/${mood.id}`}>{mood.title}</Link>}
    //     cover={<ContentImage width="100%" src={mood.contentUrl || get(mood, "posts[0].contentUrl") || ""} />}
    // />
};
//# sourceMappingURL=MoodWidget.js.map