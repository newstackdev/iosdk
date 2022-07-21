import { Image as ADImage, ImageProps, Skeleton } from "antd";
import { Blurhash } from "react-blurhash";
import { ContentElement, ContentImageProps, Sizes } from "./types";
import { Profile } from "../Icons/Profile";
import { Spin } from "../Spin";
import { previewImg } from "./constants";
import { useAppState } from "../../overmind";
import React from "react";

const imageSizes: Record<Sizes, string> = {
  small: "500",
  medium: "1000",
  full: "",
  "": "",
};

export const useContentImageUrl = ({ id, contentUrl, size }: ContentImageProps) => {
  const _sizer = imageSizes[size || ""];
  const sizer = _sizer ? [_sizer, _sizer].join("x") + "/" : "";

  const state = useAppState();

  return contentUrl ? `${state.config.settings.newgraph.mediaBucket}/images/${id}/${sizer}${contentUrl}` : "";
};

export const ImageComponent: ContentElement = (props) => {
  const {
    size,
    blurHash,
    width,
    height,
    neverHide,
    isVisible,
    overrideContentUrl,
    thumbnail,
    // imgSize
  } = props;
  const _sizer = imageSizes[size || ""];

  const stadardUrl = useContentImageUrl(props);
  const imgUrl = overrideContentUrl || stadardUrl;
  //(contentUrl ? `${newlifeMediaBucket}/images/${id}/${sizer}${contentUrl}` : previewImg);

  const placeholder = blurHash ? <Blurhash hash={blurHash} width={width} height={height} /> : true;

  // if (true)
  // 	return <div>{overrideContentUrl?.toString() || "x"}</div>
  if (/^(processing|failed)$/.test(props.contentUrl || ""))
    return (
      <div>
        <br />
        <Spin />
      </div>
    );
  else if (!props.contentUrl) return <Profile />;
  else
    return (
      <ADImage
        {...props}
        // ref={props.ref}
        preview={{
          visible: false,
          mask: false,
          maskStyle: {
            color: !(overrideContentUrl || props.contentUrl) ? "white" : "inherit",
          },
        }}
        placeholder={placeholder}
        src={isVisible || neverHide ? imgUrl : imgUrl}
      />
    );
};
