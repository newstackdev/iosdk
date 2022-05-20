import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Title from "../Pages/Explore/Title";
import { useAppState } from "../overmind";
import { MaybeLink, PostWidget } from "./PostWidget";
import { fischerYates } from "../utils/random";
const SpotlightGrid = ({ maxItems, title, mood }) => {
    // const m = useCachedMood(mood);
    // const postsList = m.posts?.slice(0, 1);
    // const username = "newdomain.io";
    // const m = useCachedMood(mood);
    // const postsList = m.posts?.slice(0, 1);
    const moodsList = fischerYates(useAppState().lists.top.moods.items || [], maxItems || 6);
    const postsList = moodsList.map((m) => fischerYates(m.posts || [], 1)[0]);
    return (_jsx("div", { style: { width: "100%", height: "100%", display: "flex" }, children: postsList?.map((p, i) => (_jsxs("div", { style: {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }, className: "bg-hover", children: [_jsx(Col, { className: "spotlight", children: _jsx(MaybeLink, { to: !p.id
                            ? ""
                            : !mood
                                ? `/post/${p.id}`
                                : `/folder/${mood.id}/${p.id}`, className: p.contentType === "text/plain"
                            ? "maybelink"
                            : "", children: _jsx(PostWidget, { mood: moodsList[i], post: p, username: p.author?.username, aspectRatio: p.aspectRatio, isSpotlight: true }) }) }), _jsx("p", { className: title === undefined
                        ? "spotlight-username paragraph-2b font-variant-none"
                        : "spotlight-username paragraph-1b font-variant-none", children: _jsx(Link, { to: `/user/${p?.author?.username || p.author?.displayName}`, children: title === undefined
                            ? p?.author?.username.substring(0, 7) + "..." ||
                                p?.author?.displayName.substring(0, 7) + "..."
                            : p?.author?.username }) })] }))) }));
};
const Spotlights = ({ title, maxRows, maxItems }) => {
    const state = useAppState();
    const moods = state.lists.top.moods.items;
    return (_jsxs(_Fragment, { children: [title === undefined && (_jsx(Row, { children: _jsx("p", { className: "header-2 u-margin-bottom-medium", children: "Spotlights" }) })), _jsxs("div", { children: [title ? _jsx(Title, { title: title, href: "/spotlights" }) : _jsx(_Fragment, {}), _jsx("div", { className: "spotlight-flex-container", children: moods?.slice(0, maxRows || moods.length).map((m) => (_jsx(Row, { className: "nl-mood-grid-row spotlight-row", children: _jsx(SpotlightGrid, { maxItems: maxItems, title: title, mood: m }) }))) })] })] }));
};
export default Spotlights;
//# sourceMappingURL=Spotlights.js.map