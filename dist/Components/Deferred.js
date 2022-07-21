import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { clock } from "../utils/clock";
import { useEffect, useState } from "react";
export const Deferred = ({ deferTime, visible, children }) => {
    const [startTime, setStartTime] = useState(0);
    const processTick = () => {
        ((!startTime && visible) || (startTime && !visible)) && setStartTime(visible ? Date.now() : 0);
    };
    useEffect(() => {
        clock.on("tick", processTick);
        return () => {
            clock.off("tick", processTick);
        };
    }, [visible]);
    const show = visible && Date.now() - startTime > deferTime;
    return _jsx(_Fragment, { children: show ? children : _jsx(_Fragment, {}) });
};
export default Deferred;
//# sourceMappingURL=Deferred.js.map