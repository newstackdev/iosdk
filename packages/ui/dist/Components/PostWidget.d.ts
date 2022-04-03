import { NLView } from "@newcoin-foundation/core";
import { MoodReadResponse, PostReadResponse } from "@newlife/newlife-creator-client-api";
export declare const PostWidget: NLView<{
    post: PostReadResponse;
    mood?: MoodReadResponse;
    username?: string;
    aspectRatio: string | undefined | number;
    isSpotlight?: boolean;
}>;
//# sourceMappingURL=PostWidget.d.ts.map