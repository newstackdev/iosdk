import { Callback, NLView } from "../types";
import { ReactElement } from "react";
import { SimplifiedTag } from "../Pages/Post/Post";
export declare const Vote: NLView<{
    onDoneVoting: (val: number) => void;
    onLongDoneVoting?: Callback;
    info: ReactElement;
    votingEnabled?: boolean;
    setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    visible?: boolean;
    addToMoods?: Callback;
    containerDeeplike?: React.MutableRefObject<any>;
    isEyeOpenedResponzive?: boolean;
    visionTags?: SimplifiedTag[];
    nonVisionTags?: SimplifiedTag[];
    setHilightTag?: React.Dispatch<React.SetStateAction<SimplifiedTag[]>>;
    setIsEyeOpenedResponzive?: React.Dispatch<React.SetStateAction<boolean>>;
}>;
