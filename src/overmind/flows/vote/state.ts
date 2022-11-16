import { ValueOf } from "type-fest/source/value-of";

export const VOTE_STEPS = {
  DISABLED: -1,
  ACTIVE: 0,
  SELECT: 1,
  LOCK: 2,
  CONFIRM: 3,
  VOTE: 4,
  DONE: 5,
};

export type VOTE_STEPS_TYPE = ValueOf<typeof VOTE_STEPS>;

export const state = {
  // helps position the container correctly when in nested modal/dropdown situations
  options: {
    votingContainer: null as any,
  },
  latestMode: -1 as VOTE_STEPS_TYPE,
};
