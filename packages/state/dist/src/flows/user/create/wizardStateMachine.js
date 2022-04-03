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
exports.__esModule = true;
exports.Wizard = void 0;
var overmind_1 = require("overmind");
// const forwAuthorized = (authorized: boolean, step: States): States => authorized ? { current: 'DONE', hasNext: false, hasPrev: false } : step;
// const forwAuthenticated = (authenticated: boolean, step: States): States => authenticated ? { current: 'CREATE_USER', hasNext: false, hasPrev: true } : step;
var defaults = {
    SELECT_DOMAIN: function () { return ({
        current: "SELECT_DOMAIN",
        hasNext: false,
        hasPrev: false
    }); },
    DONE: function () { return ({ current: "DONE", hasNext: false, hasPrev: false }); },
    CREATE_USER: function (d) { return ({
        current: "CREATE_USER",
        hasNext: !!(d === null || d === void 0 ? void 0 : d.hasNext),
        hasPrev: true
    }); },
    SUBSCRIBE: function () { return ({ current: "SUBSCRIBE", hasNext: false, hasPrev: true }); },
    AUTHENTICATE: function () { return ({
        current: "AUTHENTICATE",
        hasNext: false,
        hasPrev: true
    }); }
};
// export type WizardMachine = statemachine<States, Events, BaseState>;
exports.Wizard = (0, overmind_1.statemachine)({
    SUBSCRIBE: {
        NEXT: function (_a) {
            var subscribed = _a.subscribed;
            return subscribed ? defaults.CREATE_USER() : defaults.SUBSCRIBE();
        },
        PREV: function (_a) {
            var formUsername = _a.formUsername;
            return (__assign(__assign({}, defaults.SELECT_DOMAIN()), { hasNext: !!formUsername }));
        },
        UPDATE: function (_a) {
            var authorized = _a.authorized, authenticated = _a.authenticated, subscribed = _a.subscribed, user = _a.user, formUsername = _a.formUsername;
            return (authorized
                ? defaults.DONE()
                : subscribed || user || formUsername.length <= 5
                    ? defaults.CREATE_USER()
                    : authenticated
                        ? defaults.SUBSCRIBE()
                        : defaults.SELECT_DOMAIN());
        }
    },
    SELECT_DOMAIN: {
        NEXT: function (_a) {
            var authenticated = _a.authenticated, subscribed = _a.subscribed, user = _a.user, legacyToken = _a.legacyToken;
            return authenticated
                ? subscribed || legacyToken
                    ? defaults.CREATE_USER()
                    : defaults.SUBSCRIBE()
                : defaults.AUTHENTICATE();
        },
        UPDATE: function (_a) {
            var authorized = _a.authorized, formUsername = _a.formUsername, formUsernameIsAvailable = _a.formUsernameIsAvailable, user = _a.user;
            return authorized && !["imported"].includes((user === null || user === void 0 ? void 0 : user.status) || "")
                ? defaults.DONE()
                : __assign(__assign({}, defaults.SELECT_DOMAIN()), { hasNext: 
                    // (formUsername.length === 12) &&
                    formUsername.replace(/\.io$/, "").length >= 5 &&
                        formUsernameIsAvailable === "available" });
        }
    },
    AUTHENTICATE: {
        NEXT: function (_a) {
            var user = _a.user, legacyToken = _a.legacyToken;
            return legacyToken ? defaults.CREATE_USER() : defaults.SUBSCRIBE();
        },
        PREV: function (_a) {
            var formUsername = _a.formUsername;
            return (__assign(__assign({}, defaults.SELECT_DOMAIN()), { hasNext: !!formUsername }));
        },
        UPDATE: function (_a) {
            var authorized = _a.authorized, authenticated = _a.authenticated, legacyToken = _a.legacyToken;
            return (authorized && !legacyToken
                ? defaults.DONE()
                : authenticated
                    ? legacyToken
                        ? defaults.CREATE_USER()
                        : defaults.SUBSCRIBE()
                    : defaults.AUTHENTICATE());
        }
    },
    CREATE_USER: {
        NEXT: function () { return defaults.DONE(); },
        PREV: function (_a) {
            var authenticated = _a.authenticated, formUsername = _a.formUsername;
            return (authenticated
                ? __assign(__assign({}, defaults.SELECT_DOMAIN()), { hasNext: !!formUsername }) : __assign(__assign({}, defaults.AUTHENTICATE()), { hasNext: false }));
        },
        UPDATE: function (_a) {
            var authorized = _a.authorized, authenticated = _a.authenticated, user = _a.user, formUsername = _a.formUsername;
            return !authenticated
                ? defaults.SELECT_DOMAIN()
                : authorized && ["registered", "admitted"].includes((user === null || user === void 0 ? void 0 : user.status) || "")
                    ? defaults.DONE()
                    : defaults.CREATE_USER({ hasNext: !!formUsername });
        }
    },
    DONE: {
        UPDATE: function (_a) {
            var authorized = _a.authorized;
            return authorized ? defaults.DONE() : defaults.SELECT_DOMAIN();
        }
    }
});
// NEXT:
// {
//     MAYBE_AUTHENTICATE: (state) =>
//         ({ current: forward(state, 'MAYBE_AUTHENTICATE'), hasPrev: false, hasNext: false }),
//     CREATE_USER: (state) =>
//         ({ current: forward(state, 'CREATE_USER'), hasPrev: false, hasNext: false }),
//     DONE: (state) => ({ current: 'DONE', hasPrev: false, hasNext: false })
// },
// PREV:
// {
//     MAYBE_AUTHENTICATE: ({ authorized, authenticated, formUsername }) =>
//         ({ current: 'SELECT_DOMAIN', hasPrev: false, hasNext: false }),
//     CREATE_USER: ({ authorized, authenticated, formUsername }) =>
//         ({ current: backAuthorized(authorized, authenticated ? 'SELECT_DOMAIN' : 'MAYBE_AUTHENTICATE'), hasPrev: false, hasNext: false }),
//     DONE: ({ authorized, authenticated, formUsername }) => ({ current: 'DONE', hasPrev: false, hasNext: false })
// }
// NEXT:
// {
// SELECT_DOMAIN: (state: WizardInput) =>
//     ({ current: forward(state, 'MAYBE_AUTHENTICATE'), hasPrev: false, hasNext: false }),
//     MAYBE_AUTHENTICATE: (state) =>
//         ({ current: forward(state, 'MAYBE_AUTHENTICATE'), hasPrev: false, hasNext: false }),
//     CREATE_USER: (state) =>
//         ({ current: forward(state, 'CREATE_USER'), hasPrev: false, hasNext: false }),
//     DONE: (state) => ({ current: 'DONE', hasPrev: false, hasNext: false })
// },
// PREV:
// {
// SELECT_DOMAIN: ({ authorized, authenticated, formUsername }) =>
//     ({ current: 'SELECT_DOMAIN', hasPrev: false, hasNext: false }),
//     MAYBE_AUTHENTICATE: ({ authorized, authenticated, formUsername }) =>
//         ({ current: 'SELECT_DOMAIN', hasPrev: false, hasNext: false }),
//     CREATE_USER: ({ authorized, authenticated, formUsername }) =>
//         ({ current: backAuthorized(authorized, authenticated ? 'SELECT_DOMAIN' : 'MAYBE_AUTHENTICATE'), hasPrev: false, hasNext: false }),
//     DONE: ({ authorized, authenticated, formUsername }) => ({ current: 'DONE', hasPrev: false, hasNext: false })
// }
