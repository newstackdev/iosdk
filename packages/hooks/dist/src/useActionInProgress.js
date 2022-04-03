"use strict";
exports.__esModule = true;
exports.useActionInProgress = void 0;
var react_1 = require("react");
var state_1 = require("@newcoin-foundation/state");
var lodash_1 = require("lodash");
var useActionInProgress = function (overmindActionName, debounceMs) {
    if (debounceMs === void 0) { debounceMs = 100; }
    var state = (0, state_1.useAppState)();
    var _a = (0, react_1.useState)(state.indicators.specific[overmindActionName]), inProgress = _a[0], setInProgress = _a[1];
    (0, react_1.useEffect)(function () {
        (0, lodash_1.debounce)(function () { return setInProgress(state.indicators.specific[overmindActionName]); }, debounceMs);
    }, [state.indicators.specific[overmindActionName]]);
    return inProgress;
};
exports.useActionInProgress = useActionInProgress;
