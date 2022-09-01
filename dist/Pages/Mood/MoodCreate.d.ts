/// <reference types="react" />
import { Callback, NLView } from "../../types";
import { MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const MoodCreate: NLView<{
    onCreated?: Callback<MoodReadResponse>;
    setIsCreated?: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export declare const MoodCreateModal: NLView<{
    setIsCreated?: React.Dispatch<React.SetStateAction<boolean>>;
    onCreated?: Callback<MoodReadResponse>;
}>;
