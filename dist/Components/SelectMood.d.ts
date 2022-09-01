import { Callback, NLView } from "../types";
import { MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const SelectMood: NLView<{
    moods?: MoodReadResponse[];
    onChange?: (moods: MoodReadResponse[]) => void;
    value?: MoodReadResponse[];
    limit?: number;
    title?: string;
}>;
export declare const SelectMoodForm: NLView<{
    title?: string;
    onFinish: Callback;
}>;
