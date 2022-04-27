"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodDetailed = exports.Mood = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const avatar_1 = __importDefault(require("antd/lib/avatar/avatar"));
const react_router_1 = require("react-router");
const react_router_dom_1 = require("react-router-dom");
// import { PremiumContent } from "../Components/PremiumContent";
const useBlockchainInfo_1 = require("../../hooks/useBlockchainInfo");
const ContentLayout_1 = require("../../Components/ContentLayout");
const ThreeDots_1 = require("../../Components/Icons/ThreeDots");
const Image_1 = require("../../Components/Image");
const TopFolders_1 = require("../../Components/TopFolders");
const useCached_1 = require("../../hooks/useCached");
const overmind_1 = require("../../overmind");
const MoodsGrid_1 = require("./MoodsGrid");
// const useFolderStakeInfo = (folder: MoodReadResponse) => {
// 	const moodDetails = useCachedMood(folder, true);
// 	const state = useAppState();
// 	const user = useCachedUser(folder.author);
// 	const pool = useCachedPool({ owner: user.username })
// 	const _stakeInfo = {
// 		toAccess: moodDetails.stakeToAccess || 0,
// 		currentUserStake: (state.newcoin.pools[pool.code] || 0) / 1000,
// 	}
// 	return {
// 		..._stakeInfo,
// 		currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
// 		currency: `${user.username?.toUpperCase()}`,
// 		currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
// 	};
// };
const Mood = () => {
    const { moodId: id } = (0, react_router_1.useParams)();
    const mood = (0, useCached_1.useCachedMoodPosts)({ id }, true);
    const moodDetails = (0, useCached_1.useCachedMood)({ id }, true);
    const user = (0, useCached_1.useCachedUser)(mood.author);
    const state = (0, overmind_1.useAppState)();
    const pool = (0, useCached_1.useCachedPool)({ owner: user.username });
    const stakeInfo = (0, useBlockchainInfo_1.useFolderStakeInfo)(moodDetails);
    // {
    // 	..._stakeInfo,
    // 	currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
    // 	currency: `${user.username?.toUpperCase()}`,
    // 	currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
    // }
    // if(true)
    // 	return <>{JSON.stringify(moodDetails.stakeToAccess)}</>
    return ((0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { isWorking: !mood?.posts?.length, header: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { style: {
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "40px",
                    }, children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, { style: {
                                alignItems: "center",
                                display: "flex",
                            }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                        marginRight: "10px",
                                        display: "flex",
                                    } }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${state.api.auth.user?.username}`, style: { marginLeft: "10px" }, children: (0, jsx_runtime_1.jsx)(avatar_1.default, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...user }), className: "avatar-image-header" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${user.username}`, className: "paragraph-1b", style: { marginLeft: "20px" }, children: user.username })] }), (0, jsx_runtime_1.jsx)(antd_1.Col, { style: {
                                alignItems: "center",
                                display: "flex",
                            }, children: (0, jsx_runtime_1.jsx)(ThreeDots_1.ThreeDots, {}) })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { style: { marginBottom: "40px" }, children: [(0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b", children: moodDetails.title }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: moodDetails.description || "" })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: stakeInfo.toAccess ?
                        (!stakeInfo.currentUserEligible ?
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("hr", {}), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["This content is accessible only to members of ", user.username, " dao.", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("div", { children: ["Stake to access: ", stakeInfo.toAccess || "", " "] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Your stake: ", stakeInfo.currentUserStake] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Stake to enter: ", stakeInfo.currentUserNeeds] })] }) })] })
                            : (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("hr", {}), "You are eligible to access this premium folder"] }))
                        : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) })] }), isMood: true, children: (0, jsx_runtime_1.jsx)(TopFolders_1.TopFoldersGrid, { mood: mood, noFolder: true, postNumber: 3, title: "Moods" }) }));
};
exports.Mood = Mood;
const MoodDetailed = () => {
    const { moodId: id } = (0, react_router_1.useParams)();
    const mood = (0, useCached_1.useCachedMood)({ id }, true);
    const user = (0, useCached_1.useCachedUser)(mood.author);
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { isWorking: !mood?.posts?.length, children: [(0, jsx_runtime_1.jsx)("h2", { className: "header-2", children: mood.title }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/user/${user.username}`, children: user.username }), (0, jsx_runtime_1.jsx)("p", { children: mood.description }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(MoodsGrid_1.MoodsGridRow, { mood: mood, noFolder: true, wrap: true })] }));
};
exports.MoodDetailed = MoodDetailed;
//# sourceMappingURL=Mood.js.map