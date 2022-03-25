/// <reference types="react" />
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Callback, NLView } from "../types";
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
