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
exports.setTitle = exports.setBreadcrumbs = exports.historyPush = exports.setHistory = exports.setPreloginRoute = exports.onRouteChange = exports.goBack = exports.routeAfterAuth = void 0;
var naiveQSDecode = function (search) {
    if (search === void 0) { search = ""; }
    return search
        .slice(1)
        .split(/&/)
        .map(function (kv) { return kv.split(/=/); })
        .reduce(function (r, _a) {
        var _b;
        var k = _a[0], v = _a[1];
        return (__assign(__assign({}, r), (_b = {}, _b[k] = v, _b)));
    }, {});
};
var routeAfterAuth = function (_a) {
    var state = _a.state, actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var p, h0s, qs0, nextRoute;
        return __generator(this, function (_b) {
            p = state.routing.location;
            if (!state.api.auth.authorized) {
                actions.routing.historyPush({ location: "/" });
                return [2 /*return*/];
            }
            h0s = state.routing.simpleHistory.length
                ? state.routing.simpleHistory[0].search
                : undefined;
            qs0 = naiveQSDecode(h0s);
            if (qs0.path) {
                actions.routing.historyPush({ location: qs0.path });
                return [2 /*return*/];
            }
            nextRoute = !state.api.auth.authorized
                ? "/user-create"
                : state.routing.preLoginRoute || "/explore";
            //  ||
            // (NONPOSTAUTHLOCATIONS.includes(p) ?
            //     "/explore" : p);
            state.routing.preLoginRoute = "";
            return [2 /*return*/];
        });
    });
};
exports.routeAfterAuth = routeAfterAuth;
var last = function (a) { return a[a.length - 1]; };
var uriFromLocation = function (_a) {
    var pathname = _a.pathname, search = _a.search;
    return "".concat(pathname, "?").concat(search);
};
var goBack = function (_a) {
    var actions = _a.actions, state = _a.state;
    state.routing.backHistory.pop();
    var bh = state.routing.backHistory.pop();
    var current = uriFromLocation(state.routing.history.location);
    var prev = bh ? uriFromLocation(bh) : "/";
    actions.routing.historyPush({ location: bh ? uriFromLocation(bh) : "/" });
};
exports.goBack = goBack;
var onRouteChange = function (_a, _b) {
    var state = _a.state, actions = _a.actions;
    var _c = _b.location, pathname = _c.pathname, search = _c.search;
    return __awaiter(void 0, void 0, void 0, function () {
        var lastBh, prevPath, currPath;
        return __generator(this, function (_d) {
            state.routing.location = [pathname, search].filter(Boolean).join("");
            actions.routing.setPreloginRoute();
            state.routing.simpleHistory.push({ pathname: pathname, search: search });
            lastBh = last(state.routing.backHistory);
            if (lastBh) {
                prevPath = (lastBh.pathname || "").split(/\//);
                currPath = pathname.split(/\//);
                if (currPath.length <= 3 ||
                    prevPath.length != currPath.length ||
                    currPath.slice(0, currPath.length - 2).join("") !=
                        prevPath.slice(0, currPath.length - 2).join(""))
                    state.routing.backHistory.push({ pathname: pathname, search: search });
            }
            else {
                state.routing.backHistory.push(__assign({}, state.routing.history.location));
            }
            if (!state.routing.isAllowed) {
                return [2 /*return*/];
            }
            setTimeout(function () { return window.scrollTo(0, 0); });
            return [2 /*return*/];
        });
    });
};
exports.onRouteChange = onRouteChange;
var setPreloginRoute = function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var p = state.routing.location;
    if (p !== "/auth")
        state.routing.preLoginRoute = p;
};
exports.setPreloginRoute = setPreloginRoute;
var setHistory = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var history = _b.history;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            state.routing.history = history;
            return [2 /*return*/];
        });
    });
};
exports.setHistory = setHistory;
var historyPush = function (_a, _b) {
    var state = _a.state, effects = _a.effects;
    var location = _b.location, force = _b.force;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            // effects.ux.message.info("Routing to " + location)
            if (force)
                state.routing.location = "";
            state.routing.location = location;
            state.routing.history.push(location);
            return [2 /*return*/];
        });
    });
};
exports.historyPush = historyPush;
var setBreadcrumbs = function (_a, value) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    state.routing.breadcrumbs = value;
};
exports.setBreadcrumbs = setBreadcrumbs;
var setTitle = function (_a, value) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    global.document.title = ((value === null || value === void 0 ? void 0 : value.substring(0, 44)) || "") + " ~ Newlife.IO";
};
exports.setTitle = setTitle;
