import * as actions from "./actions";
import * as effects from "./effects";
declare const _default: {
    actions: typeof actions;
    effects: typeof effects;
    state: {
        account: any;
        pools: any;
        cache: {
            accountHistory: Record<string, import("./types").HyperionAccountHistory>;
            pools: {
                byCode: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                byOwner: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
            };
        };
    };
};
export default _default;
