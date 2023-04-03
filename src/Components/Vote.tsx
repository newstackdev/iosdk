import { AppearingComponent } from "./Appearing";
import { Avatar, Button, Col, Drawer, Form, Row } from "antd";
import { Callback, NLView } from "../types";
import { ContentImage } from "./Image";
import { ContentLayout } from "./ContentLayout";
import { EyeOpen } from "./Icons/EyeOpen";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Link } from "react-router-dom";
import { ReactElement, useEffect, useRef } from "react";
import { SelectMood, SelectMoodForm } from "./SelectMood";
import { Share } from "./Share";
import { SimplifiedTag, useVotingStreamMood } from "../Pages/Post/Post";
import { SmallFolder } from "./Icons/SmallFolder";
import { Tags } from "../Pages/Post/components/Tags";
import { useActions, useAppState, useEffects } from "../overmind";
import { useCachedUser } from "../hooks/useCached";
import PostReportModal from "../Pages/Post/components/PostModal";
import Title from "../Pages/Explore/Title";
import useMediaQuery from "../hooks/useMediaQuery";

const preventEvent = (e: React.SyntheticEvent) => {
  e.stopPropagation();
  e.preventDefault();
  e.nativeEvent.stopImmediatePropagation();
  return false;
};

export const Vote: NLView<{
  // useVotingStream: typeof useVotingStreamMood,
  onDoneVoting: (val: number) => void;
  onLongDoneVoting?: Callback;
  info: ReactElement;
  votingEnabled?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
  addToMoods?: Callback;
  containerDeeplike?: React.MutableRefObject<any>;
  isEyeOpenedResponzive?: boolean;
  visionTags?: SimplifiedTag[];
  nonVisionTags?: SimplifiedTag[];
  setHilightTag?: React.Dispatch<React.SetStateAction<SimplifiedTag[]>>;
  setIsEyeOpenedResponzive?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  // useVotingStream,
  onDoneVoting,
  onLongDoneVoting,
  children,
  info,
  votingEnabled,
  setVisible,
  visible,
  addToMoods,
  containerDeeplike,
  isEyeOpenedResponzive,
  visionTags,
  nonVisionTags,
  setHilightTag,
  setIsEyeOpenedResponzive,
}) => {
  const divMessage = useRef<any>();
  const divAppearingMessage = useRef<any>();

  const effects = useEffects();
  const actions = useActions();
  const state = useAppState();
  const isResponzive = useMediaQuery("(max-width: 1024px)");
  const nextInStream = useVotingStreamMood();

  const { currPost } = nextInStream;
  const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });

  useEffect(() => {
    effects.ux.message.config({
      maxCount: 2,
      duration: 1,
      getContainer: () => divMessage?.current,
    });

    return effects.ux.message.config({
      getContainer: undefined,
    });
  }, []);

  useEffect(() => {
    if (votingEnabled) actions.flows.rating.deepLikeInit();

    actions.ux.setLayout({ headerShown: false });
    return () => {
      actions.ux.setLayout({ headerShown: true });
    };
  }, []);

  useEffect(() => {
    if (votingEnabled) actions.flows.rating.deepLikeInit();
  }, [state.routing.location]);

  useEffect(() => {
    const r = state.flows.rating;
    if (!r.isRating && !r.rated) return;
    if (r.rated && !r.value) return;

    if ((!r.isRating && r.rated) || r.value >= 100) onDoneVoting(r.value);
  }, [state.flows.rating.isRating, state.flows.rating.value]);

  const touchClickVoteStart = (e: React.SyntheticEvent) => {
    // preventEvent(e);
    actions.flows.rating.deepLikeStart({ event: e.nativeEvent });
  };
  const touchClickVoteStop = (e: React.SyntheticEvent) => {
    preventEvent(e);
    actions.flows.rating.deepLikeStop();
  };

  return (
    <ContentLayout
      isVote={true}
      header={
        <div className="post-header-wrapper">
          <div className="logo-left-top">
            <LargeArrowBack href="/explore" />
          </div>
          {state.flows.rating.value === 100 && (
            <AppearingComponent seconds={5} onShow={onLongDoneVoting}>
              <div ref={divAppearingMessage} className="post-notification-wrapper ant-message-notice-content">
                Tap spacebar to continue
              </div>
            </AppearingComponent>
          )}
          {state.flows.rating.isRating && !state.flows.rating.rated && !state.flows.rating.value && (
            <AppearingComponent seconds={8}>
              <div ref={divAppearingMessage} className="post-notification-wrapper ant-message-notice-content">
                Hold spacebar to vote
              </div>
            </AppearingComponent>
          )}
          <div ref={divMessage} style={{ flex: 1 }} className="post-notification-wrapper"></div>
        </div>
      }
      info={
        <>
          {isResponzive && visionTags && nonVisionTags && setHilightTag ? (
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              {/* infobox */}
              {isEyeOpenedResponzive && (
                <Row className="nl-post-info-column__infobox-wrapper">
                  <Col className="nl-post-info-column__infobox-wrapper__col">
                    <span
                      className="u-margin-left-small cursor-pointer"
                      onClick={() => {
                        setHilightTag([]);
                        setIsEyeOpenedResponzive!(false);
                        setVisible!(true);
                      }}
                      onMouseOver={() => setHilightTag(visionTags)}
                      onMouseOut={() => setHilightTag([])}
                    >
                      <EyeOpen />
                    </span>
                    <span
                      onClick={() => {
                        setIsEyeOpenedResponzive!(false);
                        setVisible!(true);
                      }}
                    >
                      <SmallFolder />
                    </span>
                    <Share currentPostProps={currPost} />
                    <PostReportModal />
                  </Col>
                </Row>
              )}
              {/* infobox */}
              <div
                className="nl-post-fake-drawer-wrapper"
                onClick={() => {
                  state.flows.rating.value === 100 && !isEyeOpenedResponzive && setVisible!((p) => !p);
                }}
              >
                <Tags
                  isEyeOpenedResponzive={isEyeOpenedResponzive}
                  visionTags={visionTags}
                  nonVisionTags={nonVisionTags}
                  setHilightTag={setHilightTag}
                >
                  <>
                    <Row className="nl-post-fake-drawer__username">
                      <Avatar src={<ContentImage {...author} />} className="u-margin-right-small" />
                      {author?.username && <p className="paragraph-1r">{author.username}</p>}
                    </Row>
                    <div hidden={state.flows.rating.value !== 100}>
                      <div className="nl-post-fake-drawer">
                        <div className="nl-post-fake-inner-line-drawer">&nbsp;</div>
                      </div>
                    </div>
                  </>
                </Tags>
              </div>
            </div>
          ) : (
            info
          )}

          <div className="nl-post-deeplike-mobile-wrapper">
            <Drawer
              //@ts-ignore
              getContainer={isResponzive ? false : containerDeeplike?.current}
              placement="bottom"
              size="large"
              style={{ position: "absolute" }}
              visible={visible}
              closable={false}
              contentWrapperStyle={{
                padding: "20px",
              }}
            >
              {isResponzive ? info : null}
              <Form className="app-main-full-width" onFinish={addToMoods}>
                <Title title={"Save to a folder"} deeplikeActions setVisible={setVisible} visible={visible} />
                <Form.Item name="moods" style={{ margin: 0 }}>
                  <SelectMood deeplikeActions />
                </Form.Item>
              </Form>
            </Drawer>
          </div>
        </>
      }
    >
      <div
        className="flex-center nl-fullsize-image app-main-full-height-only nl-post-img-wrapper"
        onMouseDown={touchClickVoteStart}
        onMouseUp={touchClickVoteStop}
        onTouchStart={touchClickVoteStart}
        onTouchEnd={touchClickVoteStop}
        onContextMenu={preventEvent}
      >
        {children}
      </div>

      {/* green line */}

      {true || state.flows.rating.isRating ? (
        <div className="nl-rating-bar-wrapper">
          <div
            className="nl-rating-bar"
            style={{
              opacity: [0, 100].includes(state.flows.rating.value) ? 0 : 100,
              width: `${state.flows.rating.value || 0}vw`,
            }}
          ></div>
        </div>
      ) : (
        ""
      )}
    </ContentLayout>
  );
};
