import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { MaybeLink, PostWidget } from "./PostWidget";
import { PremiumContent } from "./PremiumContent";
import { Spin } from "./Spin";
import { useActions, useAppState } from "../overmind";
import { useCallback, useEffect } from "react";
import FolderClosed from "./Icons/Folder/Closed";
import InfiniteScroll from "react-infinite-scroller";
import Title from "../Pages/Explore/Title";
const MAX_POSTS_TO_SHOW = 5;
export const TopFoldersGrid = ({ mood, maxPosts, title, noFolder, noFullWidth, wrap }) => {
    const postsList = mood.posts?.slice(0, maxPosts);
    const actions = useActions();
    const state = useAppState();
    const getPostsHandler = useCallback((page) => {
        actions.api.mood.getPosts({ id: mood.id });
    }, [mood]);
    return (_jsx(PremiumContent, { stakeToAccess: mood.stakeToAccess, owner: mood?.author, style: { width: "100%" }, link: "/folder/" + mood.id, children: _jsxs(Row, { style: {
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: `${postsList && postsList.length > 4 ? "space-between" : ""}`,
                flexWrap: "wrap",
            }, wrap: true, className: `${noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"} ${title === "Moods" ? "nl-mood-grid-row-responzive" : ""}`, children: [!noFolder && (_jsx(Link, { to: `/folder/${mood.id}`, className: "ant-col", children: _jsxs(Col, { className: "bg-hover", style: {
                            justifyContent: "center",
                            flexDirection: "column",
                            aspectRatio: "1/1",
                            height: "100%",
                            flex: 1,
                        }, children: [_jsx(FolderClosed, { className: "text-center folder" }), _jsx("small", { className: "folder-name", style: { paddingTop: "5px" }, children: mood.title?.length > 10 ? mood.title?.substring(0, 3) + "..." : mood?.title || "" })] }) })), !postsList?.length && _jsx(Col, { style: { aspectRatio: "1/1" } }), window.location.pathname.includes("folder/") ? (_jsx(InfiniteScroll, { pageStart: 0, loadMore: getPostsHandler, loader: _jsx(Spin, {}), hasMore: state.lists.top.isNextPostsAvailable && state.lists.selectedUser.isNextPostsAvailable, children: _jsx(Row, { children: postsList?.map((p) => (_jsx(MaybeLink, { to: !p.id
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
                                }, children: _jsx(PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }) }, p.id))) }) })) : (postsList?.map((p) => (_jsx(MaybeLink
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
                        }, children: _jsx(PostWidget, { mood: mood, post: p, aspectRatio: p.aspectRatio }) }) }))))] }) }));
};
const TopFolders = ({ maxItems, title, posts, userMoods, skipItems, maxPostsToShow, filterToSameNumberPosts, enableScrollForMoreMoods = true, randomizeMoods = true, loadMoreMoodsHandler, }) => {
    const state = useAppState();
    useEffect(() => {
        actions.lists.resetMoodAndPostAvailability();
    }, []);
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
    const loadMoreHandler = useCallback((page) => {
        if (loadMoreMoodsHandler) {
            loadMoreMoodsHandler();
        }
        else {
            actions.lists.top.moods({ requestedPage: page + 1 });
        }
    }, [loadMoreMoodsHandler, actions.lists.top.moods]);
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { style: { width: "100%" }, children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: "Explore folders" }) })), _jsxs("div", { style: { maxHeight: "100%" }, children: [title ? _jsx(Title, { title: title, href: "/top/folders" }) : "", _jsx(InfiniteScroll, { pageStart: randomizeMoods ? Math.floor(Math.random() * 20) : 0, loadMore: loadMoreHandler, hasMore: enableScrollForMoreMoods && state.lists.top.isNextMoodsAvailable && state.lists.selectedUser.isNextMoodsAvailable, loader: _jsx(Spin, {}), children: remapMoods?.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3)).map((m, i) => (_jsx(Row, { className: "nl-mood-grid-row", style: posts === "full"
                                ? {
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }
                                : {
                                    justifyContent: "start",
                                    alignItems: "center",
                                }, children: _jsx(TopFoldersGrid, { mood: m, maxPosts: maxPostsToShow || MAX_POSTS_TO_SHOW, title: title }) }))) })] })] }));
};
export default TopFolders;
//# sourceMappingURL=TopFolders.js.map