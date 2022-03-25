import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { Action } from "../../types";
export declare const logout: Action<{
    noRouting?: boolean;
} | undefined>;
export declare const resetAuthTimer: Action;
export declare const reduceTimer: Action;
export declare const fakeUserUpdate: Action<UserReadPrivateResponse>;
