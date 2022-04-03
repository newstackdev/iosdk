import { NLView } from "@newcoin-foundation/core";
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
declare type MoodsGridParams = {
    title?: string;
    moods?: MoodReadResponse[];
    loadMore?: () => void;
};
export declare const MoodsGridRow: NLView<{
    mood: MoodReadResponse;
    maxItems?: number;
    noFullWidth?: boolean;
    noFolder?: boolean;
    delay?: number;
    wrap?: boolean;
}>;
export declare const MoodsGrid: NLView<MoodsGridParams>;
export {};
//# sourceMappingURL=MoodsGrid.d.ts.map