import { NLView } from "../types";
import { PostReadResponse, UserReadPrivateResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
export declare const Share: NLView<{
    currentPostProps?: PostReadResponse;
    urlToShare?: string;
    user?: UserReadPrivateResponse;
}>;
