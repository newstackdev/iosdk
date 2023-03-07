import { CreatorApi } from "../../types";
import { ErrorResponse, UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";

// const baseUrl = newlifeBaseUrl; //"https://api-eu-sit.newlife.io/creator";

export default (() => {
  let api: CreatorApi;
  let _token = "";

  return {
    initialize(baseUrl: string) {
      api = new CreatorApi({
        baseUrl,
        securityWorker: (securityData: { token: string } | null) => {
          return !securityData ? {} : { headers: { Authorization: securityData.token } };
        },
      });
      return api;
    },
    getCurrentToken() {
      return _token;
    },
    updateToken(token: string) {
      _token = token;
      api.setSecurityData({ token });
    },
    async authorize(): Promise<UserReadPrivateResponse> {
      try {
        const r = await api.user.currentList();
        return r.data;
      } catch (_ex) {
        const ex: { error: ErrorResponse } = _ex as any;
        throw ex;
      }
    },
  };
})();
