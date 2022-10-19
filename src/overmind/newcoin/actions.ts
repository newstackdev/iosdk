// import { NONPOSTAUTHLOCATIONS } from "../.co./constants";
import { Action } from "../../types";
import { BcCreateDaoProposal, BcCreateDaoRequest, BcCreateWhitelistDaoProposal } from "@newstackdev/iosdk-newgraph-client-js";
import { Context } from "../overmind";
import { DaoState } from "./state";
import { debounce, pipe } from "overmind";

export const progressTest: Action = pipe(async () => {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("test async");
  return await new Promise((res) => setTimeout(res, 1000));
});

export const getAccountBalance: Action<{ user?: { username?: string } } | undefined, any> = async (
  { effects, state, actions },
  props,
) => {
  const current = state.api.auth.user;
  const user = props?.user || current;

  if (!state.api.auth.admitted) return;

  try {
    state.newcoin.account = await effects.newcoin.newcoin.getAccountBalance({
      owner: user.username || "",
      contract: "eosio.token",
    });

    state.newcoin.mainPool = await effects.newcoin.newcoin.getAccountBalance({
      owner: user.username || "",
      contract: "pool.nco",
    });

    const ps = await effects.newcoin.newcoin.getAccountBalance({
      owner: user.username || "",
      contract: "pools2.nco",
    });
    state.newcoin.pools = ps?.acc_balances?.reduce((r, c) => {
      const [total, symbol] = c.split(/ /);
      return { ...r, [symbol]: total };
    }, {});
  } catch (e) {
    if (!props?.user && current?.created && new Date(current.created).getTime() - Date.now() < 2 * 60 * 1000) return;

    throw e;
  }

  try {
    await actions.newcoin.daoGetWhitelist();
    await actions.newcoin.voterListVotes({ voter: user.username });
  } catch (ex) {
    console.warn(ex, (ex as any).message);
    console.warn("Likely no DAO");
  }
};

export const getPoolInfo: Action<{ pool: { owner?: string; code?: string } }> = pipe(
  debounce(200),
  async ({ effects, state }: Context, { pool }) => {
    if (!(pool.code || pool.owner)) return;
    try {
      const r = await effects.newcoin.newcoin.getPoolInfo(pool);
      if (!r.rows?.length) return;
      state.newcoin.cache.pools.byOwner[r.rows[0].owner] = r;
      state.newcoin.cache.pools.byCode[r.rows[0].code] = r;
    } catch (e) {
      debugger;
    }
  },
);

export const getAccountHitory: Action<{ user?: { username?: string }; force?: boolean }, any> = async (
  { effects, state }: Context,
  { user, force },
) => {
  const curr = state.newcoin.cache.accountHistory[user?.username || ""];
  if (curr && !force) return;
  const r = await effects.newcoin.hyperion.get(`/v2/state/get_account?account=${user?.username}`);
  return (state.newcoin.cache.accountHistory[user?.username || ""] = (await r.json()) as any);
};

const getLowerBoundId = (items: { id?: number }[]) =>
  items?.length ? ((items[items.length - 1]?.id || 0) + 1)?.toString() : undefined;

const daoState = (curr: DaoState | undefined, override: Partial<DaoState>) => ({
  ...{ proposals: {}, whitelistProposals: {}, whitelist: {} },
  ...(curr || {}),
  ...override,
});

export const daoGetProposals: Action<{ daoId?: string; daoOwner: string; proposal_id?: string }, any> = pipe(
  debounce(100),
  async ({ state }, { daoId, daoOwner, proposal_id }) => {
    const r = await state.api.client.newcoin.daoProposalListList({
      dao_owner: daoOwner,
      limit: "1000",
    });
    return (state.newcoin.daos[daoOwner] = daoState(state.newcoin.daos[daoOwner], {
      proposals: { ...r.data, rows: r.data.rows || [] },
    }));
  },
);

export const daoGetWhitelistProposals: Action<{ daoId?: string; daoOwner: string; proposal_id?: string }, any> = pipe(
  debounce(100),
  async ({ state }, { daoId, daoOwner, proposal_id }) => {
    if (!daoOwner) return;

    const r = await state.api.client.newcoin.daoProposalWhitelistListList({
      dao_owner: daoOwner,
      limit: "1000",
    });

    state.newcoin.daos[daoOwner] = daoState(state.newcoin.daos[daoOwner], {
      whitelistProposals: { ...r.data, rows: r.data.rows || [] },
    });
  },
);

export const daoCreate: Action<BcCreateDaoRequest, any> = pipe(async ({ state, actions }, createDaoInput) => {
  try {
    const r = await state.api.client.newcoin.daoCreateCreate(createDaoInput);
    await actions.newcoin.daoGetProposals({
      daoOwner: state.api.auth.user?.username || "",
    });
    return r.data;
  } catch (ex) {
    const e = ex as any;
    actions.ux.showNotification({
      message: "That didn't work: " + (e.error.errorMessage.message || e.error.errorMessage),
    });
  }
});

const commonError = async (e: any) => {
  let notification = e?.error?.errorMessage?.message || e?.error?.errorMessage;
  if (e?.json) {
    const j = await e.json();
    notification = j.message || j?.errorMessage?.message || j?.errorMessage;
  }
  return Promise.resolve(notification);
};

const notifyIfError = async (p, actions) => {
  try {
    const _r = await p;
    return _r.data || (await _r.json());
  } catch (ex) {
    actions.ux.showNotification({
      message: "That didn't work: " + (await commonError(ex)),
    });
  }
};

export const daoCreateProposal: Action<BcCreateDaoProposal, any> = pipe(async ({ state, actions }, param) => {
  const vs = param.vote_start || "";
  const ve = param.vote_end || "";
  const u = param.dao_owner || state.config.settings.newcoin.daoDomain;

  try {
    const r = await state.api.client.newcoin.daoProposalCreate({
      ...param,
      dao_owner: u,
      vote_start: vs,
      vote_end: ve,
    });

    const res = await r.json();

    actions.newcoin.daoGetProposals({ daoOwner: u || "" });

    return res;
  } catch (ex) {
    actions.ux.showNotification({
      message: "That didn't work: " + (await commonError(ex)),
    });
  }
});

export const daoCreateWhitelistProposal: Action<BcCreateWhitelistDaoProposal, any> = pipe(async ({ state, actions }, param) => {
  const vs = param.vote_start;
  const ve = param.vote_end;
  const u = param.dao_owner || state.config.settings.newcoin.daoDomain;

  try {
    const r = await state.api.client.newcoin.daoProposalWhitelistCreate({
      ...param,
      vote_start: vs,
      vote_end: ve,
      dao_owner: u,
    });

    const res = await r.json();

    await actions.newcoin.daoGetProposals({ daoOwner: u || "" });

    return res;
  } catch (ex) {
    actions.ux.showNotification({
      message: "That didn't work: " + (await commonError(ex)),
    });
  }
});

export const daoApproveProposal: Action<{ dao_owner: string; proposal_id: string }, any> = pipe(
  async ({ state, actions }, param) => {
    return await notifyIfError(
      state.api.client.newcoin.daoProposalApproveCreate({
        dao_owner: param.dao_owner,
        proposal_id: param.proposal_id,
      }),
      actions,
    );
  },
);

export const daoApproveWhitelistProposal: Action<{ dao_owner: string; proposal_id: string }, any> = pipe(
  async ({ state, actions }, param) => {
    const r = await state.api.client.newcoin.daoProposalWhitelistApproveCreate({
      dao_owner: param.dao_owner,
      proposal_id: param.proposal_id,
    });

    return notifyIfError(r, actions);
  },
);

export const daoVoteProposal: Action<{ dao_owner; proposal_id; option; quantity; proposal_type }, any> = pipe(
  async ({ state, actions }, voteRequest) => {
    const currUser = state.api.auth.user?.username;

    try {
      const r = await state.api.client.newcoin.daoProposalVoteCreate({
        ...voteRequest,
        voter: state.api.auth.user?.username || "",
      });

      actions.newcoin.voterListVotes({ voter: currUser });
      actions.newcoin.getAccountBalance();

      return notifyIfError(r, actions);
    } catch (ex) {
      const e: any = ex;
      actions.ux.showNotification({
        message: "That didn't work: " + (e?.error?.errorMessage?.message || e?.error?.errorMessage),
      });
      throw ex;
    }
  },
);

export const voterListVotes: Action<{ voter?: string } | undefined, any> = async ({ state }, props) => {
  const voter = props?.voter || state.api.auth.user?.username || "";
  const r = await state.api.client.newcoin.daoProposalVotesList({
    voter,
    limit: "1000",
  });

  state.newcoin.cache.votes[voter] = r.data;

  return r.data;
};

export const daoGetWhitelist: Action<{ daoOwner?: string } | undefined, any> = async ({ state }, props) => {
  const u = props?.daoOwner || state.config.settings.newcoin.daoDomain;
  if (!u) return;

  const r = await state.api.client.newcoin.daoWhitelistList({
    dao_owner: u,
    limit: "1000",
  });

  if (r.data) state.newcoin.daos[u] = daoState(state.newcoin.daos[u], { whitelist: { ...r.data, rows: r.data.rows || [] } });
};

export const daoExecuteWhitelistProposal: Action<{ dao_id: string; proposal_id: number; proposal_author: string }, any> = pipe(
  async ({ state, actions }, props) => {
    const executor = state.api.auth.user?.username;
    return await notifyIfError(
      state.api.client.newcoin.daoProposalWhitelistExecuteCreate({
        proposal_author: props.proposal_author,
        proposal_id: Number(props.proposal_id),
        dao_owner: executor,
      }),
      actions,
    );
  },
);

export const daoExecuteProposal: Action<
  {
    dao_owner: string;
    dao_id: string;
    proposal_id: number;
    proposal_author: string;
  },
  any
> = pipe(async ({ state, actions }, props) => {
  const executor = state.api.auth.user?.username;
  return await notifyIfError(
    state.api.client.newcoin.daoProposalExecuteCreate({
      proposal_author: props.proposal_author,
      proposal_id: Number(props.proposal_id),
      dao_owner: executor,
    }),
    actions,
  );
});

export const daoWithdrawVoteDeposit: Action<{ vote_id: string }, any> = pipe(async ({ state, actions }, { vote_id }) => {
  return await notifyIfError(
    state.api.client.newcoin.daoWithdrawVoteDepositCreate({
      vote_id,
    }),
    actions,
  );
});
