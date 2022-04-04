"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVisibilityOnce = void 0;
const react_1 = require("react");
/**
 * Check if an element is in viewport
 * @param {number} offset - Number of pixels up to the observable element from the top
 */
function useVisibility(offset = 0) {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const currentElement = (0, react_1.useRef)(null);
    const onScroll = () => {
        if (!currentElement.current) {
            setIsVisible(false);
            return;
        }
        const top = currentElement?.current?.getBoundingClientRect().top || 0;
        setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener('scroll', onScroll, true);
        // onScroll();
        return () => document.removeEventListener('scroll', onScroll, true);
    }, []);
    (0, react_1.useEffect)(() => {
        setIsVisible(currentElement.current?.offsetParent !== null);
    }, [currentElement.current]);
    return [isVisible, currentElement];
}
exports.default = useVisibility;
function useVisibilityOnce(offset = 0) {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const currentElement = (0, react_1.useRef)(null);
    const onScroll = () => {
        if (isVisible)
            return console.log("onScrollOnce is already visible");
        // console.log("onScroll")
        if (!currentElement.current) {
            setIsVisible(false);
            console.log("onScroll setting isVisible to false since no parent");
            return;
        }
        const top = currentElement?.current?.getBoundingClientRect().top || 0;
        setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener('scroll', onScroll, true);
        return () => document.removeEventListener('scroll', onScroll, true);
    }, []);
    (0, react_1.useEffect)(() => {
        if (isVisible)
            return;
        onScroll();
        setIsVisible(currentElement.current?.offsetParent !== null);
    }, [currentElement.current]);
    return [isVisible, currentElement];
}
exports.useVisibilityOnce = useVisibilityOnce;
//# sourceMappingURL=useVisibility.js.map