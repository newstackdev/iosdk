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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var overmind_1 = require("overmind");
var effects_1 = __importDefault(require("./effects"));
var lodash_1 = require("lodash");
var core_1 = require("@newcoin-foundation/core");
var toggleWebSocket = (0, overmind_1.pipe)((0, overmind_1.debounce)(500), function (_a) {
    var state = _a.state, effects = _a.effects, actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var token, res, items;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!state.api.auth.authorized)
                        return [2 /*return*/];
                    token = state.firebase.token;
                    effects.websockets.newlife.toggle(token);
                    if (!token || !effects.websockets.newlife.socket)
                        return [2 /*return*/];
                    return [4 /*yield*/, state.api.client.user.activityStreamList()];
                case 1:
                    res = (_b.sent()) || {
                        data: { Items: [] }
                    };
                    items = __spreadArray([], ((res.data || {}).Items || []), true).reverse();
                    items.forEach(function (ev) {
                        return actions.websockets.processIncoming({ msg: JSON.stringify(ev) });
                    });
                    effects.websockets.newlife.socket.addEventListener("message", function (ev) {
                        if (ev.data === "pong")
                            return;
                        actions.websockets.processIncoming({ msg: ev.data });
                        // state.websockets.messages.incoming.push(ev.data);
                        // effects.ux.notification.open({ message: ev.data });
                    });
                    return [2 /*return*/];
            }
        });
    });
});
var processIncomingNewcoin = (0, overmind_1.pipe)((0, overmind_1.filter)(function (_, _a) {
    var type = _a.event.type;
    return type === "newcoin";
}), 
// filter((_, { event: { payload } }) => (get(payload, "inbound.0.value.label") != "session")),
function (_a, _b) {
    var state = _a.state, effects = _a.effects;
    var event = _b.event;
    var msg = event.payload.message;
    var msgCore = msg.replace(/_/, " ");
    var asMsg = {
        title: event.updated + " newcoin: " + msgCore,
        link: "",
        description: msg.error || "You ".concat(msgCore.split(/_/)[1], " some stake."),
        original: event
    };
    // effects.ux.message.info(msgCore);
    state.websockets.messages.activityStream.unshift(asMsg);
    state.websockets.messages.newcoin.unshift(asMsg);
});
var modelProcessors = {
    user: function (_a, u) {
        var _b, _c;
        var state = _a.state, actions = _a.actions;
        var curr = state.api.cache.users.byId[(_b = u.id) !== null && _b !== void 0 ? _b : ""];
        actions.api.user.cache({ user: __assign(__assign({}, curr), u) });
        // state.api.cache.users.byId[u.id ?? ""] = { ...state.api.cache.users.byId[u.id ?? ""], ...u };
        // state.api.cache.users.byUsername[u.username ?? ""] = { ...state.api.cache.users.byUsername[u.username ?? ""], ...u };
        ((_c = state.api.auth.user) === null || _c === void 0 ? void 0 : _c.id) === u.id &&
            Object.assign(state.api.auth.user, __assign({}, u));
    },
    post: function (_a, p) {
        var _b, _c;
        var actions = _a.actions, state = _a.state;
        state.api.cache.posts[(_b = p.id) !== null && _b !== void 0 ? _b : ""] = __assign(__assign({}, state.api.cache.posts[(_c = p.id) !== null && _c !== void 0 ? _c : ""]), p);
    },
    mood: function () { }
};
var processIncomingModelUpdated = (0, overmind_1.pipe)((0, overmind_1.filter)(function (_, _a) {
    var type = _a.event.type;
    return type === "modelUpdated";
}), 
// filter((_, { event: { payload } }) => (get(payload, "inbound.0.value.label") != "session")),
function (ctx, _a) {
    var _b, _c;
    var event = _a.event;
    var state = ctx.state;
    var model = event.model === "user" ? "profile" : event.model;
    var what = (0, core_1.capFirst)(model);
    modelProcessors[event.model] &&
        modelProcessors[event.model](ctx, event.payload.value);
    var inRels = (_b = event.payload.inbound) === null || _b === void 0 ? void 0 : _b.filter(Boolean);
    var outRels = (_c = event.payload.outbound) === null || _c === void 0 ? void 0 : _c.filter(Boolean);
    var rels = (0, lodash_1.uniq)(__spreadArray([], (inRels || []).map(function (r) { return r.value.label; }), true)).filter(Boolean);
    if (rels.length == 1 && rels[0] === "session")
        return;
    var asMsg = {
        title: event.updated + " " + what + " updated",
        link: "/".concat(event.model, "/").concat(event.payload.value.id),
        description: !rels.length
            ? "Your ".concat(what.toLowerCase(), " got updated: ").concat((event.payload.updatedProps || []).join(", "))
            : "".concat(what, "'s ").concat(rels.join(", "), " got updated."),
        original: event
    };
    return state.websockets.messages.activityStream.unshift(asMsg);
});
var processIncoming = function (_a, _b) {
    var reaction = _a.reaction, actions = _a.actions, state = _a.state;
    var msg = _b.msg;
    try {
        var ev = JSON.parse(msg);
        // state.websockets.messages.incoming.unshift(ev)
        actions.websockets.processIncomingModelUpdated({ event: ev });
        actions.websockets.processIncomingNewcoin({ event: ev });
        // state.websockets.messages.activityStream.unshift({ ... })
        // ev.type === "modelUpdated"
    }
    catch (ex) {
        // unparseable?
    }
};
// const onInitializeOvermind: Action = ({ reaction, actions }) => {
//     reaction(
//         (st) => st.auth.user,
//         (id) => id && actions.websockets.toggleWebSocket()
//     )
// }
var actions = {
    // onInitializeOvermind,
    toggleWebSocket: toggleWebSocket,
    processIncoming: processIncoming,
    processIncomingModelUpdated: processIncomingModelUpdated,
    processIncomingNewcoin: processIncomingNewcoin
};
exports["default"] = {
    state: {
        socket: null,
        url: core_1.newlifeWebsocketsServer,
        messages: {
            incoming: [],
            activityStream: [],
            newcoin: []
        }
    },
    actions: actions,
    effects: {
        newlife: (0, effects_1["default"])(function (token) { return "".concat(core_1.newlifeWebsocketsServer, "?token=").concat(token); })
    }
};
