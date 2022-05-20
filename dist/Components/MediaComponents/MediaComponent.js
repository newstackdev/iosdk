import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useVisibilityOnce } from "../../hooks/useVisibility";
import { contentImageUrl, ImageComponent } from "./ImageMediaComponent";
import { TextMediaComponent } from "./TextMediaComponent";
import { contentVideoUrl, VideoComponent } from "./VideoMediaComponent";
const withLink = (element, to) => to ? _jsx(Link, { to: to, children: element }) : element;
const contentTypeElements = {
    default: ImageComponent,
    "video/mp4": VideoComponent,
    "text/plain": TextMediaComponent,
};
const mediaComponentUrlResolvers = {
    default: contentImageUrl,
    "video/mp4": contentVideoUrl,
    // "text/html": content
};
export const getMediaComponentUrl = (props) => (mediaComponentUrlResolvers[props.contentType || ""] ||
    mediaComponentUrlResolvers.default)(props);
export const MediaComponent = (props) => {
    const { contentType, thumbnail } = props;
    const cte = contentTypeElements[contentType || ""];
    const ContentTypeElement = cte || contentTypeElements.default;
    const [isVisible, currentElement] = useVisibilityOnce(150);
    const isThumbnail = thumbnail ?? true;
    if (!isThumbnail)
        return (_jsx(ContentTypeElement, { ...{ ...props, thumbnail: thumbnail ?? true, isVisible } }));
    return (_jsx("div", { ref: currentElement, style: { overflow: "hidden" }, className: "ant-image-size", children: _jsx(ContentTypeElement, { ...{ ...props, thumbnail: isThumbnail, isVisible } }) }));
};
//# sourceMappingURL=MediaComponent.js.map