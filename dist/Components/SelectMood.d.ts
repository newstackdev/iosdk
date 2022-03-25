import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Callback, NLView } from "../types";
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
