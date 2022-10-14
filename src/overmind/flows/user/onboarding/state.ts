import { BaseState, Events, States, Wizard } from "./wizardStateMachine";
import { Statemachine } from "overmind";
import { UserCreateRequest } from "@newstackdev/iosdk-newgraph-client-js";
import isEmpty from "lodash/isEmpty";

export enum DOMAIN_PRESALE_STEPS {
  SELECT_DOMAIN,
  AUTHENTICATE,
  CREATE_USER,
  DONE,
}
type usernameAvailability = "available" | "checking" | "unavailable" | "availableOnOpenSea" | "";

export interface IOnboarding {
  justCreated: boolean;
  legacyToken: string;
  inviteHashVerified: boolean;
  legacyUsername: string;
  isLegacyUpdateOngoing: boolean;
  progressedSteps: BaseState[] | [];
  formUsernameIsAvailable: usernameAvailability;
  metamaskFlow: boolean;
  form: Partial<UserCreateRequest & { couponCode?: string; inviteHash?: string }>;
  wizard: Statemachine<States, Events, BaseState>;
}

const defaultState = {
  form: {
    phone: window.sessionStorage.getItem("nlOnboardingPhone"),
    email: window.sessionStorage.getItem("emailForSignIn"),
  } as Partial<UserCreateRequest & { couponCode?: string; inviteHash?: string }>,
  justCreated: false as boolean,
  inviteHashVerified: false,
  legacyToken: JSON.parse(window.localStorage.getItem("legacyAuthToken") || "null")?.legacyToken || "",
  legacyUsername: "",
  metamaskFlow: false,
  isLegacyUpdateOngoing: window.sessionStorage.getItem("nlOnboardingLegacyUpdateOngoing") === "true" || false,
  formUsernameIsAvailable: "" as "available" | "checking" | "unavailable" | "availableOnOpenSea" | "",
  progressedSteps: [],
  wizard: Wizard.create(
    { current: "HASH_VERIFY", hasNext: false, hasPrev: false },
    { current: "HASH_VERIFY", hasNext: false, hasPrev: false },
  ),
};

export const state: IOnboarding = defaultState;
