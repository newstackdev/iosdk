import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Title from "../Pages/Explore/Title";
import { PostWidget } from "./PostWidget";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { max } from "lodash";
import { ContentLayout } from "./ContentLayout";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { NLView, fischerYates } from "@newcoin-foundation/core";
import { useAppState } from "@newcoin-foundation/state";

const SpotlightGrid: NLView<{
  maxItems?: number;
  title?: string;
}> = ({ maxItems, title }) => {
  // const m = useCachedMood(mood);
  // const postsList = m.posts?.slice(0, 1);
  // const username = "newdomain.io";
  // const m = useCachedMood(mood);
  // const postsList = m.posts?.slice(0, 1);
  const moodsList = fischerYates(
    useAppState().lists.top.moods.items || [],
    maxItems || 6
  );
  const postsList = moodsList.map((m) => fischerYates(m.posts || [], 1)[0]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      {postsList?.map((p: any, i: number) => (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          className="bg-hover"
        >
          <Col className="spotlight">
            <PostWidget
              mood={moodsList[i]}
              post={p}
              username={p.author?.username}
              aspectRatio={p.aspectRatio}
              isSpotlight={true}
            />
          </Col>
          <p
            className={
              title === undefined
                ? "spotlight-username paragraph-2b font-variant-none"
                : "spotlight-username paragraph-1b font-variant-none"
            }
          >
            <Link to={`/user/${p?.author?.username || p.author?.displayName}`}>
              {title === undefined
                ? p?.author?.username.substring(0, 7) + "..." ||
                  p?.author?.displayName.substring(0, 7) + "..."
                : p?.author?.username}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

const Spotlights: NLView<{
  title?: string;
  maxRows?: number;
  maxItems?: number;
}> = ({ title, maxRows, maxItems }) => {
  const state = useAppState();
  const moods = state.lists.top.moods.items;

  return (
    <ContentLayout>
      {title === undefined && (
        <Row
          style={{
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <LargeArrowBack />
          <p className="header-2" style={{ marginLeft: "40px" }}>
            Spotlights
          </p>
        </Row>
      )}
      <div
        className={
          title === undefined
            ? "scrollable-content section-divider"
            : " section-divider"
        }
      >
        {title ? <Title title={title} href="/spotlights" /> : <></>}
        <div className="spotlight-flex-container">
          {moods?.slice(0, maxRows || moods.length).map((m) => (
            <Row className="nl-mood-grid-row spotlight-row">
              <SpotlightGrid maxItems={maxItems} title={title} />
            </Row>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
};

export default Spotlights;
