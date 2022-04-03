import { Action } from "@newcoin-foundation/core";
import { UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
export declare const logout: Action<{
    noRouting?: boolean;
} | undefined>;
export declare const resetAuthTimer: Action;
export declare const reduceTimer: Action;
export declare const fakeUserUpdate: Action<UserReadPrivateResponse>;
//# sourceMappingURL=actions.d.ts.map