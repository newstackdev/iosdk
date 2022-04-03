/// <reference types="react" />
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Callback, NLView } from "@newcoin-foundation/core";
export declare const MoodFolderWidget: NLView<{
    mood: MoodReadResponse;
    onClick?: Callback;
    selected?: boolean;
    force?: boolean;
    setSelectedFolder: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFolder: boolean;
}>;
export declare const MoodWidget: NLView<{
    mood: MoodReadResponse;
    onClick?: Callback;
    selected?: boolean;
    force?: boolean;
}>;
//# sourceMappingURL=MoodWidget.d.ts.map