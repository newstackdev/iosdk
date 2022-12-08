import { Button, Col, Row } from "antd";
import { Creators } from "../Components/Creators";
import { Deferred } from "./Deferred";
import { IBadge } from "../hooks/useBadges";
import { PowerupsCacheItem } from "../overmind/api/state";
import { Share } from "./Share";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useActions, useAppState } from "../overmind";
import { useCachedDaoProposals, useCachedPool, useCachedPowerups } from "../hooks/useCached";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BadgeWidget from "./BadgeWidget";
import React from "react";

const UserDetail: React.FC<{
  user: UserReadPublicResponse;
  hideNewlifeSpecificInfo?: boolean;
  badges?: IBadge[];
}> = ({ user, hideNewlifeSpecificInfo = false, badges }) => {
  const state = useAppState();
  const actions = useActions();
  const params = useParams<{ username: string; id: string }>();
  const [activeKey, setActiveKey] = useState("Powered");
  const poolInfo = useCachedPool({ owner: user?.username });
  const powerups: PowerupsCacheItem = useCachedPowerups(user, true);
  const symbol = poolInfo.code;

  const daoOwner = params.username || state.config.settings.newcoin.daoDomain;
  const daoProposals = useCachedDaoProposals({ daoOwner });

  const URL =
    process.env.NODE_ENV === "production"
      ? `https://www.newlife.io/user/${user?.username}`
      : `https://web-dev.newlife.io${user?.username}`;

  if (!user) return <></>;
  let poweredNumber: string | number = user.powered || 0;
  let poweringNumber: string | number = user.powering || 0;

  if (poweredNumber >= 1000) {
    poweredNumber = (poweredNumber / 1000).toFixed(2) + "K";
  }
  if (poweringNumber >= 1000) {
    poweringNumber = (poweringNumber / 1000).toFixed(2) + "K";
  }

  const isCurrentUserProfile = user.id === state.api.auth.user?.id;

  const getPowerupDetail = () => {
    switch (activeKey) {
      case "Powered":
        return (
          <Creators
            users={powerups?.in?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)).slice(0, 20) || []}
            title=""
          />
        );
      case "Powering":
        return (
          <Creators
            users={powerups?.out?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)).slice(0, 20) || []}
            title=""
          />
        );
    }
  };

  return (
    <>
      <div className="nl-user-detail-container">
        <Row align="middle" className="u-margin-bottom-large">
          <Row>
            <Col className="user-widget-heading__powerup-number u-margin-right-medium" onClick={() => setActiveKey("Powered")}>
              <span>
                <p className="header-1r">{poweredNumber}</p>
                <p className="paragraph-2r">powered by</p>
              </span>
            </Col>
            <Col className="user-widget-heading__powerup-number" onClick={() => setActiveKey("Powering")}>
              <span>
                <p className="header-1r">{poweringNumber}</p>
                <p className="paragraph-2r">powering</p>
              </span>
            </Col>
          </Row>
          <Row>
            <BadgeWidget user={user} badges={badges} className="user-widget-heading-badge-section" />
          </Row>
          <Row>
            <Col style={{ marginLeft: "auto" }}>
              <Row>
                <div className="user-widget-heading__powering-symbol">
                  {symbol && <p className="paragraph-2r">${symbol}</p>}
                  {poolInfo.total && (
                    <p className="paragraph-2r u-margin-top-medium">
                      TVL {Math.floor(+poolInfo.total.quantity.toString().replace(/[^0-9_-\s\.,]/gim, ""))}
                    </p>
                  )}
                </div>
              </Row>
              {!hideNewlifeSpecificInfo && (
                <Row className="u-margin-top-medium user-widget-heading__share_dao">
                  <Share urlToShare={URL} user={user} />
                  {daoProposals.dao_id ? (
                    <Button
                      className="u-margin-left-medium"
                      onClick={() =>
                        actions.routing.historyPush({
                          location: "/dao/" + user?.username,
                        })
                      }
                    >
                      DAO
                    </Button>
                  ) : (
                    isCurrentUserProfile && (
                      <Deferred deferTime={400} visible={true}>
                        <Button
                          style={{ marginLeft: 4 }}
                          onClick={() => actions.routing.historyPush({ location: "/dao/create" })}
                        >
                          Create DAO
                        </Button>
                      </Deferred>
                    )
                  )}
                </Row>
              )}
            </Col>
          </Row>
        </Row>
        <Row>{getPowerupDetail()}</Row>
      </div>
    </>
  );
};

export default UserDetail;
