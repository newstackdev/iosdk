import { useState } from "react";
import { newlifeMediaBucket } from "../../config";
import { ImageComponent, previewImg } from "./ImageMediaComponent";
import { ContentImageProps, Sizes, ContentElement } from "./types";


const videoSizes: Record<Sizes, string> = {
	small: "480p",
	medium: "720p",
	full: "1080p",
	"": "1080p",
};

export const contentVideoUrl = ({
	id,
	contentUrl,
	contentType,
	size
}: ContentImageProps) => {
	const sizer = videoSizes[size || ""];

	const videoContentPath = contentType?.split(/\//)[1];

	return contentUrl ?
                `${newlifeMediaBucket}/videos/${id}/${videoContentPath}/${sizer}/${contentUrl}`
                : 
                "";
};


export const VideoComponent: ContentElement = (props) => {
	const {
		size,
		contentUrl,
		id,
		thumbnail,
		coverContentUrl
	} = props;
	const sizer = videoSizes[size || ""];
	const [isUnavailable, setIsUnavailable] = useState<boolean>(false);

	const imgUrl = contentUrl ? contentVideoUrl(props) : previewImg;

	if (thumbnail) {
		const thumbnailUrl = `${newlifeMediaBucket}/videos/${id}/thumbnail/${coverContentUrl?.replace(/[^.]+$/, m => `0000000.${m}`)}`;
		console.log({ thumbnailUrl })
		return <ImageComponent {...{ ...props, overrideContentUrl: thumbnailUrl }} />
	}

    //+ "#t=0.3"
	return (
		<video autoPlay={true} muted={true} onError={() => setIsUnavailable(true)} controls={true} width="100%" height="100%">
			<source src={imgUrl} type="video/mp4" />
		</video>
	)
}
