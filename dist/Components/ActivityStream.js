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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityStream = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var overmind_1 = require("overmind");
var react_router_dom_1 = require("react-router-dom");
var overmind_2 = require("../overmind");
var Logo_1 = __importDefault(require("./Icons/Logo"));
var ActivityStream = function (props) {
    var state = (0, overmind_2.useAppState)();
    var _src = (0, overmind_1.json)(state.websockets.messages.activityStream);
    var src = props.limit ? _src.slice(0, props.limit) : _src;
    return ((0, jsx_runtime_1.jsx)(antd_1.List, { header: "Activity Stream", style: {
            minWidth: 300,
            background: "black",
            padding: 9,
            position: "relative",
        }, itemLayout: "horizontal", dataSource: src, className: "app-main-full-width", renderItem: function (item) {
            return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)("span", __assign({ style: { fontSize: 42 } }, { children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) })), title: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: item.link, className: "paragraph-1r" }, { children: item.title })), description: item.description, 
                    //  + " " + JSON.stringify(item.original)}
                    style: { maxWidth: props.limit ? 300 : "100%" } }) }));
        } }));
};
exports.ActivityStream = ActivityStream;
//# sourceMappingURL=ActivityStream.js.map