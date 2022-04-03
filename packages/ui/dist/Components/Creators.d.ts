import { UserReadPublicResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "@newcoin-foundation/core";
declare type ICreators = {
    title?: string;
    maxItems?: number;
    users?: UserReadPublicResponse[] | UserReadPublicResponse[];
};
declare const Creators: NLView<ICreators>;
export default Creators;
//# sourceMappingURL=Creators.d.ts.map