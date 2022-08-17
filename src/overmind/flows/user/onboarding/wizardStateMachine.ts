import { Configuration } from "../../../../config";
import { UserReadPrivateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { isEmpty } from "lodash";
import { statemachine } from "overmind";

export const routesToCreateWizard = {
  "/": "HASH_VERIFY",
  "/signup/auth": "AUTHENTICATE",
  "/signup/domain": "SELECT_DOMAIN",
  "/signup/create": "CREATE_USER",
  "/signup/subscribe": "SUBSCRIBE",
};

export type States =
  | {
      current: "HASH_VERIFY";
      hasNext: boolean;
      hasPrev: false;
      nextLink?: string;
    }
  | {
      current: "SELECT_DOMAIN";
      hasNext: boolean;
      hasPrev: boolean;
      nextLink?: string;
    }
  | {
      current: "AUTHENTICATE";
      hasNext: boolean;
      hasPrev: boolean;
      nextLink?: string;
    }
  | {
      current: "SUBSCRIBE";
      hasNext: boolean;
      hasPrev: boolean;
      nextLink?: string;
    }
  | {
      current: "CREATE_USER";
      hasNext: boolean;
      hasPrev: boolean;
      nextLink?: string;
    }
  | {
      current: "DONE";
      hasNext: false;
      hasPrev: false;
      nextLink?: string;
    };

export type WizardInput = {
  authenticated: boolean;
  inviteHashVerified: boolean;
  authorized: boolean;
  inviteHash: string;
  subscribed: boolean;
  formUsername: string;
  formUsernameIsAvailable: string;
  user: UserReadPrivateResponse | null;
  legacyToken: string;
  isLegacyUpdateOngoing: boolean;
  featureFlags: Configuration["featureFlags"];
  couponCode: string;
  formPhone: string | undefined;
};
type WizardInputToStateMap = (input: WizardInput) => States;

export type BaseState = {
  current: string;
  nextLink?: string;
  hasNext: boolean;
  hasPrev: boolean;
};

export type Events =
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

const defaults: Record<string, (d?: { hasNext: boolean; link?: string }) => States> = {
  HASH_VERIFY: (d?: { hasNext: boolean; link?: string }) => ({
    current: "HASH_VERIFY",
    hasNext: !!d?.hasNext,
    hasPrev: false,
    nextLink: d?.link,
  }),
  AUTHENTICATE: (d?: { link?: string }) => ({
    current: "AUTHENTICATE",
    hasNext: false,
    hasPrev: true,
    nextLink: d?.link,
  }),
  SELECT_DOMAIN: (d?: { link?: string }) => ({
    current: "SELECT_DOMAIN",
    hasNext: false,
    hasPrev: false,
    nextLink: d?.link,
  }),
  DONE: () => ({ current: "DONE", hasNext: false, hasPrev: false }),
  CREATE_USER: (d?: { hasNext: boolean; link?: string }) => ({
    current: "CREATE_USER",
    hasNext: !!d?.hasNext,
    hasPrev: true,
    nextLink: d?.link,
  }),
  SUBSCRIBE: (d?: { link?: string }) => ({ current: "SUBSCRIBE", hasNext: true, hasPrev: true, nextLink: "/signup/create" }),
};

// export type WizardMachine = statemachine<States, Events, BaseState>;
export const Wizard = statemachine<States, Events, BaseState>({
  HASH_VERIFY: {
    NEXT: ({ inviteHash, inviteHashVerified }) =>
      inviteHash && inviteHashVerified ? defaults.AUTHENTICATE() : defaults.HASH_VERIFY(),
    UPDATE: ({ inviteHash, isLegacyUpdateOngoing, inviteHashVerified }) => {
      return isLegacyUpdateOngoing
        ? defaults.SELECT_DOMAIN()
        : ({
            ...defaults.HASH_VERIFY(),
            hasNext: !isEmpty(inviteHash),
            nextLink: isEmpty(inviteHash) && !inviteHashVerified ? undefined : "/signup/auth",
          } as States);
    },
  },
  AUTHENTICATE: {
    NEXT: ({ legacyToken, authenticated, authorized, user }) => {
      if (isEmpty(legacyToken)) {
        if (!authorized || (!authenticated && user?.status !== "invited")) {
          return defaults.AUTHENTICATE();
        }
        return defaults.SELECT_DOMAIN();
      }
      return defaults.CREATE_USER();
    },
    UPDATE: ({ authorized, authenticated, isLegacyUpdateOngoing, user }) => {
      return (
        authorized && !isLegacyUpdateOngoing && user?.status !== "invited"
          ? defaults.DONE()
          : authenticated && !user?.subscriptionStatus?.startsWith("io-domain-sale")
          ? defaults.SELECT_DOMAIN()
          : {
              ...defaults.AUTHENTICATE(),
              nextLink:
                isLegacyUpdateOngoing || user?.subscriptionStatus?.startsWith("io-domain-sale")
                  ? "/signup/create"
                  : "/signup/domain",
            }
      ) as States;
    },
  },
  SELECT_DOMAIN: {
    NEXT: ({ authenticated, subscribed, isLegacyUpdateOngoing, formUsername, authorized }) => {
      return authenticated
        ? subscribed || isLegacyUpdateOngoing || formUsername.replace(/\.io$/, "").length > 5
          ? defaults.CREATE_USER()
          : defaults.SUBSCRIBE()
        : authorized
        ? defaults.DONE()
        : defaults.AUTHENTICATE();
    },
    UPDATE: ({
      authorized,
      authenticated,
      formUsername,
      formUsernameIsAvailable,
      user,
      featureFlags,
      subscribed,
      isLegacyUpdateOngoing,
    }) => {
      return authorized && !["imported"].includes(user?.status || "") && !isLegacyUpdateOngoing
        ? defaults.DONE()
        : !isLegacyUpdateOngoing && authenticated && subscribed
        ? defaults.CREATE_USER()
        : ({
            ...defaults.SELECT_DOMAIN(),
            hasNext:
              // (formUsername.length === 12) &&
              (featureFlags.onboarding.premiumDomains || formUsername.replace(/\.io$/, "").length > 5) &&
              formUsernameIsAvailable === "available",
            nextLink:
              isLegacyUpdateOngoing || !(authorized || authenticated)
                ? "/signup/auth"
                : subscribed || isLegacyUpdateOngoing || formUsername.replace(/\.io$/, "").length > 5
                ? "/signup/create"
                : "/signup/subscribe",
          } as States);
    },
  },
  SUBSCRIBE: {
    NEXT: ({ subscribed }) => (subscribed ? defaults.CREATE_USER() : defaults.SUBSCRIBE()),
    PREV: ({ formUsername }) => ({ ...defaults.SELECT_DOMAIN(), hasNext: !!formUsername } as States),
    UPDATE: ({ authorized, authenticated, subscribed, user, formUsername, featureFlags, couponCode }) => {
      return (
        authorized && authenticated
          ? defaults.DONE()
          : subscribed ||
            (user?.id && (!featureFlags.onboarding.premiumDomains || formUsername.replace(/\.io$/, "").length > 5)) ||
            couponCode === "NEWFORUM-100-DROP1307"
          ? defaults.CREATE_USER()
          : defaults.SUBSCRIBE()
      ) as States;
    },
  },

  CREATE_USER: {
    NEXT: () => defaults.DONE(),
    PREV: ({ authenticated, formUsername }) => {
      return (
        authenticated ? { ...defaults.SELECT_DOMAIN(), hasNext: !!formUsername } : { ...defaults.AUTHENTICATE(), hasNext: false }
      ) as States;
    },
    UPDATE: ({ authorized, authenticated, inviteHashVerified, user, formUsername, isLegacyUpdateOngoing }) => {
      return !isLegacyUpdateOngoing && (!inviteHashVerified || !authenticated)
        ? defaults.HASH_VERIFY()
        : authorized && ["registered", "admitted"].includes(user?.status || "") && !isLegacyUpdateOngoing
        ? defaults.DONE()
        : (defaults.CREATE_USER({ hasNext: !!formUsername, link: "/" }) as States);
    },
  },
  DONE: {
    UPDATE: ({ authorized }) => {
      return authorized ? defaults.DONE() : defaults.SELECT_DOMAIN();
    },
  },
});
