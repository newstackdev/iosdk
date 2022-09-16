import { CreatorApi } from "../../types";
import { ErrorResponse, UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";

// const baseUrl = newlifeBaseUrl; //"https://api-eu-sit.newlife.io/creator";

export default (() => {
  let api: CreatorApi;
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
    updateToken(token: string) {
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
