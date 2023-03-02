// import * as actions from "./actions";
// import * as effects from "./effects";
// import state from "./state";

import { Action } from "../../types";

const onInitializeOvermind: Action = async ({ effects, state, actions, reaction }) => {
  reaction(
    (state) => state.api.auth.user?.status,
    async () => {
      actions.flows.user.create.onInitializeOnboardingWizard();
      console.log(state.api.auth.user?.status);
      if (!state.api.auth.admitted) return;

      //   actions.lists.top.posts();
    },
  );
};

export default {
  actions: {
    onInitializeOvermind,
  },
  //   effects,
  //   state,
};
