"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMore = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Spin_1 = require("../Components/Spin");
const react_1 = require("react");
const useVisibility_1 = __importDefault(require("../hooks/useVisibility"));
const LoadMore = ({ loadMore }) => {
    const [isVisible, currentElement] = (0, useVisibility_1.default)(200);
    (0, react_1.useEffect)(() => {
        isVisible && loadMore && loadMore();
    }, [isVisible]);
    return (0, jsx_runtime_1.jsx)("div", { ref: currentElement, children: (0, jsx_runtime_1.jsx)(Spin_1.Spin, {}) });
};
exports.LoadMore = LoadMore;
//# sourceMappingURL=LoadMore.js.map