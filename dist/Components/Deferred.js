"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const clock_1 = require("../utils/clock");
const Deferred = ({ deferTime, visible, children }) => {
    const [startTime, setStartTime] = (0, react_1.useState)(0);
    const processTick = () => {
        ((!startTime && visible) || (startTime && !visible)) && setStartTime(visible ? Date.now() : 0);
    };
    (0, react_1.useEffect)(() => {
        clock_1.clock.on('tick', processTick);
        return () => { clock_1.clock.off('tick', processTick); };
    }, [visible]);
    const show = visible && (Date.now() - startTime > deferTime);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: show ? children : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) });
};
exports.Deferred = Deferred;
exports.default = exports.Deferred;
//# sourceMappingURL=Deferred.js.map