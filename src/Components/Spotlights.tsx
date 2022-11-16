import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { BannerArrow } from "./Icons/BannerArrow";
import { Col, Row } from "antd";
import { IOView } from "../types";
import { Link } from "react-router-dom";
import { MaybeLink, PostWidget } from "./PostWidget";
import { MoodReadResponse, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { urlify } from "../utils/urlHelpers";
import { useActions, useAppState } from "../overmind";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useVerifiedPosts } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";

const SpotlightListCarousel: IOView<{
  children: JSX.Element;
  navigationPrevRef: any;
  navigationNextRef: any;
}> = ({ children, navigationPrevRef, navigationNextRef }) => {
  return (
    <Swiper
      //TODO disable autoplay and add video icon
      modules={[Autoplay, Navigation]}
      slidesPerView={4}
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
  post: PostReadResponse;
  title?: string;
  verifiedUsers: (string | undefined)[] | undefined;
}> = ({ post, title, verifiedUsers }) => {
  const url = urlify(post?.description);
  const actions = useActions();

  useEffect(() => {
    actions.lists.resetMoodAndPostAvailability();
  }, []);

  return (
    <>
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
          {url && (
            <a
              style={{
                position: "absolute",
                zIndex: 999999,
                cursor: "pointer",
                bottom: 10,
                top: 18,
                left: "46%",
                height: "auto",
              }}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <BannerArrow />
            </a>
          )}
          <MaybeLink
            //@ts-ignore
            to={!post.id ? "" : !post ? `/post/${post.id}` : `/folder/${post.moods.id}/${post.id}`}
            className={post.contentType === "text/plain" ? "maybelink" : ""}
          >
            <PostWidget post={post} username={post.author?.username} aspectRatio={post.aspectRatio} isSpotlight={true} />
          </MaybeLink>
        </Col>
        <p
          className={
            title === undefined
              ? "spotlight-username paragraph-2b font-variant-none"
              : "spotlight-username paragraph-1b font-variant-none"
          }
        >
          <Link
            to={`/user/${post?.author?.username || post.author?.displayName}`}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {post?.author?.username || post?.author?.displayName}
            {verifiedUsers && verifiedUsers.includes(post?.author?.username) && (
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
    </>
  );
};

export const SpotlightGrid: NLView<{
  title?: string;
  carousel?: boolean;
  navigationPrevRef: any;
  navigationNextRef: any;
  posts: PostReadResponse[];
}> = ({ title, carousel, navigationPrevRef, navigationNextRef, posts }) => {
  const { verifiedUsers } = useVerifiedPosts(posts);

  if (carousel) {
    return (
      <SpotlightListCarousel navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}>
        <div style={{ width: "100%", height: "100%", display: "flex", flexWrap: "wrap" }}>
          {posts.map((post) => {
            return (
              <div className="ant-col">
                <SwiperSlide>
                  <Spotlight title={title} post={post} verifiedUsers={verifiedUsers} />
                </SwiperSlide>
              </div>
            );
          })}
        </div>
      </SpotlightListCarousel>
    );
  } else
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexWrap: "wrap" }}>
        {posts.map((post) => {
          return (
            <div className="ant-col">
              <Spotlight title={title} post={post} verifiedUsers={verifiedUsers} />
            </div>
          );
        })}
      </div>
    );
};

const Spotlights: NLView<{
  href?: string;
  title?: string;
  carousel?: boolean;
  posts: PostReadResponse[];
}> = ({ title, carousel, posts, href }) => {
  const state = useAppState();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <>
      <div>
        {state.routing.location === "/explore" ? (
          <Title title={title} href={href} navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef} />
        ) : (
          <Row>
            <p className="header-2 u-margin-bottom-medium">{title}</p>
          </Row>
        )}
        <div className="spotlight-flex-container">
          <Row className="nl-mood-grid-row-four spotlight-row">
            <SpotlightGrid
              title={title}
              posts={posts}
              carousel={carousel}
              navigationPrevRef={navigationPrevRef}
              navigationNextRef={navigationNextRef}
            />
          </Row>
        </div>
      </div>
    </>
  );
};

export default Spotlights;
