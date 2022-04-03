import { NLView } from "@newcoin-foundation/core";
import { useCachedMood } from "@newcoin-foundation/hooks";
import { useAppState } from "@newcoin-foundation/state";
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Title from "../pages/Explore/Title";
import { ContentLayout } from "./ContentLayout";
import FolderClosed from "./Icons/Folder/Closed";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { PostWidget } from "./PostWidget";

export const TopFoldersGrid: NLView<{
  mood: MoodReadResponse;
  postNumber: number;
  title: string | undefined;
  noFolder?: boolean;
  wrap?: boolean;
  posts?: string | undefined;
  noFullWidth?: boolean;
}> = ({ mood, postNumber, title, posts, noFolder, noFullWidth, wrap }) => {
  const m = useCachedMood(mood);
  const postsList =
    title === "Explore folders"
      ? m.posts?.slice(0, postNumber + 1)
      : title === "Moods"
      ? m.posts
      : m.posts?.slice(0, 5);

  return (
    <div
      style={{ width: "100%" }}
      className={title === "Moods" ? "scrollable-content" : ""}
    >
      <Row
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: `${posts === "full" ? "space-between" : ""}`,
        }}
        className={`${
          noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"
        } ${title === "Moods" ? "nl-mood-grid-row-four" : ""}`}
      >
        {/* // folder */}
        {!noFolder && (
          <Col
            style={{
              justifyContent: "center",
              flexDirection: "column",
              aspectRatio: "1/1",
              height: "100%",
            }}
            className="bg-hover"
          >
            <Link to={`/folder/${mood.id}`}>
              <FolderClosed className="text-center folder" />
            </Link>
            <small className="folder-name" style={{ paddingTop: "5px" }}>
              {/* @ts-ignore */}
              {m.title?.length > 10
                ? m.title?.substring(0, 3) + "..."
                : m?.title || ""}
            </small>
          </Col>
        )}

        {/* // image */}
        {postsList?.length === 0 && <Col style={{ aspectRatio: "1/1" }} />}
        {postsList?.map((p) => (
          <Col className={"bg-hover"} style={{ aspectRatio: "1/1" }}>
            <PostWidget mood={mood} post={p} aspectRatio={p.aspectRatio} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

const TopFolders: NLView<{
  maxItems?: number;
  skipItems?: number;
  title?: string;
  posts?: string;
  userMoods?: MoodReadResponse[];
}> = ({ maxItems, title, posts, userMoods, skipItems }) => {
  const state = useAppState();
  const moods = userMoods ? userMoods : state.lists.top.moods.items || [];

  return (
    <ContentLayout>
      {title === undefined && (
        <Row style={{ width: "100%", marginTop: "20px" }}>
          <LargeArrowBack />
          <p className="header-2" style={{ marginLeft: "40px" }}>
            Explore folders
          </p>
        </Row>
      )}

      <div
        className={
          maxItems === undefined && !userMoods
            ? "section-divider scrollable-content"
            : "section-divider"
        }
      >
        {title ? <Title title={title} href="/top/folders" /> : ""}
        {moods
          ?.slice(skipItems || 0, (skipItems || 0) + (maxItems || 3))
          .map((m, i) => (
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
                postNumber={i}
                title={title}
                posts={posts}
              />
            </Row>
          ))}
      </div>
    </ContentLayout>
  );
};

export default TopFolders;
