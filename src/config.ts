import { AuthWidget } from "./Pages/AuthWidget";
import { GenericComponent } from "./types";
import { Header, Layout, TopMenu } from "./Layout/Layout";
import { PartialDeep } from "type-fest";
import { ROUTE_ACCESS_LEVELS } from "./overmind/routing/state";
import { apiBaseUrls } from "./config/newgraph";
import { ensureProtocolAndHost, getCurrentHost } from "./utils/config/hosts";
import { firebaseConfigs } from "./config/firebase";
import { mediaBuckets } from "./config/mediaBuckets";
import { stageDomainsFromList } from "./utils/config/stage";
import { stripeKeys } from "./config/stripeKeys";
import { websocketsServers } from "./config/websocketServers";
import Logo from "./Components/Icons/Logo";

const stages: Record<string, string> = {
  ...stageDomainsFromList(process.env.REACT_APP_IOSDK_APP_DEV_HOST || "", "eu-dev"),
  ...stageDomainsFromList(process.env.REACT_APP_IOSDK_APP_SIT_HOST || "", "eu-sit"),
  ...stageDomainsFromList(process.env.REACT_APP_IOSDK_APP_PROD_HOST || "", "eu-prod"),
  ...stageDomainsFromList(process.env.REACT_APP_IOSDK_APP_HOST || "", "eu-prod"),
};
//haha
const appDomains = {
  "eu-dev": process.env.REACT_APP_IOSDK_APP_DOMAIN_DEV,
  "eu-prod": process.env.REACT_APP_IOSDK_APP_DOMAIN_PROD || process.env.REACT_APP_IOSDK_APP_DOMAIN,
};

const canonicalHosts = {
  "eu-dev": process.env.REACT_APP_IOSDK_APP_DEV_CANONICAL_HOSTS || process.env.REACT_APP_IOSDK_APP_DEV_HOST,
  "eu-sit": process.env.REACT_APP_IOSDK_APP_SIT_CANONICAL_HOSTS || process.env.REACT_APP_IOSDK_APP_SIT_HOST,
  "eu-prod":
    process.env.REACT_APP_IOSDK_APP_PROD_CANONICAL_HOSTS ||
    process.env.REACT_APP_IOSDK_APP_CANONICAL_HOSTS ||
    process.env.REACT_APP_IOSDK_APP_PROD_HOST ||
    process.env.REACT_APP_IOSDK_APP_HOST,
};

const localhostHost = process.env.REACT_APP_IOSDK_APP_LOCALHOST_HOST || canonicalHosts["eu-prod"];

const currentHost = getCurrentHost(localhostHost || ""); //isLocalhost ? "web-dev.newlife.io" : window.location.hostname;

export const stage = stages[currentHost]; // || "web-dev.newlife.io";
const env = (stage || "").split(/-/)[1] || "";

export const APP_DOMAIN = appDomains[stage]; //"life.nco";

const daoDomain =
  process.env[`REACT_APP_IOSDK_APP_DAO_DOMAIN_${env.toUpperCase()}`] ||
  process.env["REACT_APP_IOSDK_APP_DAO_DOMAIN"] ||
  APP_DOMAIN ||
  "";

export const firebaseConfig = firebaseConfigs[stage];
export const apiBaseUrl = apiBaseUrls[stage];
export const mediaBucket = mediaBuckets[stage];
export const websocketsServer = websocketsServers[stage];
export const stripeKey = stripeKeys[stage];
export const canonicalHostsForStage: string[] = canonicalHosts[stage] || [];

console.log("Stage", stage);
console.log("Firebase config", firebaseConfig);

// This should not be happening in mainnet
const displayDaoDomain =
  process.env[`REACT_APP_IOSDK_DISPLAY_DAO_DOMAIN_${env.toUpperCase()}`] ||
  process.env["REACT_APP_IOSDK_DISPLAY_DAO_DOMAIN"] ||
  daoDomain;

if (!daoDomain)
  console.warn(
    "IOSDK: settings.app.daoDomain not configured, use REACT_APP_IOSDK_APP_DAO_NAME in .env to set to app owner's username.",
  );

ensureProtocolAndHost(canonicalHosts, stage);

export const config = {
  env: {
    env: (stage || "").split(/-/)[1],
    stage,
  },
  settings: {
    app: {
      // the current app
      name: process.env.REACT_APP_IOSDK_APP_NAME,
      currentHost: currentHost,
    },
    newsafe: {
      currentHost: currentHost,
    },
    newcoin: {
      //chooseDao(),
      daoDomain,
      displayDaoDomain,
      /* 
        defaultToOwnDao:
        if true DAO views default to the current user's dao (thereby forcing them to create one if not available),
        if false defaults to daoDomain above 
      */
      defaultToOwnDao: false,
    },
    firebaseConfig,
    newgraph: {
      baseUrl: apiBaseUrl,
      mediaBucket,
      websocketsServer,
    },
    routing: {
      routeAccessLevels: ROUTE_ACCESS_LEVELS,
      useDefaultSignout: true,
    },
    stripe: {
      publicKey: stripeKey,
    },
    indicators: {
      // setting indicators for all actions for progress is too costly, we filter using this setting
      isWatchable: (actionName: string) => /^(api|lists|auth|firebase|payments|newcoin)/.test(actionName),
    },
  },
  routes: {
    useDefaultRoutes: true,
    overrides: {
      // ...(true || currentHost === "dao.newmoon.ac" ? {
      //   "/explore": "/dao/newmoon"
      // } : {})
    },
    noBackButton: ["/explore", "/post-create", "/proposals", "/user/invite", "/signup/domain", "/"],
    defaultRoute: {
      condition: (state) => {
        return state.api.auth.authorized && ["registered", "admitted", "premium"].includes(state.api.auth.user.status);
      },
      defaultLocation: (_state) => "/",
    },
  },
  components: {
    layout: {
      Layout: Layout as GenericComponent,
      TopMenu: TopMenu as GenericComponent,
      Header: Header as GenericComponent,
    },
    auth: {
      AuthWidget: AuthWidget as GenericComponent,
    },
    icons: {
      Logo: Logo as GenericComponent,
    },
  },
  featureFlags: {
    onboarding: {
      premiumDomains: true,
    },
  },
};

export type Configuration<T = {}> = typeof config & T;
export type PartialConfiguration<T = {}> = PartialDeep<Configuration<T>>;
/*


x
x
x
x
x


*/
// "eu-dev": "https://api-eu-dev.newgra.ph/v1",
// "eu-prod": "https://api.newlife.io/creator",

// const getStr = (o: any) => (path: string) => get(o, path) || "";
// const getEnv = getStr(process.env);

// const stages: Record<string, string> = {
//   "web-dev.newlife.io": "eu-dev",
//   "test.newlife.io": "eu-sit",
//   "web.newlife.io": "eu-prod",
//   "www.newlife.io": "eu-prod",
//   "newlife.io": "eu-prod",

//   "web-dev.unsid.org": "eu-dev",
//   "dao.newmoon.ac": "eu-prod",
//   "www.newlink.page": "eu-prod",
// };
// [process.env.REACT_APP_IOSDK_APP_DEV_HOST || ""]: "eu-dev",
// [process.env.REACT_APP_IOSDK_APP_SIT_HOST || ""]: "eu-sit",
// ...(process.env.REACT_APP_IOSDK_APP_PROD_HOST || "").split(/,/).reduce((r, c, o) =>
//     ({ ...r, [c]: "eu-prod" })
// , {})
// };

// const chooseDao = () => {
//   const currDao = process.env.REACT_APP_IOSDK_APP_DAO_NAME;
//   if (stage === "eu-prod") {
//     if (currentHost === "dao.newmoon.ac") {
//       return {
//         daoId: "204",
//         daoDomain: "newmoon.io",
//         displayDaoDomain: "newmoon.io",
//       };
//     } else {
//       return {
//         daoId: "206",
//         daoDomain: "testaaab1.io",
//         displayDaoDomain: "life.nco",
//       };
//     }
//   } else if (stage === "eu-dev") {
//     if (currDao) {
//       return {
//         daoDomain: currDao,
//       };
//     } else
//       return {
//         daoId: "43",
//         daoDomain: "dx.io",
//         displayDaoDomain: "dx.io",
//       };
//   } else
//     return {
//       daoId: "43",
//       daoDomain: "dx.io",
//       displayDaoDomain: "dx.io",
//     };
// };
// if (!stage) {
//   // somewhat barbarian
//   document.body.outerHTML = `<pre style='margin: 10vmax'>This IOSDK application is misconfigured.<br /><br />
//       In .env in the project root configure:
//       - REACT_APP_IOSDK_APP_NAME
//       - REACT_APP_IOSDK_APP_HOST
//       <br />For details check <a href="https://newstack.dev/instructions">newstack.dev/instructions</a>
//     </pre>`;
// }
