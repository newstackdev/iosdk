"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.VideoComponent = exports.contentVideoUrl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var core_1 = require("@newcoin-foundation/core");
var ImageMediaComponent_1 = require("./ImageMediaComponent");
var videoSizes = {
    small: "480p",
    medium: "720p",
    full: "1080p",
    "": "1080p"
};
var contentVideoUrl = function (_a) {
    var id = _a.id, contentUrl = _a.contentUrl, contentType = _a.contentType, size = _a.size;
    var sizer = videoSizes[size || ""];
    var videoContentPath = contentType === null || contentType === void 0 ? void 0 : contentType.split(/\//)[1];
    return contentUrl
        ? "".concat(core_1.newlifeMediaBucket, "/videos/").concat(id, "/").concat(videoContentPath, "/").concat(sizer, "/").concat(contentUrl)
        : "";
};
exports.contentVideoUrl = contentVideoUrl;
var VideoComponent = function (props) {
    var size = props.size, contentUrl = props.contentUrl, id = props.id, thumbnail = props.thumbnail, coverContentUrl = props.coverContentUrl;
    var sizer = videoSizes[size || ""];
    var _a = (0, react_1.useState)(false), isUnavailable = _a[0], setIsUnavailable = _a[1];
    var imgUrl = contentUrl ? (0, exports.contentVideoUrl)(props) : ImageMediaComponent_1.previewImg;
    if (thumbnail) {
        var thumbnailUrl = "".concat(core_1.newlifeMediaBucket, "/videos/").concat(id, "/thumbnail/").concat(coverContentUrl === null || coverContentUrl === void 0 ? void 0 : coverContentUrl.replace(/[^.]+$/, function (m) { return "0000000.".concat(m); }));
        console.log({ thumbnailUrl: thumbnailUrl });
        return ((0, jsx_runtime_1.jsx)(ImageMediaComponent_1.ImageComponent, __assign({}, __assign(__assign({}, props), { overrideContentUrl: thumbnailUrl }))));
    }
    //+ "#t=0.3"
    return ((0, jsx_runtime_1.jsx)("video", __assign({ autoPlay: true, muted: true, onError: function () { return setIsUnavailable(true); }, controls: true, width: "100%", height: "100%" }, { children: (0, jsx_runtime_1.jsx)("source", { src: imgUrl, type: "video/mp4" }) })));
};
exports.VideoComponent = VideoComponent;
