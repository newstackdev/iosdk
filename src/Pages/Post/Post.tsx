import { useParams } from "react-router";
import { NLView } from "../../types";
import { Button, Col, Form, Modal, Progress, Row, Tag, TagProps, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import {
	useCachedMood,
	useCachedPost,
	useCachedUser,
} from "../../hooks/useCached";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
// import { NewcoinLink } from "../Profile";
import { ContentImage } from "../../Components/Image";
import { Vote } from "../../Components/Vote";
import { json } from "overmind";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Edit } from "../../Components/Icons/Edit";
import { Clipboard } from "src/Components/Icons/Clipboard";
import { BlockExplorerLink } from "../../Components/Links";

const useVotingStreamMood = () => {
	const { moodId, postId, id } =
		useParams<{ moodId: string; postId: string; id: string }>();
	const currPost = useCachedPost({ id: postId || id }, true);
	const currMood = useCachedMood({ id: moodId }, true);
	const [index, setIndex] = useState<number>(-1);
	const state = useAppState();
	const moodPosts = currMood.posts || [];

	const getIndex = () => {
		if (!currMood?.id) return;

		if (index && moodPosts[index]?.id == currPost.id) return;

		console.log("mp:", currMood.id, currPost.id);

		const ix = moodPosts.findIndex((p) => p.id === postId);
		setIndex(ix > 0 ? ix : 0);
	};

	useEffect(() => getIndex(), [state.routing.location, currPost]);

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

	return { nextPath, currMood, currPost, index, contextType: "mood", contextValue: moodId };
};

const useVotingStreamTags = () => {
	const { tags, postId, id } =
		useParams<{ tags: string; postId: string; id: string }>();
	const currPost = useCachedPost({ id: postId || id }, true);
	const [index, setIndex] = useState<number>(-1);
	const actions = useActions();
	const state = useAppState();
	// const currTags = useCachedPostSearch({ tags }, true);

	const tagsPosts = state.lists.search.posts.results?.value || [];;

	const getIndex = () => {
		if (!tags) return;
		const ix = tagsPosts.findIndex((p) => p.id === postId);
		setIndex(ix > 0 ? ix : 0);
	};

	useEffect(() => getIndex(), [state.routing.location, currPost]);

	const nextPath = () => {
		const _nextPostId = tagsPosts[index + 1]?.id;
		// const nextTags = ??? just make it one tag less or e.g. one of the tags on the last post

		const nextPath = `/tags/${tags}/${_nextPostId}`;
		return nextPath;
	};

	return { nextPath, currPost, index, contextType: "tags", contextValue: tags };
};

const round = (n) => Math.round(n * 10000) / 10000;
const sumScore = (tagRels?: { score?: number }[]) => {
	if (!(tagRels instanceof Array))
		return 0;
	const w = 1 / tagRels.length;
	return round(tagRels.reduce((r, c) => r + w * (c.score || 0), 0));
}
const bySumScore = (a, b) => sumScore(b["_rel"]) - sumScore(a["_rel"]);

const SvgPolygons: NLView<{
	visionTags?: {
		value?: string,
		polygons?: { x: number, y: number }[][]
	}[],
}> = ({ visionTags }) =>

		!visionTags ? <></> :
			<div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
				<svg width='100%' height='100%' style={{ left: 0, top: 0, position: "absolute" }} viewBox="0 0 100 100">
					{
						visionTags?.map(
							t => <g>
								{t.polygons?.map(polygon =>
									<>
										{visionTags.length > 1 ? <text
											fontSize={3}
											fill="#b3ff00"
											x={polygon[0].x * 100} y={polygon[0].y * 100 - .5}>{t.value}</text>
											: <></>}
										<polygon
											vector-effect="non-scaling-stroke"
											style={{
												stroke: "#b3ff00",
												strokeWidth: "2px",
												fill: "transparent",
												filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"
											}}
											points={polygon.map(point => `${point.x * 100},${point.y * 100}`).join(" ")}>
											{/* {polygon.map(point => <><span>{point.x}</span><span>{point.y}</span></>)} */}
										</polygon>
									</>)}
							</g>
						)
					}
				</svg>
			</div>


type Polygon = { x: number, y: number }[];

type SimplifiedTag = {
	value?: string,
	polygons?: Polygon[]
};

export const postBase: (useVotingStreamHook: typeof useVotingStreamTags) => NLView =
	(useVotingStreamHook) => () => {
		const state = useAppState();
		const actions = useActions();
		const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
		// const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods
		const nextInStream = useVotingStreamHook(); //useVotingStreamTags();
		const ref = useRef<any>();

		const { contextType, contextValue, currPost, nextPath, index } = nextInStream;

		const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });
		const username = author?.username || author?.displayName;

		const [hilightTag, setHilightTag] = useState<SimplifiedTag[]>([])

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
					contextType,
					contextValue
					// mood: currMood
				});

			if (rating < 100) return navigateToNext();

			// if at 100 the mood will show itself
		};
		// else either at 100% or stopped rating
		// if (currMood.id && index === -1) return <Spin />;
		if (!contextType && !(index >= 0)) return <Spin />;

		const url = [
			window.location.protocol,
			"//",
			window.location.host,
			state.routing.location,
		].join("");

		const isVisionTag = (t: { _rel?: { source: string, polygons: SimplifiedTag["polygons"] }[] } | any) => 
			t._rel?.find(r => r.source === "vision" && r.polygons);

		const nonVisionTags: SimplifiedTag[] =
			currPost.tags?.filter(t => !isVisionTag(t))
				.map(t => ({ ...t, polygons: [] })) || [];

		const visionTags: SimplifiedTag[] =
			currPost.tags?.filter(t => isVisionTag(t))
				.map(t => ({ ...t, polygons: JSON.parse((t._rel?.find(r => r.source === "vision"))?.polygons || "[]") })) || [];

		console.log("Vision tags:", visionTags);

		return (
			<>
				<Vote
					// useVotingStream={useVotingStreamMood}
					votingEnabled={!!contextType}
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
											"https://explorer-dev.newcoin.org/account/" +
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
										<BlockExplorerLink explorer="newcoin" id={currPost.newcoinMintTx}>
											See minted NFT
										</BlockExplorerLink>
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
										<Clipboard />
									</button>
								</Tooltip>
							</CopyToClipboard>
							<br />
							{currPost.tags?.length && (
								<p className="paragraph-1r u-margin-top-medium">
									Tags:
								</p>
							)}
							<br />
							{visionTags.length ?
								<div
									style={{ cursor: "pointer", padding: 6 }}
									onMouseOver={() => setHilightTag(visionTags)}
									onMouseOut={() => setHilightTag([])}
								><EyeOutlined /></div> : <></>}
							<div style={{ display: "flex", flexWrap: "wrap", cursor: "pointer" }}>

								{[...visionTags?.sort(bySumScore), ...nonVisionTags?.sort(bySumScore).slice(0, Math.max(0, 20 - visionTags.length))]
									// ?.slice(0, 10)
									?.map((t) => {
										const tag = t.value;
										const score = (
											sumScore(t["_rel"]) * 100
										).toFixed(2);

										return (
											<Row
												onMouseOver={() => setHilightTag(visionTags.filter(s => s.value == t.value))}
												onMouseOut={() => setHilightTag([])}
												className="paragraph-2b tag"
												style={{ backgroundColor: Number(score) === 100 ? "#b3ff00" : "white" }}
											>
												<div>{t.polygons?.length ? <EyeOutlined /> : <></>} &nbsp;</div>
												<div className="u-margin-right-small">
													{score}%
												</div>
												<p>{tag}</p>
											</Row>
										);
									})}
							</div>
						</div>
					}
				>
					{/PROCESSING/i.test(currPost.contentUrl || "") ? (
						<Spin title="Processing media..." />
					) : (
						<ContentImage ref={ref} {...currPost} thumbnail={false} />
					)}
					{hilightTag?.length ?
						<SvgPolygons visionTags={hilightTag} /> :
						<></>}
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

export const Post = postBase(useVotingStreamMood);
export const PostInMood = postBase(useVotingStreamMood);
export const PostInTags = postBase(useVotingStreamTags);














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