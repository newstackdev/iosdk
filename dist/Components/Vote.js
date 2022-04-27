"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const react_1 = require("react");
const overmind_1 = require("../overmind");
const Appearing_1 = require("./Appearing");
const ContentLayout_1 = require("./ContentLayout");
const LargeArrowBack_1 = require("./Icons/LargeArrowBack");
const preventEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    return false;
};
const Vote = ({ 
// useVotingStream,
onDoneVoting, onLongDoneVoting, children, info, votingEnabled, }) => {
    const divMessage = (0, react_1.useRef)();
    const effects = (0, overmind_1.useEffects)();
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    effects.ux.message.config({
        maxCount: 2,
        duration: 1,
        getContainer: () => divMessage.current,
    });
    (0, react_1.useEffect)(() => {
        actions.flows.rating.deepLikeInit();
        actions.ux.setLayout({ headerShown: false });
        return () => {
            actions.ux.setLayout({ headerShown: true });
        };
    }, []);
    (0, react_1.useEffect)(() => {
        actions.flows.rating.deepLikeInit();
    }, [state.routing.location]);
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { isPost: true, header: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
            }, children: [(0, jsx_runtime_1.jsx)("div", { className: "post-back-arrow", children: (0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}) }), state.flows.rating.isRating &&
                    !state.flows.rating.rated &&
                    !state.flows.rating.value ? ((0, jsx_runtime_1.jsx)(Appearing_1.AppearingComponent, { seconds: 8, children: (0, jsx_runtime_1.jsx)("div", { className: "post-notification-wrapper ant-message-notice-content", children: "Hold spacebar to vote" }) })) : ((0, jsx_runtime_1.jsx)("div", { ref: divMessage, style: { flex: 1 }, className: "post-notification-wrapper" }))] }), info: info, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-center nl-fullsize-image app-main-full-height-only post-img-wrapper", onMouseDown: touchClickVoteStart, onMouseUp: touchClickVoteStop, onTouchStart: touchClickVoteStart, onTouchEnd: touchClickVoteStop, onContextMenu: preventEvent, children: [children, votingEnabled !== false ? ((0, jsx_runtime_1.jsx)("div", { className: "appearing-spacebar-button", children: state.flows.rating.value === 100 && ((0, jsx_runtime_1.jsx)(Appearing_1.AppearingComponent, { seconds: 5, onShow: onLongDoneVoting, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { style: {
                                    margin: "40px 0",
                                    width: "330px",
                                }, type: "primary", children: "Tap spacebar to Continue" }) })) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] }), true || state.flows.rating.isRating ? ((0, jsx_runtime_1.jsx)("div", { className: "nl-rating-bar-wrapper", children: (0, jsx_runtime_1.jsx)("div", { className: "nl-rating-bar", style: {
                        opacity: [0, 100].includes(state.flows.rating.value)
                            ? 0
                            : 100,
                        width: `${state.flows.rating.value || 0}vw`,
                    } }) })) : ("")] }));
};
exports.Vote = Vote;
//# sourceMappingURL=Vote.js.map