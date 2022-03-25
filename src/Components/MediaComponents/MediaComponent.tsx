import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useVisibilityOnce } from "../../hooks/useVisibility";
import { contentImageUrl, ImageComponent } from "./ImageMediaComponent";
import { TextMediaComponent } from "./TextMediaComponent";
import { ContentElement, ContentImageProps } from "./types";
import { contentVideoUrl, VideoComponent } from "./VideoMediaComponent";

const withLink = (element: ReactElement, to?: string) =>
	to ? <Link to={to}>{element}</Link> : element;

const contentTypeElements: Record<string, ContentElement> = {
	default: ImageComponent,
	"video/mp4": VideoComponent,
	"text/plain": TextMediaComponent,
};

const mediaComponentUrlResolvers: Record<
	string,
	(props: ContentImageProps) => string
> = {
	default: contentImageUrl,
	"video/mp4": contentVideoUrl,
	// "text/html": content
};

export const getMediaComponentUrl = (props: ContentImageProps) =>
	(
		mediaComponentUrlResolvers[props.contentType || ""] ||
		mediaComponentUrlResolvers.default
	)(props);

export const MediaComponent: ContentElement = (props) => {
	const { contentType, thumbnail } = props;
	const cte = contentTypeElements[contentType || ""];
	const ContentTypeElement = cte || contentTypeElements.default;
	const [isVisible, currentElement] = useVisibilityOnce<HTMLDivElement>(150);

	const isThumbnail = thumbnail ?? true;

	if (!isThumbnail)
		return (
			<ContentTypeElement
				{...{ ...props, thumbnail: thumbnail ?? true, isVisible }}
			/>
		);

	return (
		<div
			ref={currentElement}
			style={{ overflow: "hidden" }}
			className="ant-image-size"
		>
			<ContentTypeElement
				{...{ ...props, thumbnail: isThumbnail, isVisible }}
			/>
		</div>
	);
};
