import {
	MoodReadResponse,
	UserReadPrivateResponse,
} from "@newlife/newlife-creator-client-api";
import { Badge, Col, Descriptions, Input, Row, Tabs, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useState } from "react";
// import { ActivityStream } from "../Components/ActivityStream";
import { ContentLayout } from "../Components/ContentLayout";
import { DataRow } from "../Components/DataRow";
import { LargeArrowBack } from "../Components/Icons/LargeArrowBack";
import { ContentImage } from "../Components/Image";
import { NewcoinWidget } from "../Components/NewcoinWidgets";
import {
	UserNewcoinInfo,
	UserNewcoinPoolsParticipation,
	UserSocialInfoRow,
	UserWidgetHeading,
} from "../Components/UserWidget";
import { useAppState } from "../overmind";
import { NLView } from "../types";
import { PostWidget } from "../Components/PostWidget";

const BlocksioLink = (tx: string | undefined) => {
	const link = !tx
		? ""
		: `https://local.bloks.io/transaction/${tx}?` +
		  "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
		  "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org";
	return (
		<a href={link} target="_new">
			{tx}
		</a>
	);
};

export const NewcoinLink: NLView<{ tx?: string }> = ({ tx, children }) => {
	return (
		<a href={"http://explorer.newcoin.org/transaction/" + tx} target="_new">
			{children}
		</a>
	);
};

const ellipsisStyle = {
	maxWidth: 125,
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	overflow: "hidden",
} as const;

export const ProfileDetails: NLView = () => {
	const state = useAppState();
	const [activeKey, setActiveKey] = useState<string>("0");
	const user: UserReadPrivateResponse = state.api.auth.user || {};
	if (!user) return <div>"Must be logged in"</div>;
	return (
		<ContentLayout>
			<div className="app-main-full-width">
				{/* Balance: {JSON.stringify(state.newcoin.account)}
          Pools: {JSON.stringify(state.newcoin.pools)} */}
				{/* <NewcoinWidget user={user} /> */}
				<UserWidgetHeading user={user} setActiveKey={setActiveKey} />
				<UserSocialInfoRow user={user} />
				<Tabs className="app-main-full-width-only">
					<Tabs.TabPane tab="Activity Stream" key="0">
						<ActivityStream />
						{/* <ActivityStream /> */}
					</Tabs.TabPane>
					<Tabs.TabPane tab="Newcoin account" key="1">
						<UserNewcoinInfo user={user} />
					</Tabs.TabPane>
					<Tabs.TabPane tab="DAO memberships" key="2">
						<UserNewcoinPoolsParticipation user={user} />
					</Tabs.TabPane>
				</Tabs>
				<br />
				<br />
				<br />
				<br />
				{/* <Input value={state.auth.token} /> */}
				{false && (
					<>
						<Row>
							<Col span={12}>username</Col>
							<Col span={12}>{user.username}</Col>
						</Row>
						<Row>
							<Col span={12}>id</Col>
							<Col span={12}>{user.id}</Col>
						</Row>
						<Row>
							<Col span={12}>subscription status</Col>
							<Col span={12} style={ellipsisStyle}>
								<Tooltip title={user.subscriptionStatus}>
									{user.subscriptionStatus}
								</Tooltip>
							</Col>
						</Row>
						<Row>
							<Col span={12}>status</Col>
							<Col span={12}>{user.status}</Col>
						</Row>
						<Row>
							<Col span={12}>newcoin acc</Col>
							<Col span={12}>{user.newcoinAccTx}</Col>
						</Row>
						<Row>
							<Col span={12}>newcoin pool id</Col>
							<Col span={12}>{user.newcoinPoolId}</Col>
						</Row>
						<Row>
							<Col span={12}>newcoin pool tx</Col>
							<Col span={12}>{user.newcoinPoolTx}</Col>
						</Row>
						<Row>
							<Col span={12}>firstName</Col>
							<Col span={12}>{user.firstName}</Col>
						</Row>
						<Row>
							<Col span={12}>lastName</Col>
							<Col span={12}>{user.lastName}</Col>
						</Row>
						<Row>
							<Col span={12}>phone</Col>
							<Col span={12}>{user.phone}</Col>
						</Row>
					</>
				)}
			</div>
		</ContentLayout>
	);
};

const ActivityStream: NLView<{}> = () => {
	const state = useAppState();
	const moods = state.lists.top.moods.items;

	const postsList = moods.map((m) => m.posts)[0];

	return (
		<div className="notifications-wrapper scrollable-content">
			{/* {postsList?.slice(0, 20).map((p: any, i: number) => (
				<NotificationBox
					user={p.author}
					mood={postsList[i]}
					post={p}
					username={p.author?.username}
					aspectRatio={p.aspectRatio}
				/>
			))} */}
		</div>
	);
};

export const Profile: NLView = () => {
	const state = useAppState();
	const [activeKey, setActiveKey] = useState<string>("0");

	const user: UserReadPrivateResponse = state.api.auth.user || {};
	if (!user || !user.id) return <div>Must be logged in</div>;

	return (
		<ContentLayout>
			<div className="app-main-full-width">
				{/* Balance: {JSON.stringify(state.newcoin.account)}
          Pools: {JSON.stringify(state.newcoin.pools)} */}
				{/* <NewcoinWidget user={user} /> */}
				<UserWidgetHeading user={user} setActiveKey={setActiveKey} />
				<UserSocialInfoRow user={user} />
				<Tabs className="app-main-full-width-only">
					<Tabs.TabPane tab="Activity Stream" key="0">
						<ActivityStream />
					</Tabs.TabPane>
					<Tabs.TabPane tab="Newcoin account" key="1">
						<UserNewcoinInfo user={user} />
					</Tabs.TabPane>
					<Tabs.TabPane tab="DAO memberships" key="2">
						<UserNewcoinPoolsParticipation user={user} />
					</Tabs.TabPane>
				</Tabs>
				<br />
				<br />
				<br />
				<br />
				{/* <Input value={state.auth.token} /> */}
				{false && (
					<>
						<Row>
							<Col span={12}>username</Col>
							<Col span={12}>{user.username}</Col>
						</Row>
						<ProfileDetails />
						{/* <div className="notifications-wrapper scrollable-content">
							<Col span={12}>{user.id}</Col>
						</Row>
						<Row>
							<Col span={12}>subscription status</Col>
							<Col span={12} style={ellipsisStyle}>
								<Tooltip title={user.subscriptionStatus}>
									{user.subscriptionStatus}
								</Tooltip>
							</Col>
			</div> */}
						<Row>
							<Col span={12}>status</Col>
							<Col span={12}>{user.status}</Col>
						</Row>
						<Row>
							<Col span={12}>newcoin acc</Col>
							<Col span={12}>{user.newcoinAccTx}</Col>
						</Row>
						<Row>
							<Col span={12}>newcoin pool id</Col>
							<Col span={12}>{user.newcoinPoolId}</Col>
						</Row>
						<Row>
							<Col span={12}>newcoin pool tx</Col>
							<Col span={12}>{user.newcoinPoolTx}</Col>
						</Row>
						<Row>
							<Col span={12}>firstName</Col>
							<Col span={12}>{user.firstName}</Col>
						</Row>
						<Row>
							<Col span={12}>lastName</Col>
							<Col span={12}>{user.lastName}</Col>
						</Row>
						<Row>
							<Col span={12}>phone</Col>
							<Col span={12}>{user.phone}</Col>
						</Row>
					</>
				)}
			</div>
		</ContentLayout>
	);
};
