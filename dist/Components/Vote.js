import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { useEffects, useActions, useAppState } from "../overmind";
import { AppearingComponent } from "./Appearing";
import { ContentLayout } from "./ContentLayout";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
const preventEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    return false;
};
export const Vote = ({ 
// useVotingStream,
onDoneVoting, onLongDoneVoting, children, info, votingEnabled, }) => {
    const divMessage = useRef();
    const effects = useEffects();
    const actions = useActions();
    const state = useAppState();
    effects.ux.message.config({
        maxCount: 2,
        duration: 1,
        getContainer: () => divMessage.current,
    });
    useEffect(() => {
        actions.flows.rating.deepLikeInit();
        actions.ux.setLayout({ headerShown: false });
        return () => {
            actions.ux.setLayout({ headerShown: true });
        };
    }, []);
    useEffect(() => {
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
    return (_jsxs(ContentLayout, { isPost: true, header: _jsxs("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
            }, children: [_jsx("div", { className: "post-back-arrow", children: _jsx(LargeArrowBack, {}) }), _jsx("div", { ref: divMessage, style: { flex: 1 }, className: "post-notification-wrapper" }), votingEnabled !== false ? (_jsx(_Fragment, { children: state.flows.rating.value === 100 && (_jsx(AppearingComponent, { seconds: 5, onShow: onLongDoneVoting, children: _jsx("div", { className: "post-notification-wrapper ant-message-notice-content", children: "Tap spacebar to continue" }) })) })) : (state.flows.rating.isRating &&
                    !state.flows.rating.rated &&
                    !state.flows.rating.value && (_jsx(AppearingComponent, { seconds: 8, children: _jsx("div", { className: "post-notification-wrapper ant-message-notice-content", children: "Hold spacebar to vote" }) })))] }), info: info, children: [_jsx("div", { className: "flex-center nl-fullsize-image app-main-full-height-only post-img-wrapper", onMouseDown: touchClickVoteStart, onMouseUp: touchClickVoteStop, onTouchStart: touchClickVoteStart, onTouchEnd: touchClickVoteStop, onContextMenu: preventEvent, children: children }), true || state.flows.rating.isRating ? (_jsx("div", { className: "nl-rating-bar-wrapper", children: _jsx("div", { className: "nl-rating-bar", style: {
                        opacity: [0, 100].includes(state.flows.rating.value)
                            ? 0
                            : 100,
                        width: `${state.flows.rating.value || 0}vw`,
                    } }) })) : ("")] }));
};
//# sourceMappingURL=Vote.js.map