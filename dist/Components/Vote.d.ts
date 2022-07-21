import { Callback, NLView } from "../types";
import { ReactElement } from "react";
export declare const Vote: NLView<{
    onDoneVoting: (val: number) => void;
    onLongDoneVoting?: Callback;
    info: ReactElement;
    votingEnabled?: boolean;
}>;
