import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { MoodReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { useParams } from "react-router";
import Avatar from "antd/lib/avatar/avatar";
// import { PremiumContent } from "../Components/PremiumContent";
import { ContentImage } from "../../Components/Image";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView, NLView } from "../../types";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import { MoodsGridRow } from "./MoodsGrid";
import { Share } from "../../Components/Share";
import { ThreeDots } from "../../Components/Icons/ThreeDots";
import { TopFoldersGrid } from "../../Components/TopFolders";
import { useActions, useAppState } from "../../overmind";
import { useCachedMood, useCachedMoodPosts, useCachedPool, useCachedUser } from "../../hooks/useCached";
import { useCurrentUserStakeEligibility, useFolderStakeInfo } from "../../hooks/useBlockchainInfo";
import { useEffect } from "react";
import { useVotingStreamMood } from "../Post/Post";
import PostReportModal from "../Post/components/PostModal";

// const useFolderStakeInfo = (folder: MoodReadResponse) => {
// 	const moodDetails = useCachedMood(folder, true);
// 	const state = useAppState();
// 	const user = useCachedUser(folder.author);

// 	const pool = useCachedPool({ owner: user.username })

// 	const _stakeInfo = {
// 		toAccess: moodDetails.stakeToAccess || 0,
// 		currentUserStake: (state.newcoin.pools[pool.code] || 0) / 1000,
// 	}
// 	return {
// 		..._stakeInfo,
// 		currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
// 		currency: `${user.username?.toUpperCase()}`,
// 		currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
// 	};
// };

export const Mood: NLView = () => {
  const { moodId: id } = useParams<{ moodId: string }>();
  const mood = useCachedMoodPosts({ id }, true);
  const moodDetails = useCachedMood({ id }, true);
  const user = useCachedUser(mood.author);
  const state = useAppState();
  const actions = useActions();
  const pool = useCachedPool({ owner: user.username });
  const stakeInfo = useFolderStakeInfo(moodDetails);
  const nextInStream = useVotingStreamMood(); //useVotingStreamTags();
  const { currPost } = nextInStream;

  // hide header
  useEffect(() => {
    actions.ux.setLayout({ headerShown: false });
    actions.ux.setFooterVisibility({ footerShown: false });
    return () => {
      actions.ux.setLayout({ headerShown: false });
      actions.ux.setFooterVisibility({ footerShown: true });
    };
  }, []);

  // {
  // 	..._stakeInfo,
  // 	currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
  // 	currency: `${user.username?.toUpperCase()}`,
  // 	currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
  // }
  // if(true)
  // 	return <>{JSON.stringify(moodDetails.stakeToAccess)}</>
  return (
    <ContentLayout
      position="top"
      isMood
      isWorking={!mood?.posts?.length}
      header={
        <Link to={"/explore"}>
          <div className="logo-left-top" style={{ padding: "0px 20px" }}>
            <state.config.components.icons.Logo />
          </div>
        </Link>
      }
      info={
        <Row className="nl-post-info-column">
          <Col
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Link to={`/user/${user.username}`}>
              <Avatar src={<ContentImage {...user} />} className="avatar-image-header" />
            </Link>
            <Link to={`/user/${user.username}`} className="paragraph-1b u-margin-left-medium">
              {user.username}
            </Link>
          </Col>
          <Col>
            <p className="paragraph-2b">{moodDetails.title}</p>
            <p className="paragraph-2r" style={{ wordBreak: "break-all" }}>
              {moodDetails.description || ""}
            </p>
            {/* {moodDetails.stakeToAccess} */}
          </Col>
          <Col>
            {stakeInfo.toAccess ? (
              !stakeInfo.currentUserEligible ? (
                <span>
                  <hr />
                  <p className="paragraph-2r">
                    {
                      <>
                        This content is accessible only to members of {user.username} dao.
                        <br />
                        <br />
                        <div>Stake to access: {stakeInfo.toAccess || ""} </div>
                        <div>Your stake: {stakeInfo.currentUserStake}</div>
                        <div>Stake to enter: {stakeInfo.currentUserNeeds}</div>
                      </>
                    }
                  </p>
                </span>
              ) : (
                <span>
                  <hr />
                  You are eligible to access this premium folder
                </span>
              )
            ) : (
              <></>
            )}
          </Col>

          <Row style={{ flex: 1 }} />

          {/* infobox */}
          <Row className="nl-post-info-column__infobox-wrapper">
            <Col className="nl-post-info-column__infobox-wrapper__col">
              <LargeArrowBack />
              <Share currentPostProps={currPost} />
              <PostReportModal />
            </Col>
          </Row>
          {/* infobox */}
        </Row>
      }
    >
      {/* <UserWidgetHeading user={mood.author || {}} /> */}

      {/* <MoodsGridRow mood={mood} noFolder={true} wrap={true} /> */}
      <TopFoldersGrid
        mood={mood}
        noFolder={true}
        // postNumber={3}
        title="Moods"
      />
      {/* <ItemGrid items={postList} render={p => <PostWidget post={p} mood={mood} />} /> */}
    </ContentLayout>
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
