import * as mood from "./actions/mood";
import * as user from "./actions/user";
import * as post from "./actions/post";
import { AUTH_FLOW_STATUS } from "../auth/state";
import * as auth from "./actions/auth";
import { Action } from "../state";

const onInitializeOvermind: Action<undefined> = async ({
  effects,
  state,
  actions,
  reaction,
}) => {
  state.api.client = effects.api.initialize();

  // reaction(
  //     (state) => state.firebase.user,
  //     async (fbUser) => {
  //         if (!fbUser && state.api.auth?.user?.id)
  //             return actions.api.auth.logout();
  //     });

  reaction(
    (state) => state.api.auth.authorized,
    async () => {
      if (
        state.auth.status < AUTH_FLOW_STATUS.AUTHORIZED ||
        !["registered", "admitted"].includes(state.api.auth.user?.status || "")
      ) {
        console.log("Not yet authorized");
        return;
      }

      actions.websockets.toggleWebSocket();

      await actions.api.user.getMoods({ id: state.api.auth.user?.id });
      state.api.auth.moods = [
        ...(state.api.cache.users.byId[state.api.auth.user?.id || ""]?.moods ||
          []),
      ];
      await actions.api.user.getPowerups({ user: state.api.auth.user || {} });
    }
  );
};

export default {
  onInitializeOvermind,
  auth,
  user,
  mood,
  post,
};

// export default namespaced({
//     user: { actions: user },
//     mood: { actions: mood },
//     post: { actions: post }
// });
