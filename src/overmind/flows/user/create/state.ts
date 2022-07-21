import { ErrorResponse, UserCreateRequest } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { Wizard } from "./wizardStateMachine";
import { derived } from "overmind";

export enum DOMAIN_PRESALE_STEPS {
  SELECT_DOMAIN,
  AUTHENTICATE,
  CREATE_USER,
  DONE,
}

export const state = {
  form: {} as Partial<UserCreateRequest & { couponCode?: string }>,
  justCreated: false as boolean,
  legacyToken: "",
  legacyUsername: "",
  isLegacyUpdateOngoing: false,
  formUsernameIsAvailable: "" as "available" | "checking" | "unavailable" | "",
  wizard: Wizard.create(
    { current: "SELECT_DOMAIN", hasNext: false, hasPrev: false },
    { current: "SELECT_DOMAIN", hasNext: false, hasPrev: false },
  ),
  // {
  //     step: {
  //         current: DOMAIN_PRESALE_STEPS.SELECT_DOMAIN as DOMAIN_PRESALE_STEPS,
  //         next: derived((_state, rootState) => wizardStepNext({ state: rootState })),
  //         prev: derived((_state, rootState) => wizardStepPrev({ state: rootState })),
  //     }
  // }
};
