import { Action } from "../../../types";
import { STAKE_STEPS_TYPE, state } from "./state";
import { ValueOf } from "type-fest";

export const setOptions: Action<Partial<typeof state>["options"]> = ({ state }, upd) => {
  if (!upd) return;
  Object.keys(upd).forEach((k) => (state.flows.stake.options[k] = upd[k]));
};

export const setLatestMode: Action<{ stakingMode: STAKE_STEPS_TYPE }> = ({ state }, { stakingMode }) => {
  state.flows.stake.latestMode = stakingMode ?? -1;
};
