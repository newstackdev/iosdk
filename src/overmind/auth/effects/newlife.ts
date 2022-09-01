import { ErrorResponse, UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
// import { newlifeBaseUrl } from "../../../config";
import { CreatorApi } from "../../../types";

// const baseUrl = newlifeBaseUrl;

export const Websocket = () => {
  const state = {
    socket: null,
  } as {
    socket: WebSocket | null;
    toggle: (url: string) => void;
  };

  const toggle = async (url: string) => {
    if (state.socket) state.socket.close();

    if (url) state.socket = new WebSocket(url);
  };
  state.toggle = toggle;

  return state;
};

export const Api = (() => {
  let api: CreatorApi;
  return {
    initialize(baseUrl: string) {
      api = new CreatorApi({
        baseUrl,
        securityWorker: (securityData: { token: string } | null) => {
          console.log("Token is ", securityData?.token);
          return !securityData ? {} : { headers: { Authorization: securityData.token } };
        },
      });
      return api;
    },
    updateToken(token: string) {
      api.setSecurityData({ token });
    },
    async authorize(): Promise<UserReadPublicResponse> {
      try {
        const r = await api.user.currentList();
        return r.data;
      } catch (_ex) {
        const ex: { error: ErrorResponse } = _ex as any;
        if (ex.error && ex.error.statusCode === 404) {
          return {};
        }
        alert(ex.error.errorMessage);
        throw ex;
      }
    },
  };
})();
