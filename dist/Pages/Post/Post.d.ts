import { NLView } from "../../types";
import { MoodReadResponse, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const useVotingStreamMood: () => {
    nextPath: () => string;
    currMood: MoodReadResponse & {
        promise?: Promise<any> | null | undefined;
    };
    currPost: PostReadResponse;
    index: number;
    contextType: string;
    contextValue: string;
};
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
