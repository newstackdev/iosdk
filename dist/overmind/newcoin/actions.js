"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountHitory = exports.getPoolInfo = exports.getAccountBalance = void 0;
// import { NONPOSTAUTHLOCATIONS } from "../.co./constants";
const overmind_1 = require("overmind");
const getAccountBalance = 
// pipe(
//     debounce(1000),
async ({ effects, state }, { user }) => {
    state.newcoin.account = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "" });
    // pools current user is in
    const ps = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "", contract: "pools.nco" });
    state.newcoin.pools = ps?.acc_balances?.reduce((r, c) => {
        const [total, symbol] = c.split(/ /);
        return { ...r, [symbol]: total };
    }, {});
};
exports.getAccountBalance = getAccountBalance;
// )
exports.getPoolInfo = (0, overmind_1.pipe)((0, overmind_1.debounce)(200), async ({ effects, state }, { pool }) => {
    if (!(pool.code || pool.owner))
        return;
    console.log("getPoolInfo for " + pool.owner);
    try {
        const r = await effects.newcoin.newcoin.getPoolInfo(pool);
        if (!r.rows?.length)
            return;
        state.newcoin.cache.pools.byOwner[r.rows[0].owner] = r;
        state.newcoin.cache.pools.byCode[r.rows[0].code] = r;
    }
    catch (e) {
        debugger;
    }
});
const getAccountHitory = 
// pipe(
// debounce(1000),
async ({ effects, state }, { user, force }) => {
    const curr = state.newcoin.cache.accountHistory[user?.username || ""];
    if (curr && !force)
        return;
    const r = await effects.newcoin.hyperion(`/v2/state/get_account?account=${user?.username}`);
    return state.newcoin.cache.accountHistory[user?.username || ""] = (await r.json());
};
exports.getAccountHitory = getAccountHitory;
// )
//# sourceMappingURL=actions.js.map