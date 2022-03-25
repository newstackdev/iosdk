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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.listTopPosts = exports.listTopUsers = void 0;
var overmind_1 = require("overmind");
var aestheticList_1 = require("./SearchCreative/aestheticList");
var lodash_1 = __importDefault(require("lodash"));
var random_1 = require("../../utils/random");
var ITEMS_PER_PAGE = 20;
var calculateTags = function (items) {
    var _a;
    var aestheticCounts = {};
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        Object.entries((_a = item["aesthetics"]) !== null && _a !== void 0 ? _a : {}).map(function (kvp) {
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
    var aesthetics = Object.entries(aestheticCounts);
    aesthetics.filter(function (val) { return val[1] > 0.8; });
    aesthetics.sort(function (a, b) { return b[1] - a[1]; });
    return aesthetics.slice(0, 5).map(function (value) { return value[0]; });
};
var creativeSearch = (0, overmind_1.pipe)((0, overmind_1.debounce)(500), function (_a, query) {
    var state = _a.state;
    return __awaiter(void 0, void 0, void 0, function () {
        var newQuery, page, response, newdata;
        var _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!state.api.auth.authorized || query.tags === "")
                        return [2 /*return*/];
                    newQuery = !lodash_1.default.isEqual(query, state.lists.creativeSearch.lastQueried);
                    page = newQuery ? 0 : state.lists.creativeSearch.results.page + 1;
                    state.lists.creativeSearch.lastQueried = __assign({}, query); // should be before async call
                    state.lists.creativeSearch.results.page = page;
                    return [4 /*yield*/, state.api.client.search.creativeList({
                            tags: query.tags,
                            aesthetics: query.aesthetics,
                            page: page.toString()
                        })];
                case 1:
                    response = _d.sent();
                    newdata = (((_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.hits) || []).map(function (h) { return h._source || {}; });
                    if (newQuery) {
                        state.lists.creativeSearch.results.items = newdata;
                        state.lists.creativeSearch.tags.items = calculateTags(state.lists.creativeSearch.results.items);
                    }
                    else {
                        (_b = state.lists.creativeSearch.results.items).push.apply(_b, newdata);
                        state.lists.creativeSearch.tags.items = calculateTags(state.lists.creativeSearch.results.items);
                    }
                    return [2 /*return*/];
            }
        });
    });
});
var listTopMoods = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var page, r, moods;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    page = (_b = state.lists.top.moods.page) !== null && _b !== void 0 ? _b : 0;
                    return [4 /*yield*/, state.api.client.mood.listTopList({ page: page.toString() })];
                case 1:
                    r = _d.sent();
                    moods = ((_c = r.data) === null || _c === void 0 ? void 0 : _c.value) || [];
                    return [4 /*yield*/, actions.api.mood.cache({ moods: moods })];
                case 2:
                    _d.sent();
                    (0, random_1.fischerYates)(moods).forEach(function (v) {
                        // state.api.cache.moods[v.id || ""] = v;
                        state.lists.top.moods.items.push(__assign({}, v));
                    });
                    state.lists.top.moods.page++;
                    return [2 /*return*/];
            }
        });
    });
});
exports.listTopUsers = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var page, r;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    page = state.lists.top.users.page ? state.lists.top.users.page + 1 : Math.floor(Math.random() * 10);
                    return [4 /*yield*/, state.api.client.user.listTopList({ page: page.toString() })];
                case 1:
                    r = _c.sent();
                    (_b = r.data.value) === null || _b === void 0 ? void 0 : _b.forEach(function (v) {
                        state.api.cache.users.byId[v.id || ""] = v;
                        state.api.cache.users.byUsername[v.username || ""] = v;
                        state.lists.top.users.items.push(v);
                    });
                    state.lists.top.users.page++;
                    return [2 /*return*/];
            }
        });
    });
});
exports.listTopPosts = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var page, r;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    page = state.lists.top.posts.page ? state.lists.top.posts.page + 1 : 0;
                    return [4 /*yield*/, state.api.client.post.listTopList({ page: page.toString() })];
                case 1:
                    r = _d.sent();
                    (_c = (_b = r.data) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.forEach(function (v) {
                        state.api.cache.posts[v.id || ""] = v;
                        state.lists.top.posts.items.push(v);
                    });
                    state.lists.top.posts.page++;
                    return [2 /*return*/];
            }
        });
    });
});
exports.searchUsers = (0, overmind_1.pipe)((0, overmind_1.debounce)(1000), function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var query = _b.query;
    return __awaiter(void 0, void 0, void 0, function () {
        var r;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // const page = state.lists.search.users.results ? state.lists.top.users.page + 1 : 0;
                    state.lists.search.users.results = null;
                    return [4 /*yield*/, state.api.client.user.listSearchList({ q: query })];
                case 1:
                    r = _d.sent();
                    (_c = r.data.value) === null || _c === void 0 ? void 0 : _c.forEach(function (v) {
                        state.api.cache.users.byId[v.id || ""] = v;
                        state.lists.top.users.items.push(v);
                    });
                    state.lists.search.users.results = r.data;
                    return [2 /*return*/];
            }
        });
    });
});
var actions = {
    creativeSearch: creativeSearch,
    searchUsers: exports.searchUsers,
    top: {
        moods: listTopMoods,
        users: exports.listTopUsers,
        posts: exports.listTopPosts
    }
};
var newListState = function (_a) {
    var _b = _a === void 0 ? { sortKey: "updated" } : _a, sortKey = _b.sortKey;
    return ({
        _items: {},
        items: [],
        sortKey: sortKey,
        startItem: 0,
        page: 0,
    });
};
exports.default = {
    state: {
        creativeSearch: {
            results: newListState(),
            tags: newListState(),
            lastQueried: { tags: "", aesthetics: "" },
            isActive: false
        },
        top: {
            moods: newListState(),
            users: newListState(),
            posts: newListState()
        },
        search: {
            users: {
                query: "",
                results: null
            }
        }
    },
    actions: actions,
    effects: {
    // wss://wsapi-eu-sit.newlife.io/creator?token=${token}`)
    }
};
//# sourceMappingURL=index.js.map