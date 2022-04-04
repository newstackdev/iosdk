"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaComponent = exports.getMediaComponentUrl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const useVisibility_1 = require("../../hooks/useVisibility");
const ImageMediaComponent_1 = require("./ImageMediaComponent");
const TextMediaComponent_1 = require("./TextMediaComponent");
const VideoMediaComponent_1 = require("./VideoMediaComponent");
const withLink = (element, to) => to ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: to, children: element }) : element;
const contentTypeElements = {
    default: ImageMediaComponent_1.ImageComponent,
    "video/mp4": VideoMediaComponent_1.VideoComponent,
    "text/plain": TextMediaComponent_1.TextMediaComponent,
};
const mediaComponentUrlResolvers = {
    default: ImageMediaComponent_1.contentImageUrl,
    "video/mp4": VideoMediaComponent_1.contentVideoUrl,
    // "text/html": content
};
const getMediaComponentUrl = (props) => (mediaComponentUrlResolvers[props.contentType || ""] ||
    mediaComponentUrlResolvers.default)(props);
exports.getMediaComponentUrl = getMediaComponentUrl;
const MediaComponent = (props) => {
    const { contentType, thumbnail } = props;
    const cte = contentTypeElements[contentType || ""];
    const ContentTypeElement = cte || contentTypeElements.default;
    const [isVisible, currentElement] = (0, useVisibility_1.useVisibilityOnce)(150);
    const isThumbnail = thumbnail ?? true;
    if (!isThumbnail)
        return ((0, jsx_runtime_1.jsx)(ContentTypeElement, { ...{ ...props, thumbnail: thumbnail ?? true, isVisible } }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: currentElement, style: { overflow: "hidden" }, className: "ant-image-size", children: (0, jsx_runtime_1.jsx)(ContentTypeElement, { ...{ ...props, thumbnail: isThumbnail, isVisible } }) }));
};
exports.MediaComponent = MediaComponent;
//# sourceMappingURL=MediaComponent.js.map