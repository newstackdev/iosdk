import { ImageProps } from "antd";
import { ReactNode } from "react";
import { NLView } from "@newcoin-foundation/core";
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
};
declare type ContentElementOpts = {
    isVisible?: boolean;
    thumbnail?: boolean;
    overrideContentUrl?: string;
};
export declare type ContentElement = NLView<ImageProps & ContentImageProps & ContentElementOpts>;
export {};
//# sourceMappingURL=types.d.ts.map