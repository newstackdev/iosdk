import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect } from "react";
import { TopCreators } from "../../Components/Creators";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import TopHashtags from "../../Components/TopHashtags";
export const Explore = () => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const moods = state.lists.top.moods.items;
    useEffect(() => {
        !moods.length && actions.lists.top.moods({});
    }, []);
    // const users = state.lists.top.users.items;
    // useEffect(() => {
    //   !users.length && actions.lists.top.users();
    // }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return (_jsxs("div", { className: "explore-page-wrapper", children: [_jsx(Spotlights, { title: "Spotlights", maxRows: 1, maxItems: 10, carousel: true }), _jsx(TopFolders, { title: "Explore top folders", maxItems: 3, maxPostsToShow: 5, posts: "full", filterToSameNumberPosts: true, enableScrollForMoreMoods: false }), _jsx(TopCreators, { maxItems: 4, title: "Explore top creators", users: [], to: "/top/creators" }), _jsx(TopHashtags, { maxItems: 3, title: "Explore top hashtags" }), _jsx(TopFolders, { title: "Explore more folders", maxItems: 3, maxPostsToShow: 5, skipItems: 3, filterToSameNumberPosts: true, posts: "full", enableScrollForMoreMoods: false })] }));
};
export default Explore;
//# sourceMappingURL=Explore.js.map