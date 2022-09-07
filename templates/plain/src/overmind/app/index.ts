import { Action } from "../overmind";

const signIn: Action<{ jwt: string }> = async ({ state, effects, actions }, { jwt: newsafejwt }) => {
    await actions.api.auth.authorize({ token: newsafejwt });

    // effects.app.api.updateToken(unsidjwt); // initialize your own/other apis
    // any post-auth initialization
  }


const signOut: Action = async ({ state, effects, actions }) => {
    actions.api.auth.logout();
    actions.newsafe.signOut();

    state.api.auth.user = {};
  }

const onInitializeOvermind: Action = ({ actions, state, effects, reaction }) => {
    // state.app.api = effects.app.api.initialize(<your init url>);
  
    state.newsafe.token &&
        actions.app.signIn({ jwt: state.newsafe.token || "" });
  
    reaction(
      (state) => state.newsafe.token,
      async () => {
        await actions.app.signIn({ jwt: state.newsafe.token || "" });
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