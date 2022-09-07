import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { MaybeLink, PostWidget } from "./PostWidget";
import { PremiumContent } from "./PremiumContent";
import { useActions, useAppState, useEffects } from "../overmind";
import { useCachedMood } from "../hooks/useCached";
import FolderClosed from "./Icons/Folder/Closed";
import Title from "../Pages/Explore/Title";
const MAX_ALLOWED_POSTS = 5;
export const TopFoldersGrid = ({ mood, maxPosts, title, noFolder, noFullWidth, wrap }) => {
    const m = useCachedMood(mood);
    const postsList = m.posts?.slice(0, maxPosts);
    return (_jsx(PremiumContent, { stakeToAccess: m.stakeToAccess, owner: m?.author, style: { width: "100%" }, link: "/folder/" + m.id, children: _jsxs(Row, { style: {
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: `${postsList && postsList.length > 4 ? "space-between" : ""}`,
                flexWrap: "wrap",
            }, wrap: true, className: `${noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"} ${title === "Moods" ? "nl-mood-grid-row-five" : ""}`, children: [!noFolder && (_jsx(Link, { to: `/folder/${mood.id}`, className: "ant-col", children: _jsxs(Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: [_jsx(FolderClosed, { className: "text-center folder" }), _jsx("small", { className: "folder-name", style: { paddingTop: "5px" }, children: m.title?.length > 10 ? m.title?.substring(0, 3) + "..." : m?.title || "" })] }) })), !postsList?.length && _jsx(Col, { style: { aspectRatio: "1/1" } }), postsList?.map((p) => (_jsx(MaybeLink
                // style={}
                , { 
                    // style={}
                    to: !p.id
                        ? ""
                        : ((p.description || "").match(/^https:\/\/[^.]+\.newlife\.io(\/\S+)$/) || "")[1]
                            ? ((p.description || "").match(/^https:\/\/[^.]+\.newlife\.io(\/\S+)$/) || "")[1] || ""
                            : !mood
                                ? `/post/${p.id}`
                                : `/folder/${mood.id}/${p.id}`, className: p.contentType === "text/plain" ? "maybelink ant-col" : "ant-col", children: _jsx(Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: _jsx(PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }) })))] }) }));
};
const TopFolders = ({ maxItems, title, posts, userMoods, skipItems, maxPostsToShow, filterToSameNumberPosts }) => {
    const state = useAppState();
    const effects = useEffects();
    const moods = userMoods ? userMoods : state.lists.top.moods.items || [];
    // if (true)
    //   return (
    //     <>
    //       {posts?.map((p) => (
    //         <div>{JSON.stringify(p.id)}</div>
    //       ))}
    //     </>
    //   );
    const actions = useActions();
    maxItems = maxItems || 100;
    let remapMoods = [];
    if (filterToSameNumberPosts) {
        remapMoods = moods.filter((m) => m.posts?.slice(0, maxPostsToShow).length === maxPostsToShow);
    }
    else
        remapMoods = moods;
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { style: { width: "100%" }, children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: "Explore folders" }) })), _jsxs("div", { children: [title ? _jsx(Title, { title: title, href: "/top/folders" }) : "", remapMoods?.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3)).map((m, i) => (_jsx(Row, { className: "nl-mood-grid-row", style: posts === "full"
                            ? {
                                justifyContent: "space-between",
                                alignItems: "center",
                            }
                            : {
                                justifyContent: "start",
                                alignItems: "center",
                            }, children: _jsx(TopFoldersGrid, { mood: m, maxPosts: maxPostsToShow, title: title }) })))] }), !userMoods && (moods?.length || 0) < maxItems && _jsx(LoadMore, { loadMore: () => actions.lists.top.moods() })] }));
};
export default TopFolders;
//# sourceMappingURL=TopFolders.js.map