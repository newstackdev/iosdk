import { NLView } from "../types";
import { Tooltip } from "antd";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useBadges } from "../hooks/useBadges";

export const badgeIcons = {
  ["daoVotedProposal"]: 1,
  ["daoCreated"]: 2,
  ["daoCreatedProposal"]: 3,
  ["daoJoinedCount"]: 4,
  ["staked"]: 5,
};

const BadgeWidget: NLView<{ user: UserReadPublicResponse; className: string }> = ({ user, className }) => {
  const { badges, isBadgesLoading, badgesError } = useBadges(user?.id || "");
  return (
    <>
      {badges &&
        !isBadgesLoading &&
        !badgesError &&
        badges.map((badge, index) => {
          return (
            <Tooltip trigger="hover" title={badge?.title} key={badge?.id}>
              <img
                src={`/badges/${badgeIcons[badge.name]}.png`}
                className={`nl-badge-widget ${index === 0 ? "u-margin-left-small" : ""} u-margin-right-small ${className}`}
              />
            </Tooltip>
          );
        })}
    </>
  );
};

export default BadgeWidget;
