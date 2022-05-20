import { IContext } from 'overmind';
import { createOvermind } from "overmind";
import { namespaced } from 'overmind/config'

import { merge } from 'lodash';
import { config as defaultConfig, Configuration } from "@newcoin-foundation/iosdk/dist/config";
import { standardModules } from '@newcoin-foundation/iosdk/dist/overmind/standardModules';

import { app } from "./app";
import { createStateHook, createActionsHook, createEffectsHook, createReactionHook } from 'overmind-react';

import { config as appConfig } from "../config";

const finalConfig = { state: merge({}, defaultConfig, appConfig) };
const config = namespaced({
    ...standardModules,
    config: finalConfig,
    ...app
});

export type State = typeof config["state"];
export type Context = IContext<typeof config>;

export type Action<T = undefined, R = void> = (
    context: Context,
    value: T
) => R | Promise<R>;

export const overmind = createOvermind(config, { delimiter: "!" });

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
export const useEffects = createEffectsHook<Context>();
export const useReaction = createReactionHook<Context>();