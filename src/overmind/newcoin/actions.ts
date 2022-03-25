// import { NONPOSTAUTHLOCATIONS } from "../.co./constants";
import { debounce, pipe } from "overmind";
import { Action } from "../../types";
import { Context } from "../overmind";

export const getAccountBalance: Action<{ user: { username?: string } }, any> =
    // pipe(
    //     debounce(1000),
    async ({ effects, state }, { user }) => {
        state.newcoin.account = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "" });
        // pools current user is in
        const ps = await effects.newcoin.newcoin.getAccountBalance({ owner: user.username || "", contract: "pools.nco" });
        state.newcoin.pools = ps?.acc_balances?.reduce((r, c) => {
            const [total, symbol] = c.split(/ /);
            return { ...r, [symbol]: total }
        }, {});
    }
// )

export const getPoolInfo: Action<{ pool: { owner?: string, code?: string } }> =
    pipe(
        debounce(200),
        async ({ effects, state }: Context, { pool }) => {
            if (!(pool.code || pool.owner))
                return;

            console.log("getPoolInfo for " + pool.owner)

            try {
                const r = await effects.newcoin.newcoin.getPoolInfo(pool);
                if (!r.rows?.length) return;

                state.newcoin.cache.pools.byOwner[r.rows[0].owner] = r;
                state.newcoin.cache.pools.byCode[r.rows[0].code] = r;
            } catch (e) {
                debugger;
            }
        }
    )

export const getAccountHitory: Action<{ user?: { username?: string }, force?: boolean }, any> =
    // pipe(
    // debounce(1000),
    async ({ effects, state }: Context, { user, force }) => {
        const curr = state.newcoin.cache.accountHistory[user?.username || ""];
        if (curr && !force) return;
        const r = await effects.newcoin.hyperion(`/v2/state/get_account?account=${user?.username}`);
        return state.newcoin.cache.accountHistory[user?.username || ""] = (await r.json()) as any;
    }
    // )
