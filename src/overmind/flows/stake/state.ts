import EventEmitter from "events";

export const state = {
    // helps position the container correctly when in nested modal/dropdown situations
    options: {
        stakingContainer: null as any
    },
    latestMode: -1 as number
}
