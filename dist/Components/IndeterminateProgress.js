import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Progress } from "antd";
import { SpinLogo } from "./Icons/SpinLogo";
import { clock } from "../utils/clock";
import { useAppState } from "../overmind";
import { useEffect, useState } from "react";
export const IndeterminateProgress = ({ inProgress }) => {
    const [p, setP] = useState(0);
    useEffect(() => {
        clock.on("tick", setP);
        return () => {
            clock.off("tick", setP);
        };
    }, []);
    return inProgress ? (_jsx("div", { className: "rotating", style: { fontSize: 41 }, children: _jsx(SpinLogo, {}) })) : (_jsx(_Fragment, {}));
};
export const IndeterminateProgressAction = ({ actionName }) => {
    const state = useAppState();
    const ival = !!state.indicators.specific[actionName];
    return _jsx(IndeterminateProgress, { inProgress: ival });
};
export const IndeterminateProgressBar = ({ inProgress }) => {
    const [p, setP] = useState(0);
    useEffect(() => {
        clock.on("tick", setP);
        return () => {
            clock.off("tick", setP);
        };
    }, []);
    return inProgress ? _jsx(Progress, { showInfo: false, percent: p, strokeColor: "#c1fa50" }) : _jsx(_Fragment, {});
};
//# sourceMappingURL=IndeterminateProgress.js.map