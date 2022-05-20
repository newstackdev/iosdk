import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import '../App.css';
import { useEffect } from "react";
import { useActions, useAppState } from "../../overmind";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import { TopCreators } from "../../Components/Creators";
export const Explore = () => {
    const state = useAppState();
    const actions = useActions();
    const moods = state.lists.top.moods.items;
    useEffect(() => {
        !moods.length && actions.lists.top.moods();
    }, []);
    const users = state.lists.top.users.items;
    useEffect(() => {
        !users.length && actions.lists.top.users();
    }, []);
    // if(true)
    // 	return <NewcoinRecept visible={true} tx="hello">Here is your receipt</NewcoinRecept>;
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return (_jsxs("div", { className: "explore-page-wrapper", children: [_jsx(Spotlights, { title: "Spotlights", maxRows: 1, maxItems: 3 }), _jsx(TopFolders, { title: "Explore top folders", maxItems: 3, posts: "full" }), _jsx(TopCreators, { maxItems: 3, title: "Explore top creators", users: users }), _jsx(TopFolders, { title: "Explore more folders", maxItems: 3, skipItems: 3 })] }));
};
export default Explore;
//# sourceMappingURL=Explore.js.map