"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearingComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const clock_1 = require("../utils/clock");
const AppearingComponent = ({ seconds, children, onShow }) => {
    const [p, setP] = (0, react_1.useState)(Date.now());
    const [diff, setDiff] = (0, react_1.useState)(0);
    const [onRemove, setOnRemove] = (0, react_1.useState)({
        cb: undefined,
    });
    const [visible, setVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        clock_1.secondsClock.on("tick", (n) => {
            const diff = n - p;
            setDiff(diff);
            if (diff > seconds * 1000)
                setVisible(true);
        });
        return () => {
            clock_1.secondsClock.off("tick", setP);
            onRemove.cb && onRemove.cb();
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!visible)
            setP(Date.now());
        else {
            const onr = onShow && onShow();
            setOnRemove({ cb: onr || undefined });
        }
    }, [visible]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: visible ? children : (0, jsx_runtime_1.jsx)("div", { style: { height: "69px" } }) });
};
exports.AppearingComponent = AppearingComponent;
//# sourceMappingURL=Appearing.js.map