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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaComponent = exports.getMediaComponentUrl = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var useVisibility_1 = require("../../hooks/useVisibility");
var ImageMediaComponent_1 = require("./ImageMediaComponent");
var TextMediaComponent_1 = require("./TextMediaComponent");
var VideoMediaComponent_1 = require("./VideoMediaComponent");
var withLink = function (element, to) {
    return to ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: to }, { children: element })) : element;
};
var contentTypeElements = {
    default: ImageMediaComponent_1.ImageComponent,
    "video/mp4": VideoMediaComponent_1.VideoComponent,
    "text/plain": TextMediaComponent_1.TextMediaComponent,
};
var mediaComponentUrlResolvers = {
    default: ImageMediaComponent_1.contentImageUrl,
    "video/mp4": VideoMediaComponent_1.contentVideoUrl,
    // "text/html": content
};
var getMediaComponentUrl = function (props) {
    return (mediaComponentUrlResolvers[props.contentType || ""] ||
        mediaComponentUrlResolvers.default)(props);
};
exports.getMediaComponentUrl = getMediaComponentUrl;
var MediaComponent = function (props) {
    var contentType = props.contentType, thumbnail = props.thumbnail;
    var cte = contentTypeElements[contentType || ""];
    var ContentTypeElement = cte || contentTypeElements.default;
    var _a = (0, useVisibility_1.useVisibilityOnce)(150), isVisible = _a[0], currentElement = _a[1];
    var isThumbnail = thumbnail !== null && thumbnail !== void 0 ? thumbnail : true;
    if (!isThumbnail)
        return ((0, jsx_runtime_1.jsx)(ContentTypeElement, __assign({}, __assign(__assign({}, props), { thumbnail: thumbnail !== null && thumbnail !== void 0 ? thumbnail : true, isVisible: isVisible }))));
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: currentElement, style: { overflow: "hidden" }, className: "ant-image-size" }, { children: (0, jsx_runtime_1.jsx)(ContentTypeElement, __assign({}, __assign(__assign({}, props), { thumbnail: isThumbnail, isVisible: isVisible }))) })));
};
exports.MediaComponent = MediaComponent;
//# sourceMappingURL=MediaComponent.js.map