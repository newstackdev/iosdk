/// <reference types="react" />
import { MoodReadResponse, PostReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { NLView } from "../types";
export declare const MaybeLink: React.FC<React.PropsWithChildren<{
    style?: React.CSSProperties;
    to: string;
    className: string;
}>>;
export declare const PostWidget: NLView<{
    post: PostReadResponse;
    mood?: MoodReadResponse;
    username?: string;
    aspectRatio: string | undefined | number;
    isSpotlight?: boolean;
}>;
