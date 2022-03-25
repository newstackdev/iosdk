import { Action } from "@newcoin-foundation/iosdk/src/types";

const test : Action = (({ state, actions }) => {
    // actions.custom.info();
    state.app.counter++;
});


export const app = {
    app: {
        actions: {
            test
        },
        state: {
            counter: 0
        },
        effects: {}
    }
};

export default app;