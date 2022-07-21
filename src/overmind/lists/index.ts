import { Action } from "../../types";
import { Context } from "../overmind";
import {
  CreativeSearchResponse,
  MoodReadResponse,
  PostPagedListReadPublicResponse,
  PostReadResponse,
  PostTagsSearchPublicResponse,
  UserPagedListReadPublicResponse,
  UserReadPublicResponse,
} from "@newcoin-foundation/iosdk-newgraph-client-js";
import { aestheticList } from "./SearchCreative/aestheticList";
import { debounce, derived, filter, json, pipe } from "overmind";
import { fischerYates } from "../../utils/random";
import _ from "lodash";

export type CreativeSearchHits = NonNullable<CreativeSearchResponse["hits"]>[number];
export type CreativeSearchItem = NonNullable<CreativeSearchHits["_source"]>;

const ITEMS_PER_PAGE = 20;

const calculateTags = (items: CreativeSearchItem[]) => {
  const aestheticCounts: { [id: string]: number } = {};
  for (const item of items) {
    Object.entries(item["aesthetics"] ?? {}).map((kvp: any) => {
      if (aestheticList.includes(kvp[0]) && kvp[1] > 0.8) {
        if (kvp[0] in aestheticCounts) {
          aestheticCounts[kvp[0]] += kvp[1];
        } else {
          aestheticCounts[kvp[0]] = kvp[1];
        }
      }
    });
  }
  const aesthetics = Object.entries(aestheticCounts);
  aesthetics.filter((val) => val[1] > 0.8);
  aesthetics.sort((a, b) => b[1] - a[1]);
  return aesthetics.slice(0, 5).map((value) => value[0]);
};

const creativeSearch: Action<{ tags: string; aesthetics: string }> = pipe(debounce(500), async ({ state }: Context, query) => {
  if (!state.api.auth.authorized || query.tags === "") return;

  const newQuery = !_.isEqual(query, state.lists.creativeSearch.lastQueried);

  const page = newQuery ? 0 : state.lists.creativeSearch.results.page + 1;

  state.lists.creativeSearch.lastQueried = { ...query }; // should be before async call
  state.lists.creativeSearch.results.page = page;

  const response = await state.api.client.search.creativeList({
    tags: query.tags,
    aesthetics: query.aesthetics,
    page: page.toString(),
  });
  const newdata: CreativeSearchItem[] = (response?.data?.hits || []).map((h) => h._source || {});
  if (newQuery) {
    state.lists.creativeSearch.results.items = newdata;
    state.lists.creativeSearch.tags.items = calculateTags(state.lists.creativeSearch.results.items);
  } else {
    state.lists.creativeSearch.results.items.push(...newdata);
    state.lists.creativeSearch.tags.items = calculateTags(state.lists.creativeSearch.results.items);
  }
});

const listTopMoods: Action = pipe(debounce(300), async ({ state, actions, effects }: Context) => {
  const page = state.lists.top.moods.page ?? 0;
  const r = await state.api.client.mood.listTopList({
    page: page.toString(),
  }); // Math.floor(20 + (Math.random() * 20)).toString()
  const moods = r.data?.value || [];
  await actions.api.mood.cache({ moods });
  fischerYates(moods).forEach((v) => {
    // state.api.cache.moods[v.id || ""] = v;
    state.lists.top.moods.items.push({ ...v });
  });
  state.lists.top.moods.page++;
});

export const listTopUsers: Action = pipe(debounce(300), async ({ state, actions, effects }: Context) => {
  const page = state.lists.top.users.page ? state.lists.top.users.page + 1 : Math.floor(Math.random() * 10);
  const r = await state.api.client.user.listTopList({
    page: page.toString(),
  });
  r.data.value?.forEach((v) => {
    state.api.cache.users.byId[v.id || ""] = v;
    state.api.cache.users.byUsername[v.username || ""] = v;
    state.lists.top.users.items.push(v);
  });
  state.lists.top.users.page++;
});

export const listTopPosts: Action = pipe(debounce(300), async ({ state, actions, effects }: Context) => {
  const page = state.lists.top.posts.page ? state.lists.top.posts.page + 1 : 0;
  const r = await state.api.client.post.listTopList({
    page: page.toString(),
  });
  r.data?.value?.forEach((v) => {
    state.api.cache.posts[v.id || ""] = v;
    state.lists.top.posts.items.push(v);
  });
  state.lists.top.posts.page++;
});

export const searchUsers: Action<{ query: string }> = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context, { query }) => {
    // const page = state.lists.search.users.results ? state.lists.top.users.page + 1 : 0;
    state.lists.search.users.query = query;

    state.lists.search.users.results = null;

    if (query.length < 2) return;

    const r = await state.api.client.user.listSearchList({
      q: "*" + query + "*",
    });

    r.data.value?.forEach((v) => {
      state.api.cache.users.byId[v.id || ""] = v;
      state.lists.top.users.items.push(v);
    });
    state.lists.search.users.results = r.data;
  },
);

export const searchPosts: Action<{ tags: string; force?: boolean }> = pipe(
  debounce(1000),
  async ({ state, actions, effects }: Context, { tags, force }) => {
    state.lists.search.posts.query = tags;

    const loadingMore = !force && state.lists.search.posts.lastQueried.tags == tags;
    if (loadingMore) {
      if (state.lists.search.posts.results?.done) return;
      else state.lists.search.posts.page = state.lists.search.posts.results ? (state.lists.top.posts.page || 0) + 1 : 0;
    } else {
      state.lists.top.posts.page = 0;
      state.lists.search.posts.results = null;
    }

    const tagsQ = tags.split(/,/).map((t) => ({
      match: {
        relevantTags: t,
      },
    }));
    // { range: {[`scoredTags.${t}`]:{ gte:0.5}} }

    const searchQ = { bool: { must: tagsQ } };

    const r = await state.api.client.post.listSearchList({
      q: JSON.stringify(searchQ),
      page: (state.lists.search.posts.page || 0).toString(),
    });

    r.data.value?.forEach((v) => {
      state.api.cache.posts[v.id || ""] = v;
    });
    const curr = json(state.lists.search.posts.results)?.value || [];
    state.lists.search.posts.results = {
      ...r.data,
      value: [...curr, ...(r.data.value || [])],
    };
    state.lists.search.posts.lastQueried.tags = tags;
  },
);

export const searchTags: Action<{ query: string }> = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context, { query }) => {
    state.lists.search.tags.query = query;

    const loadingMore = state.lists.search.tags.lastQueried === query;
    if (loadingMore) {
      if (state.lists.search.tags.results?.done) return;
      else state.lists.search.tags.page = state.lists.search.tags.results ? (state.lists.search.tags.page || 0) + 1 : 0;
    } else {
      state.lists.search.tags.page = 0;
      state.lists.search.tags.results = { value: [] };
    }
    const tagsQ = {
      bool: {
        minimum_should_match: 1,
        should: [
          {
            match: {
              tag: {
                query,
                fuzziness: "AUTO",
              },
            },
          },
          { query_string: { query: `*${query}*` } },
          { query_string: { query } },
          { query_string: { query: `${query}*` } },
          { query_string: { query: `*${query}` } },
        ],
      },
    };

    // const searchQ = { bool: { must: tagsQ } };

    const r = await state.api.client.post.listTagsSearchList({
      q: JSON.stringify(tagsQ),
      page: (state.lists.search.tags.page || 0).toString(),
    });

    // r.data.value?.forEach(v => {
    //     state.api.cache.tags[v.id || ""] = v;
    // });
    // const curr = (loadingMore && json(state.lists.search.tags.results)?.value) || [];
    state.lists.search.tags.results = r.data; //{ ...r.data, value: [...curr, ...(r.data.value || [])] };
    state.lists.search.tags.lastQueried = query;
  },
);

const actions = {
  creativeSearch,
  searchUsers,
  searchPosts,
  searchTags,
  top: {
    moods: listTopMoods,
    users: listTopUsers,
    posts: listTopPosts,
  },
};

type ListState<T> = {
  _items: Record<string, T>;
  items: T[];
  sortKey: string;
  page: number;
};

const newListState = <T>({ sortKey }: { sortKey: string } = { sortKey: "updated" }) =>
  ({
    _items: {} as Record<string, T>,
    items: [],
    sortKey: sortKey,
    startItem: 0,
    page: 0,
  } as ListState<T>);

export default {
  state: {
    creativeSearch: {
      results: newListState<CreativeSearchItem>(),
      tags: newListState<string>(),
      lastQueried: { tags: "", aesthetics: "" },
      isActive: false,
    },
    postsSearch: {},
    top: {
      moods: newListState<MoodReadResponse>(),
      users: newListState<UserReadPublicResponse>(),
      posts: newListState<PostReadResponse>(),
    },
    search: {
      users: {
        query: "",
        results: null as UserPagedListReadPublicResponse | null,
      },
      posts: {
        query: "",
        results: null as PostPagedListReadPublicResponse | null,
        lastQueried: { tags: "", aesthetics: "" },
        isActive: false,
        page: 0,
      },
      tags: {
        query: "",
        results: null as PostTagsSearchPublicResponse | null,
        lastQueried: "",
        isActive: false,
        page: 0,
      },
    },
  },
  actions,
  effects: {
    // wss://wsapi-eu-sit.newlife.io/creator?token=${token}`)
  },
};
