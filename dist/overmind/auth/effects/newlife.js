// import { newlifeBaseUrl } from "../../../config";
import { CreatorApi } from "../../../types";
// const baseUrl = newlifeBaseUrl;
export const Websocket = () => {
    const state = {
        socket: null,
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
export const Api = (() => {
    let api;
    return {
        initialize(baseUrl) {
            api = new CreatorApi({
                baseUrl,
                securityWorker: (securityData) => {
                    console.log("Token is ", securityData?.token);
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
                if (ex.error && ex.error.statusCode === 404) {
                    return {};
                }
                alert(ex.error.errorMessage);
                throw ex;
            }
        },
    };
})();
//# sourceMappingURL=newlife.js.map