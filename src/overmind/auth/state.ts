import { MoodReadResponse, UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { Link } from "../../types";
import history from "../../history";
import { User, UserCredential } from "@firebase/auth";
import { derived } from "overmind";

enum PHONE_VERIFICATION_STATUS {
    "ANONYMOUS" = 0,
    "REQUESTED" = 1,
    "RECEIVED" = 2,
    "SUBMITTED" = 3,
    "AUTHENTICATED" = 4
};

enum AUTHENTICATION_STATUS {
    "AUTHORIZING" = 6,
    "AUTHORIZED" = 7
}

export type AUTH_FLOW_STATUS_TYPE = PHONE_VERIFICATION_STATUS | AUTHENTICATION_STATUS;
export const AUTH_FLOW_STATUS = { ...PHONE_VERIFICATION_STATUS, ...AUTHENTICATION_STATUS };

const flows = {
    onboarding: {
        status: "",
        domainName: "",
        onboardingForm: <UserReadPrivateResponse>{}
    }
}

export type State = {
    initialized: boolean,
    status: AUTH_FLOW_STATUS_TYPE
    error: null | { message: string, originalError: Error }

    // token: string
    // tokenType: string
    tokens: Record<string, { tokenType: string, token: string, logout: () => void }>,

    // newlife
    // authorized: boolean
    // admitted: boolean

    // firebase
    authenticated: boolean
    // fbUser: User | null, //UserCredential | {},
    timers: {
        authTimeout: number // used during phone confirmation flow to track expiring requests
        authTimeoutCancel: () => void
        timeToRefresh: number // refresh
        timeToRefreshCancel: () => void
    },
    // userDisplayHandler: string
}

export const newAuth = () => Object.assign({}, {
    initialized: false,
    status: AUTH_FLOW_STATUS.ANONYMOUS,
    error: null,
    authenticated: derived((s: State) => s.status >= AUTH_FLOW_STATUS.AUTHENTICATED),
    // token: "",
    // tokenType: "",
    tokens: {},
    timers: {
        authTimeout: 60,
        authTimeoutCancel: (() => undefined),
        // timeToRefresh: 60,
        timeToRefreshCancel: (() => undefined)
    }
    // fbUser: null,

} as State);

export const state = newAuth();

// indicators: {
//     _inProgressCounter: 0,
//     inProgress: derived<{ _inProgressCounter: number }, {}, boolean>((state) => state._inProgressCounter > 0)
// },
// flows