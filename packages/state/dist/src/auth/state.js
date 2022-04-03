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
exports.state = exports.newAuth = exports.AUTH_FLOW_STATUS = void 0;
var overmind_1 = require("overmind");
var PHONE_VERIFICATION_STATUS;
(function (PHONE_VERIFICATION_STATUS) {
    PHONE_VERIFICATION_STATUS[PHONE_VERIFICATION_STATUS["ANONYMOUS"] = 0] = "ANONYMOUS";
    PHONE_VERIFICATION_STATUS[PHONE_VERIFICATION_STATUS["REQUESTED"] = 1] = "REQUESTED";
    PHONE_VERIFICATION_STATUS[PHONE_VERIFICATION_STATUS["RECEIVED"] = 2] = "RECEIVED";
    PHONE_VERIFICATION_STATUS[PHONE_VERIFICATION_STATUS["SUBMITTED"] = 3] = "SUBMITTED";
    PHONE_VERIFICATION_STATUS[PHONE_VERIFICATION_STATUS["AUTHENTICATED"] = 4] = "AUTHENTICATED";
})(PHONE_VERIFICATION_STATUS || (PHONE_VERIFICATION_STATUS = {}));
var AUTHENTICATION_STATUS;
(function (AUTHENTICATION_STATUS) {
    AUTHENTICATION_STATUS[AUTHENTICATION_STATUS["AUTHORIZING"] = 6] = "AUTHORIZING";
    AUTHENTICATION_STATUS[AUTHENTICATION_STATUS["AUTHORIZED"] = 7] = "AUTHORIZED";
})(AUTHENTICATION_STATUS || (AUTHENTICATION_STATUS = {}));
exports.AUTH_FLOW_STATUS = __assign(__assign({}, PHONE_VERIFICATION_STATUS), AUTHENTICATION_STATUS);
var flows = {
    onboarding: {
        status: "",
        domainName: "",
        onboardingForm: {}
    }
};
var newAuth = function () {
    return Object.assign({}, {
        initialized: false,
        status: exports.AUTH_FLOW_STATUS.ANONYMOUS,
        error: null,
        authenticated: (0, overmind_1.derived)(function (s) { return s.status >= exports.AUTH_FLOW_STATUS.AUTHENTICATED; }),
        // token: "",
        // tokenType: "",
        tokens: {},
        timers: {
            authTimeout: 60,
            authTimeoutCancel: function () { return undefined; },
            // timeToRefresh: 60,
            timeToRefreshCancel: function () { return undefined; }
        }
    });
};
exports.newAuth = newAuth;
exports.state = (0, exports.newAuth)();
// indicators: {
//     _inProgressCounter: 0,
//     inProgress: derived<{ _inProgressCounter: number }, {}, boolean>((state) => state._inProgressCounter > 0)
// },
// flows
