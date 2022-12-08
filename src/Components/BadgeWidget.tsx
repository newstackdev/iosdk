import { Col, Row, Tooltip } from "antd";
import { IBadge, useBadges } from "../hooks/useBadges";
import { NLView } from "../types";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";

export const badgeIcons = {
  ["daoVotedProposal"]: 1,
  ["daoCreated"]: 2,
  ["daoCreatedProposal"]: 3,
  ["daoJoinedCount"]: 4,
  ["staked"]: 5,
  ["folderCreated"]: 6,
  ["tickerCreated"]: 7,
  ["accountCreated"]: 8,
  ["qualityInvitee"]: 9,
};

const renderBadgeWidget = (badges: IBadge[] | undefined, className?: string, badgeLimit?: number) => {
  return (
    <Row gutter={[10, 10]} justify="center">
      {badges?.map((badge, index) => {
        if (badgeLimit && badgeLimit <= index) {
          return;
        }
        return (
          <Tooltip trigger="hover" title={badge?.title} key={badge?.id}>
            <Col>
              <img src={`/badges/${badgeIcons[badge.name]}.png`} className={`nl-badge-widget  ${className}`} />
            </Col>
          </Tooltip>
        );
      })}
    </Row>
  );
};

const BadgeWidget: NLView<{
  user: UserReadPublicResponse;
  className?: string;
  badges?: IBadge[] | undefined;
  badgeLimit?: number;
}> = ({ user, className, badges, badgeLimit }) => {
  if (badges) {
    return renderBadgeWidget(badges, className, badgeLimit);
  } else {
    const { badges, isBadgesLoading, badgesError } = useBadges(user?.id || "");
    return <>{badges && !isBadgesLoading && !badgesError && renderBadgeWidget(badges, className, badgeLimit)}</>;
  }
};

export default BadgeWidget;
