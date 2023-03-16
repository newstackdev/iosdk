import { MoodReadResponse, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useActions, useAppState } from "../overmind";
import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";

export const useCachedUser = (user?: { id?: string; username?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();

  const _cached = useLiveQuery(() => {
    const prop = user?.id ? "id" : "username";
    const val = user?.id || user?.username || "";
    return state.cache.db.ready ? state.cache.db.nodes?.table("user").where(prop).equals(val).toArray() : [];
  });

  const cached = (_cached || [])[0];

  // const byIdOrUsername = (u?: { id?: string; username?: string }) => {
  //   const cachedItem = u?.id
  //     ? state.cache.db.edges..users.byId[u?.id]
  //     : u?.username
  //     ? state.api.cache.users.byUsername[u?.username]
  //     : {};
  //   return cachedItem && cachedItem.id && (cachedItem.username || cachedItem.fullName) ? cachedItem : null;
  // };

  useEffect(() => {
    if ((user?.id || user?.username) && state.auth.authenticated && (force || !cached)) {
      actions.api.user.read(user);
      // if (force && !byIdOrUsername(user)?.moods?.length)
      //     actions.api.user.getMoods(user);
    }
  }, [state.auth.authenticated, user?.id || "", user?.username || ""]);
  // const u = byIdOrUsername(user);
  return cached; //{ ...(u || {}), moods: u?.moods };
};

export const useCachedPost = ({ id }: { id?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    id && state.auth.authenticated && (force || !state.api.cache.posts[id]) && actions.api.post.read({ id });
  }, [state.auth.authenticated, id]);

  return (id && state.api.cache.posts[id]) || {};
};

export const useCachedPosts = (posts: { id?: string }[], force?: boolean) => {
  const state = useAppState();
  const actions = useActions();
  const ids = posts.map((p) => p.id);
  const key = ids.join(",");

  const cachedPosts = //= [];
    useLiveQuery(() => {
      const should = (state.auth.authenticated && state.cache.ready && posts?.length) || null;
      const f = should && state.cache.db.nodes["post"];
      const bg = f
        ?.where("id")
        .anyOf(posts.map((p) => p.id))
        .toArray();
      return bg;
    }, [key, state.cache.ready, state.auth.authenticated]);

  return cachedPosts || []; //(posts?.length && state.api.cache.posts[id]) || {};
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

export const useCachedMoodPosts = ({ id }: { id?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();

  const cachedFolder = useLiveQuery(() => {
    const f = state.cache.db.nodes["folder"];
    return f?.where({ id }).toArray();
  }, [id, state.cache.ready, state.auth.authenticated]);
  const cachedFolderPostsEdges = useLiveQuery(() => {
    const w = state.cache.ready && state.cache.db.edges.where;
    // if (!w) return [];
    const wr = state.cache.db.edges.where("__outE").startsWith(["folder", id, "post"].join("+")).toArray();
    if (!wr) return [];
    return wr;
  }, [state.cache.ready, id, state.auth.authenticated]);

  useEffect(() => {
    id &&
      state.auth.authenticated &&
      state.cache.ready &&
      (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
      actions.api.mood.getPosts({ id });
  }, [state.cache.ready, state.auth.authenticated, id]);

  const posts = useCachedPosts((cachedFolderPostsEdges || []).map((p) => ({ id: p.toId || "" })));

  return { ...(cachedFolder || [])[0], posts: posts || [] }; //(id && state.api.cache.moods[id]) || {};
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
              (force || !state.api.cache.moods[id] || !state.api.cache.moods[id].posts?.length) &&
              actions.api.mood.read({ id }),
          )
          .filter(Boolean),
      ).then((r) => r.reduce((m) => m));
  }, [state.auth.authenticated, moods]);

  return moodsCollector;
};
