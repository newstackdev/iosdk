import { NLView } from "../../types";
import { PostReadResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
declare const useVotingStreamTags: () => {
    nextPath: () => string;
    currPost: PostReadResponse;
    index: number;
    contextType: string;
    contextValue: string;
};
export declare const postBase: (useVotingStreamHook: typeof useVotingStreamTags, votingEnabled?: boolean) => NLView;
export declare const Post: NLView<{}>;
export declare const PostInMood: NLView<{}>;
export declare const PostInTags: NLView<{}>;
export {};
