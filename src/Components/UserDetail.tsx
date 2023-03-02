import { Button, Col, Row } from "antd";
import { Creators } from "../Components/Creators";
import { IBadge } from "../hooks/useBadges";
import { PowerupsCacheItem } from "../overmind/api/state";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useCachedPool, useCachedPowerups } from "../hooks/useCached";
import BadgeWidget from "./BadgeWidget";
import React from "react";

const SectionWrapper: React.FC<{ title: string; children?: React.ReactNode; seeAllUrl: string }> = ({
  title,
  children,
  seeAllUrl,
}) => {
  return (
    <Row className="nl-user-detail-section">
      <Row className="nl-user-detail-subSection">
        <Col className="nl-user-detail-section-title">
          <p className="paragraph-1b">{title}</p>
        </Col>
        <Col className="nl-user-detail-see-all-btn">
          <a href={seeAllUrl} target="_blank" rel="noreferrer">
            <Button className="secondary-button">
              <span className="paragraph-2b">See all</span>
            </Button>
          </a>
        </Col>
      </Row>
      <Row className="u-margin-top-medium">{children}</Row>
    </Row>
  );
};

const UserDetail: React.FC<{
  user: UserReadPublicResponse;
  badges?: IBadge[];
}> = ({ user, badges }) => {
  const poolInfo = useCachedPool({ owner: user?.username });
  const powerups: PowerupsCacheItem = useCachedPowerups(user, true);

  if (!user) return <></>;
  let poweredNumber: string | number = user.powered || 0;
  let poweringNumber: string | number = user.powering || 0;

  if (poweredNumber >= 1000) {
    poweredNumber = (poweredNumber / 1000).toFixed(2) + "K";
  }
  if (poweringNumber >= 1000) {
    poweringNumber = (poweringNumber / 1000).toFixed(2) + "K";
  }

  return (
    <>
      <div className="nl-user-detail-container">
        <Row align="middle" className="u-margin-bottom-large" gutter={[60, 60]}>
          <Row>
            <div className="header-2">
              Your Watts represent the total of your badges, power-ups and swaps. To find out how it is calculated, visit the
              Newcoin documentation
            </div>
          </Row>
          <SectionWrapper
            title={`Swaps ${Math.floor(+poolInfo.total.quantity.toString().replace(/[^0-9_-\s\.,]/gim, ""))}`}
            seeAllUrl={`https://explorer-dev.newcoin.org/account/${user.username}`}
          />
          <SectionWrapper
            title={`Milestones ${badges?.length}`}
            seeAllUrl={`https://explorer-dev.newcoin.org/account/${user.username}`}
          >
            <BadgeWidget user={user} badges={badges} className="user-widget-heading-badge-section" />
          </SectionWrapper>
          <SectionWrapper
            title={`Powered by ${poweredNumber}`}
            seeAllUrl={`https://explorer-dev.newcoin.org/account/${user.username}`}
          >
            <Creators
              users={powerups?.in?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)) || []}
              title=""
              thumbnailOnly
              maxItems={14}
            />
          </SectionWrapper>
          <SectionWrapper
            title={`Powering ${poweringNumber}`}
            seeAllUrl={`https://explorer-dev.newcoin.org/account/${user.username}`}
          >
            <Creators
              users={powerups?.out?.value?.sort((a, b) => (b.powered || 0) - (a.powered || 0)) || []}
              title=""
              thumbnailOnly
              maxItems={14}
            />
          </SectionWrapper>
        </Row>
      </div>
    </>
  );
};

export default UserDetail;
