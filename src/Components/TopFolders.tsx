import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { MaybeLink, PostWidget } from "./PostWidget";
import { MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../types";
import { PremiumContent } from "./PremiumContent";
import { Spin } from "./Spin";
import { useActions, useAppState } from "../overmind";
import { useCallback, useEffect } from "react";
import FolderClosed from "./Icons/Folder/Closed";
import InfiniteScroll from "react-infinite-scroller";
import Title from "../Pages/Explore/Title";

const MAX_POSTS_TO_SHOW = 5;

export const TopFoldersGrid: NLView<{
  mood: MoodReadResponse;
  maxPosts?: number;
  title: string | undefined;
  noFolder?: boolean;
  wrap?: boolean;
  noFullWidth?: boolean;
  blur?: boolean;
}> = ({ mood, maxPosts, title, noFolder, noFullWidth, wrap }) => {
  const postsList = mood.posts?.slice(0, maxPosts);
  const actions = useActions();
  const state = useAppState();

  const getPostsHandler = useCallback(
    (page: number) => {
      actions.api.mood.getPosts({ id: mood.id });
    },
    [mood],
  );

  return (
    <PremiumContent stakeToAccess={mood.stakeToAccess} owner={mood?.author} style={{ width: "100%" }} link={"/folder/" + mood.id}>
      <Row
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: `${postsList && postsList.length > 4 ? "space-between" : ""}`,
          flexWrap: "wrap",
        }}
        wrap={true}
        className={`${noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"} ${
          title === "Moods" ? "nl-mood-grid-row-responzive" : ""
        }`}
      >
        {/* // folder */}
        {!noFolder && (
          <Link to={`/folder/${mood.id}`} className="ant-col">
            <Col
              className="bg-hover"
              style={{
                justifyContent: "center",
                flexDirection: "column",
                aspectRatio: "1/1",
                height: "100%",
                flex: 1,
              }}
            >
              <FolderClosed className="text-center folder" />

              <small className="folder-name" style={{ paddingTop: "5px" }}>
                {/* @ts-ignore */}
                {mood.title?.length > 10 ? mood.title?.substring(0, 3) + "..." : mood?.title || ""}
              </small>
            </Col>
          </Link>
        )}
        {/* // image */}
        {!postsList?.length && <Col style={{ aspectRatio: "1/1" }} />}
        {window.location.pathname.includes("folder/") ? (
          <InfiniteScroll
            pageStart={0}
            loadMore={getPostsHandler}
            loader={<Spin />}
            hasMore={state.lists.top.isNextPostsAvailable && state.lists.selectedUser.isNextPostsAvailable}
          >
            <Row>
              {postsList?.map((p) => (
                <MaybeLink
                  key={p.id}
                  to={
                    !p.id
                      ? ""
                      : ((p.description || "").match(/^https:\/\/[^.]+\.newlife\.io(\/\S+)$/) || "")[1]
                      ? ((p.description || "").match(/^https:\/\/[^.]+\.newlife\.io(\/\S+)$/) || "")[1] || ""
                      : !mood
                      ? `/post/${p.id}`
                      : `/folder/${mood.id}/${p.id}`
                  }
                  className={p.contentType === "text/plain" ? "maybelink ant-col" : "ant-col"}
                >
                  <Col
                    className={"bg-hover"}
                    style={{
                      justifyContent: "center",
                      flexDirection: "column",
                      aspectRatio: "1/1",
                      height: "100%",
                      flex: 1,
                    }}
                  >
                    <PostWidget mood={mood} post={p} aspectRatio={p.aspectRatio} />
                  </Col>
                </MaybeLink>
              ))}
            </Row>
          </InfiniteScroll>
        ) : (
          postsList?.map((p) => (
            <MaybeLink
              // style={}
              to={
                !p.id
                  ? ""
                  : ((p.description || "").match(/^https:\/\/[^.]+\.newlife\.io(\/\S+)$/) || "")[1]
                  ? ((p.description || "").match(/^https:\/\/[^.]+\.newlife\.io(\/\S+)$/) || "")[1] || ""
                  : !mood
                  ? `/post/${p.id}`
                  : `/folder/${mood.id}/${p.id}`
              }
              className={p.contentType === "text/plain" ? "maybelink ant-col" : "ant-col"}
            >
              <Col
                className={"bg-hover"}
                style={{
                  justifyContent: "center",
                  flexDirection: "column",
                  aspectRatio: "1/1",
                  height: "100%",
                  flex: 1,
                }}
              >
                <PostWidget mood={mood} post={p} aspectRatio={p.aspectRatio} />
              </Col>
            </MaybeLink>
          ))
        )}
      </Row>
    </PremiumContent>
  );
};

const TopFolders: NLView<{
  maxItems?: number;
  maxPostsToShow: 1 | 2 | 3 | 4 | 5;
  skipItems?: number;
  title?: string;
  posts?: string;
  filterToSameNumberPosts?: boolean;
  userMoods?: MoodReadResponse[];
  enableScrollForMoreMoods?: boolean;
  loadMoreMoodsHandler?: () => void;
  randomizeMoods?: boolean;
}> = ({
  maxItems,
  title,
  posts,
  userMoods,
  skipItems,
  maxPostsToShow,
  filterToSameNumberPosts,
  enableScrollForMoreMoods = true,
  randomizeMoods = true,
  loadMoreMoodsHandler,
}) => {
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

  let remapMoods: MoodReadResponse[] = [];

  if (filterToSameNumberPosts) {
    remapMoods = moods.filter((m) => m.posts?.slice(0, maxPostsToShow).length === maxPostsToShow);
  } else remapMoods = moods;

  const loadMoreHandler = useCallback(
    (page) => {
      if (loadMoreMoodsHandler) {
        loadMoreMoodsHandler();
      } else {
        actions.lists.top.moods({ requestedPage: page + 1 });
      }
    },
    [loadMoreMoodsHandler, actions.lists.top.moods],
  );

  return (
    <>
      {title === undefined && (
        <Row style={{ width: "100%" }}>
          {/* <LargeArrowBack /> */}
          <p className="header-2 u-margin-bottom-medium">Explore folders</p>
        </Row>
      )}
      <div style={{ maxHeight: "100%" }}>
        {title ? <Title title={title} href="/top/folders" /> : ""}
        <InfiniteScroll
          pageStart={randomizeMoods ? Math.floor(Math.random() * 20) : 0}
          loadMore={loadMoreHandler}
          hasMore={
            enableScrollForMoreMoods && state.lists.top.isNextMoodsAvailable && state.lists.selectedUser.isNextMoodsAvailable
          }
          loader={<Spin />}
        >
          {remapMoods?.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3)).map((m, i) => (
            <Row
              className="nl-mood-grid-row"
              style={
                posts === "full"
                  ? {
                      justifyContent: "space-between",
                      alignItems: "center",
                    }
                  : {
                      justifyContent: "start",
                      alignItems: "center",
                    }
              }
            >
              {/**
               * MAX_POSTS_TO_SHOW is necessary; otherwise, top folder will render all of the posts
               * containing in the moods which will overload the DOM and the experience super laggy.
               */}
              <TopFoldersGrid mood={m} maxPosts={maxPostsToShow || MAX_POSTS_TO_SHOW} title={title} />
            </Row>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default TopFolders;
