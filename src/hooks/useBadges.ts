import { useActions } from "../overmind";
import { useEffect, useState } from "react";

export interface IBadge {
  id: string;
  created: string;
  updated: string;
  name: string;
  title: string;
  type: string;
  value: any;
}

export const useBadges = (userId: string) => {
  const [badges, setBadges] = useState<IBadge[]>();
  const [isBadgesLoading, setIsBadgesLoading] = useState(false);
  const [badgesError, setBadgesError] = useState<string>();
  const actions = useActions();

  useEffect(() => {
    const badgesReq = async () => {
      const badges = (await actions.api.user.getBadges({ id: userId || "" })).value;
      setBadges(badges);
    };

    try {
      setIsBadgesLoading(true);
      badgesReq();
      setIsBadgesLoading(false);
    } catch (e: any) {
      setIsBadgesLoading(false);
      setBadgesError(e.message);
    }
  }, [userId]);

  return { badges, isBadgesLoading, badgesError };
};
