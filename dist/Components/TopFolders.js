import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useCachedMood } from "../hooks/useCached";
import { useActions, useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import FolderClosed from "./Icons/Folder/Closed";
import { LoadMore } from "./LoadMore";
import { MaybeLink, PostWidget } from "./PostWidget";
import { PremiumContent } from "./PremiumContent";
export const TopFoldersGrid = ({ mood, postNumber, title, posts, noFolder, noFullWidth, wrap }) => {
    const m = useCachedMood(mood);
    const postsList = title === "Explore folders"
        ? m.posts?.slice(0, postNumber + 1)
        : title === "Moods"
            ? m.posts
            : m.posts?.slice(0, 5);
    return (_jsx(PremiumContent, { stakeToAccess: m.stakeToAccess, owner: m?.author, style: { width: "100%" }, link: "/folder/" + m.id, children: _jsxs(Row, { style: {
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: `${posts === "full" ? "space-between" : ""}`,
                flexWrap: "unset",
            }, className: `${noFullWidth
                ? "nl-mood-grid-row-height"
                : "app-main-full-width"} ${title === "Moods" ? "nl-mood-grid-row-four" : ""}`, children: [!noFolder && (_jsx(Link, { to: `/folder/${mood.id}`, className: "ant-col", children: _jsxs(Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: [_jsx(FolderClosed, { className: "text-center folder" }), _jsx("small", { className: "folder-name", style: { paddingTop: "5px" }, children: m.title?.length > 10
                                    ? m.title?.substring(0, 3) + "..."
                                    : m?.title || "" })] }) })), postsList?.length === 0 && (_jsx(Col, { style: { aspectRatio: "1/1" } })), postsList?.map((p) => (_jsx(MaybeLink, { to: !p.id
                        ? ""
                        : !mood
                            ? `/post/${p.id}`
                            : `/folder/${mood.id}/${p.id}`, className: p.contentType === "text/plain"
                        ? "maybelink ant-col"
                        : "ant-col", children: _jsx(Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: _jsx(PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }) })))] }) }));
};
const TopFolders = ({ maxItems, title, posts, userMoods, skipItems }) => {
    const state = useAppState();
    const moods = userMoods ? userMoods : state.lists.top.moods.items || [];
    const actions = useActions();
    maxItems = maxItems || 100;
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { style: { width: "100%" }, children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: "Explore folders" }) })), _jsxs("div", { children: [title ? _jsx(Title, { title: title, href: "/top/folders" }) : "", moods
                        ?.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3))
                        .map((m, i) => (_jsx(Row, { className: "nl-mood-grid-row", style: posts === "full"
                            ? {
                                justifyContent: "space-between",
                                alignItems: "center",
                            }
                            : {
                                justifyContent: "start",
                                alignItems: "center",
                            }, children: _jsx(TopFoldersGrid, { mood: m, postNumber: i, title: title, posts: posts }) })))] }), !userMoods && (moods?.length || 0) < maxItems && (_jsx(LoadMore, { loadMore: () => actions.lists.top.moods() }))] }));
};
export default TopFolders;
//# sourceMappingURL=TopFolders.js.map