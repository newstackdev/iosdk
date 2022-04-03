import { Action } from "@newcoin-foundation/core";
declare const _default: {
    state: {
        _isWorking: number;
        isWorking: boolean;
        _specific: Record<string, number>;
        specific: Record<string, any>;
    };
    actions: {
        isWorking: Action<{
            actionName: string;
            n: number;
        }, void>;
        isWorkingActionDebounced: Action<{
            actionName: string;
        }, void>;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map