"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTop = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// import '../App.css';
const react_1 = require("react");
const overmind_1 = require("../../overmind");
// import { ItemGrid } from "../Components/ItemGrid";
// import FolderClosed from '../Components/Icons/Folder/Closed';
// import { MoodsGrid } from './Mood/MoodsGrid';
const UserTop = () => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const users = state.lists.top.users.items;
    (0, react_1.useEffect)(() => {
        !users.length && actions.lists.top.users();
    }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return ((0, jsx_runtime_1.jsx)("div", { className: "app-main-full-width", children: (0, jsx_runtime_1.jsx)("h1", { children: "Top users today" }) }));
};
exports.UserTop = UserTop;
//loadMore={actions.lists.top.moods} />
exports.default = exports.UserTop;
//# sourceMappingURL=Top.js.map