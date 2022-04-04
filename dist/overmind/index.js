"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReaction = exports.useEffects = exports.useActions = exports.useAppState = exports.overmind = void 0;
const overmind_1 = require("overmind");
const overmind_react_1 = require("overmind-react");
const internalTypes_1 = require("overmind/lib/internalTypes");
const overmind_2 = require("./overmind");
const overmind = (cfg) => {
    // const appConfig = { state: cfg };
    const om = (0, overmind_1.createOvermind)((0, overmind_2.config)(cfg || {}), { delimiter: "!" });
    om.eventHub.on(internalTypes_1.EventType.ACTION_START, (e) => {
        // if(/^(indicators|websockets)/.test(e.actionName))
        //     return;
        if (!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: 1 });
    });
    om.eventHub.on(internalTypes_1.EventType.ACTION_END, (e) => {
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
const isWatchable = (actionName) => /^(api|lists|auth|firebase|payments)/.test(actionName);
//# sourceMappingURL=index.js.map