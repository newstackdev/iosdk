"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.onInitializeOvermind = exports.deepLikeStop = exports.deepLikeStep = exports.deepLikeStart = exports.deepLikeInit = void 0;
var VOTE_POLLING_INTERVAL = 50;
var VOTE_STEP = 4;
var PREVOTE_DELAY = 400;
var deepLikeInit = function (_a) {
    var state = _a.state, effects = _a.effects;
    if (state.flows.rating.isRating)
        return;
    console.log("Starting vote");
    state.flows.rating = __assign(__assign({}, state.flows.rating), { startTime: Date.now(), isRating: true, rated: false, value: 0 });
};
exports.deepLikeInit = deepLikeInit;
var deepLikeStart = function (_a, _b) {
    var actions = _a.actions, state = _a.state, effects = _a.effects;
    var event = _b.event;
    var rs = state.flows.rating;
    if (!rs.isRating)
        return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    if (rs.value)
        // rs.rated ||
        return;
    rs.rated = false;
    rs.value = 1;
    rs.startTime = Date.now();
    rs.interval.start(function () { return actions.flows.rating.deepLikeStep(); });
};
exports.deepLikeStart = deepLikeStart;
var deepLikeStep = function (_a) {
    var actions = _a.actions, state = _a.state, effects = _a.effects;
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
var deepLikeStop = function (_a) {
    var state = _a.state, effects = _a.effects;
    console.log("Stopping vote vote");
    state.flows.rating = __assign(__assign({}, state.flows.rating), { isRating: false, rated: !!state.flows.rating });
    state.flows.rating.interval.stop();
};
exports.deepLikeStop = deepLikeStop;
var onInitializeOvermind = function (_a) {
    var actions = _a.actions, state = _a.state;
    var nextValue = function () { };
    state.flows.rating.keyBinding.setEventHandlers({
        onKeyDown: function (event) { return actions.flows.rating.deepLikeStart({ event: event }); },
        onKeyUp: function () {
            actions.flows.rating.deepLikeStop();
        }
    });
};
exports.onInitializeOvermind = onInitializeOvermind;
var effects = {
    initInterval: function (ms) {
        var interval = null;
        var stop = function () {
            interval !== null && clearInterval(interval);
            interval = null;
            console.log("cleared interval");
        };
        var start = function (f) {
            interval === null && f && (interval = setInterval(f, ms));
            console.log("created interval");
        };
        return {
            start: start,
            stop: stop
        };
    },
    onceKeyBinding: function (keyCodes) {
        var onKeyUp;
        var onKeyDown;
        var keyUp = function (e) {
            var kbdEvent = e;
            if (!onKeyUp || !keyCodes.includes(kbdEvent.which || -1))
                return;
            var repeat = kbdEvent.repeat;
            if (!onKeyUp || repeat)
                return;
            onKeyUp && onKeyUp();
        };
        var keyDown = function (e) {
            var kbdEvent = e;
            if (!onKeyDown || !keyCodes.includes(kbdEvent.which || -1))
                return;
            // const repeat = kbdEvent.repeat;
            // if (repeat)
            //     return;
            console.log("keydown, repeat: " + (kbdEvent === null || kbdEvent === void 0 ? void 0 : kbdEvent.repeat));
            onKeyDown(e);
        };
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);
        var remove = function () {
            onKeyUp = undefined;
            onKeyDown = undefined;
        };
        var setEventHandlers = function (_a) {
            var oku = _a.onKeyUp, okd = _a.onKeyDown;
            remove();
            onKeyUp = oku;
            onKeyDown = okd;
        };
        return {
            // add,
            remove: remove,
            setEventHandlers: setEventHandlers
        };
    }
};
var state = {
    _value: 0,
    value: 0,
    startTime: 0,
    isRating: false,
    rated: false,
    interval: effects.initInterval(VOTE_POLLING_INTERVAL),
    keyBinding: effects.onceKeyBinding([32])
};
var actions = {
    deepLikeInit: exports.deepLikeInit,
    deepLikeStart: exports.deepLikeStart,
    deepLikeStep: exports.deepLikeStep,
    deepLikeStop: exports.deepLikeStop,
    onInitializeOvermind: exports.onInitializeOvermind
};
exports["default"] = {
    state: state,
    actions: actions,
    effects: effects
};
