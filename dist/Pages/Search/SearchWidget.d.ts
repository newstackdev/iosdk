import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../../types";
export declare const UserSearchResultsWidget: NLView<{
    query: string;
}>;
export declare const TagsAutosuggestWidget: NLView<{
    query: string;
}>;
export declare const SearchWidget: NLView<{
    user?: UserReadPrivateResponse;
}>;
