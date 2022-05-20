import { jsx as _jsx } from "react/jsx-runtime";
// import '../App.css';
import { useEffect } from "react";
import { useActions, useAppState } from "../../overmind";
// import { ItemGrid } from "../Components/ItemGrid";
// import FolderClosed from '../Components/Icons/Folder/Closed';
// import { MoodsGrid } from './Mood/MoodsGrid';
export const UserTop = () => {
    const state = useAppState();
    const actions = useActions();
    const users = state.lists.top.users.items;
    useEffect(() => {
        !users.length && actions.lists.top.users();
    }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return (_jsx("div", { className: "app-main-full-width", children: _jsx("h1", { children: "Top users today" }) }));
};
//loadMore={actions.lists.top.moods} />
export default UserTop;
//# sourceMappingURL=Top.js.map