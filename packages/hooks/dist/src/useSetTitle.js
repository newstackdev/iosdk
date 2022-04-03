"use strict";
exports.__esModule = true;
exports.useSetTitle = void 0;
var state_1 = require("@newcoin-foundation/state");
var react_1 = require("react");
var useSetTitle = function (title) {
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        actions.routing.setTitle(title);
    }, [title]);
};
exports.useSetTitle = useSetTitle;
exports["default"] = exports.useSetTitle;
