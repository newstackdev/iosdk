declare enum PHONE_VERIFICATION_STATUS {
    "ANONYMOUS" = 0,
    "REQUESTED" = 1,
    "RECEIVED" = 2,
    "SUBMITTED" = 3,
    "AUTHENTICATED" = 4
}
declare enum AUTHENTICATION_STATUS {
    "AUTHORIZING" = 6,
    "AUTHORIZED" = 7
}
export declare type AUTH_FLOW_STATUS_TYPE = PHONE_VERIFICATION_STATUS | AUTHENTICATION_STATUS;
export declare const AUTH_FLOW_STATUS: {
    [x: number]: string;
    AUTHORIZING: AUTHENTICATION_STATUS.AUTHORIZING;
    AUTHORIZED: AUTHENTICATION_STATUS.AUTHORIZED;
    ANONYMOUS: PHONE_VERIFICATION_STATUS.ANONYMOUS;
    REQUESTED: PHONE_VERIFICATION_STATUS.REQUESTED;
    RECEIVED: PHONE_VERIFICATION_STATUS.RECEIVED;
    SUBMITTED: PHONE_VERIFICATION_STATUS.SUBMITTED;
    AUTHENTICATED: PHONE_VERIFICATION_STATUS.AUTHENTICATED;
};
export declare type State = {
    initialized: boolean;
    status: AUTH_FLOW_STATUS_TYPE;
    error: null | {
        message: string;
        originalError: Error;
    };
    tokens: Record<string, {
        tokenType: string;
        token: string;
        logout: () => void;
    }>;
    authenticated: boolean;
    timers: {
        authTimeout: number;
        authTimeoutCancel: () => void;
        timeToRefresh: number;
        timeToRefreshCancel: () => void;
    };
};
export declare const newAuth: () => State;
export declare const state: State;
export {};
