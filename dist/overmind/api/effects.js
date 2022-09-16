import { CreatorApi } from "../../types";
// const baseUrl = newlifeBaseUrl; //"https://api-eu-sit.newlife.io/creator";
export default (() => {
    let api;
    return {
        initialize(baseUrl) {
            api = new CreatorApi({
                baseUrl,
                securityWorker: (securityData) => {
                    return !securityData ? {} : { headers: { Authorization: securityData.token } };
                },
            });
            return api;
        },
        updateToken(token) {
            api.setSecurityData({ token });
        },
        async authorize() {
            try {
                const r = await api.user.currentList();
                return r.data;
            }
            catch (_ex) {
                const ex = _ex;
                throw ex;
            }
        },
    };
})();
//# sourceMappingURL=effects.js.map