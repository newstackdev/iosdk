"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.Websocket = void 0;
const config_1 = require("../../../config");
const types_1 = require("../../../types");
const baseUrl = config_1.newlifeBaseUrl;
const Websocket = () => {
    const state = {
        socket: null
    };
    const toggle = async (url) => {
        if (state.socket)
            state.socket.close();
        if (url)
            state.socket = new WebSocket(url);
    };
    state.toggle = toggle;
    return state;
};
exports.Websocket = Websocket;
exports.Api = (() => {
    let api;
    return {
        initialize() {
            api = new types_1.CreatorApi({
                baseUrl, securityWorker: (securityData) => {
                    console.log("Token is ", securityData?.token);
                    return (!securityData ? {} : { headers: { Authorization: securityData.token } });
                }
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
                if (ex.error && ex.error.statusCode === 404) {
                    return {};
                }
                alert(ex.error.errorMessage);
                throw ex;
            }
        }
    };
})();
//# sourceMappingURL=newlife.js.map