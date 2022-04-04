"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const preventDefault = (ev) => {
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    ev.returnValue = false;
};
const enableBodyScroll = () => {
    document && document.removeEventListener("wheel", preventDefault, false);
};
const disableBodyScroll = () => {
    document &&
        document.addEventListener("wheel", preventDefault, {
            passive: false
        });
};
function usePreventBodyScroll() {
    const [hidden, setHidden] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        hidden ? disableBodyScroll() : enableBodyScroll();
        return enableBodyScroll;
    }, [hidden]);
    const disableScroll = react_1.default.useCallback(() => setHidden(true), []);
    const enableScroll = react_1.default.useCallback(() => setHidden(false), []);
    return { disableScroll, enableScroll };
}
exports.default = usePreventBodyScroll;
//# sourceMappingURL=usePreventBodyScroll.js.map