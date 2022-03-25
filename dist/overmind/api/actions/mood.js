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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getPosts = exports.readMultiple = exports.read = exports.cache = void 0;
var cache = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var moods = _b.moods, overwrite = _b.overwrite;
    if (!moods)
        return;
    moods.forEach(function (m) {
        var _a, _b;
        var id = m.id || "";
        var curr = state.api.cache.moods[id] || {};
        if (!m.promise) {
            (_a = m.posts) === null || _a === void 0 ? void 0 : _a.forEach(function (p) { return p.id && (state.api.cache.posts[p.id] = __assign(__assign({}, state.api.cache.posts[p.id]), p)); });
        }
        if (!(curr === null || curr === void 0 ? void 0 : curr.id) ||
            overwrite ||
            ((curr.posts && curr.posts.length) || 0) < (m && ((_b = m.posts) === null || _b === void 0 ? void 0 : _b.length) || 0)) {
            state.api.cache.moods[id] = __assign(__assign(__assign({}, state.api.cache.moods[id]), m), { promise: m.promise || null });
        }
    });
};
exports.cache = cache;
var read = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var id = _b.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var curr, promise, r;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/];
                    curr = state.api.cache.moods[id] || {};
                    if (curr.promise)
                        return [2 /*return*/]; // await curr.promise;
                    promise = state.api.client.mood.moodList({ id: id });
                    actions.api.mood.cache({ moods: [{ id: id, promise: promise }] });
                    return [4 /*yield*/, promise];
                case 1:
                    r = _c.sent();
                    actions.api.mood.cache({ moods: [r.data] });
                    return [2 /*return*/];
            }
        });
    });
};
exports.read = read;
var readMultiple = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var moods = _b.moods;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            moods === null || moods === void 0 ? void 0 : moods.filter(function (m) { var _a; return ((_a = m === null || m === void 0 ? void 0 : m.posts) === null || _a === void 0 ? void 0 : _a.length) || 0 <= 4; }).forEach(function (m) { return actions.api.mood.read(m); });
            return [2 /*return*/];
        });
    });
};
exports.readMultiple = readMultiple;
var getPosts = function (_a, mood) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var r;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!mood.id)
                        return [2 /*return*/];
                    return [4 /*yield*/, state.api.client.mood.postsList({ id: mood.id })];
                case 1:
                    r = _c.sent();
                    // state.api.cache.moods[id] = { ...state.api.cache.moods[id], posts: uniqBy(r.data.value, p => p.id) };
                    actions.api.mood.cache({ moods: [__assign(__assign({}, mood), { posts: r.data.value })] });
                    (_b = r.data.value) === null || _b === void 0 ? void 0 : _b.forEach(function (p) { return p.id && (state.api.cache.posts[p.id] = __assign(__assign({}, state.api.cache.posts[p.id]), p)); });
                    return [2 /*return*/];
            }
        });
    });
};
exports.getPosts = getPosts;
var create = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var mood = _b.mood;
    return __awaiter(void 0, void 0, void 0, function () {
        var m;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, state.api.client.mood.moodCreate(mood)];
                case 1:
                    m = _c.sent();
                    actions.api.mood.cache({ moods: [m.data] });
                    state.api.auth.moods.push(m.data);
                    return [2 /*return*/];
            }
        });
    });
};
exports.create = create;
//# sourceMappingURL=mood.js.map