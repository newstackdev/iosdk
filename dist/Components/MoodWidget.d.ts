import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Callback, NLView } from "../types";
export declare const MoodFolderWidget: NLView<{
    mood: MoodReadResponse;
    onClick?: Callback;
    selected?: boolean;
    force?: boolean;
}>;
export declare const MoodWidget: NLView<{
    mood: MoodReadResponse;
    onClick?: Callback;
    selected?: boolean;
    force?: boolean;
}>;
