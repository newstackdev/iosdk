import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Image } from "antd";
import { Link } from "react-router-dom";
import { aestheticList } from "../overmind/lists/SearchCreative/aestheticList";
import { useAppState } from "../overmind";
export const SearchItemWidget = ({ item, index }) => {
    const state = useAppState();
    return _jsxs(Card, { style: { width: "100%" }, 
        // title={}
        cover: _jsx(Link, { to: `/search-creative/vote?${state.routing.location}&index=${index.toString()}`, children: _jsx(Image, { width: "100%", preview: false, src: item.image }) }), children: [_jsx("small", { children: _jsx("a", { href: item?.meta?.short_url, target: "_new", children: item?.meta?.short_url }) }), _jsx("br", {}), _jsxs("small", { children: ["by", " ", _jsx("a", { href: `${item?.meta?.short_url}`, target: "_new", children: item?.meta?.blog_name })] }), _jsx("br", {}), _jsx("small", { children: Object.entries(item?.aesthetics ?? {})
                    .filter(kvp => aestheticList.includes(kvp[0]))
                    .map(kvp => _jsxs("p", { style: { textAlign: "center" }, children: [kvp[0], _jsx("div", { className: "nl-rating-bar", style: {
                                textAlign: "left",
                                opacity: 100,
                                width: `${kvp[1] * 100 || 0}%`,
                            } })] })) })] });
};
//# sourceMappingURL=SearchItemWidget.js.map