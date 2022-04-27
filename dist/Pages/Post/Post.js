"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInTags = exports.PostInMood = exports.Post = exports.postBase = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_1 = require("react-router");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const useCached_1 = require("../../hooks/useCached");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const overmind_1 = require("../../overmind");
const SelectMood_1 = require("../../Components/SelectMood");
const Spin_1 = require("../../Components/Spin");
const Ebene_1 = require("../../Components/Icons/Ebene");
const NTFIcon_1 = require("../../Components/Icons/NTFIcon");
const PostModal_1 = __importDefault(require("./PostModal"));
// import { NewcoinLink } from "../Profile";
const Image_1 = require("../../Components/Image");
const Vote_1 = require("../../Components/Vote");
const react_copy_to_clipboard_1 = require("react-copy-to-clipboard");
const Clipboard_1 = require("../../Components/Icons/Clipboard");
const Links_1 = require("../../Components/Links");
const useVotingStreamMood = () => {
    const { moodId, postId, id } = (0, react_router_1.useParams)();
    const currPost = (0, useCached_1.useCachedPost)({ id: postId || id }, true);
    const currMood = (0, useCached_1.useCachedMood)({ id: moodId }, true);
    const [index, setIndex] = (0, react_1.useState)(-1);
    const state = (0, overmind_1.useAppState)();
    const moodPosts = currMood.posts || [];
    const getIndex = () => {
        if (!currMood?.id)
            return;
        if (index && moodPosts[index]?.id == currPost.id)
            return;
        console.log("mp:", currMood.id, currPost.id);
        const ix = moodPosts.findIndex((p) => p.id === postId);
        setIndex(ix > 0 ? ix : 0);
    };
    (0, react_1.useEffect)(() => getIndex(), [state.routing.location, currPost]);
    const getPosts = (m) => {
        const cm = state.api.cache.moods[m?.id || ""];
        return cm && cm.posts ? cm.posts : [];
    };
    const nextPath = () => {
        const _nextPostId = moodPosts[index + 1]?.id;
        const nextMood = _nextPostId
            ? currMood
            : currPost.moods?.find((md) => currMood.id != md.id && getPosts(md).length) ||
                state.lists.top.moods.items.find((md) => currMood.id !== md.id && getPosts(md).length);
        const _moodPosts = getPosts(nextMood) || [];
        const nextPost = _nextPostId || (_moodPosts && _moodPosts[0] && _moodPosts[0].id);
        const nextPath = `/folder/${nextMood?.id}/${nextPost}`; //(index != null) && moodPosts[index + 1]?.id ?
        return nextPath;
    };
    return { nextPath, currMood, currPost, index, contextType: "mood", contextValue: moodId };
};
const useVotingStreamTags = () => {
    const { tags, postId, id } = (0, react_router_1.useParams)();
    const currPost = (0, useCached_1.useCachedPost)({ id: postId || id }, true);
    const [index, setIndex] = (0, react_1.useState)(-1);
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    // const currTags = useCachedPostSearch({ tags }, true);
    const tagsPosts = state.lists.search.posts.results?.value || [];
    ;
    const getIndex = () => {
        if (!tags)
            return;
        const ix = tagsPosts.findIndex((p) => p.id === postId);
        setIndex(ix > 0 ? ix : 0);
    };
    (0, react_1.useEffect)(() => getIndex(), [state.routing.location, currPost]);
    const nextPath = () => {
        const _nextPostId = tagsPosts[index + 1]?.id;
        // const nextTags = ??? just make it one tag less or e.g. one of the tags on the last post
        const nextPath = `/tags/${tags}/${_nextPostId}`;
        return nextPath;
    };
    return { nextPath, currPost, index, contextType: "tags", contextValue: tags };
};
const round = (n) => Math.round(n * 10000) / 10000;
const sumScore = (tagRels) => {
    if (!(tagRels instanceof Array))
        return 0;
    const w = 1 / tagRels.length;
    return round(tagRels.reduce((r, c) => r + w * (c.score || 0), 0));
};
const bySumScore = (a, b) => sumScore(b["_rel"]) - sumScore(a["_rel"]);
const SvgPolygons = ({ visionTags }) => !visionTags ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) :
    (0, jsx_runtime_1.jsx)("div", { style: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }, children: (0, jsx_runtime_1.jsx)("svg", { width: '100%', height: '100%', style: { left: 0, top: 0, position: "absolute" }, viewBox: "0 0 100 100", children: visionTags?.map(t => (0, jsx_runtime_1.jsx)("g", { children: t.polygons?.map(polygon => (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [visionTags.length > 1 ? (0, jsx_runtime_1.jsx)("text", { fontSize: 3, fill: "#b3ff00", x: polygon[0].x * 100, y: polygon[0].y * 100 - .5, children: t.value })
                            : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)("polygon", { "vector-effect": "non-scaling-stroke", style: {
                                stroke: "#b3ff00",
                                strokeWidth: "2px",
                                fill: "transparent",
                                filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))"
                            }, points: polygon.map(point => `${point.x * 100},${point.y * 100}`).join(" ") })] })) })) }) });
const postBase = (useVotingStreamHook) => () => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const [copyToClipboard, setCopyToClipboard] = (0, react_1.useState)(false);
    // const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods
    const nextInStream = useVotingStreamHook(); //useVotingStreamTags();
    const ref = (0, react_1.useRef)();
    const { contextType, contextValue, currPost, nextPath, index } = nextInStream;
    const author = (0, useCached_1.useCachedUser)({ id: currPost ? currPost?.author?.id : "" });
    const username = author?.username || author?.displayName;
    const [hilightTag, setHilightTag] = (0, react_1.useState)([]);
    const navigateToNext = () => {
        const location = nextPath();
        if (!location)
            return;
        actions.routing.historyPush({ location });
    };
    const addToMoods = async (form) => {
        console.log("attachToMoods: Calling...");
        if (form?.moods?.length)
            await actions.api.post.attachToMoods({
                post: currPost,
                moods: form?.moods || [],
            });
        console.log("attachToMoods: done Attaching to moods...");
        navigateToNext();
    };
    const doneVoting = (rating) => {
        if (rating > 0)
            actions.api.post.rate({
                post: currPost,
                amount: rating,
                contextType,
                contextValue
                // mood: currMood
            });
        if (rating < 100)
            return navigateToNext();
        // if at 100 the mood will show itself
    };
    // else either at 100% or stopped rating
    // if (currMood.id && index === -1) return <Spin />;
    if (!contextType && !(index >= 0))
        return (0, jsx_runtime_1.jsx)(Spin_1.Spin, {});
    const url = [
        window.location.protocol,
        "//",
        window.location.host,
        state.routing.location,
    ].join("");
    const isVisionTag = (t) => t._rel?.find(r => r.source === "vision" && r.polygons);
    const nonVisionTags = currPost.tags?.filter(t => !isVisionTag(t))
        .map(t => ({ ...t, polygons: [] })) || [];
    const visionTags = currPost.tags?.filter(t => isVisionTag(t))
        .map(t => ({ ...t, polygons: JSON.parse((t._rel?.find(r => r.source === "vision"))?.polygons || "[]") })) || [];
    console.log("Vision tags:", visionTags);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(Vote_1.Vote
            // useVotingStream={useVotingStreamMood}
            , { 
                // useVotingStream={useVotingStreamMood}
                votingEnabled: !!contextType, onDoneVoting: doneVoting, onLongDoneVoting: () => {
                    const eh = (e) => {
                        if (e.which !== 32)
                            return;
                        window.removeEventListener("keyup", eh);
                        e.preventDefault();
                        navigateToNext();
                    };
                    window.addEventListener("keyup", eh);
                    return () => {
                        window.removeEventListener("keyup", eh);
                    };
                }, info: (0, jsx_runtime_1.jsxs)("div", { className: "post-info-column", children: [(0, jsx_runtime_1.jsx)("h2", { className: "header-2", hidden: currPost.title === null ? true : false, children: currPost.title }), (0, jsx_runtime_1.jsx)("div", { style: {
                                textAlign: "right",
                            }, children: (0, jsx_runtime_1.jsx)("div", { style: { textAlign: "left" }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: `/user/${username}`, style: {
                                        wordBreak: "break-all",
                                        maxWidth: "100%",
                                        minHeight: "1.5em",
                                        textAlign: "right",
                                    }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "paragraph-2b", children: [username, " "] }), (0, jsx_runtime_1.jsx)("span", { className: "paragraph-2r", children: currPost.description })] }) }) }), currPost.author?.newcoinPoolTx ? ((0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "paragraph-2u", align: "bottom", style: { marginTop: "20px" }, children: [(0, jsx_runtime_1.jsx)("a", { href: "https://explorer-dev.newcoin.org/account/" +
                                        currPost.author?.username, target: "_blank", rel: "noreferrer", children: "Creator pool" }), (0, jsx_runtime_1.jsx)(Ebene_1.Ebene, {})] })) : (""), (0, jsx_runtime_1.jsx)(antd_1.Row, { className: "paragraph-2b", align: "bottom", style: { marginTop: "10px" }, children: !currPost.newcoinMintTx ? ("") : ["REQUESTED", "FAILED"].includes(currPost.newcoinMintTx.toString()) ? ("Minting NFT..." /* + currPost.newcoinMintTx || ""*/) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Links_1.BlockExplorerLink, { explorer: "newcoin", id: currPost.newcoinMintTx, children: "See minted NFT" }), (0, jsx_runtime_1.jsx)(NTFIcon_1.NFTIcon, {})] })) }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(react_copy_to_clipboard_1.CopyToClipboard, { text: url, children: (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: !copyToClipboard
                                    ? ""
                                    : "copied to clipboard", placement: "right", children: (0, jsx_runtime_1.jsx)("button", { className: "copy-to-clipboard-button", onClick: () => {
                                        setCopyToClipboard(true);
                                        setTimeout(() => {
                                            setCopyToClipboard(false);
                                        }, 2000);
                                    }, children: (0, jsx_runtime_1.jsx)(Clipboard_1.Clipboard, {}) }) }) }), (0, jsx_runtime_1.jsx)("br", {}), currPost.tags?.length && ((0, jsx_runtime_1.jsx)("p", { className: "paragraph-1r u-margin-top-medium", children: "Tags:" })), (0, jsx_runtime_1.jsx)("br", {}), visionTags.length ?
                            (0, jsx_runtime_1.jsx)("div", { style: { cursor: "pointer", padding: 6 }, onMouseOver: () => setHilightTag(visionTags), onMouseOut: () => setHilightTag([]), children: (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}) }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), (0, jsx_runtime_1.jsx)("div", { style: { display: "flex", flexWrap: "wrap", cursor: "pointer" }, children: [...visionTags?.sort(bySumScore), ...nonVisionTags?.sort(bySumScore).slice(0, Math.max(0, 20 - visionTags.length))]
                                // ?.slice(0, 10)
                                ?.map((t) => {
                                const tag = t.value;
                                const score = (sumScore(t["_rel"]) * 100).toFixed(2);
                                return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { onMouseOver: () => setHilightTag(visionTags.filter(s => s.value == t.value)), onMouseOut: () => setHilightTag([]), className: "paragraph-2b tag", style: { backgroundColor: Number(score) === 100 ? "#b3ff00" : "white" }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [t.polygons?.length ? (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), " \u00A0"] }), (0, jsx_runtime_1.jsxs)("div", { className: "u-margin-right-small", children: [score, "%"] }), (0, jsx_runtime_1.jsx)("p", { children: tag })] }));
                            }) })] }), children: [/PROCESSING/i.test(currPost.contentUrl || "") ? ((0, jsx_runtime_1.jsx)(Spin_1.Spin, { title: "Processing media..." })) : ((0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ref: ref, ...currPost, thumbnail: false })), hilightTag?.length ?
                        (0, jsx_runtime_1.jsx)(SvgPolygons, { visionTags: hilightTag }) :
                        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right app-main-full-width", children: (0, jsx_runtime_1.jsx)(PostModal_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { hidden: state.flows.rating.value !== 100, className: "app-main-full-width", children: (0, jsx_runtime_1.jsx)(SelectMood_1.SelectMoodForm, { onFinish: addToMoods, title: "Select a folder to share to" }) })] }));
};
exports.postBase = postBase;
exports.Post = (0, exports.postBase)(useVotingStreamMood);
exports.PostInMood = (0, exports.postBase)(useVotingStreamMood);
exports.PostInTags = (0, exports.postBase)(useVotingStreamTags);
{ /* <Modal
                    cancelButtonProps={{ hidden: true }}
                    footer={false}
                    okText="Done"
                    closeIcon={<></>}
                    visible={state.flows.rating.value === 100}
                    style={{ textAlign: "center" }}
                >
                    <h2 className="header-2">{state.flows.rating.value}</h2>
                    <Form onFinish={addToMoods} form={selectMoodsForm}>
                    //TODO look at addtoMoods
                        <Form.Item name="moods">
                            <SelectMood moods={moodsToAttach} />
                        </Form.Item>
                        <Row justify="space-between">
                            <Col span={8}>
                                <MoodCreateModal />
                            </Col>
                            <Col span={16}>
                                <Button type="primary" htmlType="submit">
                                    Done
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal> */
}
//# sourceMappingURL=Post.js.map