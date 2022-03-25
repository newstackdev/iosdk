"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVisibilityOnce = void 0;
var react_1 = require("react");
/**
 * Check if an element is in viewport
 * @param {number} offset - Number of pixels up to the observable element from the top
 */
function useVisibility(offset) {
    if (offset === void 0) { offset = 0; }
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var currentElement = (0, react_1.useRef)(null);
    var onScroll = function () {
        var _a;
        if (!currentElement.current) {
            setIsVisible(false);
            return;
        }
        var top = ((_a = currentElement === null || currentElement === void 0 ? void 0 : currentElement.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top) || 0;
        setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('scroll', onScroll, true);
        // onScroll();
        return function () { return document.removeEventListener('scroll', onScroll, true); };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        setIsVisible(((_a = currentElement.current) === null || _a === void 0 ? void 0 : _a.offsetParent) !== null);
    }, [currentElement.current]);
    return [isVisible, currentElement];
}
exports.default = useVisibility;
function useVisibilityOnce(offset) {
    if (offset === void 0) { offset = 0; }
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var currentElement = (0, react_1.useRef)(null);
    var onScroll = function () {
        var _a;
        if (isVisible)
            return console.log("onScrollOnce is already visible");
        // console.log("onScroll")
        if (!currentElement.current) {
            setIsVisible(false);
            console.log("onScroll setting isVisible to false since no parent");
            return;
        }
        var top = ((_a = currentElement === null || currentElement === void 0 ? void 0 : currentElement.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top) || 0;
        setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener('scroll', onScroll, true);
        return function () { return document.removeEventListener('scroll', onScroll, true); };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        if (isVisible)
            return;
        onScroll();
        setIsVisible(((_a = currentElement.current) === null || _a === void 0 ? void 0 : _a.offsetParent) !== null);
    }, [currentElement.current]);
    return [isVisible, currentElement];
}
exports.useVisibilityOnce = useVisibilityOnce;
//# sourceMappingURL=useVisibility.js.map