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
exports.__esModule = true;
exports.getCurrent = exports.getPowerups = exports.powerup = exports.invite = exports.stake = exports.getMoods = exports.update = exports.create = exports.read = exports.cache = void 0;
var lodash_1 = require("lodash");
var overmind_1 = require("overmind");
var state_1 = require("../../auth/state");
var cache = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var user = _b.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, id, username, cache, curr, mr, _d, moods;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = __assign({ id: "", username: "" }, user), id = _c.id, username = _c.username;
                    cache = state.api.cache.users;
                    if (!id && !username)
                        return [2 /*return*/];
                    curr = cache.byId[id] || cache.byUsername[username] || null;
                    _d = (curr === null || curr === void 0 ? void 0 : curr.moods);
                    if (_d) return [3 /*break*/, 2];
                    return [4 /*yield*/, state.api.client.user.moodsList({ id: id })];
                case 1:
                    _d = ((_e = (_f.sent()).data) === null || _e === void 0 ? void 0 : _e.value);
                    _f.label = 2;
                case 2:
                    mr = _d;
                    moods = mr || [];
                    mr && actions.api.mood.cache({ moods: mr });
                    if (curr &&
                        curr.id &&
                        curr.username &&
                        curr.moods &&
                        curr.moods.length < moods.length) {
                        cache.byId[id].moods = moods;
                        cache.byUsername[curr.username || ""].moods = moods;
                    }
                    else {
                        cache.byId[id] = __assign(__assign(__assign({}, curr), user), { moods: mr });
                        cache.byUsername[username] = __assign(__assign(__assign({}, curr), user), { moods: moods });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.cache = cache;
var inProgress = {};
var read = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var id = _b.id, username = _b.username;
    return __awaiter(void 0, void 0, void 0, function () {
        var known, ur;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(id || username))
                        return [2 /*return*/];
                    known = (id && state.api.cache.users.byId[id]) ||
                        (username && state.api.cache.users.byUsername[username]);
                    return [4 /*yield*/, (known
                            ? Promise.resolve({ data: known })
                            : // @ts-ignore
                                state.api.client.user.userList(__assign(__assign({}, (id ? { id: id } : {})), { username: username })))];
                case 1:
                    ur = _c.sent();
                    id = id || ur.data.id || "";
                    actions.api.user.cache({ user: ur.data });
                    return [2 /*return*/, ur.data];
            }
        });
    });
};
exports.read = read;
exports.create = (0, overmind_1.pipe)((0, overmind_1.throttle)(3000), function (_a, _b) {
    var state = _a.state, effects = _a.effects, actions = _a.actions;
    var noRouting = _b.noRouting, user = _b.user, preregisterCreate = _b.preregisterCreate;
    return __awaiter(void 0, void 0, void 0, function () {
        var currUser, pn, nu, _c, ex_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 8, , 9]);
                    currUser = state.api.auth.user || {};
                    if (currUser.id && preregisterCreate)
                        return [2 /*return*/];
                    if (currUser.id &&
                        currUser.username &&
                        !["imported"].includes(currUser.status || ""))
                        return [2 /*return*/];
                    pn = state.firebase.user.phoneNumber;
                    if (!pn) {
                        !noRouting && actions.routing.historyPush({ location: "/auth" });
                        return [2 /*return*/];
                    }
                    user.phone = pn;
                    if (!preregisterCreate) return [3 /*break*/, 2];
                    return [4 /*yield*/, state.api.client.user.preregisterCreate(user)];
                case 1:
                    _c = _d.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, state.api.client.user.userCreate(__assign({}, user))];
                case 3:
                    _c = _d.sent();
                    _d.label = 4;
                case 4:
                    nu = _c;
                    !preregisterCreate &&
                        effects.ux.notification.open({
                            message: "Success!",
                            description: "User was created successfully"
                        });
                    return [4 /*yield*/, actions.api.auth.logout({ keepFbUser: true })];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, actions.firebase.refreshApiToken()];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, actions.api.auth.authorize()];
                case 7:
                    _d.sent();
                    state.flows.user.create.justCreated = true;
                    return [3 /*break*/, 9];
                case 8:
                    ex_1 = _d.sent();
                    effects.ux.message.error(JSON.stringify((0, lodash_1.get)(ex_1, "error.errorMessage.details") || (0, lodash_1.get)(ex_1, "message")));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
});
var update = function (_a, _b) {
    var state = _a.state, effects = _a.effects, actions = _a.actions;
    var user = _b.user, file = _b.file;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, uploadInfo, r;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    id = (_d = (_c = state.api.auth.user) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : "";
                    return [4 /*yield*/, state.api.client.user.userUpdate(__assign(__assign({}, user), { id: id }))];
                case 1:
                    _e.sent();
                    effects.ux.message.info("Successfully updated profile");
                    state.api.cache.users.byId[id] = state.api.auth.user = __assign({}, state.api.auth.user);
                    if (!(file && file.originFileObj)) return [3 /*break*/, 5];
                    return [4 /*yield*/, state.api.client.user.uploadCreate({
                            filename: file.name,
                            contentType: file.type
                        })];
                case 2:
                    uploadInfo = _e.sent();
                    return [4 /*yield*/, fetch(uploadInfo.data.url, {
                            method: "PUT",
                            body: file.originFileObj
                        })];
                case 3:
                    r = _e.sent();
                    return [4 /*yield*/, actions.api.user.cache({
                            user: __assign(__assign(__assign({}, state.api.auth.user), user), { contentUrl: "processing" })
                        })];
                case 4:
                    _e.sent();
                    effects.ux.message.info("Successfully updated profile avatar. Processing the image, this will take up to a minute.");
                    _e.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.update = update;
var getMoods = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var id = _b.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var r, u, un;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/];
                    return [4 /*yield*/, state.api.client.user.moodsList({ id: id })];
                case 1:
                    r = _f.sent();
                    if (!r.data)
                        return [2 /*return*/];
                    u = state.api.cache.users.byId[id];
                    un = (u === null || u === void 0 ? void 0 : u.username) || "";
                    state.api.cache.users.byId[id] = __assign(__assign({}, u), { moods: (((_c = r.data) === null || _c === void 0 ? void 0 : _c.value) || []) });
                    state.api.cache.users.byUsername[un] = __assign(__assign({}, u), { moods: (((_d = r.data) === null || _d === void 0 ? void 0 : _d.value) || []) });
                    actions.api.mood.cache({ moods: (_e = r.data) === null || _e === void 0 ? void 0 : _e.value });
                    return [2 /*return*/];
            }
        });
    });
};
exports.getMoods = getMoods;
exports.stake = (0, overmind_1.pipe)((0, overmind_1.debounce)(1000), function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var user = _b.user, amount = _b.amount;
    return __awaiter(void 0, void 0, void 0, function () {
        var u, res, pool, ex_2, errorMessage;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, actions.api.user.read(user)];
                case 1:
                    u = _c.sent();
                    return [4 /*yield*/, state.api.client.user.stakeCreate({
                            username: (u === null || u === void 0 ? void 0 : u.username) || "",
                            amount: amount
                        })];
                case 2:
                    res = _c.sent();
                    state.api.cache.stakeHistory.push({
                        user: user,
                        amount: amount,
                        response: res,
                        error: null
                    });
                    pool = { owner: user.username };
                    actions.newcoin.getAccountBalance({ user: state.api.auth.user || {} });
                    actions.newcoin.getPoolInfo({ pool: { owner: user.username } });
                    return [3 /*break*/, 4];
                case 3:
                    ex_2 = _c.sent();
                    errorMessage = ex_2.error.errorMessage;
                    state.api.cache.stakeHistory.push({
                        user: user,
                        amount: amount,
                        response: null,
                        error: ex_2
                    });
                    effects.ux.message.error(errorMessage);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
var invite = function (_a, _b) {
    var state = _a.state;
    var userInvite = _b.userInvite;
    var rate = state.api.client.user.inviteCreate(userInvite);
};
exports.invite = invite;
exports.powerup = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var user = _b.user, amount = _b.amount;
    return __awaiter(void 0, void 0, void 0, function () {
        var res, ex_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, state.api.client.user.rateCreate({
                            targetId: user.id,
                            value: amount || 1
                        })];
                case 1:
                    res = _c.sent();
                    effects.ux.message.info("Powerup successful");
                    return [4 /*yield*/, actions.api.user.getPowerups({ user: state.api.auth.user || {} })];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, actions.api.user.getPowerups({ user: user })];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_3 = _c.sent();
                    effects.ux.message.error(ex_3.error.errorMessage);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
exports.getPowerups = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a, _b) {
    var state = _a.state;
    var user = _b.user;
    return __awaiter(void 0, void 0, void 0, function () {
        var o, i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, state.api.client.user.ratedOutUsersList(user)];
                case 1:
                    o = _c.sent();
                    return [4 /*yield*/, state.api.client.user.ratedInList(user)];
                case 2:
                    i = _c.sent();
                    state.api.cache.powerups[user.id || ""] = {
                        "in": i.data,
                        out: o.data
                    };
                    return [2 /*return*/];
            }
        });
    });
});
var getCurrent = function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, ex_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    state.routing.simpleHistory[0].search
                        .slice(1)
                        .split(/&/)
                        .map(function (kv) { return kv.split(/=/); })
                        .reduce(function (r, _a) {
                        var _b;
                        var k = _a[0], v = _a[1];
                        return (__assign(__assign({}, r), (_b = {}, _b[k] = v, _b)));
                    }, {});
                    _b = state.api.auth;
                    return [4 /*yield*/, state.api.client.user.currentList()];
                case 1:
                    _b.user = (_c.sent()).data;
                    state.auth.status = state.api.auth.user.username
                        ? state_1.AUTH_FLOW_STATUS.AUTHORIZED
                        : state.auth.status;
                    return [3 /*break*/, 3];
                case 2:
                    ex_4 = _c.sent();
                    state.api.auth.user = {};
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getCurrent = getCurrent;
