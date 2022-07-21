import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Carousel } from "antd";
import { Col, Row } from "antd";
import { ContentImage } from "./Image";
import { ContentLayout } from "./ContentLayout";
import { IOView } from "../types";
import { LargeArrowBack } from "./Icons/LargeArrowBack";
import { Link } from "react-router-dom";
import { MaybeLink, PostWidget } from "./PostWidget";
import { MoodReadResponse, PostReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { NLView } from "../types";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Swiper, SwiperSlide } from "swiper/react";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { fischerYates } from "../utils/random";
import { max } from "lodash";
import { useAppState } from "../overmind";
import { useCachedMood } from "../hooks/useCached";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useVerifiedPosts } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";

const SpotlightListCarousel: React.FC<{
  children: JSX.Element;
  navigationPrevRef: any;
  navigationNextRef: any;
}> = ({ children, navigationPrevRef, navigationNextRef }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      slidesPerView={3}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      pagination={{ clickable: true }}
      loop
      autoplay={{
        delay: 4000,
      }}
      speed={500}
      style={{
        textAlign: "center",
        cursor: "grabbing",
      }}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
      watchSlidesProgress
    >
      {children}
    </Swiper>
  );
};

const Spotlight: IOView<{
  p: any;
  moodsList: any[];
  mood: MoodReadResponse;
  index: number;
  title?: string;
  verifiedUsers: (string | undefined)[] | undefined;
}> = ({ p, moodsList, mood, index, title, verifiedUsers }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
    className="bg-hover"
  >
    <Col className="spotlight">
      <MaybeLink
        to={!p.id ? "" : !mood ? `/post/${p.id}` : `/folder/${mood.id}/${p.id}`}
        className={p.contentType === "text/plain" ? "maybelink" : ""}
      >
        <PostWidget
          mood={moodsList[index]}
          post={p}
          username={p.author?.username}
          aspectRatio={p.aspectRatio}
          isSpotlight={true}
        />
      </MaybeLink>
    </Col>
    <p
      className={
        title === undefined
          ? "spotlight-username paragraph-2b font-variant-none"
          : "spotlight-username paragraph-1b font-variant-none"
      }
    >
      <Link to={`/user/${p?.author?.username || p.author?.displayName}`} style={{ display: "flex", flexDirection: "row" }}>
        {p?.author?.username || p?.author?.displayName}
        {verifiedUsers && verifiedUsers.includes(p?.author?.username) && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VerifiedIcon
              style={{
                width: "1em",
                height: "auto",
                marginLeft: 10,
              }}
            />
          </span>
        )}
      </Link>
    </p>
  </div>
);

export const SpotlightGrid: NLView<{
  maxItems?: number;
  title?: string;
  mood: MoodReadResponse;
  carousel: boolean;
  navigationPrevRef: any;
  navigationNextRef: any;
}> = ({ maxItems, title, mood, carousel, navigationPrevRef, navigationNextRef }) => {
  const [postsList, setPostsList] = useState<PostReadResponse[]>([]);
  const [moodsList, setMoodsList] = useState<MoodReadResponse[]>([]);

  const state = useAppState();

  useEffect(() => {
    const moods = fischerYates(state.lists.top.moods.items || [], maxItems || 4);
    const posts = moods.map((m) => fischerYates(m.posts || [], 1)[0]);

    setPostsList(posts);
    setMoodsList(moods);
  }, [state.lists.top.moods, state.lists.top.posts]);

  const { verifiedUsers } = useVerifiedPosts(postsList);

  if (carousel) {
    return (
      <SpotlightListCarousel navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          {postsList?.map((p: any, i: number) => (
            <SwiperSlide>
              <Spotlight p={p} index={i} title={title} mood={mood} moodsList={moodsList} verifiedUsers={verifiedUsers} />
            </SwiperSlide>
          ))}
        </div>
      </SpotlightListCarousel>
    );
  } else
    return (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {postsList?.map((p: any, i: number) => (
          <Spotlight p={p} index={i} title={title} mood={mood} moodsList={moodsList} verifiedUsers={verifiedUsers} />
        ))}
      </div>
    );
};

const Spotlights: NLView<{
  title?: string;
  maxRows?: number;
  maxItems?: number;
  carousel: boolean;
}> = ({ title, maxRows, maxItems, carousel }) => {
  const state = useAppState();
  const moods = state.lists.top.moods.items;
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <>
      {title === undefined && (
        <Row>
          <p className="header-2 u-margin-bottom-medium">Spotlights</p>
        </Row>
      )}
      <div>
        <Row>
          {title ? (
            <Title title={title} href="/spotlights" navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
          ) : (
            <></>
          )}
        </Row>
        <div className="spotlight-flex-container">
          {moods?.slice(0, maxRows || moods.length).map((m, index) => {
            return (
              <Row className="nl-mood-grid-row spotlight-row">
                <SpotlightGrid
                  maxItems={maxItems}
                  title={title}
                  mood={m}
                  carousel={carousel}
                  navigationPrevRef={navigationPrevRef}
                  navigationNextRef={navigationNextRef}
                />
              </Row>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Spotlights;
