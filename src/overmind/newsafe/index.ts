import { Action } from "../../types";

const authorize: Action<{ jwt: string }> = async ({ state, effects, actions }, { jwt }) => {
  const newsafeJwt = `newsafe ${jwt}`;

  state.newsafe.token = newsafeJwt;

  window.localStorage.setItem("newsafe-auth-token", jwt);
};

const signOut: Action = async ({ state, effects, actions }) => {
  //   actions.api.auth.logout();
  //   actions.firebcdse.logout();
  state.newsafe.token = "";
  window.localStorage.setItem("newsafe-auth-token", "");
};

const onInitializeOvermind: Action = ({ actions, state, effects, reaction }) => {
  const newsafeJwtFromUrl = new URLSearchParams(window.location.search).get("newsafe_jwt");
  const newsafeJwtFromLocalStore = newsafeJwtFromUrl
    ? newsafeJwtFromUrl
    : window.localStorage.getItem(`newsafe-auth-token`)?.toString() || "";

  const newsafeJwt = newsafeJwtFromUrl || newsafeJwtFromLocalStore;
  if (newsafeJwt) {
    actions.newsafe.authorize({ jwt: newsafeJwt });
  }
};

const newsafeApplication = {
  actions: {
    onInitializeOvermind,
    authorize,
    signOut,
  },
  state: {
    token: "" as string,
  },
  effects: {},
};

export default newsafeApplication;
