import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AppearingComponent } from "./Appearing";
import { ContentLayout } from "./ContentLayout";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useActions, useAppState, useEffects } from "../overmind";
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
    useEffect(() => {
        effects.ux.message.config({
            maxCount: 2,
            duration: 1,
            getContainer: () => divMessage.current,
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
    return (_jsxs(ContentLayout, { isVote: true, header: _jsxs("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
            }, children: [_jsx(Link, { to: "/explore", children: _jsx("div", { className: "logo-left-top", style: { padding: "0px 20px" }, children: _jsx(state.config.components.icons.Logo, {}) }) }), _jsx("div", { ref: divMessage, style: { flex: 1 }, className: "post-notification-wrapper" }), votingEnabled !== false ? (_jsx(_Fragment, { children: state.flows.rating.value === 100 && (_jsx(AppearingComponent, { seconds: 5, onShow: onLongDoneVoting, children: _jsx("div", { className: "post-notification-wrapper ant-message-notice-content", children: "Tap spacebar to continue" }) })) })) : (state.flows.rating.isRating &&
                    !state.flows.rating.rated &&
                    !state.flows.rating.value && (_jsx(AppearingComponent, { seconds: 8, children: _jsx("div", { className: "post-notification-wrapper ant-message-notice-content", children: "Hold spacebar to vote" }) })))] }), info: info, children: [_jsx("div", { className: "nl-fullsize-image-container", children: _jsx("div", { className: "flex-center nl-fullsize-image app-main-full-height-only nl-post-img-wrapper", onMouseDown: touchClickVoteStart, onMouseUp: touchClickVoteStop, onTouchStart: touchClickVoteStart, onTouchEnd: touchClickVoteStop, onContextMenu: preventEvent, children: children }) }), true || state.flows.rating.isRating ? (_jsx("div", { className: "nl-rating-bar-wrapper", children: _jsx("div", { className: "nl-rating-bar", style: {
                        opacity: [0, 100].includes(state.flows.rating.value) ? 0 : 100,
                        width: `${state.flows.rating.value || 0}vw`,
                    } }) })) : ("")] }));
};
//# sourceMappingURL=Vote.js.map