import { Action } from "../../iosdk/overmind/overmind";

const increment : Action = (({ state, actions }) => {
    state.newcounter.counter++;
});
const decrement : Action = (({ state, actions }) => {
    state.newcounter.counter--;
});
   
export const newcounter = {
    actions: {
        increment,
        decrement
    },
    state: {
        counter: 0
    },
    effects: {}
}