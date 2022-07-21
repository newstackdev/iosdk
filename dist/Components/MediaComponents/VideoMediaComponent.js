import { jsx as _jsx } from "react/jsx-runtime";
import { previewImg } from "./constants";
import { useAppState } from "../../overmind";
import { useState } from "react";
import { ImageComponent } from "./ImageMediaComponent";
const videoSizes = {
    small: "480p",
    medium: "720p",
    full: "1080p",
    "": "1080p",
};
export const useContentVideoUrl = ({ id, contentUrl, contentType, size }) => {
    const state = useAppState();
    const sizer = videoSizes[size || ""];
    const videoContentPath = contentType?.split(/\//)[1];
    return contentUrl
        ? `${state.config.settings.newgraph.mediaBucket}/videos/${id}/${videoContentPath}/${sizer}/${contentUrl}`
        : "";
};
export const VideoComponent = (props) => {
    const { size, contentUrl, id, thumbnail, coverContentUrl } = props;
    const sizer = videoSizes[size || ""];
    const [isUnavailable, setIsUnavailable] = useState(false);
    const standard = useContentVideoUrl(props);
    const imgUrl = contentUrl ? standard : previewImg;
    const state = useAppState();
    if (thumbnail) {
        const thumbnailUrl = `${state.config.settings.newgraph.mediaBucket}/videos/${id}/thumbnail/${coverContentUrl?.replace(/[^.]+$/, (m) => `0000000.${m}`)}`;
        console.log({ thumbnailUrl });
        return _jsx(ImageComponent, { ...{ ...props, overrideContentUrl: thumbnailUrl } });
    }
    //+ "#t=0.3"
    return (_jsx("video", { autoPlay: true, muted: true, onError: () => setIsUnavailable(true), controls: true, width: "100%", height: "100%", children: _jsx("source", { src: imgUrl, type: "video/mp4" }) }));
};
//# sourceMappingURL=VideoMediaComponent.js.map