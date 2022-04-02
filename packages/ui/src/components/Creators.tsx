import { UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useAppState } from "../overmind";
import Title from "../Pages/Explore/Title";
import { NLView } from "../types";
import { ContentLayout } from "./ContentLayout";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { ContentImage } from "./Image";
import { UserPowerup } from "./UserWidget";

type ICreators = {
	title?: string;
	maxItems?: number;
	users?: UserReadPublicResponse[] | UserReadPublicResponse[];
};

const Creators: NLView<ICreators> = ({ title, maxItems, users }) => {
	const state = useAppState();

	const maxUsers = maxItems
		? users?.slice(0, Math.min(users?.length, maxItems))
		: users;

	const creators =
		users === undefined ? state.lists.top.users.items : maxUsers;

	return (
		<ContentLayout>
			{title === undefined && (
				<Row style={{ width: "100%", marginTop: "20px" }}>
					<LargeArrowBack />
					<p className="header-2" style={{ marginLeft: "40px" }}>
						Explore top creators
					</p>
				</Row>
			)}
			<div
				className={
					maxItems === undefined
						? "section-divider scrollable-content app-main-full-width"
						: "section-divider app-main-full-width"
				}
			>
				{maxItems ? (
					<Title title={title} href="/top/creators" />
				) : (
					<></>
				)}
				<div className="top-creators-wrapper">
					{creators?.map((creator) => (
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
		</ContentLayout>
	);
};

export default Creators;
