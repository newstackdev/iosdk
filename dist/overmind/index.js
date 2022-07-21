import { config as omConfig } from "./overmind";
import { EventType } from "overmind/lib/internalTypes";
import { createActionsHook, createEffectsHook, createReactionHook, createStateHook } from "overmind-react";
import { createOvermind } from "overmind";
export const overmind = (cfg) => {
    // const appConfig = { state: cfg };
    const isWatchable = cfg?.settings?.indicators?.isWatchable || (() => false);
    // (actionName: string) =>
    //     /^(api|lists|auth|firebase|payments|newcoin)/.test(actionName);
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
//# sourceMappingURL=index.js.map