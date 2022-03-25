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
exports.SearchCreativePost = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Vote_1 = require("../Components/Vote");
var overmind_1 = require("../overmind");
var SearchCreative_1 = require("./SearchCreative");
var antd_1 = require("antd");
var react_1 = require("react");
var Spin_1 = require("../Components/Spin");
var SearchCreativePost = function () {
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var effects = (0, overmind_1.useEffects)();
    var _a = (0, SearchCreative_1.useCreativeSearchQuery)(), tags = _a.tags, aesthetics = _a.aesthetics, index = _a.index;
    (0, react_1.useEffect)(function () {
        if (!state.lists.creativeSearch.results.items.length) {
            actions.lists.creativeSearch({ tags: tags, aesthetics: aesthetics });
        }
    }, []);
    var item = state.lists.creativeSearch.results.items[index];
    var doneVoting = function (vote) {
        effects.ux.message.info("Voted at ".concat(vote));
        actions.routing.historyPush({ location: "/search-creative/vote?tags=".concat(tags, "&aesthetics=").concat(aesthetics, "&index=").concat(index + 1) });
    };
    if (!item)
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    return (0, jsx_runtime_1.jsx)(Vote_1.Vote
    // useVotingStream={useVotingStreamMood}
    , __assign({ 
        // useVotingStream={useVotingStreamMood}
        onDoneVoting: doneVoting, info: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.entries(item.aesthetics || []).map(function (a) {
                return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: a[0] }), (0, jsx_runtime_1.jsx)(antd_1.Progress, { strokeColor: "#c1fa50", percent: a[1] * 100 })] });
            }) }) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, src: item.image }) }));
};
exports.SearchCreativePost = SearchCreativePost;
//# sourceMappingURL=SearchCreativePost.js.map