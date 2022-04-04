"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActionInProgress = void 0;
const react_1 = require("react");
const overmind_1 = require("../overmind");
const lodash_1 = require("lodash");
const useActionInProgress = (overmindActionName, debounceMs = 100) => {
    const state = (0, overmind_1.useAppState)();
    const [inProgress, setInProgress] = (0, react_1.useState)(state.indicators.specific[overmindActionName]);
    (0, react_1.useEffect)(() => {
        (0, lodash_1.debounce)(() => setInProgress(state.indicators.specific[overmindActionName]), debounceMs);
    }, [state.indicators.specific[overmindActionName]]);
    return inProgress;
};
exports.useActionInProgress = useActionInProgress;
//# sourceMappingURL=useActionInProgress.js.map