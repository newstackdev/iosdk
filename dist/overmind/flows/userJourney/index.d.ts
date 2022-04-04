import { Action } from "../../../types";
declare const _default: {
    actions: {
        setFlag: Action<{
            flag: string;
            value: string;
        }, void>;
        onInitializeOvermind: Action<undefined, void>;
    };
    state: {
        flags: Record<string, string>;
    };
};
export default _default;
