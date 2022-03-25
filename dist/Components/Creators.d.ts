import { UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../types";
declare type ICreators = {
    title?: string;
    maxItems?: number;
    users?: UserReadPublicResponse[] | UserReadPublicResponse[];
};
declare const Creators: NLView<ICreators>;
export default Creators;
