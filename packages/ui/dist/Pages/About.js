"use strict";
exports.__esModule = true;
exports.About = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var react_1 = require("react");
var About = function () {
    var actions = (0, state_1.useActions)();
    (0, react_1.useEffect)(function () {
        actions.routing.setBreadcrumbs([{ text: "About" }]);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "About" }), "This is newweb"] }));
};
exports.About = About;
