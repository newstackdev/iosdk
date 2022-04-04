import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ActivityStream } from "../../Components/ActivityStream";
import { ContentLayout } from "../../Components/ContentLayout";
import Creators, { CreatorsList } from "../../Components/Creators";
import { DataRow } from "../../Components/DataRow";
import Deferred from "../../Components/Deferred";
import { ItemGrid } from "../../Components/ItemGrid";
import { MoodWidget } from "../../Components/MoodWidget";
import { NewcoinWidget } from "../../Components/NewcoinWidgets";
import { Spin } from "../../Components/Spin";
import TopFolders from "../../Components/TopFolders";
import {
	UserNewcoinInfo,
	UserNewcoinPoolsParticipation,
	UsersList,
	UserSocialInfo,
	UserStake,
	UserWidgetHeading,
} from "../../Components/UserWidget";
import {
	useCachedPool,
	useCachedPost,
	useCachedPowerups,
	useCachedUser,
} from "../../hooks/useCached";
import { useSetTitle } from "../../hooks/useSetTitle";
import { useActions, useAppState } from "../../overmind";
import { PowerupsCacheItem } from "../../overmind/api/state";
import { ActiveKey, NLView } from "../../types";
import { MoodsGrid } from "../Mood/MoodsGrid";

export const User: NLView = () => {
	const [activeKey, setActiveKey] = useState<string>("0");
	let { username: paramsUsername } = useParams<{ username: string }>();
	const state = useAppState();
	const actions = useActions();

	let username = paramsUsername || state.api.auth.user?.username;

	// const username = (id.length < 15) ? id : undefined;
	const user = useCachedUser({ username }, true);

	useSetTitle(user?.username);

	const moodList = user.moods || [];

	const powerups = useCachedPowerups(user, true) as PowerupsCacheItem;
	const powering = powerups?.out?.value?.length || "";
	const powered = powerups?.in?.value?.length || "";

	const poolInfo = useCachedPool({ owner: user.username });
	const symbol = poolInfo.code;
	const quantity = poolInfo.total.quantity;
	const isDAOMember = state.newcoin.pools[symbol] / 1000;

	console.log(state.indicators.specific["api.user.read"]);

	if (!user.id || !user.username)
		return (
			<Deferred
				deferTime={200}
				visible={state.indicators.specific["api.user.read"]}
			>
				{state.indicators.specific["api.user.read"] ? (
					<Spin />
				) : (
					<Deferred deferTime={200} visible={false}>
						<div>
							User not found. The user may exist in the newcoin
							network,
							<br />
							check&nbsp;
							<a
								href={`https://explorer.newcoin.org/account/${user.username}`}
							>
								the newcoin block explorer.
							</a>
						</div>
					</Deferred>
				)}
			</Deferred>
		);
	// if(true)
	// 	return <>boo</>
	return (
		<ContentLayout>
			{/* <NewcoinWidget user={user} /> */}

			<UserWidgetHeading user={user} setActiveKey={setActiveKey} />
			<Tabs
				className="app-main-full-width"
				activeKey={activeKey}
				onChange={(key) => setActiveKey(key)}
			>
				<Tabs.TabPane tab="Folders" key="0">
					{/* <UserSocialInfo user={user} /> */}
					<TopFolders userMoods={moodList} title="" />
				</Tabs.TabPane>
				<Tabs.TabPane
					tab={`Powered by  ${powered ? `(${powered})` : ""}`}
					key="1"
				>
					<Creators
						users={powerups?.in?.value
							?.sort(
								(a, b) => (b.powered || 0) - (a.powered || 0)
							)
							.slice(0, 20) || []}
						title=""
					/>
					{/* {
                    state.lists.top.users.items.slice(10, 20).map(u =>
                        <DataRow title={u.username} value="view" link={`/user/${u.id}`} />
                    )
                	} */}
				</Tabs.TabPane>
				<Tabs.TabPane
					tab={`Powering ${powering ? `(${powering})` : ""}`}
					key="2"
				>
					<CreatorsList
						users={powerups?.out?.value
							?.sort(
								(a, b) => (b.powered || 0) - (a.powered || 0)
							)
							.slice(0, 20) || []}
						title=""
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Private" key="3">
					{!isDAOMember ? (
						<div className="text-center">
							<div>
								This exclusive content is only available for DAO
								members. Join {user.username}'s DAO now for
								instant access!
							</div>
							<br />
							<UserStake user={user} />
						</div>
					) : (
						"This is private content only for DAO members"
					)}
				</Tabs.TabPane>
				<Tabs.TabPane tab="Newcoin" key="4">
					User on newcoin explorer:&nbsp;
					<a
						href={`https://explorer.newcoin.org/account/${user.username}`}
						target="_blank"
					>
						click here
					</a>
					<br />
					Pool symbol: {symbol}
					<br />
					Market CAP: {quantity}
					<br />
					My DAO Membership value: {isDAOMember || ""}{" "}
					{isDAOMember ? symbol : "Not a member"}
					<br />
					{/* My DAO Membership cap: { Math.floor(isDAOMember * 100 / quantity.split(/ /)[0])  }%<br /> */}
				</Tabs.TabPane>
				{username === state.api.auth.user?.username ? (
					<>
						<Tabs.TabPane tab="Activity Stream" key="5">
							<ActivityStream />
							{/* <ActivityStream /> */}
						</Tabs.TabPane>
						<Tabs.TabPane tab="Newcoin account" key="6">
							<UserNewcoinInfo user={user} />
						</Tabs.TabPane>
						<Tabs.TabPane tab="DAO memberships" key="7">
							<UserNewcoinPoolsParticipation user={user} />
						</Tabs.TabPane>
					</>
				) : (
					<></>
				)}
			</Tabs>
			{/* <ItemGrid title="Moods" items={moodList} render={m => <MoodWidget mood={m} />} /> */}
			{/* <MoodsGrid title="Folders" moods={moodList} /> */}
			{/* <div className="app-main-full-width">
				<TopFolders userMoods={moodList} title="" />
			</div> */}
		</ContentLayout>
	);
};
