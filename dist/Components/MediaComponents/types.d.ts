import { ImageProps } from "antd";
import { NLView } from "../../types";
import { PostReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { ReactNode } from "react";
export declare type Sizes = "small" | "medium" | "full" | "";
export declare type ContentImageProps = {
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
declare type ContentElementOpts = {
    isVisible?: boolean;
    thumbnail?: boolean;
    overrideContentUrl?: string;
};
declare type MenuAvatar = {
    menuAvatar?: boolean;
};
export declare type ContentElement = NLView<ImageProps & ContentImageProps & ContentElementOpts & MenuAvatar>;
export {};
