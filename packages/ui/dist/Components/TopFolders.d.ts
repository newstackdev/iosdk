import { NLView } from "@newcoin-foundation/core";
import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
export declare const TopFoldersGrid: NLView<{
    mood: MoodReadResponse;
    postNumber: number;
    title: string | undefined;
    noFolder?: boolean;
    wrap?: boolean;
    posts?: string | undefined;
    noFullWidth?: boolean;
}>;
declare const TopFolders: NLView<{
    maxItems?: number;
    skipItems?: number;
    title?: string;
    posts?: string;
    userMoods?: MoodReadResponse[];
}>;
export default TopFolders;
//# sourceMappingURL=TopFolders.d.ts.map