import { Action } from "../overmind";

const signIn: Action<{ jwt: string }> = async ({ state, effects, actions }, { jwt: unsidjwt }) => {
    await actions.api.auth.authorize({ token: unsidjwt });

    // effects.app.api.updateToken(unsidjwt); // initialize your own/other apis
    // any post-auth initialization
  }


const signOut: Action = async ({ state, effects, actions }) => {
    actions.api.auth.logout();
    actions.unsid.signOut();

    state.api.auth.user = {};
  }

const onInitializeOvermind: Action = ({ actions, state, effects, reaction }) => {
    // state.app.api = effects.app.api.initialize(<your init url>);
  
    state.unsid.token &&
        actions.app.signIn({ jwt: state.unsid.token || "" });
  
    reaction(
      (state) => state.unsid.token,
      async () => {
        await actions.app.signIn({ jwt: state.unsid.token || "" });
        actions.routing.historyPush({ location: "/home" });
      }
    )
  
    reaction(
      (state) => state.api.auth.user?.username,
      async () => {
        
      },
    );
  };

export const app = {
    actions: {
        onInitializeOvermind,
        signIn,
        signOut
    }    
}