/// <reference types="react" />
import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "@newcoin-foundation/core";
export declare const SearchResultsWidget: NLView<{
    query: string;
}>;
export declare const SearchWidget: NLView<{
    user?: UserReadPrivateResponse;
    search: boolean;
    setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}>;
//# sourceMappingURL=SearchWidget.d.ts.map