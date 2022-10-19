import { NLView } from "../types";
export declare const blockExplorerUrl: {
    blocks: (id: string) => string;
    newcoin: (id: string) => string;
    newscan: (id: string) => string;
};
export declare const BlockExplorerLink: NLView<{
    id?: string;
    explorer?: "newcoin" | "blocks";
}>;
