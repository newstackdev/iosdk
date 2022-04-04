"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifications = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const avatar_1 = __importDefault(require("antd/lib/avatar/avatar"));
const ContentLayout_1 = require("../../Components/ContentLayout");
const Image_1 = require("../../Components/Image");
const PostWidget_1 = require("../../Components/PostWidget");
const overmind_1 = require("../../overmind");
const NotificationBox = ({ user, mood, aspectRatio, username, post }) => {
    console.log(mood);
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "notification-box", justify: "space-between", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "notification-box__inside-left", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 11, md: 7, lg: 7, xl: 6, xxl: 6, children: (0, jsx_runtime_1.jsx)(avatar_1.default, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...user }), className: "avatar-image-header" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { sm: 13, md: 17, lg: 17, xl: 18, xxl: 18, className: "notification-box__inside-left-col-2", children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { style: { height: "auto" }, children: [(0, jsx_runtime_1.jsx)("span", { className: "paragraph-2b", children: "newdomain.io " }), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2r notification-box__inside--action-info", children: "added your..." })] }), (0, jsx_runtime_1.jsx)(antd_1.Col, { style: { height: "auto" }, className: "notification-box__inside-left--time", children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "Now" }) })] })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "notification-box__inside-right text-right", justify: "end", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 6, className: "notification-box__inside-right--grey-box", children: (0, jsx_runtime_1.jsx)(PostWidget_1.PostWidget, { mood: mood, post: post, username: username, aspectRatio: aspectRatio }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { sm: 5, className: "notification-box__inside-right--time", children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "1h" }) })] })] }));
};
const Notifications = () => {
    const state = (0, overmind_1.useAppState)();
    const moods = state.lists.top.moods.items;
    const postsList = moods.map((m) => m.posts)[0];
    const user = state.api.auth.user || {};
    if (!user)
        return (0, jsx_runtime_1.jsx)("div", { children: "\"Must be logged in\"" });
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { style: { width: "100%", margin: "20px 0" } }), (0, jsx_runtime_1.jsx)("div", { className: "notifications-wrapper ", children: postsList?.slice(0, 20).map((p, i) => ((0, jsx_runtime_1.jsx)(NotificationBox, { user: user, mood: postsList[i], post: p, username: p.author?.username, aspectRatio: p.aspectRatio }))) })] }));
};
exports.Notifications = Notifications;
//# sourceMappingURL=Notifications.js.map