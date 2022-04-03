"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useCachedPoolByCode = exports.useCachedPool = exports.useCachedNewconAccountHistory = exports.useCachedPowerups = exports.useCachedMoods = exports.useCachedMoodPosts = exports.useCachedMood = exports.useCachedPost = exports.useCachedUser = void 0;
var overmind_1 = require("overmind");
var react_1 = require("react");
var state_1 = require("@newcoin-foundation/state");
// import { PowerupsCacheItem } from "@newcoin-foundation/state";
// import { HyperionAccountHistory } from "@newcoin-foundation/state";
var useCachedUser = function (user, force) {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var byIdOrUsername = function (u) {
        return (u === null || u === void 0 ? void 0 : u.id)
            ? state.api.cache.users.byId[u === null || u === void 0 ? void 0 : u.id]
            : (u === null || u === void 0 ? void 0 : u.username)
                ? state.api.cache.users.byUsername[u === null || u === void 0 ? void 0 : u.username]
                : null;
    };
    (0, react_1.useEffect)(function () {
        if (((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user.username)) &&
            state.auth.authenticated &&
            (force || !byIdOrUsername(user))) {
            actions.api.user.read(user);
            // if (force && !byIdOrUsername(user)?.moods?.length)
            //     actions.api.user.getMoods(user);
        }
    }, [state.auth.authenticated, (user === null || user === void 0 ? void 0 : user.id) || "", (user === null || user === void 0 ? void 0 : user.username) || ""]);
    var u = byIdOrUsername(user);
    return __assign(__assign({}, u), { moods: u === null || u === void 0 ? void 0 : u.moods });
};
exports.useCachedUser = useCachedUser;
var useCachedPost = function (_a, force) {
    var id = _a.id;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.posts[id]) &&
            actions.api.post.read({ id: id });
    }, [state.auth.authenticated, id]);
    return (id && state.api.cache.posts[id]) || {};
};
exports.useCachedPost = useCachedPost;
var useCachedMood = function (_a, force) {
    var id = _a.id;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
            actions.api.mood.read({ id: id });
    }, [state.auth.authenticated, id]);
    return (id && state.api.cache.moods[id]) || {};
};
exports.useCachedMood = useCachedMood;
var useCachedMoodPosts = function (_a, force) {
    var id = _a.id;
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.moods[id]) && //|| !state.api.cache.moods[id].posts?.length) &&
            actions.api.mood.getPosts({ id: id });
    }, [state.auth.authenticated, id]);
    return (id && state.api.cache.moods[id]) || {};
};
exports.useCachedMoodPosts = useCachedMoodPosts;
var useCachedMoods = function (moods, force) {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var moodsCollector = [];
    (0, react_1.useEffect)(function () {
        var res = [];
        moods &&
            moods.length &&
            state.auth.authenticated &&
            Promise.all(moods
                .map(function (_a) {
                var _b;
                var id = _a.id;
                return id &&
                    (force ||
                        !state.api.cache.moods[id] ||
                        !((_b = state.api.cache.moods[id].posts) === null || _b === void 0 ? void 0 : _b.length)) &&
                    actions.api.mood.read({ id: id });
            })
                .filter(Boolean)).then(function (r) { return r.reduce(function (m) { return m; }); });
    }, [state.auth.authenticated, moods]);
    return moodsCollector;
};
exports.useCachedMoods = useCachedMoods;
var useCachedPowerups = function (user, force) {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var current = state.api.auth.user || {};
    var id = (user === null || user === void 0 ? void 0 : user.id) || current.id || "";
    var targetPu = state.api.cache.powerups && state.api.cache.powerups[id];
    var currentPu = state.api.cache.powerups[current.id || ""];
    (0, react_1.useEffect)(function () {
        id &&
            state.auth.authenticated &&
            (force || !state.api.cache.powerups[id]) &&
            actions.api.user.getPowerups({ user: { id: id } });
    }, [current.id, id, targetPu, currentPu]);
    return (id &&
        (state.api.cache.powerups[id]
            ? (0, overmind_1.json)(state.api.cache.powerups[id])
            : {}));
};
exports.useCachedPowerups = useCachedPowerups;
var useCachedNewconAccountHistory = function (user, force) {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        user.username &&
            state.auth.authenticated &&
            (force || !state.newcoin.cache.accountHistory[user.username || ""]) &&
            actions.newcoin.getAccountHitory({ user: user });
    }, [user.username]);
    return ((user.username && state.newcoin.cache.accountHistory[user.username]) ||
        {});
};
exports.useCachedNewconAccountHistory = useCachedNewconAccountHistory;
var useCachedPool = function (pool, force) {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var pools = state.newcoin.cache.pools; //.byOwner[pool?.code];
    var id = (pool === null || pool === void 0 ? void 0 : pool.owner) || (pool === null || pool === void 0 ? void 0 : pool.code) || "";
    var cache = (pool === null || pool === void 0 ? void 0 : pool.owner) ? pools.byOwner : pools.byCode;
    (0, react_1.useEffect)(function () {
        // if(!state.auth.authenticated) return;
        if (!pool || !id)
            return;
        if (force || !cache[id]) {
            actions.newcoin.getPoolInfo({ pool: pool });
            console.log("Getting pool for ", id);
        }
        else
            console.log("NOT Getting pool for ", id);
    }, [id, cache[id]]);
    return cache[id]
        ? cache[id].rows[0]
        : { owner: "", code: "", total: { quantity: 0 } }; //cache[id] || { rows: [], more: false, next_key: "" };
};
exports.useCachedPool = useCachedPool;
var useCachedPoolByCode = function (pool, force) {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        pool.code &&
            state.auth.authenticated &&
            (force || !state.newcoin.cache.pools.byCode[pool.code || ""]) &&
            actions.newcoin.getPoolInfo({ pool: pool });
    }, [pool.code]);
    return pool.code && state.newcoin.cache.pools.byCode[pool.code];
};
exports.useCachedPoolByCode = useCachedPoolByCode;
