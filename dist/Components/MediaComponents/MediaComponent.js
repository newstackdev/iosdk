import { jsx as _jsx } from "react/jsx-runtime";
import { ImageComponent, useContentImageUrl } from "./ImageMediaComponent";
import { Link } from "react-router-dom";
import { TextMediaComponent } from "./TextMediaComponent";
import { VideoComponent, useContentVideoUrl } from "./VideoMediaComponent";
import { useVisibilityOnce } from "../../hooks/useVisibility";
const withLink = (element, to) => (to ? _jsx(Link, { to: to, children: element }) : element);
const contentTypeElements = {
    default: ImageComponent,
    "video/mp4": VideoComponent,
    "text/plain": TextMediaComponent,
};
const mediaComponentUrlResolvers = {
    default: useContentImageUrl,
    "video/mp4": useContentVideoUrl,
    // "text/html": content
};
export const useMediaComponentUrl = (props) => (mediaComponentUrlResolvers[props.contentType || ""] || mediaComponentUrlResolvers.default)(props);
export const MediaComponent = (props) => {
    const { contentType, thumbnail } = props;
    const cte = contentTypeElements[contentType || ""];
    const ContentTypeElement = cte || contentTypeElements.default;
    const [isVisible, currentElement] = useVisibilityOnce(150);
    const isThumbnail = thumbnail ?? true;
    if (!isThumbnail)
        return _jsx(ContentTypeElement, { ...{ ...props, thumbnail: thumbnail ?? true, isVisible } });
    return (_jsx("div", { ref: currentElement, style: { overflow: "hidden" }, className: "ant-image-size", children: _jsx(ContentTypeElement, { ...{ ...props, thumbnail: isThumbnail, isVisible } }) }));
};
//# sourceMappingURL=MediaComponent.js.map