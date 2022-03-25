"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearingComponent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var clock_1 = require("../utils/clock");
var AppearingComponent = function (_a) {
    var seconds = _a.seconds, children = _a.children, onShow = _a.onShow;
    var _b = (0, react_1.useState)(Date.now()), p = _b[0], setP = _b[1];
    var _c = (0, react_1.useState)(0), diff = _c[0], setDiff = _c[1];
    var _d = (0, react_1.useState)({ cb: undefined }), onRemove = _d[0], setOnRemove = _d[1];
    var _e = (0, react_1.useState)(false), visible = _e[0], setVisible = _e[1];
    (0, react_1.useEffect)(function () {
        clock_1.secondsClock.on("tick", function (n) {
            var diff = n - p;
            setDiff(diff);
            if (diff > seconds * 1000)
                setVisible(true);
        });
        return function () {
            clock_1.secondsClock.off("tick", setP);
            onRemove.cb && onRemove.cb();
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (!visible)
            setP(Date.now());
        else {
            var onr = onShow && onShow();
            setOnRemove({ cb: onr || undefined });
        }
    }, [visible]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: visible ? children : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) });
};
exports.AppearingComponent = AppearingComponent;
//# sourceMappingURL=Appearing.js.map