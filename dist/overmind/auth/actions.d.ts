import { Action } from "../../types";
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const logout: Action<{
    noRouting?: boolean;
} | undefined>;
export declare const resetAuthTimer: Action;
export declare const reduceTimer: Action;
export declare const fakeUserUpdate: Action<UserReadPrivateResponse>;
