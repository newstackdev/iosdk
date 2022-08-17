import { AUTH_FLOW_STATUS } from "../../auth/state";
import { Action } from "../../../types";

export const authorize: Action<undefined> = async ({ state, actions, effects }) => {
  state.auth.status = Math.max(AUTH_FLOW_STATUS.AUTHORIZING, state.auth.status);

  try {
    state.api.auth.user = await effects.api.authorize();
  } catch (ex) {
    console.log(ex);
  }
  const user = state.api.auth.user;
  if (!user || !user.id) {
    state.auth.status = state.firebase.user ? AUTH_FLOW_STATUS.AUTHENTICATED : AUTH_FLOW_STATUS.ANONYMOUS;
    if (!state.routing.isAllowed) actions.routing.historyPush({ location: "/" });

    state.api.auth.attempted = true;

    return;
  }

  if (!user.username) return;

  actions.newcoin.getAccountBalance({ user });
  actions.newcoin.getPoolInfo({ pool: { owner: user.username } });

  if (!state.lists.top.moods.items.length) {
    actions.lists.top.moods();
    actions.lists.top.users();
    actions.lists.top.posts();
  }

  state.auth.status = state.api.auth.user?.username ? AUTH_FLOW_STATUS.AUTHORIZED : AUTH_FLOW_STATUS.AUTHENTICATED;

  setTimeout(() => {
    actions.routing.routeAfterAuth();
  });
};

export const logout: Action<{ keepFbUser?: boolean } | undefined> = async ({ state, actions, effects }, config) => {
  if (!config?.keepFbUser && state.firebase) {
    state.firebase.token = "";
    state.firebase.user = null;
  }

  state.api.auth.user = {};
  state.api.cache.stakeHistory = [];

  effects.api.updateToken("");
  effects.websockets.newlife.socket?.close();
};
