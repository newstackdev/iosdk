import { MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../types";
export declare const TopFoldersGrid: NLView<{
    mood: MoodReadResponse;
    maxPosts?: number;
    title: string | undefined;
    noFolder?: boolean;
    wrap?: boolean;
    noFullWidth?: boolean;
    blur?: boolean;
}>;
declare const TopFolders: NLView<{
    maxItems?: number;
    maxPostsToShow: 1 | 2 | 3 | 4 | 5;
    skipItems?: number;
    title?: string;
    posts?: string;
    filterToSameNumberPosts?: boolean;
    userMoods?: MoodReadResponse[];
}>;
export default TopFolders;
