import { Action } from "../../../types";
import { state } from "./state";

export const setOptions: Action<Partial<typeof state>["options"]> = ({ state }, upd) => {
    if(!upd)
        return;
    Object.keys(upd)
        .forEach(k => state.flows.stake.options[k] = upd[k]);
}

export const setLatestMode: Action<{ stakingMode: number }> = ({ state }, { stakingMode }) => {
    state.flows.stake.latestMode = stakingMode ?? -1;
}