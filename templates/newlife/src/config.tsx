import { ROUTE_ACCESS_LEVELS } from "@newstackdev/iosdk/dist/overmind/routing/state";
import { Home } from "./Pages/Home";
import { Explore } from "./Pages/Explore";

// Customize here
export const config = {
  settings: {
    app: {
      newgraph: {
        apiKey: ""
      },
      newcoin: {
        domain: "",
        poolSymbol: ""
      }
    },
    // firebaseConfig: {
    //   apiKey: "",
    //   appId: "",
    //   authDomain: ""
    // },
    routing: {
      routeAccessLevels: {
        ...ROUTE_ACCESS_LEVELS,
        "/": (st) => true, //st >= AUTH_FLOW_STATUS.AUTHENTICATED
        "/explore": (st) => true, //st >= AUTH_FLOW_STATUS.AUTHENTICATED
        "/counter": (st) => true, //st >= AUTH_FLOW_STATUS.AUTHENTICATED
      } //(AUTH_FLOW_STATUS.AUTHORIZED) <= st && (st < AUTH_FLOW_STATUS.AUTHENTICATED) },
    }
  },
  routes: {
    // override built-in types here
    overrides: {
      "/explore": Explore,
      "/": Home
    }
  },
  // override fundamental building blocks here
  components:
  {
    layout:
    {
      // TopMenu: () => <>Overrides top menu</>,
      // Layout: // override layout completely
      //   (({ children }) => <>{children}</>) as NLView
    }
  }
};