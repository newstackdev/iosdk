import { useParams } from "react-router";
import { Progress, Row } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SelectMoodForm } from "../../Components/SelectMood";
import { Spin } from "../../Components/Spin";
import useForm from "antd/lib/form/hooks/useForm";
// import { ContentImage, contentImageUrl } from "../../Components/Image";
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Ebene } from "../../Components/Icons/Ebene";
import { NFTIcon } from "../../Components/Icons/NTFIcon";
import PostReportModal from "./PostModal";
import { NewcoinLink } from "../Profile";
import { Vote } from "../../Components/Vote";
import { ShareButton } from "../../Components/Share";
import { json } from "overmind";
import { NLView } from "@newcoin-foundation/core";
import {
  useCachedPost,
  useCachedMood,
  useCachedUser,
} from "@newcoin-foundation/hooks";
import { useActions, useAppState } from "@newcoin-foundation/state";
import { MediaComponent } from "src/Components/MediaComponents";

const useVotingStreamMood = () => {
  const { moodId, postId, id } = useParams<{
    moodId: string;
    postId: string;
    id: string;
  }>();
  const currPost = useCachedPost({ id: postId || id }, true);
  const currMood = useCachedMood({ id: moodId }, true);
  const [index, setIndex] = useState<number>(-1);
  const actions = useActions();
  const state = useAppState();
  const moodPosts = currMood.posts || [];

  const getIndex = () => {
    if (!currMood?.id) return;

    // actions.flows.rating.deepLikeInit();

    if (index && moodPosts[index]?.id == currPost.id) return;

    console.log("mp:", currMood.id, currPost.id);

    const ix = moodPosts.findIndex((p) => p.id === postId);
    setIndex(ix > 0 ? ix : 0);
  };

  useEffect(() => getIndex(), [state.routing.location, currPost]);

  // useEffect(() => {
  // 	if (!currMood?.id) return;

  // 	actions.flows.rating.deepLikeInit();

  // 	if (index && moodPosts[index]?.id == currPost.id) return;

  // 	console.log("mp:", currMood.id, currPost.id);

  // 	const ix = moodPosts.findIndex((p: PostReadResponse) => p.id === currPost.id);
  // 	setIndex(ix > 0 ? ix : 0);
  // }, [currMood?.id, currPost?.id]);

  // const moodPosts = currMood.posts || [];

  const getPosts = (m?: MoodReadResponse) => {
    const cm = state.api.cache.moods[m?.id || ""];
    return cm && cm.posts ? cm.posts : [];
  };

  const nextPath = () => {
    const _nextPostId = moodPosts[index + 1]?.id;
    const nextMood = _nextPostId
      ? currMood
      : currPost.moods?.find(
          (md) => currMood.id != md.id && getPosts(md).length
        ) ||
        state.lists.top.moods.items.find(
          (md) => currMood.id !== md.id && getPosts(md).length
        );
    const _moodPosts = getPosts(nextMood) || [];
    const nextPost =
      _nextPostId || (_moodPosts && _moodPosts[0] && _moodPosts[0].id);

    const nextPath = `/folder/${nextMood?.id}/${nextPost}`; //(index != null) && moodPosts[index + 1]?.id ?
    return nextPath;
  };

  return { nextPath, currMood, currPost, index, isInMood: !!moodId, moodId };
};

export const Post: NLView = () => {
  const state = useAppState();
  const actions = useActions();

  const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods

  const { moodId, currMood, currPost, nextPath, index, isInMood } =
    useVotingStreamMood();

  const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });
  const username = author?.username;
  // TODO: investigate model
  // || author?.displayName;
  const [selectMoodsForm] = useForm();
  const navigateToNext = () => {
    const location = nextPath();
    if (!location) return;
    actions.routing.historyPush({ location });
  };

  const addToMoods = async (form?: { moods: { id: string }[] }) => {
    console.log("attachToMoods: Calling...");

    if (form?.moods?.length)
      await actions.api.post.attachToMoods({
        post: currPost,
        moods: form?.moods || [],
      });
    console.log("attachToMoods: done Attaching to moods...");
    navigateToNext();
  };

  const doneVoting = (rating: number) => {
    if (rating > 0)
      actions.api.post.rate({
        post: currPost,
        amount: rating,
      });

    if (rating < 100) return navigateToNext();

    // if at 100 the mood will show itself
  };
  // else either at 100% or stopped rating
  if (currMood.id && index === -1) return <Spin />;

  return (
    <>
      <Vote
        // useVotingStream={useVotingStreamMood}
        votingEnabled={isInMood}
        onDoneVoting={doneVoting}
        onLongDoneVoting={() => {
          const eh = (e) => {
            if (e.which !== 32) return;

            window.removeEventListener("keyup", eh);

            e.preventDefault();
            navigateToNext();
          };
          window.addEventListener("keyup", eh);
          return () => {
            window.removeEventListener("keyup", eh);
          };
        }}
        info={
          <div className="post-info-column">
            <h2
              className="header-2"
              hidden={currPost.title === null ? true : false}
            >
              {currPost.title}
            </h2>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <Link
                  to={`/user/${username}`}
                  style={{
                    wordBreak: "break-all",
                    maxWidth: "100%",
                    minHeight: "1.5em",
                    textAlign: "right",
                  }}
                >
                  <span className="paragraph-2b">{username} </span>
                  <span className="paragraph-2r">{currPost.content}</span>
                </Link>
              </div>
            </div>
            {currPost.author?.newcoinPoolTx ? (
              <Row className="paragraph-2u" align="bottom">
                <a
                  href={
                    "https://explorer.newcoin.org/account/" +
                    currPost.author?.username
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Creator pool
                </a>
                <Ebene />
              </Row>
            ) : (
              ""
            )}

            <Row className="paragraph-2u" align="bottom">
              {!currPost.newcoinMintTx ? (
                ""
              ) : ["REQUESTED", "FAILED"].includes(
                  currPost.newcoinMintTx.toString()
                ) ? (
                "Mint status: " + currPost.newcoinMintTx || ""
              ) : (
                <>
                  <NewcoinLink tx={currPost.newcoinMintTx}>
                    See minted NFT
                  </NewcoinLink>
                  <NFTIcon />
                </>
              )}
            </Row>
            <br />
            <br />
            <div>
              <ShareButton />
            </div>
            <br />
            <br />
            {currPost.tags?.length ? "Tags:" : ""}
            {json(currPost.tags || [])
              ?.sort((a, b) => b["_rel"].score - a["_rel"].score)
              ?.slice(0, 10)
              ?.map((t) => {
                return (
                  <>
                    <div className="text-small">{t.value}</div>
                    <Progress
                      strokeColor="#c1fa50"
                      percent={t["_rel"].score * 100}
                    />
                  </>
                );
              })}
          </div>
        }
      >
        {/PROCESSING/i.test(currPost.contentUrl || "") ? (
          <Spin title="Processing media..." />
        ) : (
          <MediaComponent {...currPost} thumbnail={false} />
        )}

        {/* <Modal
					cancelButtonProps={{ hidden: true }}
					footer={false}
					okText="Done"
					closeIcon={<></>}
					visible={state.flows.rating.value === 100}
					style={{ textAlign: "center" }}
				>
					<h2 className="header-2">{state.flows.rating.value}</h2>
					<Form onFinish={addToMoods} form={selectMoodsForm}>
					//TODO look at addtoMoods
						<Form.Item name="moods">
							<SelectMood moods={moodsToAttach} />
						</Form.Item>
						<Row justify="space-between">
							<Col span={8}>
								<MoodCreateModal />
							</Col>
							<Col span={16}>
								<Button type="primary" htmlType="submit">
									Done
								</Button>
							</Col>
						</Row>
					</Form>
				</Modal> */}
      </Vote>
      <div className="text-right app-main-full-width">
        <PostReportModal />
      </div>
      {
        <div
          hidden={state.flows.rating.value !== 100}
          className="app-main-full-width"
        >
          <SelectMoodForm
            onFinish={addToMoods}
            title="Select a folder to share to"
          />
        </div>
      }
    </>
  );
};

// export const Post2: NLView = () => {
// 	const [selectMoodsForm] = useForm();
// 	const effects = useEffects();
// 	const divMessage = useRef<any>();

// 	const { currMood, currPost, nextPath, index } = useVotingStreamMood();
// 	const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });

// 	effects.ux.message.config({
// 		maxCount: 2,
// 		duration: 1,
// 		getContainer: () => divMessage.current,
// 	});

// 	const actions = useActions();
// 	const state = useAppState();

// 	useSetTitle(currPost.title);

// 	const postRating = async (currPost: PostReadResponse) => {
// 		if (state.flows.rating.value > 0)
// 			actions.api.post.rate({
// 				post: currPost,
// 				amount: state.flows.rating.value,
// 			});
// 	}

// 	const doneRating = async (form?: { moods: { id: string }[] }) => {
// 		await actions.api.post.attachToMoods({
// 			post: currPost,
// 			moods: form?.moods || [],
// 		});

// 		if (!nextPath) return;

// 		actions.flows.rating.deepLikeInit();
// 		actions.routing.historyPush({ location: nextPath() });
// 	};
// 	useEffect(() => {
// 		const r = state.flows.rating;
// 		if (!r.isRating && !r.rated) return;
// 		if (r.rated && !r.value) return;

// 		postRating(currPost);

// 		// else either at 100% or stopped rating
// 		if (r.rated && r.value < 100) doneRating();
// 	}, [state.flows.rating.isRating, state.flows.rating.value]);

// 	if (currMood.id && index === -1) return <Spin />;

// 	const moodsToAttach = (state.auth.moods || []).filter((m) => m.id); // current users's moods
// 	const username = author?.username || author?.displayName;

// 	const touchClickVoteStart = (e: React.SyntheticEvent) => {
// 		// preventEvent(e);
// 		actions.flows.rating.deepLikeStart({ event: e.nativeEvent });
// 	};
// 	const touchClickVoteStop = (e: React.SyntheticEvent) => {
// 		preventEvent(e);
// 		actions.flows.rating.deepLikeStop();
// 	};

// 	return (
// 		<div style={{ width: "100%", marginTop: "25px" }}>
// 			<ContentLayout
// 				isPost={true}
// 				header={
// 					<>
// 						<div className="post-back-arrow">
// 							<LargeArrowBack />
// 						</div>
// 						<div
// 							ref={divMessage}
// 							style={{ flex: 1 }}
// 							className="post-notification-wrapper"
// 						/>
// 					</>
// 				}
// 				info={
// 					<div className="post-info-column">
// 						<h2
// 							className="header-2"
// 							hidden={currPost.title === null ? true : false}
// 						>
// 							{currPost.title}
// 						</h2>
// 						<div
// 							style={{
// 								textAlign: "right",
// 							}}
// 						>
// 							<div style={{ textAlign: "left" }}>
// 								<Link
// 									to={`/user/${username}`}
// 									style={{
// 										wordBreak: "break-all",
// 										maxWidth: "100%",
// 										minHeight: "1.5em",
// 										textAlign: "right",
// 									}}
// 								>
// 									<span className="paragraph-2b">
// 										{username}{" "}
// 									</span>
// 									<span className="paragraph-2r">
// 										{currPost.description}
// 									</span>
// 								</Link>
// 							</div>
// 						</div>
// 						{currPost.author?.newcoinPoolTx ? (
// 							<Row className="paragraph-2u" align="bottom">
// 								<a
// 									href={
// 										"https://explorer.newcoin.org/account/" +
// 										currPost.author?.username
// 									}
// 									target="_blank"
// 									rel="noreferrer"
// 								>
// 									Creator pool
// 								</a>
// 								<Ebene />
// 							</Row>
// 						) : (
// 							""
// 						)}

// 						<Row className="paragraph-2u" align="bottom">
// 							{!currPost.newcoinMintTx ? (
// 								""
// 							) : ["REQUESTED", "FAILED"].includes(
// 								currPost.newcoinMintTx.toString()
// 							) ? (
// 								"Mint status: " + currPost.newcoinMintTx || ""
// 							) : (
// 								<>
// 									<NewcoinLink tx={currPost.newcoinMintTx}>
// 										See minted NFT
// 									</NewcoinLink>
// 									<NFTIcon />
// 								</>
// 							)}
// 						</Row>

// 						<div
// 							style={{
// 								position: "absolute",
// 								bottom: 0,
// 								right: 0,
// 								cursor: "pointer",
// 							}}
// 						>
// 							<PostModal />
// 						</div>
// 					</div>
// 				}
// 			>
// 				<div
// 					className="flex-center nl-fullsize-image app-main-full-height-only post-img-wrapper"
// 					onMouseDown={touchClickVoteStart}
// 					onMouseUp={touchClickVoteStop}
// 					onTouchStart={touchClickVoteStart}
// 					onTouchEnd={touchClickVoteStop}
// 					onContextMenu={preventEvent}
// 				>
// 					{/PROCESSING/i.test(currPost.contentUrl || "") ?
// 						<Spin title="Processing media..." /> :
// 						<ContentImage {...currPost} thumbnail={false} />
// 					}

// 				</div>
// 				<div className="appearing-spacebar-button">
// 					{state.flows.rating.isRating &&
// 						!state.flows.rating.rated &&
// 						!state.flows.rating.value ? (
// 						<AppearingComponent seconds={5}>
// 							<Button style={{ margin: "40px 0" }} type="primary">
// 								Hold spacebar to vote
// 							</Button>
// 						</AppearingComponent>
// 					) : (
// 						<div style={{ margin: "40px 0", height: "45px" }}></div>
// 					)}
// 				</div>

// 				<Modal
// 					cancelButtonProps={{ hidden: true }}
// 					footer={false}
// 					okText="Done"
// 					closeIcon={<></>}
// 					visible={
// 						state.flows.rating.rated &&
// 						!state.flows.rating.isRating &&
// 						state.flows.rating.value === 100
// 					}
// 					style={{ textAlign: "center" }}
// 				>
// 					<h2 className="header-2">{state.flows.rating.value}</h2>
// 					<Form onFinish={doneRating} form={selectMoodsForm}>
// 						<Form.Item name="moods">
// 							<SelectMood moods={moodsToAttach} />
// 						</Form.Item>
// 						<Row justify="space-between">
// 							<Col span={8}>
// 								<MoodCreateModal />
// 							</Col>
// 							<Col span={16}>
// 								<Button type="primary" htmlType="submit">
// 									Done
// 								</Button>
// 							</Col>
// 						</Row>
// 					</Form>
// 				</Modal>

// 				{true || state.flows.rating.isRating ? (
// 					<div className="nl-rating-bar-wrapper">
// 						<div
// 							className="nl-rating-bar"
// 							style={{
// 								opacity: [0, 100].includes(
// 									state.flows.rating.value
// 								)
// 									? 0
// 									: 100,
// 								width: `${state.flows.rating.value || 0}vw`,
// 							}}
// 						></div>
// 					</div>
// 				) : (
// 					""
// 				)}
// 			</ContentLayout>
// 		</div>
// 	);
// };

// export const XPost: NLView<{ post?: { id?: string } }> = ({ post }) => {
// 	const { moodId, postId, id } =
// 		useParams<{ moodId: string; postId: string; id: string }>();
// 	const p = useCachedPost(post || { id: postId || id }, true);
// 	const m = useCachedMood({ id: moodId }, true);
// 	const author = useCachedUser({ id: p ? p?.author?.id : "" });
// 	const [selectMoodsForm] = useForm();
// 	const carouselRef = useRef<any>();
// 	const [index, setIndex] = useState<number>(-1);
// 	const effects = useEffects();
// 	const divMessage = useRef<any>();

// 	effects.ux.message.config({
// 		maxCount: 2,
// 		duration: 1,
// 		getContainer: () => divMessage.current,
// 	});

// 	const actions = useActions();
// 	const state = useAppState();

// 	useSetTitle(p.title);

// 	useEffect(() => {
// 		if (!m?.id) return;

// 		actions.flows.rating.deepLikeInit();

// 		if (index && moodPosts[index]?.id == p.id) return;

// 		console.log("mp:", m.id, p.id);

// 		const ix = moodPosts.findIndex((p) => p.id === postId);
// 		setIndex(ix > 0 ? ix : 0);
// 	}, [m?.id, p?.id]);

// 	useEffect(() => {
// 		carouselRef &&
// 			carouselRef.current &&
// 			carouselRef.current.goTo(index, true);
// 	}, [index, carouselRef.current]);

// 	const moodPosts = m.posts || [];

// 	const getPosts = (m?: MoodReadResponse) => {
// 		const cm = state.api.cache.moods[m?.id || ""];
// 		return cm && cm.posts ? cm.posts : [];
// 	};

// 	const _nextPostId = moodPosts[index + 1]?.id;
// 	const nextMood = _nextPostId
// 		? m
// 		: p.moods?.find((md) => m.id != md.id && getPosts(md).length) ||
// 		state.lists.top.moods.items.find(
// 			(md) => m.id !== md.id && getPosts(md).length
// 		);
// 	const _moodPosts = getPosts(nextMood) || [];
// 	const nextPost =
// 		_nextPostId || (_moodPosts && _moodPosts[0] && _moodPosts[0].id);

// 	const nextPath = `/folder/${nextMood?.id}/${nextPost}`; //(index != null) && moodPosts[index + 1]?.id ?

// 	const doneRating = async (form?: { moods: { id: string }[] }) => {
// 		await actions.api.post.attachToMoods({
// 			post: p,
// 			moods: form?.moods || [],
// 		});

// 		if (!nextPath) return;

// 		actions.flows.rating.deepLikeInit();
// 		actions.routing.historyPush({ location: nextPath });
// 	};
// 	useEffect(() => {
// 		const r = state.flows.rating;
// 		if (!r.isRating && !r.rated) return;
// 		if (r.rated && !r.value) return;

// 		if (state.flows.rating.value > 0)
// 			actions.api.post.rate({
// 				post: p,
// 				amount: state.flows.rating.value,
// 			});

// 		// else either at 100% or stopped rating
// 		if (r.rated && r.value < 100) doneRating();
// 	}, [state.flows.rating.isRating, state.flows.rating.value]);

// 	if (moodId && index === -1) return <Spin />;

// 	const moodsToAttach = (state.auth.moods || []).filter((m) => m.id); // current users's moods

// 	const otherMoods = (p.moods || []).filter((_m) => _m.id != m.id);

// 	const touchClickVoteStart = (e: React.SyntheticEvent) => {
// 		// preventEvent(e);
// 		actions.flows.rating.deepLikeStart({ event: e.nativeEvent });
// 	};
// 	const touchClickVoteStop = (e: React.SyntheticEvent) => {
// 		preventEvent(e);
// 		actions.flows.rating.deepLikeStop();
// 	};
// 	const imageUrl = contentImageUrl(p);

// 	const username = author?.username || author?.displayName;

// 	return (
// 		<div style={{ width: "100%", marginTop: "25px" }}>
// 			<ContentLayout
// 				isPost={true}
// 				header={
// 					<>
// 						<div className="post-back-arrow">
// 							<LargeArrowBack />
// 						</div>
// 						<div
// 							ref={divMessage}
// 							style={{ flex: 1 }}
// 							className="post-notification-wrapper"
// 						/>
// 					</>
// 				}
// 				info={
// 					<div className="post-info-column">
// 						{/* {index} / {m.id} */}
// 						{/* {moodId ? <Row className="app-full-width">
// 					<Col span="8">
// 						{hasPrev ? <Link to={`/mood/${moodId}/${moodPosts[index - 1]?.id}`}>prev</Link> : "START"}
// 						</Col>
// 						<Col span="8">
// 						{m ? "In mood " + m.title : "not in mood now"}<br />
// 						Value: {JSON.stringify(state.flows.rating.value)}<br />
// 						Rating: {JSON.stringify(state.flows.rating.isRating)}<br />
// 						Rated: {JSON.stringify(state.flows.rating.rated)}<br />
// 						Posts here: {JSON.stringify(state.api.moods[m?.id || ""]?.posts?.length)}<br />
// 						Moods here: {JSON.stringify(p.moods?.length)}<br />
// 						</Col>
// 						<Col span="8">
// 						{hasNext ? <Link to={`/mood/${moodId}/${moodPosts[index + 1]?.id}`}>next</Link> : "END"}
// 						</Col>
// 					</Row> : ""} */}
// 						{/* <UserWidgetTopFixed user={p.author} /> */}
// 						{/* <p>Content url: {p.contentUrl}</p> */}
// 						<h2
// 							className="header-2"
// 							hidden={p.title === null ? true : false}
// 						>
// 							{p.title}
// 						</h2>
// 						<div
// 							style={{
// 								textAlign: "right",
// 							}}
// 						>
// 							<div style={{ textAlign: "left" }}>
// 								<Link
// 									to={`/user/${username}`}
// 									style={{
// 										wordBreak: "break-all",
// 										maxWidth: "100%",
// 										minHeight: "1.5em",
// 										textAlign: "right",
// 									}}
// 								>
// 									<span className="paragraph-2b">
// 										{username}{" "}
// 									</span>
// 									<span className="paragraph-2r">
// 										{p.description}
// 									</span>
// 								</Link>
// 							</div>
// 						</div>
// 						{p.author?.newcoinPoolTx ? (
// 							<Row className="paragraph-2u" align="bottom">
// 								<a
// 									href={
// 										"https://explorer.newcoin.org/account/" +
// 										p.author?.username
// 									}
// 									target="_blank"
// 									rel="noreferrer"
// 								>
// 									Creator pool
// 								</a>
// 								<Ebene />
// 							</Row>
// 						) : (
// 							""
// 						)}

// 						<Row className="paragraph-2u" align="bottom">
// 							{!p.newcoinMintTx ? (
// 								""
// 							) : ["REQUESTED", "FAILED"].includes(
// 								p.newcoinMintTx.toString()
// 							) ? (
// 								"Mint status: " + p.newcoinMintTx || ""
// 							) : (
// 								<>
// 									<NewcoinLink tx={p.newcoinMintTx}>
// 										See minted NFT
// 									</NewcoinLink>
// 									<NFTIcon />
// 								</>
// 							)}
// 						</Row>

// 						<div
// 							style={{
// 								position: "absolute",
// 								bottom: 0,
// 								right: 0,
// 								cursor: "pointer",
// 							}}
// 						>
// 							<PostModal />
// 						</div>
// 					</div>
// 				}
// 			>
// 				<div
// 					className="flex-center nl-fullsize-image app-main-full-height-only post-img-wrapper"
// 					onMouseDown={touchClickVoteStart}
// 					onMouseUp={touchClickVoteStop}
// 					onTouchStart={touchClickVoteStart}
// 					onTouchEnd={touchClickVoteStop}
// 					onContextMenu={preventEvent}
// 				>
// 					{/PROCESSING/i.test(p.contentUrl || "") ?
// 						<Spin title="Processing media..." /> :
// 						<ContentImage {...p} thumbnail={false} />
// 					}

// 				</div>
// 				<div className="appearing-spacebar-button">
// 					{state.flows.rating.isRating &&
// 						!state.flows.rating.rated &&
// 						!state.flows.rating.value ? (
// 						<AppearingComponent seconds={5}>
// 							<Button style={{ margin: "40px 0" }} type="primary">
// 								Hold spacebar to vote
// 							</Button>
// 						</AppearingComponent>
// 					) : (
// 						<div style={{ margin: "40px 0", height: "45px" }}></div>
// 					)}
// 				</div>

// 				<Modal
// 					cancelButtonProps={{ hidden: true }}
// 					footer={false}
// 					okText="Done"
// 					closeIcon={<></>}
// 					visible={
// 						state.flows.rating.rated &&
// 						!state.flows.rating.isRating &&
// 						state.flows.rating.value === 100
// 					}
// 					style={{ textAlign: "center" }}
// 				>
// 					<h2 className="header-2">{state.flows.rating.value}</h2>
// 					<Form onFinish={doneRating} form={selectMoodsForm}>
// 						<Form.Item name="moods">
// 							<SelectMood moods={moodsToAttach} />
// 						</Form.Item>
// 						<Row justify="space-between">
// 							<Col span={8}>
// 								<MoodCreateModal />
// 							</Col>
// 							<Col span={16}>
// 								<Button type="primary" htmlType="submit">
// 									Done
// 								</Button>
// 							</Col>
// 						</Row>
// 					</Form>
// 				</Modal>

// 				{true || state.flows.rating.isRating ? (
// 					<div className="nl-rating-bar-wrapper">
// 						<div
// 							className="nl-rating-bar"
// 							style={{
// 								opacity: [0, 100].includes(
// 									state.flows.rating.value
// 								)
// 									? 0
// 									: 100,
// 								width: `${state.flows.rating.value || 0}vw`,
// 							}}
// 						></div>
// 					</div>
// 				) : (
// 					""
// 				)}
// 			</ContentLayout>
// 		</div>
// 	);
// };
