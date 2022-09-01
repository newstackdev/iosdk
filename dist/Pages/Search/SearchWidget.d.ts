/// <reference types="react" />
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { Callback, NLView } from "../../types";
export declare const UserSearchResultsWidget: NLView<{
    query: string;
}>;
export declare const TagsAutosuggestWidget: NLView<{
    query: string;
}>;
export declare const SearchWidget: NLView<{
    user?: UserReadPrivateResponse;
    searchUsers?: boolean;
    searchTags?: boolean;
    noNavigation?: boolean;
    onChange?: Callback;
    showSearch?: boolean;
    setSelection?: React.Dispatch<React.SetStateAction<string>>;
    selection?: string;
}>;
