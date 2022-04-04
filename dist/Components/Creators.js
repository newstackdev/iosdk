"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopCreators = exports.Creators = exports.CreatorsList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_router_dom_1 = require("react-router-dom");
const overmind_1 = require("../overmind");
const Title_1 = __importDefault(require("../Pages/Explore/Title"));
const Image_1 = require("./Image");
const LoadMore_1 = require("./LoadMore");
const UserWidget_1 = require("./UserWidget");
const CreatorsList = ({ title, maxItems, users }) => {
    const state = (0, overmind_1.useAppState)();
    maxItems = maxItems || 100;
    users = maxItems
        ? users?.slice(0, Math.min(users?.length, maxItems))
        : users;
    // const creators =
    // 	!users ? state.lists.top.users.items : maxUsers;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title === undefined && ((0, jsx_runtime_1.jsx)(antd_1.Row, { style: { width: "100%" }, children: (0, jsx_runtime_1.jsx)("p", { className: "header-2 u-margin-bottom-medium", children: "Explore top creators" }) })), (0, jsx_runtime_1.jsxs)("div", { children: [maxItems && maxItems !== 100 ? ((0, jsx_runtime_1.jsx)(Title_1.default, { title: title, href: "/top/creators" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, jsx_runtime_1.jsx)("div", { className: "top-creators-wrapper", children: users?.map((creator) => ((0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "bg-hover  app-full-width", style: { alignItems: "center" }, children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { className: "top-creators-first-col", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${creator.username}`, children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...creator }), className: "avatar-image-top-creators" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { className: "top-creators-username", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${creator.username}`, children: (0, jsx_runtime_1.jsx)("p", { className: "header-1r font-variant-none", style: {
                                                        margin: "0",
                                                        textAlign: "center",
                                                    }, children: creator.username }) }) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { className: "top-creators-second-col", children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { className: "top-creators-number", children: (0, jsx_runtime_1.jsx)("p", { className: "header-1r top-creators-powered", style: {
                                                    margin: "0",
                                                    justifyContent: "end",
                                                    display: "flex",
                                                }, children: creator.powered }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { children: (0, jsx_runtime_1.jsx)(UserWidget_1.UserPowerup, { user: creator }) })] })] }))) })] })] }));
};
exports.CreatorsList = CreatorsList;
const Creators = (props) => {
    return (0, jsx_runtime_1.jsx)(exports.CreatorsList, { ...props });
};
exports.Creators = Creators;
const TopCreators = ({ maxItems }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const creators = maxItems ? state.lists.top.users.items.slice(0, maxItems) : state.lists.top.users.items;
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(exports.CreatorsList, { users: creators, maxItems: maxItems }), creators && (creators?.length || 0) < (maxItems || 100) && ((0, jsx_runtime_1.jsx)(LoadMore_1.LoadMore, { loadMore: () => actions.lists.top.users() }))] });
};
exports.TopCreators = TopCreators;
exports.default = exports.Creators;
//# sourceMappingURL=Creators.js.map