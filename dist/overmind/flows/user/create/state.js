import { Wizard } from "./wizardStateMachine";
export var DOMAIN_PRESALE_STEPS;
(function (DOMAIN_PRESALE_STEPS) {
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["SELECT_DOMAIN"] = 0] = "SELECT_DOMAIN";
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["AUTHENTICATE"] = 1] = "AUTHENTICATE";
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["CREATE_USER"] = 2] = "CREATE_USER";
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["DONE"] = 3] = "DONE";
})(DOMAIN_PRESALE_STEPS || (DOMAIN_PRESALE_STEPS = {}));
export const state = {
    form: {},
    justCreated: false,
    legacyToken: "",
    legacyUsername: "",
    isLegacyUpdateOngoing: false,
    formUsernameIsAvailable: "",
    wizard: Wizard.create({ current: "SELECT_DOMAIN", hasNext: false, hasPrev: false }, { current: "SELECT_DOMAIN", hasNext: false, hasPrev: false }),
    // {
    //     step: {
    //         current: DOMAIN_PRESALE_STEPS.SELECT_DOMAIN as DOMAIN_PRESALE_STEPS,
    //         next: derived((_state, rootState) => wizardStepNext({ state: rootState })),
    //         prev: derived((_state, rootState) => wizardStepPrev({ state: rootState })),
    //     }
    // }
};
//# sourceMappingURL=state.js.map