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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_1 = require("react-router");
var antd_1 = require("antd");
var useCached_1 = require("../../hooks/useCached");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var overmind_1 = require("../../overmind");
var SelectMood_1 = require("../../Components/SelectMood");
var Spin_1 = require("../../Components/Spin");
var useForm_1 = __importDefault(require("antd/lib/form/hooks/useForm"));
var Ebene_1 = require("../../Components/Icons/Ebene");
var NTFIcon_1 = require("../../Components/Icons/NTFIcon");
var PostModal_1 = __importDefault(require("./PostModal"));
var Profile_1 = require("../Profile");
var Image_1 = require("../../Components/Image");
var Vote_1 = require("../../Components/Vote");
var Share_1 = require("../../Components/Share");
var overmind_2 = require("overmind");
var useVotingStreamMood = function () {
    var _a = (0, react_router_1.useParams)(), moodId = _a.moodId, postId = _a.postId, id = _a.id;
    var currPost = (0, useCached_1.useCachedPost)({ id: postId || id }, true);
    var currMood = (0, useCached_1.useCachedMood)({ id: moodId }, true);
    var _b = (0, react_1.useState)(-1), index = _b[0], setIndex = _b[1];
    var actions = (0, overmind_1.useActions)();
    var state = (0, overmind_1.useAppState)();
    var moodPosts = currMood.posts || [];
    var getIndex = function () {
        var _a;
        if (!(currMood === null || currMood === void 0 ? void 0 : currMood.id))
            return;
        // actions.flows.rating.deepLikeInit();
        if (index && ((_a = moodPosts[index]) === null || _a === void 0 ? void 0 : _a.id) == currPost.id)
            return;
        console.log("mp:", currMood.id, currPost.id);
        var ix = moodPosts.findIndex(function (p) { return p.id === postId; });
        setIndex(ix > 0 ? ix : 0);
    };
    (0, react_1.useEffect)(function () { return getIndex(); }, [state.routing.location, currPost]);
    // useEffect(() => {
    // 	if (!currMood?.id) return;
    // 	actions.flows.rating.deepLikeInit();
    // 	if (index && moodPosts[index]?.id == currPost.id) return;
    // 	console.log("mp:", currMood.id, currPost.id);
    // 	const ix = moodPosts.findIndex((p: PostReadResponse) => p.id === currPost.id);
    // 	setIndex(ix > 0 ? ix : 0);
    // }, [currMood?.id, currPost?.id]);
    // const moodPosts = currMood.posts || [];
    var getPosts = function (m) {
        var cm = state.api.cache.moods[(m === null || m === void 0 ? void 0 : m.id) || ""];
        return cm && cm.posts ? cm.posts : [];
    };
    var nextPath = function () {
        var _a, _b;
        var _nextPostId = (_a = moodPosts[index + 1]) === null || _a === void 0 ? void 0 : _a.id;
        var nextMood = _nextPostId
            ? currMood
            : ((_b = currPost.moods) === null || _b === void 0 ? void 0 : _b.find(function (md) { return currMood.id != md.id && getPosts(md).length; })) ||
                state.lists.top.moods.items.find(function (md) { return currMood.id !== md.id && getPosts(md).length; });
        var _moodPosts = getPosts(nextMood) || [];
        var nextPost = _nextPostId || (_moodPosts && _moodPosts[0] && _moodPosts[0].id);
        var nextPath = "/folder/".concat(nextMood === null || nextMood === void 0 ? void 0 : nextMood.id, "/").concat(nextPost); //(index != null) && moodPosts[index + 1]?.id ?
        return nextPath;
    };
    return { nextPath: nextPath, currMood: currMood, currPost: currPost, index: index, isInMood: !!moodId, moodId: moodId };
};
var Post = function () {
    var _a, _b, _c, _d, _e, _f, _g;
    var state = (0, overmind_1.useAppState)();
    var actions = (0, overmind_1.useActions)();
    var moodsToAttach = (state.api.auth.moods || []).filter(function (m) { return m.id; }); // current users's moods
    var _h = useVotingStreamMood(), moodId = _h.moodId, currMood = _h.currMood, currPost = _h.currPost, nextPath = _h.nextPath, index = _h.index, isInMood = _h.isInMood;
    var author = (0, useCached_1.useCachedUser)({ id: currPost ? (_a = currPost === null || currPost === void 0 ? void 0 : currPost.author) === null || _a === void 0 ? void 0 : _a.id : "" });
    var username = (author === null || author === void 0 ? void 0 : author.username) || (author === null || author === void 0 ? void 0 : author.displayName);
    var selectMoodsForm = (0, useForm_1.default)()[0];
    var navigateToNext = function () {
        var location = nextPath();
        if (!location)
            return;
        actions.routing.historyPush({ location: location });
    };
    var addToMoods = function (form) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("attachToMoods: Calling...");
                    if (!((_a = form === null || form === void 0 ? void 0 : form.moods) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 2];
                    return [4 /*yield*/, actions.api.post.attachToMoods({
                            post: currPost,
                            moods: (form === null || form === void 0 ? void 0 : form.moods) || [],
                        })];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    console.log("attachToMoods: done Attaching to moods...");
                    navigateToNext();
                    return [2 /*return*/];
            }
        });
    }); };
    var doneVoting = function (rating) {
        if (rating > 0)
            actions.api.post.rate({
                post: currPost,
                amount: rating,
            });
        if (rating < 100)
            return navigateToNext();
        // if at 100 the mood will show itself
    };
    // else either at 100% or stopped rating
    if (currMood.id && index === -1)
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Vote_1.Vote
            // useVotingStream={useVotingStreamMood}
            , __assign({ 
                // useVotingStream={useVotingStreamMood}
                votingEnabled: isInMood, onDoneVoting: doneVoting, onLongDoneVoting: function () {
                    var eh = function (e) {
                        if (e.which !== 32)
                            return;
                        window.removeEventListener('keyup', eh);
                        e.preventDefault();
                        navigateToNext();
                    };
                    window.addEventListener('keyup', eh);
                    return function () {
                        window.removeEventListener('keyup', eh);
                    };
                }, info: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "post-info-column" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "header-2", hidden: currPost.title === null ? true : false }, { children: currPost.title })), (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                                textAlign: "right",
                            } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: { textAlign: "left" } }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/user/".concat(username), style: {
                                        wordBreak: "break-all",
                                        maxWidth: "100%",
                                        minHeight: "1.5em",
                                        textAlign: "right",
                                    } }, { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ className: "paragraph-2b" }, { children: [username, " "] })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "paragraph-2r" }, { children: currPost.content }))] })) })) })), ((_b = currPost.author) === null || _b === void 0 ? void 0 : _b.newcoinPoolTx) ? ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "paragraph-2u", align: "bottom" }, { children: [(0, jsx_runtime_1.jsx)("a", __assign({ href: "https://explorer.newcoin.org/account/" +
                                        ((_c = currPost.author) === null || _c === void 0 ? void 0 : _c.username), target: "_blank", rel: "noreferrer" }, { children: "Creator pool" })), (0, jsx_runtime_1.jsx)(Ebene_1.Ebene, {})] }))) : (""), (0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ className: "paragraph-2u", align: "bottom" }, { children: !currPost.newcoinMintTx ? ("") : ["REQUESTED", "FAILED"].includes(currPost.newcoinMintTx.toString()) ? ("Mint status: " + currPost.newcoinMintTx || "") : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Profile_1.NewcoinLink, __assign({ tx: currPost.newcoinMintTx }, { children: "See minted NFT" })), (0, jsx_runtime_1.jsx)(NTFIcon_1.NFTIcon, {})] })) })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Share_1.ShareButton, {}) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), ((_d = currPost.tags) === null || _d === void 0 ? void 0 : _d.length) ? "Tags:" : "", (_g = (_f = (_e = (((0, overmind_2.json)(currPost.tags || [])))) === null || _e === void 0 ? void 0 : _e.sort(function (a, b) { return b["_rel"].score - a["_rel"].score; })) === null || _f === void 0 ? void 0 : _f.slice(0, 10)) === null || _g === void 0 ? void 0 : _g.map(function (t) {
                            return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "text-small" }, { children: t.value })), (0, jsx_runtime_1.jsx)(antd_1.Progress, { strokeColor: "#c1fa50", percent: t["_rel"].score * 100 })] });
                        })] })) }, { children: /PROCESSING/i.test(currPost.contentUrl || "") ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, { title: "Processing media..." })) : ((0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, currPost, { thumbnail: false }))) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "text-right app-main-full-width" }, { children: (0, jsx_runtime_1.jsx)(PostModal_1.default, {}) })), (0, jsx_runtime_1.jsx)("div", __assign({ hidden: state.flows.rating.value !== 100, className: "app-main-full-width" }, { children: (0, jsx_runtime_1.jsx)(SelectMood_1.SelectMoodForm, { onFinish: addToMoods, title: "Select a folder to share to" }) }))] }));
};
exports.Post = Post;
//# sourceMappingURL=Post.js.map