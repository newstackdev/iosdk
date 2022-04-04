"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const types_1 = require("../../types");
const baseUrl = config_1.newlifeBaseUrl; //"https://api-eu-sit.newlife.io/creator";
exports.default = (() => {
    let api;
    return {
        initialize() {
            api = new types_1.CreatorApi({
                baseUrl, securityWorker: (securityData) => {
                    return (!securityData ? {} : { headers: { Authorization: securityData.token } });
                }
            });
            return api;
        },
        updateToken(token) { api.setSecurityData({ token }); },
        async authorize() {
            try {
                const r = await api.user.currentList();
                return r.data;
            }
            catch (_ex) {
                const ex = _ex;
                if (ex.error && ex.error.statusCode === 404) {
                    return {};
                    // return (await api.user.userCreate({})).data;
                }
                // alert(ex.error.errorMessage);
                throw ex;
            }
        }
    };
})();
//# sourceMappingURL=effects.js.map