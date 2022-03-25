import { Action } from "../../types";
export declare const getAccountBalance: Action<{
    user: {
        username?: string;
    };
}, any>;
export declare const getPoolInfo: Action<{
    pool: {
        owner?: string;
        code?: string;
    };
}>;
export declare const getAccountHitory: Action<{
    user?: {
        username?: string;
    };
    force?: boolean;
}, any>;
