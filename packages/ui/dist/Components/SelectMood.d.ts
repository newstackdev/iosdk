import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { NLView, Callback } from "@newcoin-foundation/core";
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
//# sourceMappingURL=SelectMood.d.ts.map