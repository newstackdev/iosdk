import * as actions from "./actions";
import * as effects from "./effects";
declare const _default: {
    actions: typeof actions;
    effects: typeof effects;
    state: {
        account: any;
        pools: any;
        mainPool: any;
        daos: Record<string, {
            proposals: import("@newlife/newlife-creator-client-api").BcListDaoProposalsResponse;
        }>;
        cache: {
            accountHistory: Record<string, import("./types").HyperionAccountHistory>;
            pools: {
                byCode: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                byOwner: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
            };
            votes: Record<string, import("@newlife/newlife-creator-client-api").BcDaoProposalVoteResponse>;
        };
    };
};
export default _default;
