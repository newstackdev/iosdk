import {
  MoodCreateRequest,
  MoodReadResponse,
  PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { Action } from "@newcoin-foundation/core";
import { uniq, uniqBy } from "lodash";

export const cache: Action<{
  moods?: (MoodReadResponse & { promise?: Promise<any> })[];
  overwrite?: boolean;
}> = ({ state, actions, effects }, { moods, overwrite }) => {
  if (!moods) return;

  moods.forEach((m) => {
    const id = m.id || "";
    const curr = state.api.cache.moods[id] || {};

    if (!m.promise) {
      m.posts?.forEach(
        (p) =>
          p.id &&
          (state.api.cache.posts[p.id] = {
            ...state.api.cache.posts[p.id],
            ...p,
          })
      );
    }
    if (
      !curr?.id ||
      overwrite ||
      ((curr.posts && curr.posts.length) || 0) < ((m && m.posts?.length) || 0)
    ) {
      state.api.cache.moods[id] = {
        ...state.api.cache.moods[id],
        ...m,
        promise: m.promise || null,
      };
    }
  });
};

export const read: Action<{ id?: string }> = async (
  { state, actions, effects },
  { id }
) => {
  if (!id) return;

  const curr = state.api.cache.moods[id] || {};

  if (curr.promise) return; // await curr.promise;

  const promise = state.api.client.mood.moodList({ id });

  actions.api.mood.cache({ moods: [{ id, promise }] });

  const r = await promise;

  actions.api.mood.cache({ moods: [r.data] });
  //state.api.cache.moods[id] = r.data;
};

export const readMultiple: Action<{ moods: MoodReadResponse[] }> = async (
  { state, actions, effects },
  { moods }
) => {
  moods
    ?.filter((m) => m?.posts?.length || 0 <= 4)
    .forEach((m) => actions.api.mood.read(m));
};

export const getPosts: Action<MoodReadResponse> = async (
  { state, actions, effects },
  mood
) => {
  if (!mood.id) return;

  const r = await state.api.client.mood.postsList({ id: mood.id });

  // state.api.cache.moods[id] = { ...state.api.cache.moods[id], posts: uniqBy(r.data.value, p => p.id) };
  actions.api.mood.cache({ moods: [{ ...mood, posts: r.data.value }] });
  r.data.value?.forEach(
    (p) =>
      p.id &&
      (state.api.cache.posts[p.id] = { ...state.api.cache.posts[p.id], ...p })
  );

  // state.api.users[id] = {
  //     ...state.api.users[id],
  //     moods: (r.data?.value || []) as MoodReadResponse[]
  // };
};

export const create: Action<{ mood: MoodCreateRequest }> = async (
  { state, actions, effects },
  { mood }
) => {
  const m = await state.api.client.mood.moodCreate(mood);
  actions.api.mood.cache({ moods: [m.data] });
  state.api.auth.moods.push(m.data);
};
