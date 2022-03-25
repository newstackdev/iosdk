"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var overmind_1 = require("overmind");
var exposeIndicators = function (_a, _b) {
    var state = _a.state;
    var actionName = _b.actionName;
    var st = state.indicators;
    st.isWorking = st._isWorking > 0;
    var sp = st._specific[actionName];
    // if(actionName == "api.post.attachToMoods")
    console.log("indicators.".concat(actionName), sp);
    st.specific[actionName] = sp;
    // console.log(`indicators.specific ${actionName} ${st._specific[actionName]}`)
};
var isWorkingActionDebounced = (0, overmind_1.pipe)((0, overmind_1.debounce)(300), exposeIndicators);
var isWorkingAction = function (_a, _b) {
    var actions = _a.actions, state = _a.state;
    var actionName = _b.actionName, n = _b.n;
    var st = state.indicators;
    var __isWorking = st._isWorking + ((n > 0) ? 1 : -1);
    var _isWorking = Math.max(__isWorking, 0);
    var isWorking = _isWorking > 0;
    var ___specific = (st._specific[actionName] || 0) + ((n > 0) ? 1 : -1);
    var _specific = Math.max(___specific, 0);
    // const isWorkingSpecific = _specific > 0;
    st.isWorking = isWorking;
    st._isWorking = _isWorking;
    st._specific[actionName] = _specific;
    exposeIndicators({ state: state }, { actionName: actionName });
    // if(_isWorking > 0 || _specific > 0)
    //     exposeIndicators({ state }, { actionName })
    // else
    //     actions.indicators.isWorkingActionDebounced({ actionName })
    // set(st._specific, actionName, _specific);
    // set(st.specific, actionName, specific);
};
// const _isWorkingReaction: Action<number> =
//     when(
//         (_, w) => {
//             console.log("isrowking", w);
//             return w > 0
//         },
//         {
//             true: ({ stae }: Context) => {
//                 state.indicators.isWorking = true;
//                 console.log("isWorking", state.indicators.isWorking)
//             },
//             false: pipe(
//                 debounce(500),
//                 ({ state }: Context) => {
//                     state.indicators.isWorking = state.indicators._isWorking <= 0;
//                     console.log("isWorking", state.indicators.isWorking)
//                 }
//             )
//         });
// const onInitializeOvermind: Action = ({ reaction, actions }) => {
//     reaction(
//         (st) => st.indicators._isWorking,
//         actions.indicators._isWorkingReaction
//     )
// }
exports.default = {
    state: {
        _isWorking: 0,
        isWorking: true,
        _specific: {},
        specific: {}
    },
    actions: {
        // onInitializeOvermind,
        isWorking: isWorkingAction,
        isWorkingActionDebounced: isWorkingActionDebounced
    }
};
//# sourceMappingURL=index.js.map