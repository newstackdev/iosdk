import {
  MoodReadResponse,
  UserReadPublicResponse,
} from "@newlife/newlife-creator-client-api";
import { json } from "overmind";
import { useEffect } from "react";
import { PowerupsCacheItem } from "@newcoin-foundation/state/dist/src/api/state";
import { HyperionAccountHistory } from "@newcoin-foundation/state/dist/src/newcoin/types";
import { useActions, useAppState } from "@newcoin-foundation/state";
// import { PowerupsCacheItem } from "@newcoin-foundation/state";
// import { HyperionAccountHistory } from "@newcoin-foundation/state";

export const useCachedUser = (
  user?: { id?: string; username?: string },
  force?: boolean
) => {
  const state = useAppState();
  const actions = useActions();

  const byIdOrUsername = (u?: { id?: string; username?: string }) => {
    return u?.id
      ? state.api.cache.users.byId[u?.id]
      : u?.username
      ? state.api.cache.users.byUsername[u?.username]
      : null;
  };

  useEffect(() => {
    if (
      (user?.id || user?.username) &&
      state.auth.authenticated &&
      (force || !byIdOrUsername(user))
    ) {
      actions.api.user.read(user);
      // if (force && !byIdOrUsername(user)?.moods?.length)
      //     actions.api.user.getMoods(user);
    }
  }, [state.auth.authenticated, user?.id || "", user?.username || ""]);
  const u = byIdOrUsername(user);
  return { ...u, moods: u?.moods };
};

export const useCachedPost = ({ id }: { id?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    id &&
      state.auth.authenticated &&
      (force || !state.api.cache.posts[id]) &&
      actions.api.post.read({ id });
  }, [state.auth.authenticated, id]);
  return (id && state.api.cache.posts[id]) || {};
};

export const useCachedMood = ({ id }: { id?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    id &&
      state.auth.authenticated &&
      (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
      actions.api.mood.read({ id });
  }, [state.auth.authenticated, id]);
  return (id && state.api.cache.moods[id]) || {};
};

export const useCachedMoodPosts = (
  { id }: { id?: string },
  force?: boolean
) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    id &&
      state.auth.authenticated &&
      (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
      actions.api.mood.getPosts({ id });
  }, [state.auth.authenticated, id]);
  return (id && state.api.cache.moods[id]) || {};
};

export const useCachedMoods = (moods?: { id?: string }[], force?: boolean) => {
  const state = useAppState();
  const actions = useActions();
  const moodsCollector: MoodReadResponse[] = [];
  useEffect(() => {
    const res: MoodReadResponse[] = [];

    moods &&
      moods.length &&
      state.auth.authenticated &&
      Promise.all(
        moods
          .map(
            ({ id }) =>
              id &&
              (force ||
                !state.api.cache.moods[id] ||
                !state.api.cache.moods[id].posts?.length) &&
              actions.api.mood.read({ id })
          )
          .filter(Boolean)
      ).then((r) => r.reduce((m) => m));
  }, [state.auth.authenticated, moods]);

  return moodsCollector;
};

export const useCachedPowerups = (user?: { id?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();

  const current = state.api.auth.user || {};
  const id = user?.id || current.id || "";
  const targetPu = state.api.cache.powerups && state.api.cache.powerups[id];
  const currentPu = state.api.cache.powerups[current.id || ""];
  useEffect(() => {
    id &&
      state.auth.authenticated &&
      (force || !state.api.cache.powerups[id]) &&
      actions.api.user.getPowerups({ user: { id } });
  }, [current.id, id, targetPu, currentPu]);
  return (
    id &&
    ((state.api.cache.powerups[id]
      ? json(state.api.cache.powerups[id])
      : {}) as PowerupsCacheItem)
  );
};

export const useCachedNewconAccountHistory = (
  user: { username?: string },
  force?: boolean
) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    user.username &&
      state.auth.authenticated &&
      (force || !state.newcoin.cache.accountHistory[user.username || ""]) &&
      actions.newcoin.getAccountHitory({ user });
  }, [user.username]);
  return (
    (user.username && state.newcoin.cache.accountHistory[user.username]) ||
    ({} as HyperionAccountHistory)
  );
};

export const useCachedPool = (
  pool?: { owner?: string; code?: string },
  force?: boolean
) => {
  const state = useAppState();
  const actions = useActions();

  const pools = state.newcoin.cache.pools; //.byOwner[pool?.code];

  const id = pool?.owner || pool?.code || "";
  const cache = pool?.owner ? pools.byOwner : pools.byCode;

  useEffect(() => {
    // if(!state.auth.authenticated) return;
    if (!pool || !id) return;

    if (force || !cache[id]) {
      actions.newcoin.getPoolInfo({ pool });
      console.log("Getting pool for ", id);
    } else console.log("NOT Getting pool for ", id);
  }, [id, cache[id]]);

  return cache[id]
    ? cache[id].rows[0]
    : { owner: "", code: "", total: { quantity: 0 } }; //cache[id] || { rows: [], more: false, next_key: "" };
};

export const useCachedPoolByCode = (
  pool: { code?: string },
  force?: boolean
) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    pool.code &&
      state.auth.authenticated &&
      (force || !state.newcoin.cache.pools.byCode[pool.code || ""]) &&
      actions.newcoin.getPoolInfo({ pool });
  }, [pool.code]);
  return pool.code && state.newcoin.cache.pools.byCode[pool.code];
};
