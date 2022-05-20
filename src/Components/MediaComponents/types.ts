import { PostReadResponse } from "@newlife/newlife-creator-client-api";
import { ImageProps } from "antd";
import { ReactNode } from "react";
import { NLView } from "../../types";

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

export type ContentElement = NLView<
  ImageProps & ContentImageProps & ContentElementOpts
>;
