"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoComponent = exports.contentVideoUrl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const config_1 = require("../../config");
const ImageMediaComponent_1 = require("./ImageMediaComponent");
const videoSizes = {
    small: "480p",
    medium: "720p",
    full: "1080p",
    "": "1080p",
};
const contentVideoUrl = ({ id, contentUrl, contentType, size }) => {
    const sizer = videoSizes[size || ""];
    const videoContentPath = contentType?.split(/\//)[1];
    return contentUrl ?
        `${config_1.newlifeMediaBucket}/videos/${id}/${videoContentPath}/${sizer}/${contentUrl}`
        :
            "";
};
exports.contentVideoUrl = contentVideoUrl;
const VideoComponent = (props) => {
    const { size, contentUrl, id, thumbnail, coverContentUrl } = props;
    const sizer = videoSizes[size || ""];
    const [isUnavailable, setIsUnavailable] = (0, react_1.useState)(false);
    const imgUrl = contentUrl ? (0, exports.contentVideoUrl)(props) : ImageMediaComponent_1.previewImg;
    if (thumbnail) {
        const thumbnailUrl = `${config_1.newlifeMediaBucket}/videos/${id}/thumbnail/${coverContentUrl?.replace(/[^.]+$/, m => `0000000.${m}`)}`;
        console.log({ thumbnailUrl });
        return (0, jsx_runtime_1.jsx)(ImageMediaComponent_1.ImageComponent, { ...{ ...props, overrideContentUrl: thumbnailUrl } });
    }
    //+ "#t=0.3"
    return ((0, jsx_runtime_1.jsx)("video", { autoPlay: true, muted: true, onError: () => setIsUnavailable(true), controls: true, width: "100%", height: "100%", children: (0, jsx_runtime_1.jsx)("source", { src: imgUrl, type: "video/mp4" }) }));
};
exports.VideoComponent = VideoComponent;
//# sourceMappingURL=VideoMediaComponent.js.map