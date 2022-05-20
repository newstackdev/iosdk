import * as mood from "./actions/mood";
import * as user from "./actions/user";
import * as post from "./actions/post";
import { namespaced } from "overmind/lib/config";
import { Action } from "../../types";
import { AUTH_FLOW_STATUS } from "../auth/state";
import * as auth from "./actions/auth";

const onInitializeOvermind : Action = async ({
    effects, state, actions, reaction
}) => {
    state.api.client = effects.api.initialize(state.config.settings.newlife.baseUrl);

    // reaction(
    //     (state) => state.firebase.user,
    //     async (fbUser) => {
    //         if (!fbUser && state.api.auth?.user?.id)
    //             return actions.api.auth.logout();
    //     });
    reaction(
        (state) => state.api.auth.user?.status,
        async () => {
            console.log(state.api.auth.user?.status);
        }
    )
    reaction(
        (state) => state.api.auth.authorized,
        async () => {
            if (
                state.auth.status < AUTH_FLOW_STATUS.AUTHORIZED ||
                !["registered", "admitted"].includes(state.api.auth.user?.status || "")
            ) {
                console.log("Not yet authorized")
                return;
            };
            
            actions.websockets.toggleWebSocket()

            await actions.api.user.getMoods({ id: state.api.auth.user?.id });
            state.api.auth.moods = [...(state.api.cache.users.byId[state.api.auth.user?.id || ""]?.moods || [])];
            await actions.api.user.getPowerups({ user : state.api.auth.user || {} });
        }
    )
};

export default {
    onInitializeOvermind,
    auth,
    user,
    mood,
    post
}

// export default namespaced({
//     user: { actions: user },
//     mood: { actions: mood },
//     post: { actions: post }
// });