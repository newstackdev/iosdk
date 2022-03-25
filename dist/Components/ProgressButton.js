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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var overmind_1 = require("../overmind");
var ProgressButton = function (_a) {
    var actionName = _a.actionName, type = _a.type, htmlType = _a.htmlType, className = _a.className, children = _a.children, onClick = _a.onClick, disabled = _a.disabled, isErrorSubmit = _a.isErrorSubmit;
    var state = (0, overmind_1.useAppState)();
    var ival = !!state.indicators.specific[actionName];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !ival ? ((0, jsx_runtime_1.jsx)(antd_1.Button
        // style={{ width: "100%" }}
        , __assign({ 
            // style={{ width: "100%" }}
            type: type, htmlType: htmlType, onClick: onClick, disabled: disabled, className: isErrorSubmit
                ? "".concat(className, " disabled-submit-button")
                : "".concat(className) }, { children: children }))) : ((0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ type: "primary", style: { color: "black", borderColor: "black" } }, { children: "Sharing..." }))) }));
};
exports.ProgressButton = ProgressButton;
//# sourceMappingURL=ProgressButton.js.map