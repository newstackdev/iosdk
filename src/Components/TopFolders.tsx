import { Col, Row } from "antd";
import { ContentLayout } from "./ContentLayout";
import { Ebene } from "./Icons/Ebene";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Link } from "react-router-dom";
import { LoadMore } from "./LoadMore";
import { MaybeLink, PostWidget } from "./PostWidget";
import { MoodReadResponse, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../types";
import { PremiumContent } from "./PremiumContent";
import { useActions, useAppState, useEffects } from "../overmind";
import { useCachedMood } from "../hooks/useCached";
import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import FolderClosed from "./Icons/Folder/Closed";
import Title from "../Pages/Explore/Title";

const MAX_ALLOWED_POSTS = 5;

export const TopFoldersGrid: NLView<{
  mood: MoodReadResponse;
  maxPosts?: number;
  title: string | undefined;
  noFolder?: boolean;
  wrap?: boolean;
  noFullWidth?: boolean;
  blur?: boolean;
}> = ({ mood, maxPosts, title, noFolder, noFullWidth, wrap }) => {
  const m = useCachedMood(mood);

  const postsList = m.posts?.slice(0, maxPosts);

  return (
    <PremiumContent
      stakeToAccess={m.stakeToAccess}
      owner={m?.author}
      style={{ width: "100%" }}
      link={"/folder/" + m.id}
      // className={title === "Moods" ? "" : ""}
    >
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
          title === "Moods" ? "nl-mood-grid-row-five" : ""
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
                {m.title?.length > 10 ? m.title?.substring(0, 3) + "..." : m?.title || ""}
              </small>
            </Col>
          </Link>
        )}
        {/* // image */}
        {!postsList?.length && <Col style={{ aspectRatio: "1/1" }} />}
        {postsList?.map((p) => (
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
        ))}
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
}> = ({ maxItems, title, posts, userMoods, skipItems, maxPostsToShow, filterToSameNumberPosts }) => {
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

  let remapMoods: MoodReadResponse[] = [];

  if (filterToSameNumberPosts) {
    remapMoods = moods.filter((m) => m.posts?.slice(0, maxPostsToShow).length === maxPostsToShow);
  } else remapMoods = moods;

  return (
    <>
      {title === undefined && (
        <Row style={{ width: "100%" }}>
          {/* <LargeArrowBack /> */}
          <p className="header-2 u-margin-bottom-medium">Explore folders</p>
        </Row>
      )}

      <div>
        {title ? <Title title={title} href="/top/folders" /> : ""}
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
            <TopFoldersGrid
              mood={m}
              maxPosts={maxPostsToShow} //i}
              title={title}
            />
          </Row>
        ))}
      </div>
      {!userMoods && (moods?.length || 0) < maxItems && <LoadMore loadMore={() => actions.lists.top.moods()} />}
    </>
  );
};

export default TopFolders;
