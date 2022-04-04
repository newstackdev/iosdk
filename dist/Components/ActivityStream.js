"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityStream = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const overmind_1 = require("overmind");
const react_router_dom_1 = require("react-router-dom");
const overmind_2 = require("../overmind");
const Logo_1 = __importDefault(require("./Icons/Logo"));
const ActivityStream = (props) => {
    const state = (0, overmind_2.useAppState)();
    const _src = (0, overmind_1.json)(state.websockets.messages.activityStream);
    const src = props.limit ? _src.slice(0, props.limit) : _src;
    return ((0, jsx_runtime_1.jsx)(antd_1.List, { header: "Activity Stream", style: {
            minWidth: 300,
            background: "black",
            padding: 9,
            position: "relative",
        }, itemLayout: "horizontal", dataSource: src, className: "app-main-full-width", renderItem: (item) => {
            return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)("span", { style: { fontSize: 42 }, children: (0, jsx_runtime_1.jsx)(Logo_1.default, {}) }), title: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: item.link, className: "paragraph-1r", children: item.title }), description: item.description, 
                    //  + " " + JSON.stringify(item.original)}
                    style: { maxWidth: props.limit ? 300 : "100%" } }) }));
        } }));
};
exports.ActivityStream = ActivityStream;
//# sourceMappingURL=ActivityStream.js.map