"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.__esModule = true;
var mood = __importStar(require("./actions/mood"));
var user = __importStar(require("./actions/user"));
var post = __importStar(require("./actions/post"));
var state_1 = require("../auth/state");
var auth = __importStar(require("./actions/auth"));
var onInitializeOvermind = function (_a) {
    var effects = _a.effects, state = _a.state, actions = _a.actions, reaction = _a.reaction;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            state.api.client = effects.api.initialize();
            // reaction(
            //     (state) => state.firebase.user,
            //     async (fbUser) => {
            //         if (!fbUser && state.api.auth?.user?.id)
            //             return actions.api.auth.logout();
            //     });
            reaction(function (state) { return state.api.auth.authorized; }, function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (state.auth.status < state_1.AUTH_FLOW_STATUS.AUTHORIZED ||
                                !["registered", "admitted"].includes(((_a = state.api.auth.user) === null || _a === void 0 ? void 0 : _a.status) || "")) {
                                console.log("Not yet authorized");
                                return [2 /*return*/];
                            }
                            actions.websockets.toggleWebSocket();
                            return [4 /*yield*/, actions.api.user.getMoods({ id: (_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.id })];
                        case 1:
                            _e.sent();
                            state.api.auth.moods = __spreadArray([], (((_d = state.api.cache.users.byId[((_c = state.api.auth.user) === null || _c === void 0 ? void 0 : _c.id) || ""]) === null || _d === void 0 ? void 0 : _d.moods) ||
                                []), true);
                            return [4 /*yield*/, actions.api.user.getPowerups({ user: state.api.auth.user || {} })];
                        case 2:
                            _e.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
};
exports["default"] = {
    onInitializeOvermind: onInitializeOvermind,
    auth: auth,
    user: user,
    mood: mood,
    post: post
};
// export default namespaced({
//     user: { actions: user },
//     mood: { actions: mood },
//     post: { actions: post }
// });
