import { PowerupsCacheItem } from "../overmind/api/state";
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedPowerups } from "../hooks/useCached";

export const usePowerup = (user: UserReadPrivateResponse) => {
  const actions = useActions();
  const state = useAppState();

  const poolInfo = useCachedPool({ owner: user?.username });
  const isMember = state.newcoin.pools[poolInfo.code];

  const currentUserPowerups: PowerupsCacheItem = useCachedPowerups() as any;
  const rating = currentUserPowerups?.out?.value?.find((u) => u.id === user?.id);
  const isPowering = !!rating;
  const timeSince = rating?.rating?.created ? Date.now() - new Date(rating?.rating?.created).getDate() : -1;

  const powerup = async (amount: number) => {
    !isPowering && user && (await actions.api.user.powerup({ user, amount: amount || 1 }));
  };

  const isPoweringProcessing = state.indicators.specific["api.user.powerup"] && !(isPowering && timeSince > 60000);

  return {
    powerup,
    isPoweringProcessing,
    isMember,
  };
};
