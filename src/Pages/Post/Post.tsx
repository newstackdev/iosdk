import { Avatar, Button, Col, Drawer, Form, Layout, Modal, Progress, Row, Tag, TagProps, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MoodCreateModal } from "../Mood/MoodCreate";
import { NLView } from "../../types";
import { SelectMood, SelectMoodForm } from "../../Components/SelectMood";
import { Spin } from "../../Components/Spin";
import { useActions, useAppState } from "../../overmind";
import { useCachedMood, useCachedMoods, useCachedPost, useCachedUser } from "../../hooks/useCached";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useForm from "antd/lib/form/hooks/useForm";
// import { ContentImage, contentImageUrl } from "../../Components/Image";
import { Ebene } from "../../Components/Icons/Ebene";
import { MoodReadResponse, PostReadResponse, RatingUpdateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NFTIcon } from "../../Components/Icons/NTFIcon";
import PostReportModal from "./components/PostModal";
// import { NewcoinLink } from "../Profile";
import { BlockExplorerLink, blockExplorerUrl } from "../../Components/Links";
import { ContentImage } from "../../Components/Image";
// import { ContentLayout } from "../Components/ContentLayout";
import { ContentLayoutDeepLike } from "../../Components/ContentLayout";
import { Edit } from "../../Components/Icons/Edit";
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
import Title from "../Explore/Title";
import useMediaQuery from "../../hooks/useMediaQuery";

export const useVotingStreamMood = () => {
  const { moodId, postId, id } = useParams<{
    moodId: string;
    postId: string;
    id: string;
  }>();
  const state = useAppState();
  const currPost = useCachedPost({ id: postId || id }, true);
  const { cachedMoods, isCachedMoodsLoading } = useCachedMoods();
  const [availableMoods, setAvailableMoods] = useState<Array<MoodReadResponse>>([]);
  const [index, setIndex] = useState<number>(-1);
  const [currMood, setCurrMood] = useState<MoodReadResponse>();
  const [moodPosts, setMoodPosts] = useState<Array<PostReadResponse>>([]);

  const getIndex = () => {
    if (!currMood?.id) return;

    if (index && moodPosts[index]?.id == currPost.id) return;

    console.log("mp:", currMood.id, currPost.id);

    const ix = moodPosts.findIndex((p) => p.id === postId);
    setIndex(ix > 0 ? ix : 0);
  };

  useEffect(() => {
    if (!isEmpty(cachedMoods)) {
      const randomizedMoods = fischerYates(Object.values(cachedMoods)) as MoodReadResponse[];
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

  const getPosts = (m?: MoodReadResponse) => {
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
  const { tags, postId, id } = useParams<{
    tags: string;
    postId: string;
    id: string;
  }>();
  const currPost = useCachedPost({ id: postId || id }, true);
  const [index, setIndex] = useState<number>(-1);
  const actions = useActions();
  const state = useAppState();
  // const currTags = useCachedPostSearch({ tags }, true);

  const tagsPosts = state.lists.search.posts.results?.value || [];

  const getIndex = () => {
    if (!tags) return;
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

export const sumScore = (tagRels?: { score?: number }[]) => {
  if (!(tagRels instanceof Array)) return 0;
  const w = 1 / tagRels.length;
  return round(tagRels.reduce((r, c) => r + w * (c.score || 0), 0));
};
export const bySumScore = (a, b) => sumScore(b["_rel"]) - sumScore(a["_rel"]);

const SvgPolygons: NLView<{
  visionTags?: {
    value?: string;
    polygons?: { x: number; y: number }[][];
  }[];
}> = ({ visionTags }) =>
  !visionTags ? (
    <></>
  ) : (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg width="100%" height="100%" style={{ left: 0, top: 0, position: "absolute" }} viewBox="0 0 100 100">
        {visionTags?.map((t) => (
          <g>
            {t.polygons?.map((polygon) => (
              <>
                {visionTags.length > 1 ? (
                  <text fontSize={3} fill="#b3ff00" x={polygon[0].x * 100} y={polygon[0].y * 100 - 0.5}>
                    {t.value}
                  </text>
                ) : (
                  <></>
                )}
                <polygon
                  vectorEffect="non-scaling-stroke"
                  style={{
                    stroke: "#b3ff00",
                    strokeWidth: "2px",
                    fill: "transparent",
                    filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
                  }}
                  points={polygon.map((point) => `${point.x * 100},${point.y * 100}`).join(" ")}
                >
                  {/* {polygon.map(point => <><span>{point.x}</span><span>{point.y}</span></>)} */}
                </polygon>
              </>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );

type Polygon = { x: number; y: number }[];

export type SimplifiedTag = {
  value?: string;
  polygons?: Polygon[];
};

export const postBase: (useVotingStreamHook: typeof useVotingStreamTags, votingEnabled?: boolean) => NLView =
  (useVotingStreamHook, votingEnabled = true) =>
  () => {
    const state = useAppState();
    const actions = useActions();
    const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
    const [isEyeOpened, setIsEyeOpened] = useState<boolean>(false);
    const [isEyeOpenedResponzive, setIsEyeOpenedResponzive] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const isResponzive = useMediaQuery("(max-width: 1024px)");

    // const moodsToAttach = (state.api.auth.moods || []).filter((m) => m.id); // current users's moods
    const nextInStream = useVotingStreamHook(); //useVotingStreamTags();
    const ref = useRef<any>();
    const containerDeeplike = useRef<any>();

    const { contextType, contextValue, currPost, nextPath, index } = nextInStream;

    const author = useCachedUser({ id: currPost ? currPost?.author?.id : "" });
    const username = author?.username || author?.displayName;

    const { verifiedUsers } = useVerified([username || ""]);
    const isVerifiedUser = verifiedUsers && username && verifiedUsers.includes(username);

    const [hilightTag, setHilightTag] = useState<SimplifiedTag[]>([]);

    const navigateToNext = () => {
      const location = nextPath();
      if (!location) return;
      actions.routing.historyPush({ location });
    };

    const addToMoods = async (form?: { moods: { id: string }[] }) => {
      console.log("attachToMoods: Calling...");

      if (form?.moods?.length)
        await actions.api.post.attachToMoods({
          post: currPost,
          moods: form?.moods || [],
        });
      console.log("attachToMoods: done Attaching to moods...");
      navigateToNext();
    };

    const doneVoting = (rating: number) => {
      if (rating > 0) {
        actions.api.post.rate({
          post: currPost,
          amount: rating,
          contextType,
          contextValue,
          messageWrapper: (msg: string, rating: any) =>
            rating.TxID_mintFile ? (
              <a href={blockExplorerUrl.newscan(rating.TxID_mintFile)} target="_blank" rel="noreferrer">
                {msg}
                <br />
                <small>click for a newscan receipt</small>
              </a>
            ) : (
              <>{msg}</>
            ),
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
    if (!contextType && !(index >= 0)) return <Spin />;

    const url = [window.location.protocol, "//", window.location.host, state.routing.location].join("");

    const isVisionTag = (
      t:
        | {
            _rel?: {
              source: string;
              polygons: SimplifiedTag["polygons"];
            }[];
          }
        | any,
    ) => t._rel?.find((r) => r.source === "vision" && r.polygons);

    const nonVisionTags: SimplifiedTag[] =
      currPost.tags?.filter((t) => !isVisionTag(t)).map((t) => ({ ...t, polygons: [] })) || [];

    const visionTags: SimplifiedTag[] =
      currPost.tags
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

    return (
      <>
        <Vote
          // useVotingStream={useVotingStreamMood}
          votingEnabled={!!contextType}
          setVisible={setVisible}
          visible={visible}
          visionTags={visionTags}
          nonVisionTags={nonVisionTags}
          setHilightTag={setHilightTag}
          isEyeOpenedResponzive={isEyeOpenedResponzive}
          setIsEyeOpenedResponzive={setIsEyeOpenedResponzive}
          addToMoods={addToMoods}
          onDoneVoting={doneVoting}
          containerDeeplike={containerDeeplike}
          onLongDoneVoting={() => {
            const eh = (e) => {
              if (e.which !== 32) return;

              window.removeEventListener("keyup", eh);

              e.preventDefault();
              navigateToNext();
            };
            window.addEventListener("keyup", eh);

            return () => {
              window.removeEventListener("keyup", eh);
            };
          }}
          info={
            <Row className="nl-post-info-column">
              {isResponzive && (
                <Row className="nl-post-fake-drawer__username">
                  <Avatar src={<ContentImage {...author} />} className="u-margin-right-small" />
                  {username && (
                    <Link to={`/user/${username}`} className="nl-post-info-column__user-info">
                      <p className="paragraph-1r">{username}</p>
                    </Link>
                  )}
                </Row>
              )}
              <Row justify="space-between">
                <p className="header-2">{currPost.title || "Folder name"}</p>
              </Row>
              <Col style={{ flex: 0.3, overflow: "overlay" }} className="text-right">
                <Link to={`/user/${username}`} className="nl-post-info-column__user-info">
                  <span className="paragraph-2b u-margin-bottom-medium">
                    {username}
                    {isVerifiedUser && <VerifiedIcon style={{ marginRight: 20 }} />}
                  </span>
                  <span className="paragraph-2r">{currPost.description}</span>
                </Link>
                {currPost.author?.newcoinPoolTx && (
                  <Row className="paragraph-2u u-margin-top-medium" align="bottom">
                    <a
                      href={"https://explorer-dev.newcoin.org/account/" + currPost.author?.username}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Creator pool
                    </a>
                    <Ebene />
                  </Row>
                )}
                {currPost?.author?.newcoinPoolTx && (
                  <Row className="u-margin-top-medium text-left">
                    {currPost.newcoinMintTx === "REQUESTED" ? (
                      /* + currPost.newcoinMintTx || ""*/
                      <p className="paragraph-2b">Minting NFT...</p>
                    ) : currPost.newcoinMintTx === "FAILED" ? (
                      <p className="paragraph-2b">NFT Minting failed, please contact us for more details</p>
                    ) : (
                      <>
                        <BlockExplorerLink explorer="newcoin" id={currPost.newcoinMintTx}>
                          See minted NFT
                        </BlockExplorerLink>
                        <NFTIcon />
                      </>
                    )}
                  </Row>
                )}
              </Col>
              {/* <CopyToClipboard text={url}>
							<Tooltip
								title={
									!copyToClipboard
										? ""
										: "copied to clipboard"
								}
								placement="right"
							>
								<button
									className="copy-to-clipboard-button"
									onClick={() => {
										setCopyToClipboard(true);
										setTimeout(() => {
											setCopyToClipboard(false);
										}, 2000);
									}}
								>
									<Clipboard />
								</button>
							</Tooltip>
						  </CopyToClipboard> */}
              <Tags isEyeOpened={isEyeOpened} visionTags={visionTags} nonVisionTags={nonVisionTags} setHilightTag={setHilightTag}>
                <Row style={{ flex: 0.4 }} />
              </Tags>
              {/* infobox */}
              <Row className="nl-post-info-column__infobox-wrapper">
                <Col className="nl-post-info-column__infobox-wrapper__col">
                  <LargeArrowBack />
                  {currPost.tags?.length ? (
                    isEyeOpened ? (
                      <span
                        className="u-margin-left-small cursor-pointer"
                        onClick={() => {
                          setHilightTag([]);
                          setIsEyeOpened(false);
                        }}
                        onMouseOver={() => setHilightTag(visionTags)}
                        onMouseOut={() => setHilightTag([])}
                      >
                        <EyeOpen />
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          if (isResponzive) {
                            setIsEyeOpenedResponzive(true);
                            setVisible((p) => !p);
                          } else setIsEyeOpened(true);
                        }}
                      >
                        <EyeClosed />
                      </span>
                    )
                  ) : (
                    <></>
                  )}
                  <Share currentPostProps={currPost} />
                  <PostReportModal />
                </Col>
              </Row>
              {/* infobox */}
            </Row>
          }
        >
          {/PROCESSING/i.test(currPost.contentUrl || "") ? (
            <Spin title="Processing media..." />
          ) : (
            <ContentImage ref={ref} {...currPost} thumbnail={false} />
          )}
          {hilightTag?.length ? <SvgPolygons visionTags={hilightTag} /> : <></>}
        </Vote>

        <div hidden={state.flows.rating.value !== 100} style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <div className="nl-post-deeplike-desktop-wrapper">
            <ContentLayoutDeepLike containerDeeplike={containerDeeplike}>
              <SelectMoodForm
                onFinish={addToMoods}
                title="Save to a folder"
                deeplikeActions
                setVisible={setVisible}
                visible={visible}
              />
            </ContentLayoutDeepLike>
          </div>
        </div>
      </>
    );
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
