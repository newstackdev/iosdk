"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInitializeOvermind = exports.deepLikeStop = exports.deepLikeStep = exports.deepLikeStart = exports.deepLikeInit = void 0;
const VOTE_POLLING_INTERVAL = 50;
const VOTE_STEP = 4;
const PREVOTE_DELAY = 400;
const deepLikeInit = ({ state, effects }) => {
    if (state.flows.rating.isRating)
        return;
    console.log("Starting vote");
    state.flows.rating = {
        ...state.flows.rating,
        startTime: Date.now(),
        isRating: true,
        rated: false,
        value: 0
    };
};
exports.deepLikeInit = deepLikeInit;
const deepLikeStart = ({ actions, state, effects }, { event }) => {
    const rs = state.flows.rating;
    if (!rs.isRating)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    if (rs.value) // rs.rated || 
        return;
    rs.rated = false;
    rs.value = 1;
    rs.startTime = Date.now();
    rs.interval.start(() => actions.flows.rating.deepLikeStep());
};
exports.deepLikeStart = deepLikeStart;
const deepLikeStep = ({ actions, state, effects }) => {
    if (Date.now() - state.flows.rating.startTime < PREVOTE_DELAY)
        return;
    if (!state.flows.rating.isRating)
        return;
    if (state.flows.rating.value < 100)
        state.flows.rating.value = Math.min(state.flows.rating.value + VOTE_STEP, 100);
    if (state.flows.rating.value === 100) {
        actions.flows.rating.deepLikeStop();
    }
};
exports.deepLikeStep = deepLikeStep;
const deepLikeStop = ({ state, effects }) => {
    console.log("Stopping vote vote");
    state.flows.rating = {
        ...state.flows.rating,
        isRating: false,
        rated: !!state.flows.rating,
    };
    state.flows.rating.interval.stop();
};
exports.deepLikeStop = deepLikeStop;
const onInitializeOvermind = ({ actions, state }) => {
    const nextValue = () => {
    };
    state.flows.rating.keyBinding.setEventHandlers({
        onKeyDown: (event) => actions.flows.rating.deepLikeStart({ event }),
        onKeyUp: () => {
            actions.flows.rating.deepLikeStop();
        }
    });
};
exports.onInitializeOvermind = onInitializeOvermind;
const effects = {
    initInterval: (ms) => {
        let interval = null;
        const stop = () => {
            (interval !== null && clearInterval(interval));
            interval = null;
            console.log("cleared interval");
        };
        const start = (f) => {
            interval === null && f && (interval = setInterval(f, ms));
            console.log("created interval");
        };
        return {
            start,
            stop,
        };
    },
    onceKeyBinding: (keyCodes) => {
        let onKeyUp;
        let onKeyDown;
        const keyUp = (e) => {
            const kbdEvent = e;
            if (!onKeyUp || !keyCodes.includes(kbdEvent.which || -1))
                return;
            const repeat = kbdEvent.repeat;
            if (!onKeyUp || repeat)
                return;
            onKeyUp && onKeyUp();
        };
        const keyDown = (e) => {
            const kbdEvent = e;
            if (!onKeyDown || !keyCodes.includes(kbdEvent.which || -1))
                return;
            // const repeat = kbdEvent.repeat;
            // if (repeat)
            //     return;
            console.log("keydown, repeat: " + kbdEvent?.repeat);
            onKeyDown(e);
        };
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        const remove = () => {
            onKeyUp = undefined;
            onKeyDown = undefined;
        };
        const setEventHandlers = ({ onKeyUp: oku, onKeyDown: okd }) => {
            remove();
            onKeyUp = oku;
            onKeyDown = okd;
        };
        return {
            // add,
            remove,
            setEventHandlers
            // bindTouchClick
        };
    }
};
const state = {
    _value: 0,
    value: 0,
    startTime: 0,
    isRating: false,
    rated: false,
    interval: effects.initInterval(VOTE_POLLING_INTERVAL),
    keyBinding: effects.onceKeyBinding([32])
};
const actions = {
    deepLikeInit: exports.deepLikeInit,
    deepLikeStart: exports.deepLikeStart,
    deepLikeStep: exports.deepLikeStep,
    deepLikeStop: exports.deepLikeStop,
    onInitializeOvermind: exports.onInitializeOvermind
};
exports.default = {
    state,
    actions,
    effects
};
//# sourceMappingURL=index.js.map