import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { ContentLayout } from "../../Components/ContentLayout";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import { ContentImage } from "../../Components/Image";
import { PostWidget } from "../../Components/PostWidget";
import { useAppState } from "../../overmind";
import { NLView } from "../../types";

const NotificationBox: NLView<{
	user: UserReadPrivateResponse;
	mood: MoodReadResponse;
	post: any;
	username: any;
	aspectRatio: any;
}> = ({ user, mood, aspectRatio, username, post }) => {
	console.log(mood);
	return (
		<Row className="notification-box" justify="space-between">
			<Row className="notification-box__inside-left">
				<Col sm={11} md={7} lg={7} xl={6} xxl={6}>
					<Avatar
						src={<ContentImage {...user} />}
						className="avatar-image-header"
					/>
				</Col>
				<Col
					sm={13}
					md={17}
					lg={17}
					xl={18}
					xxl={18}
					className="notification-box__inside-left-col-2"
				>
					<Col style={{ height: "auto" }}>
						<span className="paragraph-2b">newdomain.io </span>
						<span className="paragraph-2r notification-box__inside--action-info">
							added your...
						</span>
					</Col>
					<Col
						style={{ height: "auto" }}
						className="notification-box__inside-left--time"
					>
						<p className="paragraph-2r">Now</p>
					</Col>
				</Col>
			</Row>
			<Row
				className="notification-box__inside-right text-right"
				justify="end"
			>
				<Col
					sm={6}
					className="notification-box__inside-right--grey-box"
				>
					<PostWidget
						mood={mood}
						post={post}
						username={username}
						aspectRatio={aspectRatio}
					/>
				</Col>
				<Col sm={5} className="notification-box__inside-right--time">
					<p className="paragraph-2r">1h</p>
				</Col>
			</Row>
		</Row>
	);
};

export const Notifications: NLView = () => {
	const state = useAppState();
	const moods = state.lists.top.moods.items;

	const postsList = moods.map((m) => m.posts)[0];

	const user: UserReadPrivateResponse = state.api.auth.user || {};
	if (!user) return <div>"Must be logged in"</div>;

	return (
		<ContentLayout>
			<Row style={{ width: "100%", margin: "20px 0" }}>
				<LargeArrowBack />
			</Row>
			<div className="notifications-wrapper scrollable-content">
				{postsList?.slice(0, 20).map((p: any, i: number) => (
					<NotificationBox
						user={user}
						mood={postsList[i]}
						post={p}
						username={p.author?.username}
						aspectRatio={p.aspectRatio}
					/>
				))}
			</div>
		</ContentLayout>
	);
};
