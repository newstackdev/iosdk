import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { ContentImage } from "../../Components/Image";
import { ContentLayout } from "../../Components/ContentLayout";
import { PostWidget } from "../../Components/PostWidget";
import { useAppState } from "../../overmind";
import Avatar from "antd/lib/avatar/avatar";
const NotificationBox = ({ user, mood, aspectRatio, username, post }) => {
    console.log(mood);
    return (_jsxs(Row, { className: "notification-box", justify: "space-between", children: [_jsxs(Row, { className: "notification-box__inside-left", children: [_jsx(Col, { sm: 11, md: 7, lg: 7, xl: 6, xxl: 6, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: "avatar-image-header" }) }), _jsxs(Col, { sm: 13, md: 17, lg: 17, xl: 18, xxl: 18, className: "notification-box__inside-left-col-2", children: [_jsxs(Col, { style: { height: "auto" }, children: [_jsx("span", { className: "paragraph-2b", children: "newdomain.io " }), _jsx("span", { className: "paragraph-2r notification-box__inside--action-info", children: "added your..." })] }), _jsx(Col, { style: { height: "auto" }, className: "notification-box__inside-left--time", children: _jsx("p", { className: "paragraph-2r", children: "Now" }) })] })] }), _jsxs(Row, { className: "notification-box__inside-right text-right", justify: "end", children: [_jsx(Col, { sm: 6, className: "notification-box__inside-right--grey-box", children: _jsx(PostWidget, { mood: mood, post: post, username: username, aspectRatio: aspectRatio }) }), _jsx(Col, { sm: 5, className: "notification-box__inside-right--time", children: _jsx("p", { className: "paragraph-2r", children: "1h" }) })] })] }));
};
export const Notifications = () => {
    const state = useAppState();
    const moods = state.lists.top.moods.items;
    const postsList = moods.map((m) => m.posts)[0];
    const user = state.api.auth.user || {};
    if (!user)
        return _jsx("div", { children: "\"Must be logged in\"" });
    return (_jsxs(ContentLayout, { children: [_jsx(Row, { style: { width: "100%", margin: "20px 0" } }), _jsx("div", { className: "notifications-wrapper ", children: postsList?.slice(0, 20).map((p, i) => (_jsx(NotificationBox, { user: user, mood: postsList[i], post: p, username: p.author?.username, aspectRatio: p.aspectRatio }))) })] }));
};
//# sourceMappingURL=Notifications.js.map