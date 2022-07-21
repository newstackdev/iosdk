import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { SelectMoodForm } from "../../Components/SelectMood";
import { Spin } from "../../Components/Spin";
import { useActions, useAppState } from "../../overmind";
import { useCachedMood, useCachedPost, useCachedUser } from "../../hooks/useCached";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
// import { ContentImage, contentImageUrl } from "../../Components/Image";
import { Ebene } from "../../Components/Icons/Ebene";
import { NFTIcon } from "../../Components/Icons/NTFIcon";
import PostReportModal from "./PostModal";
// import { NewcoinLink } from "../Profile";
import { BlockExplorerLink } from "../../Components/Links";
import { ContentImage } from "../../Components/Image";
import { EyeClosed } from "../../Components/Icons/EyeClosed";
import { EyeOpen } from "../../Components/Icons/EyeOpen";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import { Share } from "../../Components/Share";
import { VerifiedIcon } from "../../Components/Icons/VerifiedIcon";
import { Vote } from "../../Components/Vote";
import { useVerified } from "../../hooks/useVerified";
const useVotingStreamMood = () => {
    const { moodId, postId, id } = useParams();
    const currPost = useCachedPost({ id: postId || id }, true);
    const currMood = useCachedMood({ id: moodId }, true);
    const [index, setIndex] = useState(-1);
    const state = useAppState();
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
    useEffect(() => getIndex(), [state.routing.location, currPost]);
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
    return {
        nextPath,
        currMood,
        currPost,
        index,
        contextType: "mood",
        contextValue: moodId,
    };
};
const useVotingStreamTags = () => {
    const { tags, postId, id } = useParams();
    const currPost = useCachedPost({ id: postId || id }, true);
    const [index, setIndex] = useState(-1);
    const actions = useActions();
    const state = useAppState();
    // const currTags = useCachedPostSearch({ tags }, true);
    const tagsPosts = state.lists.search.posts.results?.value || [];
    const getIndex = () => {
        if (!tags)
            return;
        const ix = tagsPosts.findIndex((p) => p.id === postId);
        setIndex(ix > 0 ? ix : 0);
    };
    useEffect(() => getIndex(), [state.routing.location, currPost]);
    const nextPath = () => {
        const _nextPostId = tagsPosts[index + 1]?.id;
        // const nextTags = ??? just make it one tag less or e.g. one of the tags on the last post
        const nextPath = `/tags/${tags}/${_nextPostId}`;
        return nextPath;
    };
    return {
        nextPath,
        currPost,
        index,
        contextType: "tags",
        contextValue: tags,
    };
};
const round = (n) => Math.round(n * 10000) / 10000;
const sumScore = (tagRels) => {
    if (!(tagRels instanceof Array))
        return 0;
    const w = 1 / tagRels.length;
    return round(tagRels.reduce((r, c) => r + w * (c.score || 0), 0));
};
const bySumScore = (a, b) => sumScore(b["_rel"]) - sumScore(a["_rel"]);
const SvgPolygons = ({ visionTags }) => !visionTags ? (_jsx(_Fragment, {})) : (_jsx("div", { style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
    }, children: _jsx("svg", { width: "100%", height: "100%", style: { left: 0, top: 0, position: "absolute" }, viewBox: "0 0 100 100", children: visionTags?.map((t) => (_jsx("g", { children: t.polygons?.map((polygon) => (_jsxs(_Fragment, { children: [visionTags.length > 1 ? (_jsx("text", { fontSize: 3, fill: "#b3ff00", x: polygon[0].x * 100, y: polygon[0].y * 100 - 0.5, children: t.value })) : (_jsx(_Fragment, {})), _jsx("polygon", { vectorEffect: "non-scaling-stroke", style: {
                            stroke: "#b3ff00",
                            strokeWidth: "2px",
                            fill: "transparent",
                            filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
                        }, points: polygon.map((point) => `${point.x * 100},${point.y * 100}`).join(" ") })] }))) }))) }) }));
export const postBase = (useVotingStreamHook, votingEnabled = true) => () => {
    const state = useAppState();
    const actions = useActions();
    const [copyToClipboard, setCopyToClipboard] = useState(false);
    const [isEyeOpened, setIsEyeOpened] = useState(false);
    // const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods
    const nextInStream = useVotingStreamHook(); //useVotingStreamTags();
    const ref = useRef();
    const { contextType, contextValue, currPost, nextPath, index } = nextInStream;
    const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });
    const username = author?.username || author?.displayName;
    const { verifiedUsers } = useVerified([username || ""]);
    const isVerifiedUser = verifiedUsers && username && verifiedUsers.includes(username);
    const [hilightTag, setHilightTag] = useState([]);
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
                contextValue,
                // mood: currMood
            });
        if (rating < 100)
            return navigateToNext();
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === 32 && e.target === document.body && rating === 100) {
                e.preventDefault();
                window.scrollTo(0, 500);
                setIsEyeOpened(true);
            }
        });
        // if at 100 the mood will show itself
    };
    // else either at 100% or stopped rating
    // if (currMood.id && index === -1) return <Spin />;
    if (!contextType && !(index >= 0))
        return _jsx(Spin, {});
    const url = [window.location.protocol, "//", window.location.host, state.routing.location].join("");
    const isVisionTag = (t) => t._rel?.find((r) => r.source === "vision" && r.polygons);
    const nonVisionTags = currPost.tags?.filter((t) => !isVisionTag(t)).map((t) => ({ ...t, polygons: [] })) || [];
    const visionTags = currPost.tags
        ?.filter((t) => isVisionTag(t))
        .map((t) => ({
        ...t,
        polygons: JSON.parse(t._rel?.find((r) => r.source === "vision")?.polygons || "[]"),
    })) || [];
    return (_jsxs(_Fragment, { children: [_jsxs(Vote
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
                }, info: _jsxs(Row, { className: "post-info-column", children: [_jsx(Col, { children: _jsx("p", { className: "header-2 u-margin-bottom-medium", hidden: currPost.title === null ? true : false, children: currPost.title }) }), _jsx(Col, { style: {
                                textAlign: "right",
                                padding: 10,
                                flex: 0.3,
                            }, children: _jsxs(Link, { to: `/user/${username}`, style: {
                                    wordBreak: "break-all",
                                    maxWidth: "100%",
                                    minHeight: "1.5em",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "left",
                                    flexDirection: "column",
                                }, children: [_jsxs("span", { className: "paragraph-2b u-margin-bottom-medium", children: [username, isVerifiedUser && _jsx(VerifiedIcon, { style: { marginRight: 20 } })] }), _jsx("span", { className: "paragraph-2r", children: currPost.description })] }) }), currPost.author?.newcoinPoolTx ? (_jsxs(Row, { className: "paragraph-2u", align: "bottom", style: { marginTop: "20px" }, children: [_jsx("a", { href: "https://explorer-dev.newcoin.org/account/" + currPost.author?.username, target: "_blank", rel: "noreferrer", children: "Creator pool" }), _jsx(Ebene, {})] })) : (""), currPost.newcoinMintTx && (_jsx(Row, { className: "paragraph-2b", align: "bottom", children: currPost.newcoinMintTx === "REQUESTED" ? ("Minting NFT..." /* + currPost.newcoinMintTx || ""*/) : currPost.newcoinMintTx === "FAILED" ? (_jsx(_Fragment, { children: "NFT Minting failed, please contact us for more details" })) : (_jsxs(_Fragment, { children: [_jsx(BlockExplorerLink, { explorer: "newcoin", id: currPost.newcoinMintTx, children: "See minted NFT" }), _jsx(NFTIcon, {})] })) })), isEyeOpened && currPost.tags?.length ? (_jsx(_Fragment, { children: _jsx("div", { style: {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    cursor: "pointer",
                                    flex: 0.4,
                                    alignContent: "center",
                                    padding: 20,
                                }, children: [
                                    ...visionTags?.sort(bySumScore),
                                    ...nonVisionTags
                                        // 	?.sort(bySumScore)
                                        .slice(0, Math.max(0, 20 - visionTags.length)),
                                ]
                                    // ?.slice(0, 10)
                                    ?.map((t) => {
                                    const tag = t.value;
                                    const score = (sumScore(t["_rel"]) * 100).toFixed(0);
                                    return (_jsxs(Row, { onMouseOver: () => setHilightTag(visionTags.filter((s) => s.value === t.value)), onMouseOut: () => setHilightTag([]), className: "paragraph-3b tag", style: {
                                            backgroundColor: t.polygons?.length ? "#b3ff00" : "white",
                                        }, children: [_jsxs("div", { className: "u-margin-right-xs", children: [score, "%"] }), _jsx("p", { children: tag })] }));
                                }) }) })) : (_jsx("div", { style: { flex: 0.4 } })), isEyeOpened && currPost.tags?.length === undefined && _jsx(_Fragment, { children: "no tags found." }), _jsx(Row, { style: {
                                flex: 0.3,
                                alignContent: "end",
                            }, children: _jsxs(Col, { style: {
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "baseline",
                                    borderTop: "1px solid white",
                                    padding: 10,
                                }, children: [_jsx(LargeArrowBack, {}), currPost.tags?.length ? (isEyeOpened ? (_jsx("span", { className: "u-margin-left-small", style: { cursor: "pointer" }, onClick: () => {
                                            setHilightTag([]);
                                            setIsEyeOpened(false);
                                        }, onMouseOver: () => setHilightTag(visionTags), onMouseOut: () => setHilightTag([]), children: _jsx(EyeOpen, {}) })) : (_jsx("span", { style: { cursor: "pointer" }, onClick: () => setIsEyeOpened(true), children: _jsx(EyeClosed, {}) }))) : (_jsx(_Fragment, {})), _jsx(Share, { currentPostProps: currPost }), _jsx(PostReportModal, {})] }) })] }), children: [/PROCESSING/i.test(currPost.contentUrl || "") ? (_jsx(Spin, { title: "Processing media..." })) : (_jsx(ContentImage, { ref: ref, ...currPost, thumbnail: false })), hilightTag?.length ? _jsx(SvgPolygons, { visionTags: hilightTag }) : _jsx(_Fragment, {})] }), _jsx("div", { hidden: state.flows.rating.value !== 100, className: "app-main-full-width", children: _jsx(SelectMoodForm, { onFinish: addToMoods, title: "Select a folder to share to" }) })] }));
};
export const Post = postBase(useVotingStreamMood, false);
export const PostInMood = postBase(useVotingStreamMood);
export const PostInTags = postBase(useVotingStreamTags);
{
    /* <Modal
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