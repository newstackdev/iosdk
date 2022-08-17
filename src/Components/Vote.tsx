import { AppearingComponent } from "./Appearing";
import { Button } from "antd";
import { Callback, NLView } from "../types";
import { ContentLayout } from "./ContentLayout";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Link } from "react-router-dom";
import { ReactElement, useEffect, useRef } from "react";
import { useActions, useAppState, useEffects } from "../overmind";

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
}> = ({
  // useVotingStream,
  onDoneVoting,
  onLongDoneVoting,
  children,
  info,
  votingEnabled,
}) => {
  const divMessage = useRef<any>();

  const effects = useEffects();
  const actions = useActions();
  const state = useAppState();

  useEffect(() => {
    effects.ux.message.config({
      maxCount: 2,
      duration: 1,
      getContainer: () => divMessage.current,
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Link to={"/explore"}>
            <div className="logo-left-top" style={{ padding: "0px 20px" }}>
              <state.config.components.icons.Logo />
            </div>
          </Link>
          <div ref={divMessage} style={{ flex: 1 }} className="post-notification-wrapper"></div>

          {votingEnabled !== false ? (
            <>
              {state.flows.rating.value === 100 && (
                <AppearingComponent seconds={5} onShow={onLongDoneVoting}>
                  <div className="post-notification-wrapper ant-message-notice-content">Tap spacebar to continue</div>
                </AppearingComponent>
              )}
            </>
          ) : (
            state.flows.rating.isRating &&
            !state.flows.rating.rated &&
            !state.flows.rating.value && (
              <AppearingComponent seconds={8}>
                <div className="post-notification-wrapper ant-message-notice-content">Hold spacebar to vote</div>
              </AppearingComponent>
            )
          )}
        </div>
      }
      info={info}
    >
      <div className="nl-fullsize-image-container">
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
