"use strict";
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
exports.fakeUserUpdate = exports.reduceTimer = exports.resetAuthTimer = exports.logout = void 0;
var state_1 = require("./state");
var logout = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var _c = _b === void 0 ? {} : _b, noRouting = _c.noRouting;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    state.auth.status = state_1.AUTH_FLOW_STATUS.ANONYMOUS;
                    state.auth.timers.authTimeoutCancel();
                    state.auth.timers.timeToRefreshCancel();
                    return [4 /*yield*/, actions.api.auth.logout()];
                case 1:
                    _d.sent();
                    // @ts-ignore
                    Object.values(state.auth.tokens).map(function (t) { return t.logout(); });
                    // await effects.firebase.logout();
                    // actions.routing.historyPush({ location: "/" });
                    if (!noRouting)
                        window.location.replace("/");
                    return [2 /*return*/];
            }
        });
    });
};
exports.logout = logout;
var resetAuthTimer = function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            state.auth.timers.authTimeout = 120;
            state.auth.timers.authTimeoutCancel && state.auth.timers.authTimeoutCancel();
            state.auth.timers.authTimeoutCancel = function () { return undefined; };
            return [2 /*return*/];
        });
    });
};
exports.resetAuthTimer = resetAuthTimer;
var reduceTimer = function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            state.auth.timers.authTimeout -= 1;
            return [2 /*return*/];
        });
    });
};
exports.reduceTimer = reduceTimer;
var fakeUserUpdate = function (_a, upd) {
    var state = _a.state, actions = _a.actions;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            Object.assign(state.api.auth.user, upd);
            return [2 /*return*/];
        });
    });
};
exports.fakeUserUpdate = fakeUserUpdate;
// export const newlifeLogout: Action<{ keepFbUser?: boolean } | undefined> = async ({ state, actions, effects }, config) => {
//     if(!config?.keepFbUser) {
//         state.auth.token = "";
//         state.auth.fbUser = null;
//     };
//     state.auth.user = {};
//     state.auth.status = AUTH_FLOW_STATUS.ANONYMOUS;
//     state.api.cache.stakeHistory = [];
//     state.auth.timers.authTimeoutCancel();
//     state.auth.timers.timeToRefreshCancel();
//     effects.api.updateToken("");
//     effects.websockets.newlife.socket?.close();
// }
// export const setPreloginRoute: Action<undefined> = ({ state,  actions,  effects }) => {
//     const p = window.location.pathname;
//     state.routing.preLoginRoute = p === "/auth" ? "" : p;
// };
// export const getCurrent: Action<undefined> = async ({ state, actions, effects }) => {
//     try {
//         state.routing.simpleHistory[0].search.slice(1).split(/&/).map(kv => kv.split(/=/)).reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
//         state.auth.user = (await state.api.client.user.currentList()).data;
//         state.auth.status = state.auth.user.username ? AUTH_FLOW_STATUS.AUTHORIZED : state.auth.status;
//     } catch (ex) {
//         state.auth.user = {};
//     }
//     actions.auth.routeAfterAuth();
// }
// reaction(
//     (state) => state.auth.authorized,
//     async () => {
//         if (
//             state.auth.status < AUTH_FLOW_STATUS.AUTHORIZED ||
//             !["registered", "admitted"].includes(state.auth.user?.status || "")
//         ) {
//             console.log("Not yet authorized")
//             return;
//         }
//         actions.websockets.toggleWebSocket()
//         await actions.api.user.getMoods({ id: state.auth.user?.id });
//         state.auth.moods = [...(state.api.cache.users.byId[state.auth.user?.id || ""]?.moods || [])];
//         await actions.api.user.getPowerups({ user : state.auth.user || {} });
//     }
// )
// reaction(
//     (state) => state.auth?.user?.id,
//     async (id) => {
//         if (!id || state.auth.status < AUTH_FLOW_STATUS.AUTHORIZED) {
//             return; //actions.auth.newlifeLogout();
//         }
//         // await actions.auth.refreshApiToken();
//         // await actions.auth.newlifeAuthorize();
//         state.auth.moods = ((await state.api.client.user.moodsList({ id })).data.value || []) as MoodReadResponse[];
//         await actions.api.user.getPowerups({ user : { id } });
//     }
// )
// export const setApi: Action<{ userInfo: UserInfo, client: CreatorApi }> = ({ state,  actions,  effects }, { userInfo, client }) => {
//     // state.userInfo = userInfo;
//     state.api.client = client;
// };
// export const wrapPromise: Action<Promise<unknown>> = ({ state,  actions,  effects }, value) => {
//     state.indicators._inProgressCounter++;
//     value
//         .finally(() => state.indicators._inProgressCounter--);
//     return value;
// };
