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
exports.__esModule = true;
exports.UserTop = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var state_1 = require("@newcoin-foundation/state");
var react_1 = require("react");
var UserTop = function () {
    var state = (0, state_1.useAppState)();
    var actions = (0, state_1.useActions)();
    var users = state.lists.top.users.items;
    (0, react_1.useEffect)(function () {
        !users.length && actions.lists.top.users();
    }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "app-main-full-width" }, { children: (0, jsx_runtime_1.jsx)("h1", { children: "Top users today" }) })));
};
exports.UserTop = UserTop;
//loadMore={actions.lists.top.moods} />
exports["default"] = exports.UserTop;
