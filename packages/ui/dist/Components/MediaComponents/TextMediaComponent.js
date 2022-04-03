"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.TextMediaComponent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TextMediaComponent = function (_a) {
    var content = _a.content, thumbnail = _a.thumbnail;
    return (0, jsx_runtime_1.jsx)("div", __assign({ style: thumbnail ? { paddingTop: 50 } : { fontSize: "min(10vh,10vw)", lineHeight: "1em" } }, { children: content }));
};
exports.TextMediaComponent = TextMediaComponent;
