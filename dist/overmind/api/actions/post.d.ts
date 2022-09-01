import { Action } from "../../../types";
import { MoodReadResponse, PostCreateRequest, PostReadResponse, PostRemoteMetaProxyResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const cache: Action<{
    posts: PostReadResponse | PostReadResponse[];
}>;
export declare const read: Action<{
    id: string;
}>;
export declare const create: Action<{
    postForm: PostCreateRequest & {
        file: any;
    };
}, PostReadResponse | void>;
export declare const attachToMoods: Action<{
    moods: MoodReadResponse[];
    post: PostReadResponse;
}>;
export declare const rate: Action<{
    post: PostReadResponse;
    amount: number;
    contextType: string;
    contextValue: string;
}>;
export declare const getRemoteMeta: Action<{
    url: string;
}, PostRemoteMetaProxyResponse>;
