"use strict";
exports.__esModule = true;
exports.Deferred = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var core_1 = require("@newcoin-foundation/core");
var Deferred = function (_a) {
    var deferTime = _a.deferTime, visible = _a.visible, children = _a.children;
    var _b = (0, react_1.useState)(0), startTime = _b[0], setStartTime = _b[1];
    var processTick = function () {
        ((!startTime && visible) || (startTime && !visible)) &&
            setStartTime(visible ? Date.now() : 0);
    };
    (0, react_1.useEffect)(function () {
        core_1.clock.on("tick", processTick);
        return function () {
            core_1.clock.off("tick", processTick);
        };
    }, [visible]);
    var show = visible && Date.now() - startTime > deferTime;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: show ? children : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) });
};
exports.Deferred = Deferred;
exports["default"] = exports.Deferred;
