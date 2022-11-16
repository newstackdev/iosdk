import { Context, config as omConfig } from "./overmind";
import { EventType, Execution } from "overmind/lib/internalTypes";
import { PartialConfiguration } from "../config";
import { createActionsHook, createEffectsHook, createReactionHook, createStateHook } from "overmind-react";
import { createOvermind } from "overmind";

export const overmind = (cfg?: PartialConfiguration) => {
  // const appConfig = { state: cfg };

  const isWatchable = cfg?.settings?.indicators?.isWatchable || (() => false);

  // (actionName: string) =>
  //     /^(api|lists|auth|firebase|payments|newcoin)/.test(actionName);

  const om = createOvermind(omConfig(cfg || {}), { delimiter: "!" });

  om.eventHub.on<EventType>(EventType.ACTION_START, (e: any) => {
    // if(/^(indicators|websockets)/.test(e.actionName))
    //     return;
    if (!isWatchable(e.actionName)) return;
    om.actions.indicators.isWorking({ actionName: e.actionName, n: 1 });
  });

  om.eventHub.on<EventType>(EventType.ACTION_END, (e: any) => {
    if (!isWatchable(e.actionName)) return;

    om.actions.indicators.isWorking({ actionName: e.actionName, n: -1 });
  });

  return om;
};

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();
