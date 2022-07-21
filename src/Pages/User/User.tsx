import { ActivityStream } from "../../Components/ActivityStream";
import { NLView } from "../../types";
import { PowerupsCacheItem } from "../../overmind/api/state";
import { Spin } from "../../Components/Spin";
import { Tabs } from "antd";
import { UserNewcoinInfo, UserNewcoinPoolsParticipation, UserWidgetHeading } from "../../Components/UserWidget";
import { json } from "overmind";
import { useActions, useAppState } from "../../overmind";
import { useCachedPool, useCachedPost, useCachedPowerups, useCachedUser } from "../../hooks/useCached";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetTitle } from "../../hooks/useSetTitle";
import Creators, { CreatorsList } from "../../Components/Creators";
import Deferred from "../../Components/Deferred";
import TopFolders from "../../Components/TopFolders";

export type UserFlowRoutes = "Folders" | "Powered" | "Powering";

export const User: NLView = () => {
  const [activeKey, setActiveKey] = useState<UserFlowRoutes>("Folders");
  let { username: paramsUsername } = useParams<{ username: string }>();
  const state = useAppState();
  const actions = useActions();

  let username = paramsUsername || state.api.auth.user?.username || "";

  useEffect(() => {
    actions.api.user.getMoods({ id: state.api.auth.user?.id || "" });
    setActiveKey("Folders");
  }, [username]);

  // const username = (id.length < 15) ? id : undefined;
  const user = useCachedUser({ username }, true);

  useSetTitle(user?.username);

  // const moodList = user.moods || [];
  const moodList = json(user.moods || []).sort((m1, m2) => (m1.stakeToAccess || 0) - (m2.stakeToAccess || 0));

  const powerups = useCachedPowerups(user, true) as PowerupsCacheItem;
  const powering = powerups?.out?.value?.length || "";
  const powered = powerups?.in?.value?.length || "";

  const poolInfo = useCachedPool({ owner: user.username });
  const symbol = poolInfo.code;
  const quantity = poolInfo.total.quantity;
  const isDAOMember = ((state.newcoin.pools || {})[symbol] || 0) / 1000;

  console.log(state.indicators.specific["api.user.read"]);

  if (!user.id || !user.username)
    return (
      <Deferred deferTime={200} visible={state.indicators.specific["api.user.read"]}>
        {state.indicators.specific["api.user.read"] ? (
          <Spin />
        ) : (
          <Deferred deferTime={200} visible={false}>
            <div>
              User not found. The user may exist in the newcoin network,
              <br />
              check&nbsp;
              <a href={`https://explorer-dev.newcoin.org/account/${user.username}`}>the newcoin block explorer.</a>
            </div>
          </Deferred>
        )}
      </Deferred>
    );

  switch (activeKey) {
    case "Folders":
      return (
        <>
          <UserWidgetHeading user={user} setActiveKey={setActiveKey} activeKey={activeKey} />
          <TopFolders userMoods={moodList} maxPostsToShow={5} title="" />
        </>
      );
    case "Powered":
      return (
        <>
          <UserWidgetHeading user={user} setActiveKey={setActiveKey} activeKey={activeKey} />
          <Creators
            users={powerups?.in?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)).slice(0, 20) || []}
            title=""
          />
        </>
      );
    case "Powering":
      return (
        <>
          <UserWidgetHeading user={user} setActiveKey={setActiveKey} activeKey={activeKey} />
          <CreatorsList
            users={powerups?.out?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)).slice(0, 20) || []}
            title=""
          />
        </>
      );
    default:
      return <UserWidgetHeading user={user} setActiveKey={setActiveKey} activeKey={activeKey} />;
  }

  return (
    <>
      {/* {paramsUsername} */}
      {/* <NewcoinWidget user={user} /> */}

      {/* <Tabs.TabPane tab="Private" key="3">
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
				</Tabs.TabPane> */}
      {/* TODO */}
      <Tabs.TabPane tab="Newcoin" key="4">
        User on newcoin explorer:&nbsp;
        <a href={`https://explorer-dev.newcoin.org/account/${user.username}`} target="_blank" rel="noreferrer">
          click here
        </a>
        <br />
        Pool symbol: {symbol}
        <br />
        Market CAP: {quantity}
        <br />
        My DAO Membership value: {isDAOMember || ""} {isDAOMember ? symbol : "Not a member"}
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
          <Tabs.TabPane tab="DAO memberships" key="8">
            <UserNewcoinPoolsParticipation user={user} />
          </Tabs.TabPane>
        </>
      ) : (
        <></>
      )}
      {/* TODO */}
      {/* <ItemGrid title="Moods" items={moodList} render={m => <MoodWidget mood={m} />} /> */}
      {/* <MoodsGrid title="Folders" moods={moodList} /> */}
      {/* <div className="app-main-full-width">
				<TopFolders userMoods={moodList} title="" />
			</div> */}
    </>
  );
};
