import { UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useActions, useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import { NLView } from "../types";
import { ContentLayout } from "./ContentLayout";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { ContentImage } from "./Image";
import { LoadMore } from "./LoadMore";
import { UserPowerup } from "./UserWidget";

type ICreators = {
	title?: string;
	maxItems?: number;
	users?: UserReadPublicResponse[];
};

export const CreatorsList: NLView<ICreators> = ({ title, maxItems, users }) => {
	const state = useAppState();
	maxItems = maxItems || 100;
	users = maxItems
		? users?.slice(0, Math.min(users?.length, maxItems))
		: users;

	// const creators =
	// 	!users ? state.lists.top.users.items : maxUsers;

	return (
		<>
			{title === undefined && (
				<Row style={{ width: "100%" }}>
					{/* <LargeArrowBack /> */}
					<p className="header-2 u-margin-bottom-medium">
						Explore top creators
					</p>
				</Row>
			)}
			<div>
				{maxItems && maxItems !== 100 ? (
					<Title title={title} href="/top/creators" />
				) : (
					<></>
				)}
				<div className="top-creators-wrapper">
					{users?.map((creator) => (
						<Row
							className="bg-hover  app-full-width"
							style={{ alignItems: "center" }}
						>
							<Col className="top-creators-first-col">
								<Col>
									<Link to={`/user/${creator.username}`}>
										<Avatar
											src={<ContentImage {...creator} />}
											className="avatar-image-top-creators"
										/>
									</Link>
								</Col>

								<Col className="top-creators-username">
									<Link to={`/user/${creator.username}`}>
										<p
											className="header-1r font-variant-none"
											style={{
												margin: "0",
												textAlign: "center",
											}}
										>
											{creator.username}
										</p>
									</Link>
								</Col>
							</Col>
							<Col className="top-creators-second-col">
								<Col className="top-creators-number">
									<p
										className="header-1r top-creators-powered"
										style={{
											margin: "0",
											justifyContent: "end",
											display: "flex",
										}}
									>
										{creator.powered}
									</p>
								</Col>
								<Col>
									<UserPowerup user={creator} />
								</Col>
							</Col>
						</Row>
					))}
				</div>

			</div>
		</>
	);
};

export const Creators: NLView<ICreators> = (props) => {
	return <CreatorsList {...props} />
}


export const TopCreators: NLView<ICreators> = ({ maxItems }) => {
	const state = useAppState();
	const actions = useActions();

	const creators = maxItems ? state.lists.top.users.items.slice(0, maxItems) : state.lists.top.users.items;

	return <>
		<CreatorsList users={creators as UserReadPublicResponse[]} maxItems={maxItems} />
		{creators && (creators?.length || 0) < (maxItems ||	 100) && (
			<LoadMore loadMore={() => actions.lists.top.users()} />
		)}
	</>
}

export default Creators;
