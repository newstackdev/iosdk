/// <reference types="react" />
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Callback, NLView } from "../../types";
export declare const MoodCreate: NLView<{
    onCreated?: Callback<MoodReadResponse>;
    setIsCreated?: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export declare const MoodCreateModal: NLView<{
    setIsCreated?: React.Dispatch<React.SetStateAction<boolean>>;
    onCreated?: Callback<MoodReadResponse>;
}>;
