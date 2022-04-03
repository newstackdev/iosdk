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
exports.Notifications = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var avatar_1 = __importDefault(require("antd/lib/avatar/avatar"));
var MediaComponents_1 = require("src/Components/MediaComponents");
var ContentLayout_1 = require("../../Components/ContentLayout");
var LargeArrowBack_1 = require("../../Components/Icons/LargeArrowBack");
var PostWidget_1 = require("../../Components/PostWidget");
var NotificationBox = function (_a) {
    var user = _a.user, mood = _a.mood, aspectRatio = _a.aspectRatio, username = _a.username, post = _a.post;
    console.log(mood);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "notification-box", justify: "space-between" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "notification-box__inside-left" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 11, md: 7, lg: 7, xl: 6, xxl: 6 }, { children: (0, jsx_runtime_1.jsx)(avatar_1["default"], { src: (0, jsx_runtime_1.jsx)(MediaComponents_1.MediaComponent, __assign({}, user)), className: "avatar-image-header" }) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ sm: 13, md: 17, lg: 17, xl: 18, xxl: 18, className: "notification-box__inside-left-col-2" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ style: { height: "auto" } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-2b" }, { children: "newdomain.io " })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-2r notification-box__inside--action-info" }, { children: "added your..." }))] })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: { height: "auto" }, className: "notification-box__inside-left--time" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "Now" })) }))] }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "notification-box__inside-right text-right", justify: "end" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 6, className: "notification-box__inside-right--grey-box" }, { children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: mood, post: post, username: username, aspectRatio: aspectRatio }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 5, className: "notification-box__inside-right--time" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: "1h" })) }))] }))] })));
};
var Notifications = function () {
    var state = (0, state_1.useAppState)();
    var moods = state.lists.top.moods.items;
    var postsList = moods.map(function (m) { return m.posts; })[0];
    var user = state.api.auth.user || {};
    if (!user)
        return (0, jsx_runtime_1.jsx)("div", { children: "\"Must be logged in\"" });
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ style: { width: "100%", margin: "20px 0" } }, { children: (0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "notifications-wrapper scrollable-content" }, { children: postsList === null || postsList === void 0 ? void 0 : postsList.slice(0, 20).map(function (p, i) {
                    var _a;
                    return ((0, jsx_runtime_1.jsx)(NotificationBox, { user: user, mood: postsList[i], post: p, username: (_a = p.author) === null || _a === void 0 ? void 0 : _a.username, aspectRatio: p.aspectRatio }));
                }) }))] }));
};
exports.Notifications = Notifications;
