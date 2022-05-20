import { createOvermind } from 'overmind';
import { createStateHook, createActionsHook, createEffectsHook, createReactionHook } from 'overmind-react';
import { EventType } from 'overmind/lib/internalTypes';
import { config as omConfig } from './overmind';
export const overmind = (cfg) => {
    // const appConfig = { state: cfg };
    const om = createOvermind(omConfig(cfg || {}), { delimiter: "!" });
    om.eventHub.on(EventType.ACTION_START, (e) => {
        // if(/^(indicators|websockets)/.test(e.actionName))
        //     return;
        if (!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: 1 });
    });
    om.eventHub.on(EventType.ACTION_END, (e) => {
        if (!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: -1 });
    });
    return om;
};
export const useAppState = createStateHook();
export const useActions = createActionsHook();
export const useEffects = createEffectsHook();
export const useReaction = createReactionHook();
const isWatchable = (actionName) => /^(api|lists|auth|firebase|payments|newcoin)/.test(actionName);
//# sourceMappingURL=index.js.map