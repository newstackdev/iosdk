import { UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../types";
declare type ICreators = {
    title?: string;
    maxItems?: number;
    users?: UserReadPublicResponse[];
};
export declare const CreatorsList: NLView<ICreators>;
export declare const Creators: NLView<ICreators>;
export declare const TopCreators: NLView<ICreators>;
export default Creators;
