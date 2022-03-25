/// <reference types="react" />
import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { NLView } from "../../types";
export declare const SearchResultsWidget: NLView<{
    query: string;
}>;
export declare const SearchWidget: NLView<{
    user?: UserReadPrivateResponse;
    search: boolean;
    setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}>;
