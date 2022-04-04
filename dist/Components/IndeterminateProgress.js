"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndeterminateProgressBar = exports.IndeterminateProgressAction = exports.IndeterminateProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const overmind_1 = require("../overmind");
const clock_1 = require("../utils/clock");
const SpinLogo_1 = require("./Icons/SpinLogo");
const IndeterminateProgress = ({ inProgress, }) => {
    const [p, setP] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        clock_1.clock.on("tick", setP);
        return () => {
            clock_1.clock.off("tick", setP);
        };
    }, []);
    return inProgress ? ((0, jsx_runtime_1.jsx)("div", { className: "rotating", style: { fontSize: 41 }, children: (0, jsx_runtime_1.jsx)(SpinLogo_1.SpinLogo, {}) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.IndeterminateProgress = IndeterminateProgress;
const IndeterminateProgressAction = ({ actionName, }) => {
    const state = (0, overmind_1.useAppState)();
    const ival = !!state.indicators.specific[actionName];
    return (0, jsx_runtime_1.jsx)(exports.IndeterminateProgress, { inProgress: ival });
};
exports.IndeterminateProgressAction = IndeterminateProgressAction;
const IndeterminateProgressBar = ({ inProgress, }) => {
    const [p, setP] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        clock_1.clock.on("tick", setP);
        return () => {
            clock_1.clock.off("tick", setP);
        };
    }, []);
    return inProgress ? ((0, jsx_runtime_1.jsx)(antd_1.Progress, { showInfo: false, percent: p, strokeColor: "#c1fa50" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.IndeterminateProgressBar = IndeterminateProgressBar;
//# sourceMappingURL=IndeterminateProgress.js.map