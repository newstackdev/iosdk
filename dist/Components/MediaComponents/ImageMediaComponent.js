import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image as ADImage } from "antd";
import { Blurhash } from "react-blurhash";
import { Profile } from "../Icons/Profile";
import { Spin } from "../Spin";
import { useAppState } from "../../overmind";
const imageSizes = {
    small: "500",
    medium: "1000",
    full: "",
    "": "",
};
export const useContentImageUrl = ({ id, contentUrl, size }) => {
    const _sizer = imageSizes[size || ""];
    const sizer = _sizer ? [_sizer, _sizer].join("x") + "/" : "";
    const state = useAppState();
    return contentUrl ? `${state.config.settings.newgraph.mediaBucket}/images/${id}/${sizer}${contentUrl}` : "";
};
export const ImageComponent = (props) => {
    const { size, blurHash, width, height, neverHide, isVisible, overrideContentUrl, thumbnail,
    // imgSize
     } = props;
    const _sizer = imageSizes[size || ""];
    const stadardUrl = useContentImageUrl(props);
    const imgUrl = overrideContentUrl || stadardUrl;
    //(contentUrl ? `${newlifeMediaBucket}/images/${id}/${sizer}${contentUrl}` : previewImg);
    const placeholder = blurHash ? _jsx(Blurhash, { hash: blurHash, width: width, height: height }) : true;
    // if (true)
    // 	return <div>{overrideContentUrl?.toString() || "x"}</div>
    if (/^(processing|failed)$/.test(props.contentUrl || ""))
        return (_jsxs("div", { children: [_jsx("br", {}), _jsx(Spin, {})] }));
    else if (!props.contentUrl)
        return _jsx(Profile, {});
    else
        return (_jsx(ADImage, { ...props, 
            // ref={props.ref}
            preview: {
                visible: false,
                mask: false,
                maskStyle: {
                    color: !(overrideContentUrl || props.contentUrl) ? "white" : "inherit",
                },
            }, placeholder: placeholder, src: isVisible || neverHide ? imgUrl : imgUrl }));
};
//# sourceMappingURL=ImageMediaComponent.js.map