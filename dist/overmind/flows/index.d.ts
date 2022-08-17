declare const _default: {
    state: import("overmind/lib/internalTypes").SubType<{
        user: import("overmind/lib/internalTypes").SubType<{
            create: import("./user/onboarding/state").IOnboarding;
        }, object>;
        rating: {
            _value: number;
            value: number;
            startTime: number;
            isRating: boolean;
            rated: boolean;
            interval: {
                start: (f: import("../../types").EventHandler) => void;
                stop: () => void;
            };
            keyBinding: {
                remove: () => void;
                setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                    onKeyUp: import("../../types").EventHandler;
                    onKeyDown: import("../../types").EventHandler;
                }) => void;
            };
        };
        userJourney: {
            flags: Record<string, string>;
        };
        stake: {
            options: {
                stakingContainer: any;
            };
            latestMode: number;
        };
        vote: {
            options: {
                votingContainer: any;
            };
            latestMode: number;
        };
    }, object>;
    effects: import("overmind/lib/internalTypes").SubType<{
        user: import("overmind/lib/internalTypes").SubType<{
            create: {};
        }, object>;
        rating: {
            initInterval: (ms: number) => {
                start: (f: import("../../types").EventHandler) => void;
                stop: () => void;
            };
            onceKeyBinding: (keyCodes: number[]) => {
                remove: () => void;
                setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                    onKeyUp: import("../../types").EventHandler;
                    onKeyDown: import("../../types").EventHandler;
                }) => void;
            };
        };
        userJourney: unknown;
        stake: unknown;
        vote: unknown;
    }, object>;
    actions: import("overmind/lib/internalTypes").SubType<{
        user: import("overmind/lib/internalTypes").SubType<{
            create: typeof import("./user/onboarding/actions");
        }, object>;
        rating: {
            deepLikeInit: import("../../types").Action<undefined, void>;
            deepLikeStart: import("../../types").Action<{
                event?: Event | undefined;
            }, void>;
            deepLikeStep: import("../../types").Action<undefined, void>;
            deepLikeStop: import("../../types").Action<undefined, void>;
            onInitializeOvermind: import("../../types").Action<undefined, void>;
        };
        userJourney: {
            setFlag: import("../../types").Action<{
                flag: string;
                value: string;
            }, void>;
            onInitializeOvermind: import("../../types").Action<undefined, void>;
        };
        stake: typeof import("./stake/actions");
        vote: typeof import("./vote/actions");
    }, object>;
};
export default _default;
