import { MoodReadResponse, UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useAppState } from "../overmind";
import { useCachedPool, useCachedUser } from "./useCached";

export const useCurrentUserStakeEligibility = (poolOwner?: UserReadPublicResponse, stakeToAccess?: number) => {
  const state = useAppState();
  const owner = useCachedUser(poolOwner, true);
  const pool = useCachedPool({ owner: owner.username });

  if (!owner || !owner.username || !stakeToAccess)
    return {
      toAccess: 0,
      currentUserStake: 0,
      currentUserNeeds: 0,
      currency: "",
      currentUserEligible: true,
      ownerUsername: owner?.username || "",
      owner,
    };

  const _stakeInfo = {
    toAccess: stakeToAccess || 0,
    currentUserStake: state.newcoin.pools[pool.code] || 0,
  };
  return {
    ..._stakeInfo,
    currentUserNeeds: Math.max(_stakeInfo.toAccess - _stakeInfo.currentUserStake, 0),
    currency: `${owner.newcoinTicker?.toUpperCase()}`,
    currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
    ownerUsername: owner?.username || "",
    owner,
  };
};

export const useFolderStakeInfo = (folder: MoodReadResponse) => {
  const user = useCachedUser(folder.author);
  return useCurrentUserStakeEligibility(user, folder?.stakeToAccess);
};
