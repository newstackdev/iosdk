import { NLView } from "@newcoin-foundation/core";
export interface Total {
    quantity: string;
    contract: string;
}
export interface StakeInfo {
    id: number;
    code: string;
    owner: string;
    description: string;
    total: Total;
    creation_date: Date;
    last_update_date: Date;
}
export declare const StakeControl: NLView<{
    stakeInfo: StakeInfo;
}>;
export declare const UserHistoryControl: NLView<{
    user: {
        username?: string;
    };
}>;
export declare const NewcoinWidget: NLView<{
    user: {
        username?: string;
    };
}>;
//# sourceMappingURL=NewcoinWidgets.d.ts.map