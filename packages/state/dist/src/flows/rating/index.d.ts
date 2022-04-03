import { EventHandler } from "@newcoin-foundation/core";
import { Action } from "../../state";
export declare const deepLikeInit: Action;
export declare const deepLikeStart: Action<{
    event?: Event;
}>;
export declare const deepLikeStep: Action;
export declare const deepLikeStop: Action;
export declare const onInitializeOvermind: Action;
declare type BindKeyParams = {
    onKeyUp: EventHandler;
    onKeyDown: EventHandler;
};
declare const _default: {
    state: {
        _value: number;
        value: number;
        startTime: number;
        isRating: boolean;
        rated: boolean;
        interval: {
            start: (f: EventHandler) => void;
            stop: () => void;
        };
        keyBinding: {
            remove: () => void;
            setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd, }: BindKeyParams) => void;
        };
    };
    actions: {
        deepLikeInit: Action<undefined, void>;
        deepLikeStart: Action<{
            event?: Event;
        }, void>;
        deepLikeStep: Action<undefined, void>;
        deepLikeStop: Action<undefined, void>;
        onInitializeOvermind: Action<undefined, void>;
    };
    effects: {
        initInterval: (ms: number) => {
            start: (f: EventHandler) => void;
            stop: () => void;
        };
        onceKeyBinding: (keyCodes: number[]) => {
            remove: () => void;
            setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd, }: BindKeyParams) => void;
        };
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map