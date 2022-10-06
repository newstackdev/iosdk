import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Avatar from "antd/lib/avatar/avatar";
// import { PremiumContent } from "../Components/PremiumContent";
import { ContentImage } from "../../Components/Image";
import { ContentLayout } from "../../Components/ContentLayout";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import { MoodsGridRow } from "./MoodsGrid";
import { Share } from "../../Components/Share";
import { TopFoldersGrid } from "../../Components/TopFolders";
import { useActions, useAppState } from "../../overmind";
import { useCachedMood, useCachedMoodPosts, useCachedPool, useCachedUser } from "../../hooks/useCached";
import { useFolderStakeInfo } from "../../hooks/useBlockchainInfo";
import { useEffect } from "react";
import { useVotingStreamMood } from "../Post/Post";
import PostReportModal from "../Post/components/PostModal";
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
export const Mood = () => {
    const { moodId: id } = useParams();
    const mood = useCachedMoodPosts({ id }, true);
    const moodDetails = useCachedMood({ id }, true);
    const user = useCachedUser(mood.author);
    const state = useAppState();
    const actions = useActions();
    const pool = useCachedPool({ owner: user.username });
    const stakeInfo = useFolderStakeInfo(moodDetails);
    const nextInStream = useVotingStreamMood(); //useVotingStreamTags();
    const { currPost } = nextInStream;
    // hide header
    useEffect(() => {
        actions.ux.setLayout({ headerShown: false });
        actions.ux.setFooterVisibility({ footerShown: false });
        return () => {
            actions.ux.setLayout({ headerShown: false });
            actions.ux.setFooterVisibility({ footerShown: true });
        };
    }, []);
    // {
    // 	..._stakeInfo,
    // 	currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
    // 	currency: `${user.username?.toUpperCase()}`,
    // 	currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
    // }
    // if(true)
    // 	return <>{JSON.stringify(moodDetails.stakeToAccess)}</>
    return (_jsx(ContentLayout, { position: "top", isMood: true, isWorking: !mood?.posts?.length, header: _jsx(Link, { to: "/explore", children: _jsx("div", { className: "logo-left-top", style: { padding: "0px 20px" }, children: _jsx(state.config.components.icons.Logo, {}) }) }), info: _jsxs(Row, { className: "nl-post-info-column", children: [_jsxs(Col, { style: {
                        alignItems: "center",
                        display: "flex",
                    }, children: [_jsx(Link, { to: `/user/${user.username}`, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: "avatar-image-header" }) }), _jsx(Link, { to: `/user/${user.username}`, className: "paragraph-1b u-margin-left-medium", children: user.username })] }), _jsxs(Col, { children: [_jsx("p", { className: "paragraph-2b", children: moodDetails.title }), _jsx("p", { className: "paragraph-2r", style: { wordBreak: "break-all" }, children: moodDetails.description || "" })] }), _jsx(Col, { children: stakeInfo.toAccess ? (!stakeInfo.currentUserEligible ? (_jsxs("span", { children: [_jsx("hr", {}), _jsx("p", { className: "paragraph-2r", children: _jsxs(_Fragment, { children: ["This content is accessible only to members of ", user.username, " dao.", _jsx("br", {}), _jsx("br", {}), _jsxs("div", { children: ["Stake to access: ", stakeInfo.toAccess || "", " "] }), _jsxs("div", { children: ["Your stake: ", stakeInfo.currentUserStake] }), _jsxs("div", { children: ["Stake to enter: ", stakeInfo.currentUserNeeds] })] }) })] })) : (_jsxs("span", { children: [_jsx("hr", {}), "You are eligible to access this premium folder"] }))) : (_jsx(_Fragment, {})) }), _jsx(Row, { style: { flex: 1 } }), _jsx(Row, { className: "nl-post-info-column__infobox-wrapper", children: _jsxs(Col, { className: "nl-post-info-column__infobox-wrapper__col", children: [_jsx(LargeArrowBack, {}), _jsx(Share, { currentPostProps: currPost }), _jsx(PostReportModal, {})] }) })] }), children: _jsx(TopFoldersGrid, { mood: mood, noFolder: true, title: "Moods" }) }));
};
export const MoodDetailed = () => {
    const { moodId: id } = useParams();
    const mood = useCachedMood({ id }, true);
    const user = useCachedUser(mood.author);
    return (_jsxs(ContentLayout, { isWorking: !mood?.posts?.length, children: [_jsx("h2", { className: "header-2", children: mood.title }), _jsx(Link, { to: `/user/${user.username}`, children: user.username }), _jsx("p", { children: mood.description }), _jsx("br", {}), _jsx(MoodsGridRow, { mood: mood, noFolder: true, wrap: true })] }));
};
//# sourceMappingURL=Mood.js.map