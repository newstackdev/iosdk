import EventEmitter from "events";
import { ValueOf } from "type-fest/source/value-of";

export const STAKE_STEPS = {
	DISABLED: -1,
	NODAO: 0,
	SELECT: 1,
	CONFIRM: 2,
	DONE: 3,
};

export type STAKE_STEPS_TYPE = ValueOf<typeof STAKE_STEPS>;

export const state = {
    // helps position the container correctly when in nested modal/dropdown situations
    options: {
        stakingContainer: null as any
    },
    latestMode: -1 as STAKE_STEPS_TYPE
}
