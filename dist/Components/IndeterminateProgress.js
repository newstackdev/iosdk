"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndeterminateProgressAction = exports.IndeterminateProgress = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var overmind_1 = require("../overmind");
var clock_1 = require("../utils/clock");
var IndeterminateProgress = function (_a) {
    var inProgress = _a.inProgress;
    var _b = (0, react_1.useState)(0), p = _b[0], setP = _b[1];
    (0, react_1.useEffect)(function () {
        clock_1.clock.on("tick", setP);
        return function () {
            clock_1.clock.off("tick", setP);
        };
    }, []);
    return inProgress ? ((0, jsx_runtime_1.jsx)(antd_1.Progress, { showInfo: false, percent: p, strokeColor: "#c1fa50" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.IndeterminateProgress = IndeterminateProgress;
var IndeterminateProgressAction = function (_a) {
    var actionName = _a.actionName;
    var state = (0, overmind_1.useAppState)();
    var ival = !!state.indicators.specific[actionName];
    return (0, jsx_runtime_1.jsx)(exports.IndeterminateProgress, { inProgress: ival });
};
exports.IndeterminateProgressAction = IndeterminateProgressAction;
//# sourceMappingURL=IndeterminateProgress.js.map