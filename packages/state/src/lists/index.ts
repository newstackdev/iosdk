import { pipe, debounce } from "overmind";
import { Context, Action } from "../state";
import {
  MoodReadResponse,
  UserPagedListReadPublicResponse,
  UserReadPublicResponse,
  PostReadResponse,
  CreativeSearchResponse,
} from "@newlife/newlife-creator-client-api";
import { aestheticList } from "./SearchCreative/aestheticList";
import _ from "lodash";
import { fischerYates } from "@newcoin-foundation/core";

export type CreativeSearchHits = NonNullable<
  CreativeSearchResponse["hits"]
>[number];
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

const creativeSearch: Action<{ tags: string; aesthetics: string }> = pipe(
  debounce(500),
  async ({ state }: Context, query) => {
    if (!state.api.auth.authorized || query.tags === "") return;

    const newQuery = !_.isEqual(query, state.lists.creativeSearch.lastQueried);

    const page = newQuery ? 0 : state.lists.creativeSearch.results.page + 1;

    state.lists.creativeSearch.lastQueried = { ...query }; // should be before async call
    state.lists.creativeSearch.results.page = page;

    const response = await state.api.client.search.creativeList({
      tags: query.tags,
      // @ts-ignore
      aesthetics: query.aesthetics,
      page: page.toString(),
    });
    const newdata: CreativeSearchItem[] = (response?.data?.hits || []).map(
      (h) => h._source || {}
    );
    if (newQuery) {
      state.lists.creativeSearch.results.items = newdata;
      state.lists.creativeSearch.tags.items = calculateTags(
        state.lists.creativeSearch.results.items
      );
    } else {
      state.lists.creativeSearch.results.items.push(...newdata);
      state.lists.creativeSearch.tags.items = calculateTags(
        state.lists.creativeSearch.results.items
      );
    }
  }
);

const listTopMoods: Action = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context) => {
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
  }
);

export const listTopUsers: Action = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context) => {
    const page = state.lists.top.users.page
      ? state.lists.top.users.page + 1
      : Math.floor(Math.random() * 10);
    const r = await state.api.client.user.listTopList({
      page: page.toString(),
    });
    r.data.value?.forEach((v) => {
      state.api.cache.users.byId[v.id || ""] = v;
      state.api.cache.users.byUsername[v.username || ""] = v;
      state.lists.top.users.items.push(v);
    });
    state.lists.top.users.page++;
  }
);

export const listTopPosts: Action = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context) => {
    const page = state.lists.top.posts.page
      ? state.lists.top.posts.page + 1
      : 0;
    const r = await state.api.client.post.listTopList({
      page: page.toString(),
    });
    r.data?.value?.forEach((v) => {
      state.api.cache.posts[v.id || ""] = v;
      state.lists.top.posts.items.push(v);
    });
    state.lists.top.posts.page++;
  }
);

export const searchUsers: Action<{ query: string }> = pipe(
  debounce(1000),
  async ({ state, actions, effects }: Context, { query }) => {
    // const page = state.lists.search.users.results ? state.lists.top.users.page + 1 : 0;
    state.lists.search.users.results = null;
    // @ts-ignore
    const r = await state.api.client.user.listSearchList({ q: query });

    r.data.value?.forEach((v) => {
      state.api.cache.users.byId[v.id || ""] = v;
      state.lists.top.users.items.push(v);
    });
    state.lists.search.users.results = r.data;
  }
);
const actions = {
  creativeSearch,
  searchUsers,
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

const newListState = <T>(
  { sortKey }: { sortKey: string } = { sortKey: "updated" }
) =>
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
    },
  },
  actions,
  effects: {
    // wss://wsapi-eu-sit.newlife.io/creator?token=${token}`)
  },
};
