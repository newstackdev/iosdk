import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { SelectMoodForm } from "../../Components/SelectMood";
import { Spin } from "../../Components/Spin";
import { useActions, useAppState } from "../../overmind";
import { useCachedMoods, useCachedPost, useCachedUser } from "../../hooks/useCached";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
// import { ContentImage, contentImageUrl } from "../../Components/Image";
import { Ebene } from "../../Components/Icons/Ebene";
import { NFTIcon } from "../../Components/Icons/NTFIcon";
import PostReportModal from "./components/PostModal";
// import { NewcoinLink } from "../Profile";
import { BlockExplorerLink, blockExplorerUrl } from "../../Components/Links";
import { ContentImage } from "../../Components/Image";
// import { ContentLayout } from "../Components/ContentLayout";
import { ContentLayoutDeepLike } from "../../Components/ContentLayout";
import { EyeClosed } from "../../Components/Icons/EyeClosed";
import { EyeOpen } from "../../Components/Icons/EyeOpen";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import { Share } from "../../Components/Share";
import { Tags } from "./components/Tags";
import { VerifiedIcon } from "../../Components/Icons/VerifiedIcon";
import { Vote } from "../../Components/Vote";
import { fischerYates } from "../../utils/random";
import { isEmpty } from "lodash";
import { useVerified } from "../../hooks/useVerified";
import useMediaQuery from "../../hooks/useMediaQuery";
export const useVotingStreamMood = () => {
    const { moodId, postId, id } = useParams();
    const state = useAppState();
    const currPost = useCachedPost({ id: postId || id }, true);
    const { cachedMoods, isCachedMoodsLoading } = useCachedMoods();
    const [availableMoods, setAvailableMoods] = useState([]);
    const [index, setIndex] = useState(-1);
    const [currMood, setCurrMood] = useState();
    const [moodPosts, setMoodPosts] = useState([]);
    const getIndex = () => {
        if (!currMood?.id)
            return;
        if (index && moodPosts[index]?.id == currPost.id)
            return;
        console.log("mp:", currMood.id, currPost.id);
        const ix = moodPosts.findIndex((p) => p.id === postId);
        setIndex(ix > 0 ? ix : 0);
    };
    useEffect(() => {
        if (!isEmpty(cachedMoods)) {
            const randomizedMoods = fischerYates(Object.values(cachedMoods));
            const currentMood = randomizedMoods.find(async (mood) => {
                const randomizedMoodId = (await mood).id;
                return randomizedMoodId === moodId;
            });
            setAvailableMoods(randomizedMoods);
            setCurrMood(currentMood);
            setMoodPosts(currentMood?.posts || []);
        }
    }, [state.api.auth.moods, isCachedMoodsLoading, cachedMoods]);
    useEffect(() => {
        if (!isEmpty(availableMoods) && !isEmpty(moodPosts)) {
            getIndex();
            if (!moodPosts[index + 1]?.id) {
                const updatedMood = availableMoods[availableMoods.findIndex((mood) => mood.id === currMood?.id) + 1];
                setCurrMood(updatedMood);
                setMoodPosts(updatedMood?.posts || []);
                setIndex(0);
            }
        }
    }, [state.routing.location, currPost, currMood, availableMoods, moodPosts]);
    const getPosts = (m) => {
        const cm = state.api.cache.moods[m?.id || ""];
        return cm && cm.posts ? cm.posts : [];
    };
    const nextPath = () => {
        const _nextPostId = moodPosts[index + 1]?.id;
        const nextMood = _nextPostId ? currMood : undefined;
        const _moodPosts = getPosts(nextMood) || [];
        const nextPost = _nextPostId || (_moodPosts && _moodPosts[0] && _moodPosts[0].id);
        const nextPath = nextMood ? `/folder/${nextMood?.id}/${nextPost}` : "/explore"; //(index != null) && moodPosts[index + 1]?.id ?
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
//TODO move funcitons to separate file
export const round = (n) => Math.round(n * 10000) / 10000;
export const sumScore = (tagRels) => {
    if (!(tagRels instanceof Array))
        return 0;
    const w = 1 / tagRels.length;
    return round(tagRels.reduce((r, c) => r + w * (c.score || 0), 0));
};
export const bySumScore = (a, b) => sumScore(b["_rel"]) - sumScore(a["_rel"]);
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
    const [isEyeOpenedResponzive, setIsEyeOpenedResponzive] = useState(false);
    const [visible, setVisible] = useState(false);
    const isResponzive = useMediaQuery("(max-width: 1024px)");
    // const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods
    const nextInStream = useVotingStreamHook(); //useVotingStreamTags();
    const ref = useRef();
    const containerDeeplike = useRef();
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
        if (rating > 0) {
            actions.api.post.rate({
                post: currPost,
                amount: rating,
                contextType,
                contextValue,
                messageWrapper: (msg, rating) => rating.TxID_mintFile ? (_jsxs("a", { href: blockExplorerUrl.newscan(rating.TxID_mintFile), target: "_blank", rel: "noreferrer", children: [msg, _jsx("br", {}), _jsx("small", { children: "click for a newscan receipt" })] })) : (_jsx(_Fragment, { children: msg })),
                // mood: currMood
            });
        }
        if (rating < 100) {
            return navigateToNext();
        }
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === 32 && e.target === document.body && rating === 100) {
                e.preventDefault();
                window.scrollTo(0, 500);
                !isResponzive && setIsEyeOpened(true);
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
    useEffect(() => {
        actions.ux.setFooterVisibility({ footerShown: false });
        return () => {
            actions.ux.setFooterVisibility({ footerShown: true });
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(Vote
            // useVotingStream={useVotingStreamMood}
            , { 
                // useVotingStream={useVotingStreamMood}
                votingEnabled: !!contextType, setVisible: setVisible, visible: visible, visionTags: visionTags, nonVisionTags: nonVisionTags, setHilightTag: setHilightTag, isEyeOpenedResponzive: isEyeOpenedResponzive, setIsEyeOpenedResponzive: setIsEyeOpenedResponzive, addToMoods: addToMoods, onDoneVoting: doneVoting, containerDeeplike: containerDeeplike, onLongDoneVoting: () => {
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
                }, info: _jsxs(Row, { className: "nl-post-info-column", children: [isResponzive && (_jsxs(Row, { className: "nl-post-fake-drawer__username", children: [_jsx(Avatar, { src: _jsx(ContentImage, { ...author }), className: "u-margin-right-small" }), username && (_jsx(Link, { to: `/user/${username}`, className: "nl-post-info-column__user-info", children: _jsx("p", { className: "paragraph-1r", children: username }) }))] })), _jsx(Row, { justify: "space-between", children: _jsx("p", { className: "header-2", children: currPost.title || "Folder name" }) }), _jsxs(Col, { style: { flex: 0.3, overflow: "overlay" }, className: "text-right", children: [_jsxs(Link, { to: `/user/${username}`, className: "nl-post-info-column__user-info", children: [_jsxs("span", { className: "paragraph-2b u-margin-bottom-medium", children: [username, isVerifiedUser && _jsx(VerifiedIcon, { style: { marginRight: 20 } })] }), _jsx("span", { className: "paragraph-2r", children: currPost.description })] }), currPost.author?.newcoinPoolTx && (_jsxs(Row, { className: "paragraph-2u u-margin-top-medium", align: "bottom", children: [_jsx("a", { href: "https://explorer-dev.newcoin.org/account/" + currPost.author?.username, target: "_blank", rel: "noreferrer", children: "Creator pool" }), _jsx(Ebene, {})] })), currPost?.author?.newcoinPoolTx && (_jsx(Row, { className: "u-margin-top-medium text-left", children: currPost.newcoinMintTx === "REQUESTED" ? (
                                    /* + currPost.newcoinMintTx || ""*/
                                    _jsx("p", { className: "paragraph-2b", children: "Minting NFT..." })) : currPost.newcoinMintTx === "FAILED" ? (_jsx("p", { className: "paragraph-2b", children: "NFT Minting failed, please contact us for more details" })) : (_jsxs(_Fragment, { children: [_jsx(BlockExplorerLink, { explorer: "newcoin", id: currPost.newcoinMintTx, children: "See minted NFT" }), _jsx(NFTIcon, {})] })) }))] }), _jsx(Tags, { isEyeOpened: isEyeOpened, visionTags: visionTags, nonVisionTags: nonVisionTags, setHilightTag: setHilightTag, children: _jsx(Row, { style: { flex: 0.4 } }) }), _jsx(Row, { className: "nl-post-info-column__infobox-wrapper", children: _jsxs(Col, { className: "nl-post-info-column__infobox-wrapper__col", children: [_jsx(LargeArrowBack, {}), currPost.tags?.length ? (isEyeOpened ? (_jsx("span", { className: "u-margin-left-small cursor-pointer", onClick: () => {
                                            setHilightTag([]);
                                            setIsEyeOpened(false);
                                        }, onMouseOver: () => setHilightTag(visionTags), onMouseOut: () => setHilightTag([]), children: _jsx(EyeOpen, {}) })) : (_jsx("span", { className: "cursor-pointer", onClick: () => {
                                            if (isResponzive) {
                                                setIsEyeOpenedResponzive(true);
                                                setVisible((p) => !p);
                                            }
                                            else
                                                setIsEyeOpened(true);
                                        }, children: _jsx(EyeClosed, {}) }))) : (_jsx(_Fragment, {})), _jsx(Share, { currentPostProps: currPost }), _jsx(PostReportModal, {})] }) })] }), children: [/PROCESSING/i.test(currPost.contentUrl || "") ? (_jsx(Spin, { title: "Processing media..." })) : (_jsx(ContentImage, { ref: ref, ...currPost, thumbnail: false })), hilightTag?.length ? _jsx(SvgPolygons, { visionTags: hilightTag }) : _jsx(_Fragment, {})] }), _jsx("div", { hidden: state.flows.rating.value !== 100, style: { position: "fixed", bottom: 0, width: "100%" }, children: _jsx("div", { className: "nl-post-deeplike-desktop-wrapper", children: _jsx(ContentLayoutDeepLike, { containerDeeplike: containerDeeplike, children: _jsx(SelectMoodForm, { onFinish: addToMoods, title: "Save to a folder", deeplikeActions: true, setVisible: setVisible, visible: visible }) }) }) })] }));
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