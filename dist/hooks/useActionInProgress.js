"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActionInProgress = void 0;
var react_1 = require("react");
var overmind_1 = require("../overmind");
var lodash_1 = require("lodash");
var useActionInProgress = function (overmindActionName, debounceMs) {
    if (debounceMs === void 0) { debounceMs = 100; }
    var state = (0, overmind_1.useAppState)();
    var _a = (0, react_1.useState)(state.indicators.specific[overmindActionName]), inProgress = _a[0], setInProgress = _a[1];
    (0, react_1.useEffect)(function () {
        (0, lodash_1.debounce)(function () { return setInProgress(state.indicators.specific[overmindActionName]); }, debounceMs);
    }, [state.indicators.specific[overmindActionName]]);
    return inProgress;
};
exports.useActionInProgress = useActionInProgress;
//# sourceMappingURL=useActionInProgress.js.map