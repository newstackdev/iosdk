"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPosts = exports.searchUsers = exports.listTopPosts = exports.listTopUsers = void 0;
const overmind_1 = require("overmind");
const aestheticList_1 = require("./SearchCreative/aestheticList");
const lodash_1 = __importDefault(require("lodash"));
const random_1 = require("../../utils/random");
const ITEMS_PER_PAGE = 20;
const calculateTags = (items) => {
    const aestheticCounts = {};
    for (const item of items) {
        Object.entries(item["aesthetics"] ?? {}).map((kvp) => {
            if (aestheticList_1.aestheticList.includes(kvp[0]) && kvp[1] > 0.8) {
                if (kvp[0] in aestheticCounts) {
                    aestheticCounts[kvp[0]] += kvp[1];
                }
                else {
                    aestheticCounts[kvp[0]] = kvp[1];
                }
            }
        });
    }
    const aesthetics = Object.entries(aestheticCounts);
    aesthetics.filter(val => val[1] > 0.8);
    aesthetics.sort((a, b) => b[1] - a[1]);
    return aesthetics.slice(0, 5).map((value) => value[0]);
};
const creativeSearch = (0, overmind_1.pipe)((0, overmind_1.debounce)(500), async ({ state }, query) => {
    if (!state.api.auth.authorized || query.tags === "")
        return;
    const newQuery = !lodash_1.default.isEqual(query, state.lists.creativeSearch.lastQueried);
    const page = newQuery ? 0 : state.lists.creativeSearch.results.page + 1;
    state.lists.creativeSearch.lastQueried = { ...query }; // should be before async call
    state.lists.creativeSearch.results.page = page;
    const response = await state.api.client.search.creativeList({
        tags: query.tags,
        aesthetics: query.aesthetics,
        page: page.toString()
    });
    const newdata = (response?.data?.hits || []).map(h => h._source || {});
    if (newQuery) {
        state.lists.creativeSearch.results.items = newdata;
        state.lists.creativeSearch.tags.items = calculateTags(state.lists.creativeSearch.results.items);
    }
    else {
        state.lists.creativeSearch.results.items.push(...newdata);
        state.lists.creativeSearch.tags.items = calculateTags(state.lists.creativeSearch.results.items);
    }
});
const listTopMoods = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), async ({ state, actions, effects }) => {
    const page = state.lists.top.moods.page ?? 0;
    const r = await state.api.client.mood.listTopList({ page: page.toString() }); // Math.floor(20 + (Math.random() * 20)).toString()
    const moods = r.data?.value || [];
    await actions.api.mood.cache({ moods });
    (0, random_1.fischerYates)(moods).forEach(v => {
        // state.api.cache.moods[v.id || ""] = v;
        state.lists.top.moods.items.push({ ...v });
    });
    state.lists.top.moods.page++;
});
exports.listTopUsers = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), async ({ state, actions, effects }) => {
    const page = state.lists.top.users.page ? state.lists.top.users.page + 1 : Math.floor(Math.random() * 10);
    const r = await state.api.client.user.listTopList({ page: page.toString() });
    r.data.value?.forEach(v => {
        state.api.cache.users.byId[v.id || ""] = v;
        state.api.cache.users.byUsername[v.username || ""] = v;
        state.lists.top.users.items.push(v);
    });
    state.lists.top.users.page++;
});
exports.listTopPosts = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), async ({ state, actions, effects }) => {
    const page = state.lists.top.posts.page ? state.lists.top.posts.page + 1 : 0;
    const r = await state.api.client.post.listTopList({ page: page.toString() });
    r.data?.value?.forEach(v => {
        state.api.cache.posts[v.id || ""] = v;
        state.lists.top.posts.items.push(v);
    });
    state.lists.top.posts.page++;
});
exports.searchUsers = (0, overmind_1.pipe)((0, overmind_1.debounce)(1000), async ({ state, actions, effects }, { query }) => {
    // const page = state.lists.search.users.results ? state.lists.top.users.page + 1 : 0;
    state.lists.search.users.results = null;
    if (query.length < 2)
        return;
    const r = await state.api.client.user.listSearchList({ q: "*" + query + "*" });
    r.data.value?.forEach(v => {
        state.api.cache.users.byId[v.id || ""] = v;
        state.lists.top.users.items.push(v);
    });
    state.lists.search.users.results = r.data;
});
exports.searchPosts = (0, overmind_1.pipe)((0, overmind_1.debounce)(1000), async ({ state, actions, effects }, { tags }) => {
    const loadingMore = state.lists.search.posts.lastQueried.tags == tags;
    if (loadingMore) {
        if (state.lists.search.posts.results?.done)
            return;
        else
            state.lists.top.posts.page = state.lists.search.posts.results ? (state.lists.top.posts.page || 0) + 1 : 0;
    }
    else {
        state.lists.top.posts.page = 0;
        state.lists.search.posts.results = null;
    }
    const tagsQ = tags.split(/,/)
        .map(t => ({
        match: {
            relevantTags: t
        }
    }
    // { range: {[`scoredTags.${t}`]:{ gte:0.5}} }
    ));
    const searchQ = { bool: { must: tagsQ } };
    const r = await state.api.client.post.listSearchList({ q: JSON.stringify(searchQ), page: (state.lists.top.posts.page || 0).toString() });
    r.data.value?.forEach(v => {
        state.api.cache.posts[v.id || ""] = v;
    });
    const curr = (0, overmind_1.json)(state.lists.search.posts.results)?.value || [];
    state.lists.search.posts.results = { ...r.data, value: [...curr, ...(r.data.value || [])] };
    state.lists.search.posts.lastQueried.tags = tags;
});
const actions = {
    creativeSearch,
    searchUsers: exports.searchUsers,
    searchPosts: exports.searchPosts,
    top: {
        moods: listTopMoods,
        users: exports.listTopUsers,
        posts: exports.listTopPosts
    }
};
const newListState = ({ sortKey } = { sortKey: "updated" }) => ({
    _items: {},
    items: [],
    sortKey: sortKey,
    startItem: 0,
    page: 0,
});
exports.default = {
    state: {
        creativeSearch: {
            results: newListState(),
            tags: newListState(),
            lastQueried: { tags: "", aesthetics: "" },
            isActive: false
        },
        postsSearch: {},
        top: {
            moods: newListState(),
            users: newListState(),
            posts: newListState()
        },
        search: {
            users: {
                query: "",
                results: null
            },
            posts: {
                query: "",
                results: null,
                lastQueried: { tags: "", aesthetics: "" },
                isActive: false,
                // results: newListState<PostReadResponse>(),
                tags: newListState()
            }
        }
    },
    actions,
    effects: {
    // wss://wsapi-eu-sit.newlife.io/creator?token=${token}`)
    }
};
//# sourceMappingURL=index.js.map