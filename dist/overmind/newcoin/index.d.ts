import * as actions from "./actions";
import * as effects from "./effects";
declare const _default: {
    actions: typeof actions;
    effects: typeof effects;
    state: {
        account: any;
        pools: any;
        mainPool: any;
        daos: Record<string, import("./state").DaoState>;
        cache: {
            accountHistory: Record<string, import("./types").HyperionAccountHistory>;
            pools: {
                byCode: Record<string, import("@newfound8ion/newcoin-sdk").NCPoolsInfo>;
                byOwner: Record<string, import("@newfound8ion/newcoin-sdk").NCPoolsInfo>;
            };
            votes: Record<string, import("@newstackdev/iosdk-newgraph-client-js").BcDaoProposalVoteResponse>;
        };
    };
};
export default _default;
