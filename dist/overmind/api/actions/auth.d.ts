import { Action } from "../../../types";
export declare const authorize: Action<undefined>;
export declare const logout: Action<{
    keepFbUser?: boolean;
} | undefined>;
