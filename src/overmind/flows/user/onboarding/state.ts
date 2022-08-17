import { BaseState, Events, States, Wizard } from "./wizardStateMachine";
import { Statemachine } from "overmind";
import { UserCreateRequest } from "@newcoin-foundation/iosdk-newgraph-client-js";
import isEmpty from "lodash/isEmpty";

export enum DOMAIN_PRESALE_STEPS {
  SELECT_DOMAIN,
  AUTHENTICATE,
  CREATE_USER,
  DONE,
}
type usernameAvailability = "available" | "checking" | "unavailable" | "";

export interface IOnboarding {
  justCreated: boolean;
  legacyToken: string;
  inviteHashVerified: boolean;
  legacyUsername: string;
  isLegacyUpdateOngoing: boolean;
  progressedSteps: BaseState[] | [];
  formUsernameIsAvailable: usernameAvailability;
  form: Partial<UserCreateRequest & { couponCode?: string; inviteHash?: string }>;
  wizard: Statemachine<States, Events, BaseState>;
}

const cachedOnboarding: IOnboarding = JSON.parse(sessionStorage.getItem("cachedOnboarding") || "null");

const defaultState = {
  form: {} as Partial<UserCreateRequest & { couponCode?: string; inviteHash?: string }>,
  justCreated: false as boolean,
  inviteHashVerified: false,
  legacyToken: "",
  legacyUsername: "",
  isLegacyUpdateOngoing: false,
  formUsernameIsAvailable: "" as "available" | "checking" | "unavailable" | "",
  progressedSteps: [],
  wizard: Wizard.create(
    { current: "HASH_VERIFY", hasNext: false, hasPrev: false },
    { current: "HASH_VERIFY", hasNext: false, hasPrev: false },
  ),
};

export const state: IOnboarding = cachedOnboarding
  ? {
      ...defaultState,
      form: cachedOnboarding.form,
      wizard: Wizard.create(
        {
          current: "HASH_VERIFY",
          hasNext: !isEmpty(cachedOnboarding.form.inviteHash),
          hasPrev: false,
          nextLink: !isEmpty(cachedOnboarding.form.inviteHash) ? "" : "/signup/auth",
        },
        {
          current: "HASH_VERIFY",
          hasNext: !isEmpty(cachedOnboarding.form.inviteHash),
          hasPrev: false,
          nextLink: isEmpty(cachedOnboarding.form.inviteHash) ? "" : "/signup/auth",
        },
      ),
    }
  : defaultState;
