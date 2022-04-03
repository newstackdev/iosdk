"use strict";
exports.__esModule = true;
exports.state = exports.DOMAIN_PRESALE_STEPS = void 0;
var wizardStateMachine_1 = require("./wizardStateMachine");
var DOMAIN_PRESALE_STEPS;
(function (DOMAIN_PRESALE_STEPS) {
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["SELECT_DOMAIN"] = 0] = "SELECT_DOMAIN";
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["AUTHENTICATE"] = 1] = "AUTHENTICATE";
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["CREATE_USER"] = 2] = "CREATE_USER";
    DOMAIN_PRESALE_STEPS[DOMAIN_PRESALE_STEPS["DONE"] = 3] = "DONE";
})(DOMAIN_PRESALE_STEPS = exports.DOMAIN_PRESALE_STEPS || (exports.DOMAIN_PRESALE_STEPS = {}));
exports.state = {
    form: {},
    justCreated: false,
    legacyToken: "",
    formUsernameIsAvailable: "",
    wizard: wizardStateMachine_1.Wizard.create({ current: "SELECT_DOMAIN", hasNext: false, hasPrev: false }, { current: "SELECT_DOMAIN", hasNext: false, hasPrev: false })
};
