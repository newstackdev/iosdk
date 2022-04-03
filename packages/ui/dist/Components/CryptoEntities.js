"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.HashDisplay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TextArea_1 = __importDefault(require("antd/lib/input/TextArea"));
// a unified way to display long hashes
var HashDisplay = function (_a) {
    var hash = _a.hash;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(TextArea_1["default"], { rows: 3, value: hash || "" }) }));
};
exports.HashDisplay = HashDisplay;
