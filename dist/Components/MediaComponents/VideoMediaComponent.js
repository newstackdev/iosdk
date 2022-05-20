import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { newlifeMediaBucket } from "../../config";
import { ImageComponent, previewImg } from "./ImageMediaComponent";
const videoSizes = {
    small: "480p",
    medium: "720p",
    full: "1080p",
    "": "1080p",
};
export const contentVideoUrl = ({ id, contentUrl, contentType, size }) => {
    const sizer = videoSizes[size || ""];
    const videoContentPath = contentType?.split(/\//)[1];
    return contentUrl ?
        `${newlifeMediaBucket}/videos/${id}/${videoContentPath}/${sizer}/${contentUrl}`
        :
            "";
};
export const VideoComponent = (props) => {
    const { size, contentUrl, id, thumbnail, coverContentUrl } = props;
    const sizer = videoSizes[size || ""];
    const [isUnavailable, setIsUnavailable] = useState(false);
    const imgUrl = contentUrl ? contentVideoUrl(props) : previewImg;
    if (thumbnail) {
        const thumbnailUrl = `${newlifeMediaBucket}/videos/${id}/thumbnail/${coverContentUrl?.replace(/[^.]+$/, m => `0000000.${m}`)}`;
        console.log({ thumbnailUrl });
        return _jsx(ImageComponent, { ...{ ...props, overrideContentUrl: thumbnailUrl } });
    }
    //+ "#t=0.3"
    return (_jsx("video", { autoPlay: true, muted: true, onError: () => setIsUnavailable(true), controls: true, width: "100%", height: "100%", children: _jsx("source", { src: imgUrl, type: "video/mp4" }) }));
};
//# sourceMappingURL=VideoMediaComponent.js.map