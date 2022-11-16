import { useActions, useAppState } from "../overmind";
import { useEffect } from "react";

export const useCachedUser = (user?: { id?: string; username?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();

  const byIdOrUsername = (u?: { id?: string; username?: string }) => {
    const cachedItem = u?.id
      ? state.api.cache.users.byId[u?.id]
      : u?.username
      ? state.api.cache.users.byUsername[u?.username]
      : {};
    return cachedItem && cachedItem.id && (cachedItem.username || cachedItem.fullName) ? cachedItem : null;
  };

  useEffect(() => {
    if ((user?.id || user?.username) && state.auth.authenticated && (force || !byIdOrUsername(user))) {
      actions.api.user.read(user);
      // if (force && !byIdOrUsername(user)?.moods?.length)
      //     actions.api.user.getMoods(user);
    }
  }, [state.auth.authenticated, user?.id || "", user?.username || ""]);
  const u = byIdOrUsername(user);
  return { ...(u || {}), moods: u?.moods };
};

export const useCachedPost = ({ id }: { id?: string }, force?: boolean) => {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    id && state.auth.authenticated && (force || !state.api.cache.posts[id]) && actions.api.post.read({ id });
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

export const useCachedMoodPosts = ({ id }: { id?: string }, force?: boolean) => {
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
