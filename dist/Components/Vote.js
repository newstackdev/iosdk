import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AppearingComponent } from "./Appearing";
import { Avatar, Col, Drawer, Form, Row } from "antd";
import { ContentImage } from "./Image";
import { ContentLayout } from "./ContentLayout";
import { EyeOpen } from "./Icons/EyeOpen";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { useEffect, useRef } from "react";
import { SelectMood } from "./SelectMood";
import { Share } from "./Share";
import { useVotingStreamMood } from "../Pages/Post/Post";
import { SmallFolder } from "./Icons/SmallFolder";
import { Tags } from "../Pages/Post/components/Tags";
import { useActions, useAppState, useEffects } from "../overmind";
import { useCachedUser } from "../hooks/useCached";
import PostReportModal from "../Pages/Post/components/PostModal";
import Title from "../Pages/Explore/Title";
import useMediaQuery from "../hooks/useMediaQuery";
const preventEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    return false;
};
export const Vote = ({ 
// useVotingStream,
onDoneVoting, onLongDoneVoting, children, info, votingEnabled, setVisible, visible, addToMoods, containerDeeplike, isEyeOpenedResponzive, visionTags, nonVisionTags, setHilightTag, setIsEyeOpenedResponzive, }) => {
    const divMessage = useRef();
    const divAppearingMessage = useRef();
    const effects = useEffects();
    const actions = useActions();
    const state = useAppState();
    const isResponzive = useMediaQuery("(max-width: 1024px)");
    const nextInStream = useVotingStreamMood();
    const { currPost } = nextInStream;
    const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });
    useEffect(() => {
        effects.ux.message.config({
            maxCount: 2,
            duration: 1,
            getContainer: () => divMessage?.current,
        });
        return effects.ux.message.config({
            getContainer: undefined,
        });
    }, []);
    useEffect(() => {
        if (votingEnabled)
            actions.flows.rating.deepLikeInit();
        actions.ux.setLayout({ headerShown: false });
        return () => {
            actions.ux.setLayout({ headerShown: true });
        };
    }, []);
    useEffect(() => {
        if (votingEnabled)
            actions.flows.rating.deepLikeInit();
    }, [state.routing.location]);
    useEffect(() => {
        const r = state.flows.rating;
        if (!r.isRating && !r.rated)
            return;
        if (r.rated && !r.value)
            return;
        if ((!r.isRating && r.rated) || r.value >= 100)
            onDoneVoting(r.value);
    }, [state.flows.rating.isRating, state.flows.rating.value]);
    const touchClickVoteStart = (e) => {
        // preventEvent(e);
        actions.flows.rating.deepLikeStart({ event: e.nativeEvent });
    };
    const touchClickVoteStop = (e) => {
        preventEvent(e);
        actions.flows.rating.deepLikeStop();
    };
    return (_jsxs(ContentLayout, { isVote: true, header: _jsxs("div", { className: "post-header-wrapper", children: [_jsx("div", { className: "logo-left-top", children: _jsx(LargeArrowBack, {}) }), state.flows.rating.value === 100 && (_jsx(AppearingComponent, { seconds: 5, onShow: onLongDoneVoting, children: _jsx("div", { ref: divAppearingMessage, className: "post-notification-wrapper ant-message-notice-content", children: "Tap spacebar to continue" }) })), state.flows.rating.isRating && !state.flows.rating.rated && !state.flows.rating.value && (_jsx(AppearingComponent, { seconds: 8, children: _jsx("div", { ref: divAppearingMessage, className: "post-notification-wrapper ant-message-notice-content", children: "Hold spacebar to vote" }) })), _jsx("div", { ref: divMessage, style: { flex: 1 }, className: "post-notification-wrapper" })] }), info: _jsxs(_Fragment, { children: [isResponzive && visionTags && nonVisionTags && setHilightTag ? (_jsxs("div", { style: { display: "flex", flex: 1, flexDirection: "column" }, children: [isEyeOpenedResponzive && (_jsx(Row, { className: "nl-post-info-column__infobox-wrapper", children: _jsxs(Col, { className: "nl-post-info-column__infobox-wrapper__col", children: [_jsx("span", { className: "u-margin-left-small cursor-pointer", onClick: () => {
                                            setHilightTag([]);
                                            setIsEyeOpenedResponzive(false);
                                            setVisible(true);
                                        }, onMouseOver: () => setHilightTag(visionTags), onMouseOut: () => setHilightTag([]), children: _jsx(EyeOpen, {}) }), _jsx("span", { onClick: () => {
                                            setIsEyeOpenedResponzive(false);
                                            setVisible(true);
                                        }, children: _jsx(SmallFolder, {}) }), _jsx(Share, { currentPostProps: currPost }), _jsx(PostReportModal, {})] }) })), _jsx("div", { className: "nl-post-fake-drawer-wrapper", onClick: () => {
                                state.flows.rating.value === 100 && !isEyeOpenedResponzive && setVisible((p) => !p);
                            }, children: _jsx(Tags, { isEyeOpenedResponzive: isEyeOpenedResponzive, visionTags: visionTags, nonVisionTags: nonVisionTags, setHilightTag: setHilightTag, children: _jsxs(_Fragment, { children: [_jsxs(Row, { className: "nl-post-fake-drawer__username", children: [_jsx(Avatar, { src: _jsx(ContentImage, { ...author }), className: "u-margin-right-small" }), author?.username && _jsx("p", { className: "paragraph-1r", children: author.username })] }), _jsx("div", { hidden: state.flows.rating.value !== 100, children: _jsx("div", { className: "nl-post-fake-drawer", children: _jsx("div", { className: "nl-post-fake-inner-line-drawer", children: "\u00A0" }) }) })] }) }) })] })) : (info), _jsx("div", { hidden: state.flows.rating.value !== 100, className: "nl-post-deeplike-mobile-wrapper", children: _jsxs(Drawer
                    //@ts-ignore
                    , { 
                        //@ts-ignore
                        getContainer: isResponzive ? false : containerDeeplike?.current, placement: "bottom", size: "large", style: { position: "absolute" }, visible: visible, closable: false, contentWrapperStyle: {
                            padding: "20px",
                        }, children: [isResponzive ? info : null, _jsxs(Form, { className: "app-main-full-width", onFinish: addToMoods, children: [_jsx(Title, { title: "Save to a folder", deeplikeActions: true, setVisible: setVisible, visible: visible }), _jsx(Form.Item, { name: "moods", style: { margin: 0 }, children: _jsx(SelectMood, { deeplikeActions: true }) })] })] }) })] }), children: [_jsx("div", { className: "flex-center nl-fullsize-image app-main-full-height-only nl-post-img-wrapper", onMouseDown: touchClickVoteStart, onMouseUp: touchClickVoteStop, onTouchStart: touchClickVoteStart, onTouchEnd: touchClickVoteStop, onContextMenu: preventEvent, children: children }), true || state.flows.rating.isRating ? (_jsx("div", { className: "nl-rating-bar-wrapper", children: _jsx("div", { className: "nl-rating-bar", style: {
                        opacity: [0, 100].includes(state.flows.rating.value) ? 0 : 100,
                        width: `${state.flows.rating.value || 0}vw`,
                    } }) })) : ("")] }));
};
//# sourceMappingURL=Vote.js.map