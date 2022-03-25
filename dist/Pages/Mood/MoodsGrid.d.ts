import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../../types";
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
