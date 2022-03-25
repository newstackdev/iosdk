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
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var overmind_1 = require("../overmind");
var Title_1 = __importDefault(require("../Pages/Explore/Title"));
var ContentLayout_1 = require("./ContentLayout");
var LargeArrowBack_1 = require("./Icons/LargeArrowBack");
var Image_1 = require("./Image");
var UserWidget_1 = require("./UserWidget");
var Creators = function (_a) {
    var title = _a.title, maxItems = _a.maxItems, users = _a.users;
    var state = (0, overmind_1.useAppState)();
    var maxUsers = maxItems
        ? users === null || users === void 0 ? void 0 : users.slice(0, Math.min(users === null || users === void 0 ? void 0 : users.length, maxItems))
        : users;
    var creators = users === undefined ? state.lists.top.users.items : maxUsers;
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [title === undefined && ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { width: "100%", marginTop: "20px" } }, { children: [(0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}), (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-2", style: { marginLeft: "40px" } }, { children: "Explore top creators" }))] }))), (0, jsx_runtime_1.jsxs)("div", __assign({ className: maxItems === undefined
                    ? "section-divider scrollable-content app-main-full-width"
                    : "section-divider app-main-full-width" }, { children: [maxItems ? ((0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: "/top/creators" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)("div", __assign({ className: "top-creators-wrapper" }, { children: creators === null || creators === void 0 ? void 0 : creators.map(function (creator) { return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "bg-hover  app-full-width", style: { alignItems: "center" } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ className: "top-creators-first-col" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(creator.username) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, creator)), className: "avatar-image-top-creators" }) })) }), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "top-creators-username" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(creator.username) }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-1r font-variant-none", style: {
                                                        margin: "0",
                                                        textAlign: "center",
                                                    } }, { children: creator.username })) })) }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ className: "top-creators-second-col" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ className: "top-creators-number" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "header-1r top-creators-powered", style: {
                                                    margin: "0",
                                                    justifyContent: "end",
                                                    display: "flex",
                                                } }, { children: creator.powered })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserPowerup, { user: creator }) })] }))] }))); }) }))] }))] }));
};
exports.default = Creators;
//# sourceMappingURL=Creators.js.map