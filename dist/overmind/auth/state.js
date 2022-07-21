import { derived } from "overmind";
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
export const AUTH_FLOW_STATUS = {
    ...PHONE_VERIFICATION_STATUS,
    ...AUTHENTICATION_STATUS,
};
const flows = {
    onboarding: {
        status: "",
        domainName: "",
        onboardingForm: {},
    },
};
export const newAuth = () => Object.assign({}, {
    initialized: false,
    status: AUTH_FLOW_STATUS.ANONYMOUS,
    error: null,
    authenticated: derived((s) => s.status >= AUTH_FLOW_STATUS.AUTHENTICATED),
    // token: "",
    // tokenType: "",
    tokens: {},
    timers: {
        authTimeout: 60,
        authTimeoutCancel: () => undefined,
        // timeToRefresh: 60,
        timeToRefreshCancel: () => undefined,
    },
    // fbUser: null,
});
export const state = newAuth();
// indicators: {
//     _inProgressCounter: 0,
//     inProgress: derived<{ _inProgressCounter: number }, {}, boolean>((state) => state._inProgressCounter > 0)
// },
// flows
//# sourceMappingURL=state.js.map