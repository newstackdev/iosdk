import { PowerupsCacheItem } from "../overmind/api/state";
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { blockExplorerUrl } from "../Components/Links";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedPowerups } from "./useCached";

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
    // !isPowering &&
    user &&
      (await actions.api.user.powerup({
        user,
        amount: amount || 1,

        messageWrapper: (msg: string, rating: any) =>
          rating?.TxID_mintFile ? (
            <a href={blockExplorerUrl.newscan(rating.TxID_mintFile)} target="_blank" rel="noreferrer">
              {msg}. Click to see a Newcoin receipt.
            </a>
          ) : (
            <>{msg}</>
          ),
      }));
  };

  const isPoweringProcessing = state.indicators.specific["api.user.powerup"] && !(isPowering && timeSince > 60000);

  return {
    powerup,
    isPoweringProcessing,
    isMember,
  };
};
