"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetTitle = void 0;
var react_1 = require("react");
var overmind_1 = require("../overmind");
var useSetTitle = function (title) {
    var actions = (0, overmind_1.useActions)();
    (0, react_1.useEffect)(function () {
        actions.routing.setTitle(title);
    }, [title]);
};
exports.useSetTitle = useSetTitle;
exports.default = exports.useSetTitle;
//# sourceMappingURL=useSetTitle.js.map