import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import '../App.css';
import { ContentType } from "../../types";
import { TopCreators } from "../../Components/Creators";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect } from "react";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import TopHashtags from "../../Components/TopHashtags";
export const Explore = () => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const topMoods = state.lists.top.moods.items;
    const topUsers = state.lists.top.users.items;
    const topPosts = state.lists.top.posts.items;
    const topVideoPosts = state.lists.top.videoPosts.items;
    useEffect(() => {
        const loadAll = async () => {
            await Promise.all([actions.lists.top.moods({}), actions.lists.top.users(), actions.lists.top.posts()]);
            await actions.lists.top.posts(ContentType.video);
        };
        loadAll();
    }, []);
    // if(true)
    // 	return <NewcoinRecept visible={true} tx="hello">Here is your receipt</NewcoinRecept>;
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return (_jsxs("div", { className: "explore-page-wrapper", children: [_jsx(Spotlights, { title: "Spotlights", carousel: true, posts: topPosts, href: "top/spotlights" }), _jsx(TopFolders, { title: "Explore top folders", maxItems: 3, maxPostsToShow: 5, posts: "full", filterToSameNumberPosts: true, enableScrollForMoreMoods: false }), _jsx(TopCreators, { maxItems: 4, title: "Explore top creators", users: topUsers, to: "/top/creators" }), _jsx(Spotlights, { title: "Top videos", carousel: true, posts: topVideoPosts, href: "top/videos" }), _jsx(TopHashtags, { maxItems: 3, title: "Explore top hashtags" }), _jsx(TopFolders, { title: "Explore more folders", maxItems: 3, maxPostsToShow: 5, skipItems: 3, filterToSameNumberPosts: true, posts: "full", enableScrollForMoreMoods: false })] }));
};
export default Explore;
//# sourceMappingURL=Explore.js.map