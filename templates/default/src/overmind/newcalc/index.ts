import { Action } from "../overmind";
import { isNum, last, lastNum } from "./utils";
   
const calcOps = {
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "×": (a: number, b: number) => a * b,
    "÷": (a: number, b: number) => a / b,
};

const calc = (r1, r2, op: keyof typeof calcOps) => calcOps[op](r1, r2);

const pushOp: Action<{ op: string }> = (({ state, actions }, { op }) => {
    const stack = state.newcalc.stack;
    let res = last(stack);
    if(!isNum(last(stack)))
        stack.pop();

    if(stack.length > 2) {
        const [a, sop, b] = stack;
        res = calc(parseFloat(a as string), parseFloat(b as string), sop as keyof typeof calcOps);
        stack.shift();
        stack.shift();
        stack.shift();

        stack.push(res);
        if(op != "=") {
            stack.push(op);
        }
    }
    else
        stack.push(op)
});

const updateDisplay: Action<{ arg: string, reset?: boolean }> = (({ state }, { arg }) => {
    const stack = state.newcalc.stack;

    const ls = last(stack);
    const curr = isNum(ls) || (ls == "=") ? stack.pop() : "";
    const v = (curr == "0") || (!isNum(curr)) ? "" : curr;
    const m = isNum(arg) ? arg : "";
    stack.push(v + m);
});
const reset: Action = (({ state }) => { state.newcalc.stack = []; });
const memo: Action = (({ state, actions }) => { 
    state.newcalc.memo = lastNum(state.newcalc.stack) || 0;
});
const memoRecall: Action = (({ actions, state }) => { 
    if(isNum(last(state.newcalc.stack)))
        state.newcalc.stack.pop();
        state.newcalc.stack.push(state.newcalc.memo);
    });

export const newcalc = {
    actions: {
        pushOp,
        updateDisplay,
        reset,
        memo, 
        memoRecall
    },
    state: {
        stack: [] as (number | string)[],
        ops: Object.keys(calcOps),
        memo: 0
    }
}