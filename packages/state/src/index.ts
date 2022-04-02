import { PartialConfiguration } from "@newcoin-foundation/core";
import { createOvermind } from "overmind";
import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from "overmind-react";
import { EventType, Execution } from "overmind/lib/internalTypes";
import { config as omConfig, Context } from "./overmind";

export const overmind = (cfg?: PartialConfiguration) => {
  // const appConfig = { state: cfg };

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

const isWatchable = (actionName: string) =>
  /^(api|lists|auth|firebase|payments)/.test(actionName);
