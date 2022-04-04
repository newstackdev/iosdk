import {
	MoodReadResponse,
	PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCachedMood } from "../hooks/useCached";
import { useActions, useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import { NLView } from "../types";
import { ContentLayout } from "./ContentLayout";
import { Ebene } from "./Icons/Ebene";
import FolderClosed from "./Icons/Folder/Closed";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { LoadMore } from "./LoadMore";
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
			// className={title === "Moods" ? "" : ""}
		>
			<Row
				style={{
					width: "100%",
					height: "auto",
					display: "flex",
					justifyContent: `${
						posts === "full" ? "space-between" : ""
					}`,
				}}
				className={`${
					noFullWidth
						? "nl-mood-grid-row-height"
						: "app-main-full-width"
				} ${title === "Moods" ? "nl-mood-grid-row-four" : ""}`}
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

							<small
								className="folder-name"
								style={{ paddingTop: "5px" }}
							>
								{/* @ts-ignore */}
								{m.title?.length > 10
									? m.title?.substring(0, 3) + "..."
									: m?.title || ""}
							</small>
						</Col>
					</Link>
				)}

				{/* // image */}
				{postsList?.length === 0 && (
					<Col style={{ aspectRatio: "1/1" }} />
				)}
				{postsList?.map((p) => (
					<Col className={"bg-hover"} style={{ aspectRatio: "1/1" }}>
						<PostWidget
							mood={mood}
							post={p}
							aspectRatio={p.aspectRatio}
						/>
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
	const actions = useActions();
	maxItems = maxItems || 100;

	return (
		<>
			{title === undefined && (
				<Row style={{ width: "100%" }}>
					{/* <LargeArrowBack /> */}
					<p className="header-2 u-margin-bottom-medium">
						Explore folders
					</p>
				</Row>
			)}

			<div>
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
			{!userMoods && ((moods?.length || 0) < maxItems) && (
				<LoadMore loadMore={() => actions.lists.top.moods()} />
			)}
		</>
	);
};

export default TopFolders;
