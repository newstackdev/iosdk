import { NLView } from "@newcoin-foundation/core";
import {
  useCachedMoodPosts,
  useCachedUser,
  useCachedMood,
} from "@newcoin-foundation/hooks";
import { useAppState } from "@newcoin-foundation/state";
import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ContentLayout } from "src/Components";
import { SmallArrowBack } from "src/Components/Icons";
import { MediaComponent } from "src/Components/MediaComponents";
import { ThreeDots } from "../../Components/Icons/ThreeDots";
import { TopFoldersGrid } from "../../Components/TopFolders";
import { MoodsGridRow } from "./MoodsGrid";

export const Mood: NLView = () => {
  const { moodId: id } = useParams<{ moodId: string }>();
  const mood = useCachedMoodPosts({ id }, true);
  const user = useCachedUser(mood.author);
  const state = useAppState();

  return (
    <div className="section-divider">
      <ContentLayout
        isWorking={!mood?.posts?.length}
        header={
          <>
            <Row
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <Col
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <SmallArrowBack />
                <Link
                  to={`/user/${state.api.auth.user?.username}`}
                  style={{ marginLeft: "10px" }}
                >
                  <Avatar
                    src={<MediaComponent {...user} />}
                    className="avatar-image-header"
                  />
                </Link>
                <Link
                  to={`/user/${user.username}`}
                  className="paragraph-1b"
                  style={{ marginLeft: "20px" }}
                >
                  {user.username}
                </Link>
              </Col>
              <Col
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ThreeDots />
              </Col>
            </Row>
            <Row style={{ marginBottom: "40px" }}>
              <p className="paragraph-2b">{mood.title}</p>
              <p className="paragraph-2r">{mood.description || ""}</p>
            </Row>
          </>
        }
        isMood
      >
        {/* <UserWidgetHeading user={mood.author || {}} /> */}

        {/* <MoodsGridRow mood={mood} noFolder={true} wrap={true} /> */}
        <TopFoldersGrid
          mood={mood}
          noFolder={true}
          postNumber={3}
          title="Moods"
        />
        {/* <ItemGrid items={postList} render={p => <PostWidget post={p} mood={mood} />} /> */}
      </ContentLayout>
    </div>
  );
};

export const MoodDetailed: NLView = () => {
  const { moodId: id } = useParams<{ moodId: string }>();
  const mood = useCachedMood({ id }, true);
  const user = useCachedUser(mood.author);
  return (
    <ContentLayout isWorking={!mood?.posts?.length}>
      {/* <UserWidgetHeading user={mood.author || {}} /> */}
      <h2 className="header-2">{mood.title}</h2>
      <Link to={`/user/${user.username}`}>{user.username}</Link>
      <p>{mood.description}</p>
      <br />
      <MoodsGridRow mood={mood} noFolder={true} wrap={true} />
      {/* <ItemGrid items={postList} render={p => <PostWidget post={p} mood={mood} />} /> */}
    </ContentLayout>
  );
};
