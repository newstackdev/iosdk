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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTop = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// import '../App.css';
var react_1 = require("react");
var overmind_1 = require("../../overmind");
// import { ItemGrid } from "../Components/ItemGrid";
// import FolderClosed from '../Components/Icons/Folder/Closed';
// import { MoodsGrid } from './Mood/MoodsGrid';
var UserTop = function () {
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var users = state.lists.top.users.items;
    (0, react_1.useEffect)(function () {
        !users.length && actions.lists.top.users();
    }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "app-main-full-width" }, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Top users today" }) })));
};
exports.UserTop = UserTop;
//loadMore={actions.lists.top.moods} />
exports.default = exports.UserTop;
//# sourceMappingURL=Top.js.map