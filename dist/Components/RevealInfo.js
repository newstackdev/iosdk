"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevealInfo = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var RevealInfo = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), show = _b[0], setShow = _b[1];
    return show ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }) : (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, { onClick: function () { return setShow(true); } });
};
exports.RevealInfo = RevealInfo;
//# sourceMappingURL=RevealInfo.js.map