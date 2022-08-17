import { Action } from "../../types";

const authorize: Action<{ jwt: string }> = async ({ state, effects, actions }, { jwt }) => {
  const unsidJwt = `unsid ${jwt}`;

  effects.api.updateToken(unsidJwt);
  state.unsid.token = unsidJwt;

  window.localStorage.setItem("unsid-auth-token", jwt);
};

const logout: Action = async ({ state, effects, actions }) => {
  //   actions.api.auth.logout();
  //   actions.firebase.logout();
  state.unsid.token = "";
  window.localStorage.setItem("unsid-auth-token", "");
};

const onInitializeOvermind: Action = ({ actions, state, effects, reaction }) => {
  const unsidJwtFromUrl = new URLSearchParams(window.location.search).get("unsid_jwt");
  const unsidJwtFromLocalStore = unsidJwtFromUrl
    ? unsidJwtFromUrl
    : window.localStorage.getItem(`unsid-auth-token`)?.toString() || "";

  const unsidJwt = unsidJwtFromUrl || unsidJwtFromLocalStore;
  if (unsidJwt) {
    actions.unsid.authorize({ jwt: unsidJwt });
  }
};

const unsidApplication = {
  actions: {
    onInitializeOvermind,
    authorize,
    logout,
  },
  state: {
    token: "" as string,
  },
  effects: {},
};

export default unsidApplication;
