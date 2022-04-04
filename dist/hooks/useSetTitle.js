"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetTitle = void 0;
const react_1 = require("react");
const overmind_1 = require("../overmind");
const useSetTitle = (title) => {
    const actions = (0, overmind_1.useActions)();
    (0, react_1.useEffect)(() => {
        actions.routing.setTitle(title);
    }, [title]);
};
exports.useSetTitle = useSetTitle;
exports.default = exports.useSetTitle;
//# sourceMappingURL=useSetTitle.js.map