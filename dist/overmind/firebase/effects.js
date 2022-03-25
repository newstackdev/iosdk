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
// import '../App.css';
var auth_1 = require("firebase/auth");
var app_1 = require("firebase/app");
// import { firebaseConfig } from "../../config";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
//   authDomain: "newlifeio.firebaseapp.com",
//   projectId: "newlifeio",
//   storageBucket: "newlifeio.appspot.com",
//   messagingSenderId: "360722214510",
//   appId: "1:360722214510:web:d088a1e106fef50262007f",
//   measurementId: "G-PJWYRPZSNM"
// };
// Initialize Firebase
exports.default = (function () {
    var auth;
    var recaptcaVerifier = null;
    var confirmationResult;
    var getRecaptchaVerifier = function (containerOrId) {
        if (containerOrId === void 0) { containerOrId = 'sign-in-button'; }
        return recaptcaVerifier || (recaptcaVerifier = new auth_1.RecaptchaVerifier(containerOrId, {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                //alert(response);
                // signInWithPhoneNumber
                // onSignInSubmit()
            }
        }, auth));
    };
    var clearRecaptchaVerifier = function () {
        if (!recaptcaVerifier)
            return;
        recaptcaVerifier.clear();
        recaptcaVerifier = null;
    };
    return {
        initialize: function (firebaseConfig) {
            (0, app_1.initializeApp)(firebaseConfig);
            auth = (0, auth_1.getAuth)();
            return auth;
        },
        initRecaptchaVerifier: function (containerOrId) {
            if (containerOrId === void 0) { containerOrId = 'sign-in-button'; }
            clearRecaptchaVerifier();
            getRecaptchaVerifier(containerOrId);
        },
        clearRecaptchaVerifier: clearRecaptchaVerifier,
        requestPhoneAuthCode: function (v) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, auth_1.signInWithPhoneNumber)(auth, v.phone, getRecaptchaVerifier())];
                        case 1: return [2 /*return*/, confirmationResult = _a.sent()];
                    }
                });
            });
        },
        requestEmailAuthCode: function (v) {
            return __awaiter(this, void 0, void 0, function () {
                var actionCodeSettings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            actionCodeSettings = {
                                // URL you want to redirect back to. The domain (www.example.com) for this
                                // URL must be in the authorized domains list in the Firebase Console.
                                url: window.location.href + '?email=email',
                                // This must be true.
                                handleCodeInApp: true,
                                // iOS: {
                                //   bundleId: 'com.example.ios'
                                // },
                                // android: {
                                //   packageName: 'com.example.android',
                                //   installApp: true,
                                //   minimumVersion: '12'
                                // },
                                // dynamicLinkDomain: window.location.host
                            };
                            return [4 /*yield*/, (0, auth_1.sendSignInLinkToEmail)(auth, v.email, actionCodeSettings)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        signInWithEmailLink: function (email, emailLink) {
            return __awaiter(this, void 0, void 0, function () {
                var p;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p = (0, auth_1.signInWithEmailLink)(auth, email, emailLink);
                            return [4 /*yield*/, p];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        submitPhonVerificationCode: function (v) {
            return __awaiter(this, void 0, void 0, function () {
                var ex_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, confirmationResult.confirm(v.phoneVerificationCode)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            ex_1 = _a.sent();
                            console.log(ex_1.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        logout: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = auth;
                            if (!_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, auth.signOut()];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            _a;
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
})();
//# sourceMappingURL=effects.js.map