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
exports.MoodDetailed = exports.Mood = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var hooks_1 = require("@newcoin-foundation/hooks");
var state_1 = require("@newcoin-foundation/state");
var antd_1 = require("antd");
var avatar_1 = __importDefault(require("antd/lib/avatar/avatar"));
var react_router_1 = require("react-router");
var react_router_dom_1 = require("react-router-dom");
var Components_1 = require("src/Components");
var Icons_1 = require("src/Components/Icons");
var MediaComponents_1 = require("src/Components/MediaComponents");
var ThreeDots_1 = require("../../Components/Icons/ThreeDots");
var TopFolders_1 = require("../../Components/TopFolders");
var MoodsGrid_1 = require("./MoodsGrid");
var Mood = function () {
    var _a, _b;
    var id = (0, react_router_1.useParams)().moodId;
    var mood = (0, hooks_1.useCachedMoodPosts)({ id: id }, true);
    var user = (0, hooks_1.useCachedUser)(mood.author);
    var state = (0, state_1.useAppState)();
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "section-divider" }, { children: (0, jsx_runtime_1.jsx)(Components_1.ContentLayout, __assign({ isWorking: !((_a = mood === null || mood === void 0 ? void 0 : mood.posts) === null || _a === void 0 ? void 0 : _a.length), header: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: {
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "40px"
                        } }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ style: {
                                    alignItems: "center",
                                    display: "flex"
                                } }, { children: [(0, jsx_runtime_1.jsx)(Icons_1.SmallArrowBack, {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat((_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.username), style: { marginLeft: "10px" } }, { children: (0, jsx_runtime_1.jsx)(avatar_1["default"], { src: (0, jsx_runtime_1.jsx)(MediaComponents_1.MediaComponent, __assign({}, user)), className: "avatar-image-header" }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(user.username), className: "paragraph-1b", style: { marginLeft: "20px" } }, { children: user.username }))] })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ style: {
                                    alignItems: "center",
                                    display: "flex"
                                } }, { children: (0, jsx_runtime_1.jsx)(ThreeDots_1.ThreeDots, {}) }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ style: { marginBottom: "40px" } }, { children: [(0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2b" }, { children: mood.title })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2r" }, { children: mood.description || "" }))] }))] }), isMood: true }, { children: (0, jsx_runtime_1.jsx)(TopFolders_1.TopFoldersGrid, { mood: mood, noFolder: true, postNumber: 3, title: "Moods" }) })) })));
};
exports.Mood = Mood;
var MoodDetailed = function () {
    var _a;
    var id = (0, react_router_1.useParams)().moodId;
    var mood = (0, hooks_1.useCachedMood)({ id: id }, true);
    var user = (0, hooks_1.useCachedUser)(mood.author);
    return ((0, jsx_runtime_1.jsxs)(Components_1.ContentLayout, __assign({ isWorking: !((_a = mood === null || mood === void 0 ? void 0 : mood.posts) === null || _a === void 0 ? void 0 : _a.length) }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "header-2" }, { children: mood.title })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(user.username) }, { children: user.username })), (0, jsx_runtime_1.jsx)("p", { children: mood.description }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(MoodsGrid_1.MoodsGridRow, { mood: mood, noFolder: true, wrap: true })] })));
};
exports.MoodDetailed = MoodDetailed;
