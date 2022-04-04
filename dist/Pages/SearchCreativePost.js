"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCreativePost = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Vote_1 = require("../Components/Vote");
const overmind_1 = require("../overmind");
const SearchCreative_1 = require("./SearchCreative");
const antd_1 = require("antd");
const react_1 = require("react");
const Spin_1 = require("../Components/Spin");
const SearchCreativePost = () => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const effects = (0, overmind_1.useEffects)();
    const { tags, aesthetics, index } = (0, SearchCreative_1.useCreativeSearchQuery)();
    (0, react_1.useEffect)(() => {
        if (!state.lists.creativeSearch.results.items.length) {
            actions.lists.creativeSearch({ tags, aesthetics });
        }
    }, []);
    const item = state.lists.creativeSearch.results.items[index];
    const doneVoting = (vote) => {
        effects.ux.message.info(`Voted at ${vote}`);
        actions.routing.historyPush({ location: `/search-creative/vote?tags=${tags}&aesthetics=${aesthetics}&index=${index + 1}` });
    };
    if (!item)
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    return (0, jsx_runtime_1.jsx)(Vote_1.Vote
    // useVotingStream={useVotingStreamMood}
    , { 
        // useVotingStream={useVotingStreamMood}
        onDoneVoting: doneVoting, info: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.entries(item.aesthetics || []).map(a => (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: a[0] }), (0, jsx_runtime_1.jsx)(antd_1.Progress, { strokeColor: "#c1fa50", percent: a[1] * 100 })] })) }), children: (0, jsx_runtime_1.jsx)(antd_1.Image, { preview: false, src: item.image }) });
};
exports.SearchCreativePost = SearchCreativePost;
//# sourceMappingURL=SearchCreativePost.js.map