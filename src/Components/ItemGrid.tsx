import { Col, Result, Row } from "antd";
import { ReactElement, useEffect } from "react";
import useVisibility from "../hooks/useVisibility";
import { useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import { MoodCreateModal } from "../Pages/Mood/MoodCreate";
import { NLView } from "../types";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Spin } from "./Spin";

export type ItemGridParams<T> = {
	title?: string;
	titleLink?: string;
	items?: T[];
	limit?: number;
	render: (item: object, index: number) => ReactElement;
	loadMore?: () => void;
	setSelectedFolder?: React.Dispatch<React.SetStateAction<boolean>>;
	selectedFolder?: boolean;
	noEmptyResults?: boolean
};

export const ItemGrid: NLView<ItemGridParams<object>> = ({
	items,
	render,
	title,
	titleLink,
	loadMore,
	limit,
	noEmptyResults
}) => {
	const [isVisible, currentElement] = useVisibility<HTMLDivElement>(200);
	const state = useAppState();
	useEffect(() => {
		loadMore && loadMore();
	}, [isVisible]);

	items =
		items && limit
			? items.slice(0, limit)
			: items
			? items.slice(0, items.length)
			: [];

	if (state.indicators.isWorking === false && !items.length)
		return noEmptyResults ? <></> : <Result icon={<></>}>nothing here</Result>;
	return (
		<>
			{/* See All page */}
			{title === undefined ? (
				<Row style={{ width: "100%", marginTop: "20px" }}>
					{/* <LargeArrowBack /> */}
					<p className="header-2" style={{ marginLeft: "40px" }}>
						{title}
					</p>
				</Row>
			) : (
				<Title title={title} href={titleLink} />
			)}

			{items.length ? (
				<Row
					wrap={true}
					className={
						limit
							? "nl-mood-grid-row-three app-main-full-width-only"
							: "nl-mood-grid-row app-main-full-width-only"
					}
					style={{
						justifyContent: "space-between",
						alignItems: " baseline",
						width: "100%",
					}}
				>
					{items.map((item, index) => (
						<Col
							key={`item${index}`}
							// className={"share-folder"}
							style={{ borderRadius: "25px" }}
						>
							{render(item, index)}
						</Col>
					))}
				</Row>
			) : (
				""
			)}
			<div ref={currentElement}>
				{state.indicators.isWorking === true && loadMore ? (
					<Spin />
				) : (
					""
				)}
			</div>
		</>
	);
};

{
	/* <Masonry columnGutter={18} columnWidth={280} items={post.moods || []} render={({ data }) => <MoodWidget mood={data} />} /> */
}
