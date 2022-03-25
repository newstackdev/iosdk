import { MoodReadResponse, PostReadResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../types";
export declare const PostWidget: NLView<{
    post: PostReadResponse;
    mood?: MoodReadResponse;
    username?: string;
    aspectRatio: string | undefined | number;
    isSpotlight?: boolean;
}>;
