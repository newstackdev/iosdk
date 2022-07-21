import { Action } from "../../../types";
import { VOTE_STEPS_TYPE, state } from "./state";
import { ValueOf } from "type-fest";

export const setOptions: Action<Partial<typeof state>["options"]> = ({ state }, upd) => {
  if (!upd) return;
  Object.keys(upd).forEach((k) => (state.flows.stake.options[k] = upd[k]));
};

export const setLatestMode: Action<{ votingMode: VOTE_STEPS_TYPE }> = ({ state }, { votingMode }) => {
  state.flows.vote.latestMode = votingMode ?? -1;
};
