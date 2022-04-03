"use strict";
exports.__esModule = true;
exports.IndeterminateProgressAction = exports.IndeterminateProgress = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var state_1 = require("@newcoin-foundation/state");
var core_1 = require("@newcoin-foundation/core");
var IndeterminateProgress = function (_a) {
    var inProgress = _a.inProgress;
    var _b = (0, react_1.useState)(0), p = _b[0], setP = _b[1];
    (0, react_1.useEffect)(function () {
        core_1.clock.on("tick", setP);
        return function () {
            core_1.clock.off("tick", setP);
        };
    }, []);
    return inProgress ? ((0, jsx_runtime_1.jsx)(antd_1.Progress, { showInfo: false, percent: p, strokeColor: "#c1fa50" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.IndeterminateProgress = IndeterminateProgress;
var IndeterminateProgressAction = function (_a) {
    var actionName = _a.actionName;
    var state = (0, state_1.useAppState)();
    var ival = !!state.indicators.specific[actionName];
    return (0, jsx_runtime_1.jsx)(exports.IndeterminateProgress, { inProgress: ival });
};
exports.IndeterminateProgressAction = IndeterminateProgressAction;
