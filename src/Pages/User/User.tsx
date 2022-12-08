import { NLView } from "../../types";
import { Spin } from "../../Components/Spin";
import { UserWidgetHeading } from "../../Components/UserWidget";
import { json } from "overmind";
import { useActions, useAppState } from "../../overmind";
import { useBadges } from "../../hooks/useBadges";
import { useCachedPool, useCachedUser } from "../../hooks/useCached";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetTitle } from "../../hooks/useSetTitle";
import Deferred from "../../Components/Deferred";
import TopFolders from "../../Components/TopFolders";
import UserDetail from "src/Components/UserDetail";

export type UserFlowRoutes = "Folders" | "UserDetail";

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

  const user = useCachedUser({ username }, true);

  useSetTitle(user?.username);

  const { badges, isBadgesLoading, badgesError } = useBadges(user?.id || "");

  const moodList = json(user.moods || []).sort((m1, m2) => (m1.stakeToAccess || 0) - (m2.stakeToAccess || 0));

  const poolInfo = useCachedPool({ owner: user.username });
  const symbol = poolInfo.code;

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
          <UserWidgetHeading
            user={user}
            setActiveKey={setActiveKey}
            activeKey={activeKey}
            badges={badges}
            badgesError={badgesError}
            isBadgesLoading={isBadgesLoading}
          />
          <TopFolders
            userMoods={moodList}
            maxPostsToShow={5}
            title=""
            loadMoreMoodsHandler={() => actions.api.user.getMoods({ id: user.id || "" })}
            randomizeMoods={false}
          />
        </>
      );
    case "UserDetail":
      return (
        <>
          <UserWidgetHeading
            user={user}
            setActiveKey={setActiveKey}
            activeKey={activeKey}
            badges={badges}
            badgesError={badgesError}
            isBadgesLoading={isBadgesLoading}
          />
          <UserDetail user={user} badges={badges} hideNewlifeSpecificInfo={false} />
        </>
      );
    default:
      return (
        <UserWidgetHeading
          user={user}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
          badges={badges}
          badgesError={badgesError}
          isBadgesLoading={isBadgesLoading}
        />
      );
  }
};
