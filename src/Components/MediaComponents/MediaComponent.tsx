import { ContentElement, ContentImageProps } from "./types";
import { ImageComponent, useContentImageUrl } from "./ImageMediaComponent";
import { Link } from "react-router-dom";
import { ReactElement } from "react";
import { TextMediaComponent } from "./TextMediaComponent";
import { VideoComponent, useContentVideoUrl } from "./VideoMediaComponent";
import { useVisibilityOnce } from "../../hooks/useVisibility";

const withLink = (element: ReactElement, to?: string) => (to ? <Link to={to}>{element}</Link> : element);

const contentTypeElements: Record<string, ContentElement> = {
  default: ImageComponent,
  "video/mp4": VideoComponent,
  "text/plain": TextMediaComponent,
};

const mediaComponentUrlResolvers: Record<string, (props: ContentImageProps) => string> = {
  default: useContentImageUrl,
  "video/mp4": useContentVideoUrl,
  // "text/html": content
};

export const useMediaComponentUrl = (props: ContentImageProps) =>
  (mediaComponentUrlResolvers[props.contentType || ""] || mediaComponentUrlResolvers.default)(props);

export const MediaComponent: ContentElement = (props) => {
  const { contentType, thumbnail } = props;
  const cte = contentTypeElements[contentType || ""];
  const ContentTypeElement = cte || contentTypeElements.default;
  const [isVisible, currentElement] = useVisibilityOnce<HTMLDivElement>(150);

  const isThumbnail = thumbnail ?? true;

  if (!isThumbnail) return <ContentTypeElement {...{ ...props, thumbnail: thumbnail ?? true, isVisible }} />;

  return (
    <div ref={currentElement} style={{ overflow: "hidden" }} className="ant-image-size">
      <ContentTypeElement {...{ ...props, thumbnail: isThumbnail, isVisible }} />
    </div>
  );
};
