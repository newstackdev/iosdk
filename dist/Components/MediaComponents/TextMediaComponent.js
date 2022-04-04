"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMediaComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TextMediaComponent = ({ content, thumbnail }) => {
    return (0, jsx_runtime_1.jsx)("div", { style: thumbnail ? { paddingTop: 50 } : { fontSize: "min(10vh,10vw)", lineHeight: "1em" }, children: content });
};
exports.TextMediaComponent = TextMediaComponent;
//# sourceMappingURL=TextMediaComponent.js.map