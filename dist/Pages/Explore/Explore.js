"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Explore = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// import '../App.css';
const react_1 = require("react");
const overmind_1 = require("../../overmind");
const Spotlights_1 = __importDefault(require("../../Components/Spotlights"));
const TopFolders_1 = __importDefault(require("../../Components/TopFolders"));
const Creators_1 = require("../../Components/Creators");
const Explore = () => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const moods = state.lists.top.moods.items;
    (0, react_1.useEffect)(() => {
        !moods.length && actions.lists.top.moods();
    }, []);
    const users = state.lists.top.users.items;
    (0, react_1.useEffect)(() => {
        !users.length && actions.lists.top.users();
    }, []);
    // return <ItemGrid items={moods} render={m => <MoodWidget mood={m} />} loadMore={actions.lists.top.moods} />
    return ((0, jsx_runtime_1.jsxs)("div", { className: "explore-page-wrapper", children: [(0, jsx_runtime_1.jsx)(Spotlights_1.default, { title: "Spotlights", maxRows: 1, maxItems: 3 }), (0, jsx_runtime_1.jsx)(TopFolders_1.default, { title: "Explore top folders", maxItems: 3, posts: "full" }), (0, jsx_runtime_1.jsx)(Creators_1.TopCreators, { maxItems: 3, title: "Explore top creators", users: users }), (0, jsx_runtime_1.jsx)(TopFolders_1.default, { title: "Explore more folders", maxItems: 3, skipItems: 3 })] }));
};
exports.Explore = Explore;
exports.default = exports.Explore;
//# sourceMappingURL=Explore.js.map