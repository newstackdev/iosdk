import { MoodCreateRequest, MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Action } from "@newcoin-foundation/core";
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
}>;
//# sourceMappingURL=mood.d.ts.map