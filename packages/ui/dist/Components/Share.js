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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ShareButton = exports.Share = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var Modal_1 = __importDefault(require("antd/lib/modal/Modal"));
var react_1 = require("react");
var Share = function (_a) {
    var url = _a.url;
    return ((0, jsx_runtime_1.jsx)(antd_1.Input, { value: url }));
};
exports.Share = Share;
var ShareButton = function () {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    var state = (0, state_1.useAppState)();
    var url = [
        window.location.protocol,
        "//",
        window.location.host,
        state.routing.location,
    ].join("");
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isVisible ? ((0, jsx_runtime_1.jsx)(Modal_1["default"], __assign({ visible: isVisible, onCancel: function () { return setIsVisible(false); }, onOk: function () { return setIsVisible(false); }, className: "nl-white-box-modal" }, { children: (0, jsx_runtime_1.jsx)(exports.Share, { url: url }) }))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: function () { return setIsVisible(true); } }, { children: "Share link" }))] }));
};
exports.ShareButton = ShareButton;
