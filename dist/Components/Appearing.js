import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { secondsClock } from "../utils/clock";
import { useEffect, useState } from "react";
export const AppearingComponent = ({ seconds, children, onShow }) => {
    const [p, setP] = useState(Date.now());
    const [diff, setDiff] = useState(0);
    const [onRemove, setOnRemove] = useState({
        cb: undefined,
    });
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        secondsClock.on("tick", (n) => {
            const diff = n - p;
            setDiff(diff);
            if (diff > seconds * 1000)
                setVisible(true);
        });
        return () => {
            secondsClock.off("tick", setP);
            onRemove.cb && onRemove.cb();
        };
    }, []);
    useEffect(() => {
        if (!visible)
            setP(Date.now());
        else {
            const onr = onShow && onShow();
            setOnRemove({ cb: onr || undefined });
        }
    }, [visible]);
    return _jsx(_Fragment, { children: visible ? children : _jsx("div", { style: { height: "69px" } }) });
};
//# sourceMappingURL=Appearing.js.map