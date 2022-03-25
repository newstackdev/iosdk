import { ReactElement } from "react";
import { Callback, NLView } from "../types";
export declare const Vote: NLView<{
    onDoneVoting: (val: number) => void;
    onLongDoneVoting?: Callback;
    info: ReactElement;
    votingEnabled?: boolean;
}>;
