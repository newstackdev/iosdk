import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, Progress } from "antd";
import { Spin } from "../Components/Spin";
import { Vote } from "../Components/Vote";
import { useActions, useAppState, useEffects } from "../overmind";
import { useCreativeSearchQuery } from "./SearchCreative";
import { useEffect } from "react";
export const SearchCreativePost = () => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const { tags, aesthetics, index } = useCreativeSearchQuery();
    useEffect(() => {
        if (!state.lists.creativeSearch.results.items.length) {
            actions.lists.creativeSearch({ tags, aesthetics });
        }
    }, []);
    const item = state.lists.creativeSearch.results.items[index];
    const doneVoting = (vote) => {
        effects.ux.message.info(`Voted at ${vote}`);
        actions.routing.historyPush({
            location: `/search-creative/vote?tags=${tags}&aesthetics=${aesthetics}&index=${index + 1}`,
        });
    };
    if (!item)
        return _jsx(Spin, {});
    return (_jsx(Vote
    // useVotingStream={useVotingStreamMood}
    , { 
        // useVotingStream={useVotingStreamMood}
        onDoneVoting: doneVoting, info: _jsx(_Fragment, { children: Object.entries(item.aesthetics || []).map((a) => (_jsxs(_Fragment, { children: [_jsx("div", { children: a[0] }), _jsx(Progress, { strokeColor: "#c1fa50", percent: a[1] * 100 })] }))) }), children: _jsx(Image, { preview: false, src: item.image }) }));
};
//# sourceMappingURL=SearchCreativePost.js.map