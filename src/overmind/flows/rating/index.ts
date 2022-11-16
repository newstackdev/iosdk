import { Action, EventHandler, Timer } from "../../../types";
const VOTE_POLLING_INTERVAL = 50;
const VOTE_STEP = 4;
const PREVOTE_DELAY = 400;

export const deepLikeInit: Action = ({ state, effects }) => {
  if (state.flows.rating.isRating) return;

  console.log("Starting vote");

  state.flows.rating = {
    ...state.flows.rating,
    startTime: Date.now(),
    isRating: true,
    rated: false,
    value: 0,
  };
};

export const deepLikeStart: Action<{ event?: Event }> = ({ actions, state, effects }, { event }) => {
  const rs = state.flows.rating;
  if (!rs.isRating) return;

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

  rs.interval.start(() => actions.flows.rating.deepLikeStep());
};

export const deepLikeStep: Action = ({ actions, state, effects }) => {
  if (Date.now() - state.flows.rating.startTime < PREVOTE_DELAY) return;

  if (!state.flows.rating.isRating) return;

  if (state.flows.rating.value < 100) state.flows.rating.value = Math.min(state.flows.rating.value + VOTE_STEP, 100);

  if (state.flows.rating.value === 100) {
    actions.flows.rating.deepLikeStop();
  }
};
export const deepLikeStop: Action = ({ state, effects }) => {
  console.log("Stopping vote vote");

  state.flows.rating = {
    ...state.flows.rating,

    isRating: false,
    rated: !!state.flows.rating,
  };

  state.flows.rating.interval.stop();
};

export const onInitializeOvermind: Action = ({ actions, state }) => {
  const nextValue = () => {};

  state.flows.rating.keyBinding.setEventHandlers({
    onKeyDown: (event) => actions.flows.rating.deepLikeStart({ event }),
    onKeyUp: () => {
      actions.flows.rating.deepLikeStop();
    },
  });
};

type BindKeyParams = { onKeyUp: EventHandler; onKeyDown: EventHandler };

const effects = {
  initInterval: (ms: number) => {
    let interval: Timer | null = null;

    const stop = () => {
      interval !== null && clearInterval(interval);
      interval = null;
      console.log("cleared interval");
    };
    const start = (f: EventHandler) => {
      interval === null && f && (interval = setInterval(f, ms));
      console.log("created interval");
    };

    return {
      start,
      stop,
    };
  },
  onceKeyBinding: (keyCodes: number[]) => {
    let onKeyUp: EventHandler | undefined;
    let onKeyDown: EventHandler | undefined;

    const keyUp: EventHandler = (e) => {
      const kbdEvent = e as KeyboardEvent;

      if (!onKeyUp || !keyCodes.includes(kbdEvent.which || -1)) return;

      const repeat = kbdEvent.repeat;
      if (!onKeyUp || repeat) return;

      onKeyUp && onKeyUp();
    };
    const keyDown: EventHandler = (e) => {
      const kbdEvent = e as KeyboardEvent;

      if (!onKeyDown || !keyCodes.includes(kbdEvent.which || -1)) return;

      // const repeat = kbdEvent.repeat;
      // if (repeat)
      //     return;

      console.log("keydown, repeat: " + kbdEvent?.repeat);

      onKeyDown(e);
    };

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    const remove = () => {
      onKeyUp = undefined;
      onKeyDown = undefined;
    };
    const setEventHandlers = ({ onKeyUp: oku, onKeyDown: okd }: BindKeyParams) => {
      remove();
      onKeyUp = oku;
      onKeyDown = okd;
    };
    return {
      // add,
      remove,
      setEventHandlers,
      // bindTouchClick
    };
  },
};

const state = {
  _value: 0,
  value: 0,
  startTime: 0,
  isRating: false,
  rated: false,
  interval: effects.initInterval(VOTE_POLLING_INTERVAL),
  keyBinding: effects.onceKeyBinding([32]),
};

const actions = {
  deepLikeInit,
  deepLikeStart,
  deepLikeStep,
  deepLikeStop,
  onInitializeOvermind,
};

export default {
  state,
  actions,
  effects,
};
