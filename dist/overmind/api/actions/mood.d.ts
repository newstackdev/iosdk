import { Action } from "../../../types";
import { MoodCreateRequest, MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const cache: Action<{
    moods?: (MoodReadResponse & {
        promise?: Promise<any>;
    })[];
    overwrite?: boolean;
}>;
export declare const read: Action<{
    id?: string;
}>;
export declare const readMultiple: Action<{
    moods: MoodReadResponse[];
}>;
export declare const getPosts: Action<MoodReadResponse>;
export declare const create: Action<{
    mood: MoodCreateRequest;
}, MoodReadResponse>;
