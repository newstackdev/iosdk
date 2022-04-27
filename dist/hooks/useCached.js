"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCachedPoolByCode = exports.useCachedPool = exports.useCachedNewconAccountHistory = exports.useCachedPowerups = exports.useCachedMoods = exports.useCachedMoodPosts = exports.useCachedMood = exports.useCachedPost = exports.useCachedUser = void 0;
const overmind_1 = require("overmind");
const react_1 = require("react");
const overmind_2 = require("../overmind");
const useCachedUser = (user, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    const byIdOrUsername = (u) => {
        const cachedItem = u?.id ?
            state.api.cache.users.byId[u?.id] :
            u?.username ? state.api.cache.users.byUsername[u?.username] : {};
        return (cachedItem && cachedItem.id && cachedItem.username ? cachedItem : null);
    };
    (0, react_1.useEffect)(() => {
        if ((user?.id || user?.username) &&
            state.auth.authenticated &&
            (force || !byIdOrUsername(user))) {
            actions.api.user.read(user);
            // if (force && !byIdOrUsername(user)?.moods?.length)
            //     actions.api.user.getMoods(user);
        }
    }, [state.auth.authenticated, user?.id || "", user?.username || ""]);
    const u = byIdOrUsername(user);
    return { ...(u || {}), moods: u?.moods };
};
exports.useCachedUser = useCachedUser;
const useCachedPost = ({ id }, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    (0, react_1.useEffect)(() => {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.posts[id]) &&
            actions.api.post.read({ id });
    }, [state.auth.authenticated, id]);
    return id && state.api.cache.posts[id] || {};
};
exports.useCachedPost = useCachedPost;
const useCachedMood = ({ id }, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    (0, react_1.useEffect)(() => {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
            actions.api.mood.read({ id });
    }, [state.auth.authenticated, id]);
    return id && state.api.cache.moods[id] || {};
};
exports.useCachedMood = useCachedMood;
const useCachedMoodPosts = ({ id }, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    (0, react_1.useEffect)(() => {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
            actions.api.mood.getPosts({ id });
    }, [state.auth.authenticated, id]);
    return id && state.api.cache.moods[id] || {};
};
exports.useCachedMoodPosts = useCachedMoodPosts;
const useCachedMoods = (moods, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    const moodsCollector = [];
    (0, react_1.useEffect)(() => {
        const res = [];
        moods && moods.length &&
            state.auth.authenticated &&
            Promise.all(moods.map(({ id }) => id && (force || !state.api.cache.moods[id] || !state.api.cache.moods[id].posts?.length) &&
                actions.api.mood.read({ id })).filter(Boolean)).then((r) => r.reduce(m => m));
    }, [state.auth.authenticated, moods]);
    return moodsCollector;
};
exports.useCachedMoods = useCachedMoods;
const useCachedPowerups = (user, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    const current = state.api.auth.user || {};
    const id = user?.id || current.id || "";
    const targetPu = state.api.cache.powerups && state.api.cache.powerups[id];
    const currentPu = state.api.cache.powerups[current.id || ""];
    (0, react_1.useEffect)(() => {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.powerups[id]) &&
            actions.api.user.getPowerups({ user: { id } });
    }, [current.id, id, targetPu, currentPu]);
    return id && (state.api.cache.powerups[id] ? (0, overmind_1.json)(state.api.cache.powerups[id]) : {});
};
exports.useCachedPowerups = useCachedPowerups;
const useCachedNewconAccountHistory = (user, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    (0, react_1.useEffect)(() => {
        user.username &&
            state.auth.authenticated &&
            (force || !state.newcoin.cache.accountHistory[user.username || ""]) &&
            actions.newcoin.getAccountHitory({ user });
    }, [user.username]);
    return user.username && state.newcoin.cache.accountHistory[user.username] || {};
};
exports.useCachedNewconAccountHistory = useCachedNewconAccountHistory;
const useCachedPool = (pool, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    const pools = state.newcoin.cache.pools; //.byOwner[pool?.code];
    const id = pool?.owner || pool?.code || "";
    const cache = pool?.owner ? pools.byOwner : pools.byCode;
    (0, react_1.useEffect)(() => {
        // if(!state.auth.authenticated) return;
        if (!pool || !id)
            return;
        if (force || !cache[id]) {
            actions.newcoin.getPoolInfo({ pool });
            console.log("Getting pool for ", id);
        }
        else
            console.log("NOT Getting pool for ", id);
    }, [id, cache[id]]);
    return cache[id] ? cache[id].rows[0] : { owner: "", code: "", total: { quantity: 0 } }; //cache[id] || { rows: [], more: false, next_key: "" };
};
exports.useCachedPool = useCachedPool;
const useCachedPoolByCode = (pool, force) => {
    const state = (0, overmind_2.useAppState)();
    const actions = (0, overmind_2.useActions)();
    (0, react_1.useEffect)(() => {
        pool.code &&
            state.auth.authenticated &&
            (force || !state.newcoin.cache.pools.byCode[pool.code || ""]) &&
            actions.newcoin.getPoolInfo({ pool });
    }, [pool.code]);
    return pool.code && state.newcoin.cache.pools.byCode[pool.code];
};
exports.useCachedPoolByCode = useCachedPoolByCode;
//# sourceMappingURL=useCached.js.map