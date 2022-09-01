import { IContext } from 'overmind';
import { createOvermind } from "overmind";
import { namespaced } from 'overmind/config'

import { merge } from 'lodash';
import { config as defaultConfig, Configuration, PartialConfiguration } from "@newstackdev/iosdk/dist/config";
import { standardModules } from '@newstackdev/iosdk/dist/overmind/standardModules';

import app from "./app";
import { createStateHook, createActionsHook, createEffectsHook, createReactionHook } from 'overmind-react';

import { config as appConfig } from "../config";
import { EventType, Execution } from 'overmind/lib/internalTypes';

const finalConfig = { state: merge({}, defaultConfig, appConfig) };
const config = namespaced({
    ...standardModules,
    // ...omit(standardModules, ["flows"]),
    config: finalConfig,
    ...app
});

export type State = typeof config["state"];
export type Context = IContext<typeof config>;

export type SyncAction<T = undefined, R = void> = (
    context: Context,
    value: T
) => R;

export type Action<T = undefined, R = void> = (
    context: Context,
    value: T
) => R | Promise<R>;

export const overmind = () => {
    const om = createOvermind(config, { delimiter: "!" });

    const isWatchable = finalConfig.state?.settings?.indicators?.isWatchable || (() => false);

    om.eventHub.on<EventType>(EventType.ACTION_START, (e: any) => {
        if(!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: 1 });
    });
    
    om.eventHub.on<EventType>(EventType.ACTION_END, (e: any) => {
        if(!isWatchable(e.actionName))
            return;
        om.actions.indicators.isWorking({ actionName: e.actionName, n: -1 });
    });

    return om;
}

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();

