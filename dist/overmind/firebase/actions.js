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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFbUser = exports.initRecaptchaVerifier = exports.verifyPhone = exports.requestToken = exports.signInWithEmailLink = exports.requestEmailLink = exports.handleAuthChange = exports.refreshApiToken = exports.logout = exports.onInitializeOvermind = void 0;
var state_1 = require("../auth/state");
var onInitializeOvermind = function (_a) {
    var effects = _a.effects, state = _a.state, actions = _a.actions, reaction = _a.reaction;
    return __awaiter(void 0, void 0, void 0, function () {
        var auth;
        return __generator(this, function (_b) {
            auth = effects.firebase.initialize(state.config.settings.firebaseConfig);
            setTimeout(function () { return (state.auth.initialized = true); }, 700);
            auth.onAuthStateChanged(function (u) { return actions.firebase.handleAuthChange(u); });
            return [2 /*return*/];
        });
    });
};
exports.onInitializeOvermind = onInitializeOvermind;
var logout = function (_a) {
    var effects = _a.effects, state = _a.state;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, effects.firebase.logout()];
                case 1:
                    _b.sent();
                    state.firebase.token = "";
                    return [2 /*return*/];
            }
        });
    });
};
exports.logout = logout;
var refreshApiToken = function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var token, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!state.firebase.user) return [3 /*break*/, 2];
                    return [4 /*yield*/, state.firebase.user.getIdToken(true)];
                case 1:
                    _b = (_c.sent());
                    return [3 /*break*/, 3];
                case 2:
                    _b = "";
                    _c.label = 3;
                case 3:
                    token = _b;
                    if (!token)
                        return [2 /*return*/, actions.auth.logout()];
                    state.auth.status = Math.max(state_1.AUTH_FLOW_STATUS.AUTHENTICATED, state.auth.status);
                    state.firebase.token = token;
                    effects.api.updateToken(token);
                    state.auth.tokens["firebase"] = { tokenType: "firebase", token: token, logout: actions.firebase.logout };
                    return [2 /*return*/];
            }
        });
    });
};
exports.refreshApiToken = refreshApiToken;
var handleAuthChange = function (_a, fbUser) {
    var actions = _a.actions, state = _a.state, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var userChanged, timeout_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userChanged = ((_b = state.firebase.user) === null || _b === void 0 ? void 0 : _b.uid) !== (fbUser === null || fbUser === void 0 ? void 0 : fbUser.uid);
                    if (!fbUser) return [3 /*break*/, 5];
                    return [4 /*yield*/, actions.firebase.setFbUser({ user: fbUser })];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, actions.firebase.refreshApiToken()];
                case 2:
                    _c.sent();
                    timeout_1 = setTimeout(function () {
                        actions.firebase.refreshApiToken();
                    }, 30 * 60000);
                    state.auth.timers.timeToRefreshCancel = function () { return clearTimeout(timeout_1); };
                    if (!userChanged) return [3 /*break*/, 4];
                    return [4 /*yield*/, actions.api.auth.authorize()];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    // if(state.auth.user.id)
                    if (state.auth.status === state_1.AUTH_FLOW_STATUS.REQUESTED)
                        actions.auth.logout({ noRouting: true });
                    state.auth.timers.timeToRefreshCancel();
                    _c.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.handleAuthChange = handleAuthChange;
var requestEmailLink = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var email = _b.email;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, effects.firebase.requestEmailAuthCode({ email: email })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.requestEmailLink = requestEmailLink;
var signInWithEmailLink = function (_a) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    return __awaiter(void 0, void 0, void 0, function () {
        var email;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    email = window.localStorage.getItem('emailForSignIn') || "";
                    if (!email)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, effects.firebase.signInWithEmailLink(email, window.location.href)];
                case 1:
                    _b.sent(); // state.routing.location); // with react-router, location.href is the landing url; using the router internal
                    state.auth.status = state_1.AUTH_FLOW_STATUS.REQUESTED;
                    return [2 /*return*/, true];
            }
        });
    });
};
exports.signInWithEmailLink = signInWithEmailLink;
var requestToken = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var phone = _b.phone;
    return __awaiter(void 0, void 0, void 0, function () {
        var int, timeout, ex_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!phone)
                        return [2 /*return*/, effects.ux.message.warning("No phone provided")];
                    effects.firebase.initRecaptchaVerifier(); // ok unless we want another name for recaptcha invoking button
                    actions.auth.resetAuthTimer();
                    int = setInterval(function () { return actions.auth.reduceTimer(); }, 1000);
                    timeout = setTimeout(function () {
                        actions.auth.resetAuthTimer();
                        clearInterval(int);
                        if (state.auth.status != state_1.AUTH_FLOW_STATUS.AUTHENTICATED) {
                            effects.ux.message.warning("Authentication was taking too long. Please try again.");
                            actions.auth.logout();
                        }
                    }, 120 * 1000);
                    state.auth.timers.authTimeoutCancel = function () { clearTimeout(timeout); clearInterval(int); };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, effects.firebase.requestPhoneAuthCode({ phone: phone })];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _c.sent();
                    effects.ux.message.warning("Please try again.");
                    state.auth.status = state_1.AUTH_FLOW_STATUS.ANONYMOUS;
                    return [3 /*break*/, 4];
                case 4:
                    state.auth.status = state_1.AUTH_FLOW_STATUS.RECEIVED;
                    return [2 /*return*/];
            }
        });
    });
};
exports.requestToken = requestToken;
var verifyPhone = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var phoneVerificationCode = _b.phoneVerificationCode;
    return __awaiter(void 0, void 0, void 0, function () {
        var r;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    state.auth.status = state_1.AUTH_FLOW_STATUS.SUBMITTED;
                    return [4 /*yield*/, effects.firebase.submitPhonVerificationCode({ phoneVerificationCode: phoneVerificationCode })];
                case 1:
                    r = _c.sent();
                    effects.firebase.clearRecaptchaVerifier();
                    actions.auth.resetAuthTimer();
                    if (!r) return [3 /*break*/, 2];
                    state.auth.status = state_1.AUTH_FLOW_STATUS.AUTHENTICATED;
                    return [3 /*break*/, 4];
                case 2:
                    effects.ux.notification.error({ message: "Something went wrong, please try again" });
                    return [4 /*yield*/, actions.auth.logout({ noRouting: true })];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.verifyPhone = verifyPhone;
var initRecaptchaVerifier = function (_a, _b) {
    var effects = _a.effects;
    var containerOrId = _b.containerOrId;
    effects.firebase.initRecaptchaVerifier(containerOrId);
};
exports.initRecaptchaVerifier = initRecaptchaVerifier;
var setFbUser = function (_a, _b) {
    var state = _a.state, actions = _a.actions, effects = _a.effects;
    var user = _b.user;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_c) {
            state.firebase.user = user;
            return [2 /*return*/];
        });
    });
};
exports.setFbUser = setFbUser;
exports.default = {};
//# sourceMappingURL=actions.js.map