import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { BannerArrow } from "./Icons/BannerArrow";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { MaybeLink, PostWidget } from "./PostWidget";
import { Swiper, SwiperSlide } from "swiper/react";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { urlify } from "../utils/urlHelpers";
import { useActions, useAppState } from "../overmind";
import { useEffect } from "react";
import { useRef } from "react";
import { useVerifiedPosts } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";
const SpotlightListCarousel = ({ children, navigationPrevRef, navigationNextRef }) => {
    return (_jsx(Swiper
    //TODO disable autoplay and add video icon
    , { 
        //TODO disable autoplay and add video icon
        modules: [Autoplay, Navigation], slidesPerView: 4, navigation: {
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
        }, pagination: { clickable: true }, loop: true, autoplay: {
            delay: 4000,
        }, speed: 500, style: {
            textAlign: "center",
            cursor: "grabbing",
        }, breakpoints: {
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
        }, watchSlidesProgress: true, children: children }));
};
const Spotlight = ({ post, title, verifiedUsers }) => {
    const url = urlify(post?.description);
    const actions = useActions();
    useEffect(() => {
        actions.lists.resetMoodAndPostAvailability();
    }, []);
    return (_jsx(_Fragment, { children: _jsxs("div", { style: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }, className: "bg-hover", children: [_jsxs(Col, { className: "spotlight", children: [url && (_jsx("a", { style: {
                                position: "absolute",
                                zIndex: 999999,
                                cursor: "pointer",
                                bottom: 10,
                                top: 18,
                                left: "46%",
                                height: "auto",
                            }, href: url, target: "_blank", rel: "noreferrer", children: _jsx(BannerArrow, {}) })), _jsx(MaybeLink
                        //@ts-ignore
                        , { 
                            //@ts-ignore
                            to: !post.id ? "" : !post ? `/post/${post.id}` : `/folder/${post.moods.id}/${post.id}`, className: post.contentType === "text/plain" ? "maybelink" : "", children: _jsx(PostWidget, { post: post, username: post.author?.username, aspectRatio: post.aspectRatio, isSpotlight: true }) })] }), _jsx("p", { className: title === undefined
                        ? "spotlight-username paragraph-2b font-variant-none"
                        : "spotlight-username paragraph-1b font-variant-none", children: _jsxs(Link, { to: `/user/${post?.author?.username || post.author?.displayName}`, style: { display: "flex", flexDirection: "row" }, children: [post?.author?.username || post?.author?.displayName, verifiedUsers && verifiedUsers.includes(post?.author?.username) && (_jsx("span", { style: {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }, children: _jsx(VerifiedIcon, { style: {
                                        width: "1em",
                                        height: "auto",
                                        marginLeft: 10,
                                    } }) }))] }) })] }) }));
};
export const SpotlightGrid = ({ title, carousel, navigationPrevRef, navigationNextRef, posts }) => {
    const { verifiedUsers } = useVerifiedPosts(posts);
    if (carousel) {
        return (_jsx(SpotlightListCarousel, { navigationPrevRef: navigationPrevRef, navigationNextRef: navigationNextRef, children: _jsx("div", { style: { width: "100%", height: "100%", display: "flex", flexWrap: "wrap" }, children: posts.map((post) => {
                    return (_jsx("div", { className: "ant-col", children: _jsx(SwiperSlide, { children: _jsx(Spotlight, { title: title, post: post, verifiedUsers: verifiedUsers }) }) }));
                }) }) }));
    }
    else
        return (_jsx("div", { style: { width: "100%", height: "100%", display: "flex", flexWrap: "wrap" }, children: posts.map((post) => {
                return (_jsx("div", { className: "ant-col", children: _jsx(Spotlight, { title: title, post: post, verifiedUsers: verifiedUsers }) }));
            }) }));
};
const Spotlights = ({ title, carousel, posts, href }) => {
    const state = useAppState();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [state.routing.location === "/explore" ? (_jsx(Title, { title: title, href: href, navigationPrevRef: navigationPrevRef, navigationNextRef: navigationNextRef })) : (_jsx(Row, { children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: title }) })), _jsx("div", { className: "spotlight-flex-container", children: _jsx(Row, { className: "nl-mood-grid-row-four spotlight-row", children: _jsx(SpotlightGrid, { title: title, posts: posts, carousel: carousel, navigationPrevRef: navigationPrevRef, navigationNextRef: navigationNextRef }) }) })] }) }));
};
export default Spotlights;
//# sourceMappingURL=Spotlights.js.map