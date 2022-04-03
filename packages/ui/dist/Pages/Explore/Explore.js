"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Explore = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// import '../App.css';
var react_1 = require("react");
var ContentLayout_1 = require("../../Components/ContentLayout");
var Spotlights_1 = __importDefault(require("../../Components/Spotlights"));
var TopFolders_1 = __importDefault(require("../../Components/TopFolders"));
var Creators_1 = __importDefault(require("../../Components/Creators"));
var state_1 = require("@newcoin-foundation/state");
var Explore = function () {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var moods = state.lists.top.moods.items;
    (0, react_1.useEffect)(function () {
        !moods.length && actions.lists.top.moods();
    }, []);
    var users = state.lists.top.users.items;
    (0, react_1.useEffect)(function () {
        !users.length && actions.lists.top.users();
    }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { children: [(0, jsx_runtime_1.jsx)(Spotlights_1["default"], { title: "Spotlights", maxRows: 1, maxItems: 3 }), (0, jsx_runtime_1.jsx)(TopFolders_1["default"], { title: "Explore top folders", maxItems: 3, posts: "full" }), (0, jsx_runtime_1.jsx)(Creators_1["default"], { maxItems: 3, title: "Explore top creators", users: users }), (0, jsx_runtime_1.jsx)(TopFolders_1["default"], { title: "Explore more folders", maxItems: 3, skipItems: 3 })] }));
};
exports.Explore = Explore;
exports["default"] = exports.Explore;
