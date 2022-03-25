"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var overmind_1 = require("../overmind");
var About = function () {
    var actions = (0, overmind_1.useActions)();
    (0, react_1.useEffect)(function () {
        actions.routing.setBreadcrumbs([{ text: "About" }]);
    }, []);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "About" }), "This is newweb"] });
};
exports.About = About;
//# sourceMappingURL=About.js.map