import { ImageProps } from "antd";
import { NLView } from "../../types";
import { PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { ReactNode } from "react";

export type Sizes = "small" | "medium" | "full" | "";
export type ContentImageProps = {
  id?: string;
  href?: string;
  contentUrl?: string;
  coverContentUrl?: string;
  mask?: ReactNode;
  aspectRatio?: string | number;
  width?: string;
  height?: string;
  blurHash?: string;
  contentType?: string;
  size?: Sizes;
  created?: string;
  neverHide?: boolean;
  content?: string;
  ref?: any;
} & PostReadResponse;

type ContentElementOpts = {
  isVisible?: boolean;
  thumbnail?: boolean;
  overrideContentUrl?: string;
};

type CustomTypes = {
  menuAvatar?: boolean;
};

export type ContentElement = NLView<ImageProps & ContentImageProps & ContentElementOpts & CustomTypes>;
