"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var react_1 = require("react");
var overmind_1 = require("../overmind");
var Appearing_1 = require("./Appearing");
var ContentLayout_1 = require("./ContentLayout");
var LargeArrowBack_1 = require("./Icons/LargeArrowBack");
var preventEvent = function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    return false;
};
var Vote = function (_a) {
    var 
    // useVotingStream,
    onDoneVoting = _a.onDoneVoting, onLongDoneVoting = _a.onLongDoneVoting, children = _a.children, info = _a.info, votingEnabled = _a.votingEnabled;
    var divMessage = (0, react_1.useRef)();
    var effects = (0, overmind_1.useEffects)();
    var actions = (0, overmind_1.useActions)();
    var state = (0, overmind_1.useAppState)();
    effects.ux.message.config({
        maxCount: 2,
        duration: 1,
        getContainer: function () { return divMessage.current; },
    });
    (0, react_1.useEffect)(function () {
        actions.flows.rating.deepLikeInit();
    }, []);
    (0, react_1.useEffect)(function () {
        actions.flows.rating.deepLikeInit();
    }, [state.routing.location]);
    (0, react_1.useEffect)(function () {
        var r = state.flows.rating;
        if (!r.isRating && !r.rated)
            return;
        if (r.rated && !r.value)
            return;
        if ((!r.isRating && r.rated) || r.value >= 100)
            onDoneVoting(r.value);
    }, [state.flows.rating.isRating, state.flows.rating.value]);
    var touchClickVoteStart = function (e) {
        // preventEvent(e);
        actions.flows.rating.deepLikeStart({ event: e.nativeEvent });
    };
    var touchClickVoteStop = function (e) {
        preventEvent(e);
        actions.flows.rating.deepLikeStop();
    };
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "100%", marginTop: "25px" } }, { children: (0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, __assign({ isPost: true, header: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "post-back-arrow" }, { children: (0, jsx_runtime_1.jsx)(LargeArrowBack_1.LargeArrowBack, {}) })), (0, jsx_runtime_1.jsx)("div", { ref: divMessage, style: { flex: 1 }, className: "post-notification-wrapper" })] }), info: info }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex-center nl-fullsize-image app-main-full-height-only post-img-wrapper", onMouseDown: touchClickVoteStart, onMouseUp: touchClickVoteStop, onTouchStart: touchClickVoteStart, onTouchEnd: touchClickVoteStop, onContextMenu: preventEvent }, { children: [children, votingEnabled !== false ?
                            (0, jsx_runtime_1.jsx)("div", __assign({ className: "appearing-spacebar-button" }, { children: state.flows.rating.isRating &&
                                    !state.flows.rating.rated &&
                                    !state.flows.rating.value ? ((0, jsx_runtime_1.jsx)(Appearing_1.AppearingComponent, __assign({ seconds: 5 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ style: { margin: "40px 0" }, type: "primary" }, { children: "Hold spacebar to vote" })) }))) : state.flows.rating.value === 100 ? ((0, jsx_runtime_1.jsx)(Appearing_1.AppearingComponent, __assign({ seconds: 5, onShow: onLongDoneVoting }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ style: { margin: "40px 0", width: "330px" }, type: "primary" }, { children: "Tap spacebar to Continue" })) }))) : ((0, jsx_runtime_1.jsx)("div", { style: { margin: "40px 0", height: "45px" } })) })) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})] })), true || state.flows.rating.isRating ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "nl-rating-bar-wrapper" }, { children: (0, jsx_runtime_1.jsx)("div", { className: "nl-rating-bar", style: {
                            opacity: [0, 100].includes(state.flows.rating.value)
                                ? 0
                                : 100,
                            width: "".concat(state.flows.rating.value || 0, "vw"),
                        } }) }))) : ("")] })) })));
};
exports.Vote = Vote;
//# sourceMappingURL=Vote.js.map