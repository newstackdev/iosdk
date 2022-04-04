"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const overmind_1 = require("../overmind");
const About = () => {
    const actions = (0, overmind_1.useActions)();
    (0, react_1.useEffect)(() => {
        actions.routing.setBreadcrumbs([{ text: "About" }]);
    }, []);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "About" }), "This is newweb"] });
};
exports.About = About;
//# sourceMappingURL=About.js.map