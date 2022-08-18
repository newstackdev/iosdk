import { Action } from "../../../types";
export declare const authorize: Action<{
    token?: string;
} | undefined>;
export declare const logout: Action<{
    keepFbUser?: boolean;
} | undefined>;
