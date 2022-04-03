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
exports.checkAvailability = exports.create = exports.preregisterCreate = exports.wizardStepNext = exports._wizardReact = exports.wizardStepPrev = exports.stopLegacyImport = exports.startLegacyImport = exports.updateForm = exports.onInitializeOvermind = void 0;
var overmind_1 = require("overmind");
// import { IReaction } from "overmind";
var reduceState = function (_a) {
    var _b;
    var auth = _a.api.auth, authenticated = _a.auth.authenticated, _c = _a.flows.user.create, legacyToken = _c.legacyToken, username = _c.form.username, formUsernameIsAvailable = _c.formUsernameIsAvailable;
    return __assign(__assign(__assign({}, auth), { authenticated: authenticated }), { formUsername: username || "", subscribed: !!((_b = auth.user) === null || _b === void 0 ? void 0 : _b.subscriptionStatus), formUsernameIsAvailable: formUsernameIsAvailable, user: auth.user, legacyToken: legacyToken });
};
var onInitializeOvermind = function (_a) {
    var actions = _a.actions, effects = _a.effects, state = _a.state, reaction = _a.reaction;
    return __awaiter(void 0, void 0, void 0, function () {
        var legacy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    legacy = JSON.parse(window.localStorage.getItem("legacyAuthToken") || "{}");
                    if (!(legacy.updated && Date.now() - (legacy.updated || 0) < 30 * 60000)) return [3 /*break*/, 3];
                    // const cf = state.flows.user.create;
                    // cf.form = legacy.form;
                    // cf.legacyToken = legacy.legacyToken;
                    //actions.auth.firebaseRequestToken
                    effects.api.updateToken(legacy.legacyToken);
                    state.firebase.token = legacy.legacyToken;
                    return [4 /*yield*/, actions.api.auth.authorize()];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, actions.flows.user.create.startLegacyImport()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    reaction(reduceState, actions.flows.user.create._wizardReact);
                    reaction(function (s) { return ({ auth: s.api.auth, username: s.flows.user.create.form.username }); }, function (_a) {
                        var username = _a.username, auth = _a.auth;
                        if (username && !auth.authorized)
                            actions.flows.user.create.checkAvailability({ username: username });
                    });
                    return [2 /*return*/];
            }
        });
    });
};
exports.onInitializeOvermind = onInitializeOvermind;
exports.updateForm = (0, overmind_1.pipe)((0, overmind_1.debounce)(200), function (_a, val) {
    var state = _a.state;
    state.flows.user.create.form = __assign(__assign({}, state.flows.user.create.form), val);
});
var usernameToAccount = function (username) {
    // adjust any string to newlife account name
    username = username.replace(/\.io/, "").replace(/[^a-z1-5]/g, "");
    if (/^[0-9]+/.test(username))
        username = "z" + username;
    return username.replace(/^(.{0,9})(.*)$/, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        return "".concat(m[1], ".io");
    });
};
var startLegacyImport = function (_a) {
    var state = _a.state, actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, legacyToken, form;
        return __generator(this, function (_b) {
            user = __assign({}, state.api.auth.user);
            legacyToken = state.firebase.token;
            actions.auth.logout({ noRouting: true });
            actions.routing.historyPush({ location: "/" });
            actions.flows.user.create.updateForm(user);
            state.flows.user.create.legacyToken = legacyToken;
            form = state.flows.user.create.form;
            form.username = user.username;
            form.displayName = form.username || form.displayName;
            form.username = usernameToAccount(form.displayName || "");
            window.localStorage.setItem("legacyAuthToken", JSON.stringify({ legacyToken: legacyToken, updated: Date.now() }));
            return [2 /*return*/];
        });
    });
};
exports.startLegacyImport = startLegacyImport;
var stopLegacyImport = function (_, params) {
    if (params === void 0) { params = {}; }
    window.localStorage.setItem("legacyAuthToken", "");
    if (!params.noRedirect)
        window.location.pathname = "/";
};
exports.stopLegacyImport = stopLegacyImport;
var wizardStepPrev = function (_a) {
    var state = _a.state;
    state.flows.user.create.wizard.send("PREV", reduceState(state));
};
exports.wizardStepPrev = wizardStepPrev;
var autoRedirectFrom = ["", "/", "/auth"];
exports._wizardReact = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), function (_a, i) {
    var _b;
    var state = _a.state, actions = _a.actions;
    if (state.api.auth.authorized &&
        // (state.auth.user?.status === "registered") &&
        ((_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.username) != state.flows.user.create.form.username &&
        autoRedirectFrom.includes(state.routing.location) &&
        state.newcoin.pools["CGY"])
        actions.routing.historyPush({ location: "/explore" });
    state.flows.user.create.wizard.send("UPDATE", i);
});
var wizardStepNext = function (_a) {
    var state = _a.state;
    state.flows.user.create.wizard.send("NEXT", reduceState(state));
    state.flows.user.create.wizard.send("UPDATE", reduceState(state));
};
exports.wizardStepNext = wizardStepNext;
var preregisterCreate = function (_a, params) {
    var actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var u;
        return __generator(this, function (_b) {
            u = params.user || {};
            return [2 /*return*/, actions.api.user.create(__assign(__assign({}, params), { user: u, preregisterCreate: true }))];
        });
    });
};
exports.preregisterCreate = preregisterCreate;
var create = function (_a, params) {
    var actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        var u;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, actions.api.user.create(__assign({}, params))];
                case 1:
                    u = _b.sent();
                    actions.flows.user.create.stopLegacyImport({ noRedirect: true });
                    return [2 /*return*/];
            }
        });
    });
};
exports.create = create;
exports.checkAvailability = (0, overmind_1.pipe)(
// filter((_, { username }) => username.length > 6),
(0, overmind_1.debounce)(300), function (_a, _b) {
    var actions = _a.actions, state = _a.state;
    var username = _b.username;
    return __awaiter(void 0, void 0, void 0, function () {
        var r, currUser, availableOnNewlife;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!username) {
                        state.flows.user.create.formUsernameIsAvailable = "";
                        return [2 /*return*/];
                    }
                    state.flows.user.create.formUsernameIsAvailable = "checking";
                    return [4 /*yield*/, state.api.client.user.availabilityList({ username: username })];
                case 1:
                    r = _d.sent();
                    currUser = state.api.auth.user;
                    availableOnNewlife = ((_c = r.data) === null || _c === void 0 ? void 0 : _c.available) ||
                        ((currUser === null || currUser === void 0 ? void 0 : currUser.username) === username && currUser.status === "imported");
                    // const availableOnNewcoin = nc?.statusCode === 500;
                    state.flows.user.create.formUsernameIsAvailable = availableOnNewlife
                        ? "available"
                        : "unavailable"; // && availableOnNewcoin
                    return [2 /*return*/];
            }
        });
    });
});
// const deriveAndSetStep : Action<{ processors: WizardStepsProcessors }> = (ctx, { processors }) => {
//     const step: DOMAIN_PRESALE_STEPS = deriveStep(ctx, { processors });
//     ctx.state.flows.user.create.wizard.step.current = step;
