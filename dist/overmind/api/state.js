import { AUTH_FLOW_STATUS } from "../auth/state";
import { derived } from "overmind";
export const api = {};
export default {
    client: api,
    auth: {
        // newlife
        user: {},
        moods: [],
        status: AUTH_FLOW_STATUS.ANONYMOUS,
        attempted: false,
        userDisplayHandler: derived((state, rs) => {
            return state.user?.username || (rs.firebase?.user?.phoneNumber || "...") + (state.user?.id ? "*" : "");
        }),
        authorized: derived((s, rs) => rs.auth.status >= AUTH_FLOW_STATUS.AUTHORIZED),
        admitted: derived((s) => ["admitted", "registered"].includes(s.user?.status || "")),
        inviteesList: { value: [] },
    },
    cache: {
        posts: {},
        moods: {},
        users: {
            byId: {},
            byUsername: {},
        },
        powerups: {},
        stakeHistory: [],
    },
    // post: derived((state: State) => (id: string) => state._posts[id] || actions.getPost(id) )
};
//# sourceMappingURL=state.js.map