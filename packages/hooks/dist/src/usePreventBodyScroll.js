"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var preventDefault = function (ev) {
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    ev.returnValue = false;
};
var enableBodyScroll = function () {
    document && document.removeEventListener("wheel", preventDefault, false);
};
var disableBodyScroll = function () {
    document &&
        document.addEventListener("wheel", preventDefault, {
            passive: false
        });
};
function usePreventBodyScroll() {
    var _a = react_1["default"].useState(false), hidden = _a[0], setHidden = _a[1];
    react_1["default"].useEffect(function () {
        hidden ? disableBodyScroll() : enableBodyScroll();
        return enableBodyScroll;
    }, [hidden]);
    var disableScroll = react_1["default"].useCallback(function () { return setHidden(true); }, []);
    var enableScroll = react_1["default"].useCallback(function () { return setHidden(false); }, []);
    return { disableScroll: disableScroll, enableScroll: enableScroll };
}
exports["default"] = usePreventBodyScroll;
