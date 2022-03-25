import {
	MoodReadResponse,
	PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FolderClosed from "../../Components/Icons/Folder/Closed";
import { PostWidget } from "../../Components/PostWidget";
import { Spin } from "../../Components/Spin";
import { useCachedMood } from "../../hooks/useCached";
import useVisibility, { useVisibilityOnce } from "../../hooks/useVisibility";
import { useActions, useAppState } from "../../overmind";
import { NLView } from "../../types";

type MoodsGridParams = {
	title?: string;
	moods?: MoodReadResponse[];
	loadMore?: () => void;
};
const complementTo4 = (p: PostReadResponse[] = []) => p;

export const MoodsGridRow: NLView<{
	mood: MoodReadResponse;
	maxItems?: number;
	noFullWidth?: boolean;
	noFolder?: boolean;
	delay?: number;
	wrap?: boolean;
}> = ({ mood, maxItems, noFullWidth, noFolder, wrap }) => {
	const [isVisible, currentElement] = useVisibilityOnce<HTMLDivElement>(-100);
	const state = useAppState();
	const actions = useActions();

	const m = useCachedMood(mood); //state.api.cache.moods[mood.id || ""] || {};

	useEffect(() => {
		const pc = m?.posts?.length || 0;
		console.log("Visible: ", isVisible);
		isVisible &&
			mood &&
			(pc === 0 || (pc < 4 && !maxItems)) &&
			actions.api.mood.getPosts(mood);
	}, [isVisible]);

	const postsList = maxItems ? m.posts?.slice(0, maxItems) : m.posts;

	console.log(postsList);

	return (
		<Row
			ref={currentElement}
			wrap={wrap}
			className={`nl-mood-grid-row scrollable-content ${
				noFullWidth ? "nl-mood-grid-row-height" : "app-main-full-width"
			} ${wrap ? "wrap" : ""}`}
			justify={wrap ? "start" : "start"}
			align="middle"
		>
			{noFolder ? (
				""
			) : (
				<Col xs={8}>
					<div style={{ width: "100%" }}>
						<Link to={`/folder/${mood.id}`}>
							<FolderClosed
								width="min(66px,100%)"
								height="auto"
								className="text-center"
							/>
							<br />
							<small className="paragraph-2r">
								{m.title || ""}
								{/* {JSON.stringify(m || "")} */}
							</small>
							<br />
						</Link>
					</div>
				</Col>
			)}
			{complementTo4(postsList).map((p) => (
				<Col className={wrap ? "wrap" : ""}>
					<PostWidget
						mood={mood}
						post={p}
						aspectRatio={p.aspectRatio}
					/>
				</Col>
			))}
			{postsList?.length === 0 ? <Col /> : ""}
		</Row>
	);
};

export const MoodsGrid: NLView<MoodsGridParams> = ({
	moods,
	title,
	loadMore,
}) => {
	const [isVisible, currentElement] = useVisibility<HTMLDivElement>(-200);
	const state = useAppState();

	useEffect(() => {
		isVisible && loadMore && loadMore();
	}, [isVisible]);

	return (
		<>
			{title && <h2 className="app-main-full-width header-2">{title}</h2>}

			{moods?.map((m, i) => (
				<MoodsGridRow mood={m} maxItems={4} delay={i * 1000} />
			))}

			<div ref={currentElement} style={{ minHeight: 100, minWidth: 100 }}>
				<br />
				{state.indicators.isWorking && loadMore ? <Spin /> : ""}
				<br />
			</div>
		</>
	);
};
