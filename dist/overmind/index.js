"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReaction = exports.useEffects = exports.useActions = exports.useAppState = exports.overmind = void 0;
var overmind_1 = require("overmind");
var overmind_react_1 = require("overmind-react");
var internalTypes_1 = require("overmind/lib/internalTypes");
var overmind_2 = require("./overmind");
var overmind = function (cfg) {
    // const appConfig = { state: cfg };
    var om = (0, overmind_1.createOvermind)((0, overmind_2.config)(cfg || {}), { delimiter: "!" });
    om.eventHub.on(internalTypes_1.EventType.ACTION_START, function (e) {
        // if(/^(indicators|websockets)/.test(e.actionName))
        //     return;
        if (!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: 1 });
    });
    om.eventHub.on(internalTypes_1.EventType.ACTION_END, function (e) {
        if (!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: -1 });
    });
    return om;
};
exports.overmind = overmind;
exports.useAppState = (0, overmind_react_1.createStateHook)();
exports.useActions = (0, overmind_react_1.createActionsHook)();
exports.useEffects = (0, overmind_react_1.createEffectsHook)();
exports.useReaction = (0, overmind_react_1.createReactionHook)();
var isWatchable = function (actionName) {
    return /^(api|lists|auth|firebase|payments)/.test(actionName);
};
//# sourceMappingURL=index.js.map