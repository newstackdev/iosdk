import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { MaybeLink, PostWidget } from "./PostWidget";
import { Swiper, SwiperSlide } from "swiper/react";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { fischerYates } from "../utils/random";
import { useAppState } from "../overmind";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useVerifiedPosts } from "../hooks/useVerified";
import Title from "../Pages/Explore/Title";
const SpotlightListCarousel = ({ children, navigationPrevRef, navigationNextRef }) => {
    return (_jsx(Swiper, { modules: [Autoplay, Navigation], slidesPerView: 3, navigation: {
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
const Spotlight = ({ p, moodsList, mood, index, title, verifiedUsers }) => (_jsxs("div", { style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    }, className: "bg-hover", children: [_jsx(Col, { className: "spotlight", children: _jsx(MaybeLink, { to: !p.id ? "" : !mood ? `/post/${p.id}` : `/folder/${mood.id}/${p.id}`, className: p.contentType === "text/plain" ? "maybelink" : "", children: _jsx(PostWidget, { mood: moodsList[index], post: p, username: p.author?.username, aspectRatio: p.aspectRatio, isSpotlight: true }) }) }), _jsx("p", { className: title === undefined
                ? "spotlight-username paragraph-2b font-variant-none"
                : "spotlight-username paragraph-1b font-variant-none", children: _jsxs(Link, { to: `/user/${p?.author?.username || p.author?.displayName}`, style: { display: "flex", flexDirection: "row" }, children: [p?.author?.username || p?.author?.displayName, verifiedUsers && verifiedUsers.includes(p?.author?.username) && (_jsx("span", { style: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }, children: _jsx(VerifiedIcon, { style: {
                                width: "1em",
                                height: "auto",
                                marginLeft: 10,
                            } }) }))] }) })] }));
export const SpotlightGrid = ({ maxItems, title, mood, carousel, navigationPrevRef, navigationNextRef }) => {
    const [postsList, setPostsList] = useState([]);
    const [moodsList, setMoodsList] = useState([]);
    const state = useAppState();
    useEffect(() => {
        const moods = fischerYates(state.lists.top.moods.items || [], maxItems || 4);
        const posts = moods.map((m) => fischerYates(m.posts || [], 1)[0]);
        setPostsList(posts);
        setMoodsList(moods);
    }, [state.lists.top.moods, state.lists.top.posts]);
    const { verifiedUsers } = useVerifiedPosts(postsList);
    if (carousel) {
        return (_jsx(SpotlightListCarousel, { navigationPrevRef: navigationPrevRef, navigationNextRef: navigationNextRef, children: _jsx("div", { style: { width: "100%", height: "100%", display: "flex" }, children: postsList?.map((p, i) => (_jsx(SwiperSlide, { children: _jsx(Spotlight, { p: p, index: i, title: title, mood: mood, moodsList: moodsList, verifiedUsers: verifiedUsers }) }))) }) }));
    }
    else
        return (_jsx("div", { style: { width: "100%", height: "100%", display: "flex" }, children: postsList?.map((p, i) => (_jsx(Spotlight, { p: p, index: i, title: title, mood: mood, moodsList: moodsList, verifiedUsers: verifiedUsers }))) }));
};
const Spotlights = ({ title, maxRows, maxItems, carousel }) => {
    const state = useAppState();
    const moods = state.lists.top.moods.items;
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: "Spotlights" }) })), _jsxs("div", { children: [_jsx(Row, { children: title ? (_jsx(Title, { title: title, href: "/spotlights", navigationPrevRef: navigationPrevRef, navigationNextRef: navigationNextRef })) : (_jsx(_Fragment, {})) }), _jsx("div", { className: "spotlight-flex-container", children: moods?.slice(0, maxRows || moods.length).map((m, index) => {
                            return (_jsx(Row, { className: "nl-mood-grid-row spotlight-row", children: _jsx(SpotlightGrid, { maxItems: maxItems, title: title, mood: m, carousel: carousel, navigationPrevRef: navigationPrevRef, navigationNextRef: navigationNextRef }) }));
                        }) })] })] }));
};
export default Spotlights;
//# sourceMappingURL=Spotlights.js.map