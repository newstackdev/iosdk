import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { statemachine } from "overmind";
import user from "..";

type States =
  | {
      current: "SELECT_DOMAIN";
      hasNext: boolean;
      hasPrev: false;
    }
  | {
      current: "AUTHENTICATE";
      hasNext: boolean;
      hasPrev: boolean;
    }
  | {
      current: "SUBSCRIBE";
      hasNext: boolean;
      hasPrev: boolean;
    }
  | {
      current: "CREATE_USER";
      hasNext: boolean;
      hasPrev: boolean;
    }
  | {
      current: "DONE";
      hasNext: false;
      hasPrev: false;
    };

export type WizardInput = {
  authenticated: boolean;
  authorized: boolean;
  subscribed: boolean;
  formUsername: string;
  formUsernameIsAvailable: string;
  user: UserReadPrivateResponse | null;
  legacyToken: string;
};
type WizardInputToStateMap = (input: WizardInput) => States;

type BaseState = {
  current: string;
  hasNext: boolean;
  hasPrev: boolean;
};

type Events =
  | {
      type: "NEXT";
      data: WizardInput;
    }
  | {
      type: "PREV";
      data: WizardInput;
    }
  | {
      type: "UPDATE";
      data: WizardInput;
    };

// const forwAuthorized = (authorized: boolean, step: States): States => authorized ? { current: 'DONE', hasNext: false, hasPrev: false } : step;
// const forwAuthenticated = (authenticated: boolean, step: States): States => authenticated ? { current: 'CREATE_USER', hasNext: false, hasPrev: true } : step;

const defaults: Record<string, (d?: { hasNext: boolean }) => States> = {
  SELECT_DOMAIN: () => ({
    current: "SELECT_DOMAIN",
    hasNext: false,
    hasPrev: false,
  }),
  DONE: () => ({ current: "DONE", hasNext: false, hasPrev: false }),
  CREATE_USER: (d?: { hasNext: boolean }) => ({
    current: "CREATE_USER",
    hasNext: !!d?.hasNext,
    hasPrev: true,
  }),
  SUBSCRIBE: () => ({ current: "SUBSCRIBE", hasNext: false, hasPrev: true }),
  AUTHENTICATE: () => ({
    current: "AUTHENTICATE",
    hasNext: false,
    hasPrev: true,
  }),
};

// export type WizardMachine = statemachine<States, Events, BaseState>;
export const Wizard = statemachine<States, Events, BaseState>({
  SUBSCRIBE: {
    NEXT: ({ subscribed }) =>
      subscribed ? defaults.CREATE_USER() : defaults.SUBSCRIBE(),
    PREV: ({ formUsername }) =>
      ({ ...defaults.SELECT_DOMAIN(), hasNext: !!formUsername } as States),
    UPDATE: ({ authorized, authenticated, subscribed, user, formUsername }) => {
      return (
        authorized
          ? defaults.DONE()
          : subscribed || user || formUsername.length <= 5
          ? defaults.CREATE_USER()
          : authenticated
          ? defaults.SUBSCRIBE()
          : defaults.SELECT_DOMAIN()
      ) as States;
    },
  },
  SELECT_DOMAIN: {
    NEXT: ({ authenticated, subscribed, user, legacyToken }) => {
      return authenticated
        ? subscribed || legacyToken
          ? defaults.CREATE_USER()
          : defaults.SUBSCRIBE()
        : defaults.AUTHENTICATE();
    },
    UPDATE: ({ authorized, formUsername, formUsernameIsAvailable, user }) => {
      return authorized && !["imported"].includes(user?.status || "")
        ? defaults.DONE()
        : ({
            ...defaults.SELECT_DOMAIN(),
            hasNext:
              // (formUsername.length === 12) &&
              formUsername.replace(/\.io$/, "").length >= 5 &&
              formUsernameIsAvailable === "available",
          } as States);
    },
  },
  AUTHENTICATE: {
    NEXT: ({ user, legacyToken }) =>
      legacyToken ? defaults.CREATE_USER() : defaults.SUBSCRIBE(),
    PREV: ({ formUsername }) =>
      ({ ...defaults.SELECT_DOMAIN(), hasNext: !!formUsername } as States),
    UPDATE: ({ authorized, authenticated, legacyToken }) => {
      return (
        authorized && !legacyToken
          ? defaults.DONE()
          : authenticated
          ? legacyToken
            ? defaults.CREATE_USER()
            : defaults.SUBSCRIBE()
          : defaults.AUTHENTICATE()
      ) as States;
    },
  },
  CREATE_USER: {
    NEXT: () => defaults.DONE(),
    PREV: ({ authenticated, formUsername }) => {
      return (
        authenticated
          ? { ...defaults.SELECT_DOMAIN(), hasNext: !!formUsername }
          : { ...defaults.AUTHENTICATE(), hasNext: false }
      ) as States;
    },
    UPDATE: ({ authorized, authenticated, user, formUsername }) => {
      return !authenticated
        ? defaults.SELECT_DOMAIN()
        : authorized && ["registered", "admitted"].includes(user?.status || "")
        ? defaults.DONE()
        : (defaults.CREATE_USER({ hasNext: !!formUsername }) as States);
    },
  },
  DONE: {
    UPDATE: ({ authorized }) => {
      return authorized ? defaults.DONE() : defaults.SELECT_DOMAIN();
    },
  },
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
