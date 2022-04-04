import { useParams } from "react-router";
import { NLView } from "../../types";
import { Button, Col, Form, Modal, Progress, Row, Tag, Tooltip } from "antd";
import {
	useCachedMood,
	useCachedPost,
	useCachedUser,
} from "../../hooks/useCached";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActions, useAppState } from "../../overmind";
import { SelectMood, SelectMoodForm } from "../../Components/SelectMood";
import { MoodCreateModal } from "../Mood/MoodCreate";
import { Spin } from "../../Components/Spin";
import useForm from "antd/lib/form/hooks/useForm";
// import { ContentImage, contentImageUrl } from "../../Components/Image";
import {
	MoodReadResponse,
	PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { Ebene } from "../../Components/Icons/Ebene";
import { NFTIcon } from "../../Components/Icons/NTFIcon";
import PostReportModal from "./PostModal";
import { NewcoinLink } from "../Profile";
import { ContentImage } from "../../Components/Image";
import { Vote } from "../../Components/Vote";
import { ShareButton } from "../../Components/Share";
import { json } from "overmind";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Edit } from "../../Components/Icons/Edit";

const useVotingStreamMood = () => {
	const { moodId, postId, id } =
		useParams<{ moodId: string; postId: string; id: string }>();
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

const round = (n) => Math.round(n * 10000) / 10000;
const sumScore = (tagRels: { score: number }[]) => {
	if (!(tagRels instanceof Array))
		return round((tagRels as any).score as number);
	const w = 1 / tagRels.length;
	return round(tagRels.reduce((r, c) => r + w * c.score, 0));
}

export const Post: NLView = () => {
	const state = useAppState();
	const actions = useActions();
	const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);

	const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods

	const { moodId, currMood, currPost, nextPath, index, isInMood } =
		useVotingStreamMood();

	const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });
	const username = author?.username || author?.displayName;
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
				mood: currMood
			});

		if (rating < 100) return navigateToNext();

		// if at 100 the mood will show itself
	};
	// else either at 100% or stopped rating
	if (currMood.id && index === -1) return <Spin />;

	const url = [
		window.location.protocol,
		"//",
		window.location.host,
		state.routing.location,
	].join("");

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
									<span className="paragraph-2b">
										{username}{" "}
									</span>
									<span className="paragraph-2r">
										{currPost.description}
									</span>
								</Link>
							</div>
						</div>
						{currPost.author?.newcoinPoolTx ? (
							<Row
								className="paragraph-2u"
								align="bottom"
								style={{ marginTop: "20px" }}
							>
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

						<Row
							className="paragraph-2b"
							align="bottom"
							style={{ marginTop: "10px" }}
						>
							{!currPost.newcoinMintTx ? (
								""
							) : ["REQUESTED", "FAILED"].includes(
								currPost.newcoinMintTx.toString()
							) ? (
								"Minting NFT..." /* + currPost.newcoinMintTx || ""*/
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
						<CopyToClipboard text={url}>
							<Tooltip
								title={
									!copyToClipboard
										? ""
										: "copied to clipboard"
								}
								placement="right"
							>
								<button
									className="copy-to-clipboard-button"
									onClick={() => {
										setCopyToClipboard(true);
										setTimeout(() => {
											setCopyToClipboard(false);
										}, 2000);
									}}
								>
									<Edit />
								</button>
							</Tooltip>
						</CopyToClipboard>
						<br />
						{currPost.tags?.length ? "Tags:" : ""}
						{json(currPost.tags || [])
							?.sort((a, b) => sumScore(b["_rel"]) - sumScore(a["_rel"]))
							?.slice(0, 10)
							?.map((t) => {
								return (
									<>
										<div className="text-small">{t.value} [{sumScore(t["_rel"]) * 100}]</div>

										<Progress
											strokeColor="#c1fa50"
											showInfo={false}
											percent={sumScore(t["_rel"]) * 100}
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
					<ContentImage {...currPost} thumbnail={false} />
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
