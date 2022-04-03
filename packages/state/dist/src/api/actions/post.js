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
exports.rate = exports.attachToMoods = exports.create = exports.read = void 0;
var lodash_1 = require("lodash");
var overmind_1 = require("overmind");
var read = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var id = _b.id;
    return __awaiter(void 0, void 0, void 0, function () {
        var r, isProcessing;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, state.api.client.post.postList({ id: id })];
                case 1:
                    r = _f.sent();
                    if (!r.data)
                        return [2 /*return*/];
                    if ((_d = (_c = r.data) === null || _c === void 0 ? void 0 : _c.author) === null || _d === void 0 ? void 0 : _d.id) {
                        actions.api.user.cache({ user: __assign({}, r.data.author) });
                    } // state.api.cache.users.by[r.data.author.id] =
                    isProcessing = /^processing$/i.test(((_e = state.api.cache.posts[id]) === null || _e === void 0 ? void 0 : _e.contentUrl) || "");
                    state.api.cache.posts[id] = (0, lodash_1.omit)(r.data, isProcessing ? ["contentUrl"] : []);
                    actions.api.mood.cache({ moods: r.data.moods });
                    return [2 /*return*/];
            }
        });
    });
};
exports.read = read;
var create = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var postForm = _b.postForm;
    return __awaiter(void 0, void 0, void 0, function () {
        var shouldUpload, p, f, p, uploadInfo, r, _c, _d, _e, ex_1;
        var _f;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    shouldUpload = !postForm.contentType;
                    if (!!shouldUpload) return [3 /*break*/, 2];
                    // @ts-ignore
                    if (!postForm.content)
                        return [2 /*return*/, effects.ux.notification.open({
                                message: "Write something smart here."
                            })];
                    return [4 /*yield*/, state.api.client.post.postCreate(postForm)];
                case 1:
                    p = _h.sent();
                    return [2 /*return*/, p.data];
                case 2:
                    _h.trys.push([2, 9, , 10]);
                    f = postForm.file[0];
                    // const contentType = mime.lookup(extname(f.));
                    if (!f.type) {
                        return [2 /*return*/, effects.ux.notification.open({
                                message: "Unrecognized/unsupported content type. Upload something else."
                            })];
                    }
                    return [4 /*yield*/, state.api.client.post.postCreate(postForm)];
                case 3:
                    p = _h.sent();
                    return [4 /*yield*/, state.api.client.post.uploadCreate({
                            filename: f.name,
                            targetId: p.data.id,
                            contentType: f.type
                        })];
                case 4:
                    uploadInfo = _h.sent();
                    state.api.cache.posts[(_g = p.data.id) !== null && _g !== void 0 ? _g : ""] = {
                        p: p,
                        contentUrl: "processing"
                    };
                    return [4 /*yield*/, fetch(uploadInfo.data.url, {
                            method: "PUT",
                            body: f
                        })];
                case 5:
                    r = _h.sent();
                    if (!(r.status == 200)) return [3 /*break*/, 6];
                    effects.ux.notification.open({ message: "Success!" });
                    return [3 /*break*/, 8];
                case 6:
                    _d = (_c = effects.ux.notification).open;
                    _f = {};
                    _e = "The post was created but couldn't upload the file, error: ".concat;
                    return [4 /*yield*/, r.json()];
                case 7:
                    _d.apply(_c, [(_f.message = _e.apply("The post was created but couldn't upload the file, error: ", [_h.sent()]),
                            _f)]);
                    _h.label = 8;
                case 8: return [2 /*return*/, p.data];
                case 9:
                    ex_1 = _h.sent();
                    // setErrMsg(get(ex, "error.errorMessage.details") || get(ex, "message") || "unknown error");
                    effects.ux.notification.open({ message: "Somethink wend wronk!" });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.create = create;
var attachToMoods = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var moods = _b.moods, post = _b.post;
    return __awaiter(void 0, void 0, void 0, function () {
        var pid;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pid = post.id || "";
                    console.log("attachToMoods: enter");
                    if (!pid || !(moods === null || moods === void 0 ? void 0 : moods.length)) {
                        console.log("attachToMoods: no selection");
                        return [2 /*return*/, Promise.resolve()];
                    }
                    console.log("attachToMoods: adding ".concat(moods.length, " moods"));
                    return [4 /*yield*/, Promise.all(moods
                            .filter(function (m) { return m.id; })
                            .map(function (m) {
                            return state.api.client.mood.attachPostUpdate({
                                id: m.id || "",
                                targetId: pid
                            });
                        }))];
                case 1:
                    _c.sent();
                    console.log("attachToMoods: caching ".concat(moods.length, " moods"));
                    moods.map(function (m) {
                        actions.api.mood.cache({ moods: [m] });
                    });
                    console.log("attachToMoods: done caching ".concat(moods.length, " moods"));
                    return [2 /*return*/, Promise.resolve()];
            }
        });
    });
};
exports.attachToMoods = attachToMoods;
exports.rate = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var post = _b.post, amount = _b.amount;
    return __awaiter(void 0, void 0, void 0, function () {
        var t, mt, res, ex_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    t = post.title || post.content || "";
                    mt = t.length <= 30 ? t : t.substring(0, 30) + "...";
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, state.api.client.post.rateCreate({
                            targetId: post.id,
                            value: amount || 1,
                            //@ts-ignore
                            contextType: "tag",
                            contextValue: "shoes"
                        })];
                case 2:
                    res = _c.sent();
                    effects.ux.message.info("You voted ".concat(amount));
                    return [3 /*break*/, 4];
                case 3:
                    ex_2 = _c.sent();
                    effects.ux.message.error(ex_2.error.errorMessage);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
