import { AuthWidget } from "./Pages/AuthWidget";
import { DEFAULT_ROUTES } from "./defaultRoutes";
import { FirebaseConfig, GenericComponent } from "./types";
import { Header, Layout, TopMenu } from "./Layout/Layout";
import { PartialDeep } from "type-fest";
import { ROUTE_ACCESS_LEVELS } from "./overmind/routing/state";
import { ReactElement } from "react";
import { get } from "lodash";
import Logo from "./Components/Icons/Logo";

const currentHost = window.location.hostname === "localhost" ? "web-dev.newlife.io" : window.location.hostname;

const stages: Record<string, string> = {
  "web-dev.newlife.io": "eu-dev",
  "test.newlife.io": "eu-sit",
  "web.newlife.io": "eu-prod",
  "www.newlife.io": "eu-prod",
  "newlife.io": "eu-prod",
  "web-dev.unsid.org": "eu-dev",
  "dao.newmoon.ac": "eu-prod",
};

export const stage = stages[currentHost];

const apiBaseUrls: Record<string, string> = {
  "eu-dev": "https://api-eu-dev.newgra.ph/v1",
  // "eu-dev": "https://api-eu-dev.newlife.io/creator",
  "eu-sit": "https://api-eu-sit.newlife.io/creator",
  "eu-prod": "https://api.newlife.io/creator",
};

const getStr = (o: any) => (path: string) => get(o, path) || "";

const getEnv = getStr(process.env);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigs: Record<string, FirebaseConfig> = {
  "eu-dev": {
    apiKey: process.env.REACT_APP_DEV_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_DEV_FIREBASE_API_KEY || "",
    projectId: "newlifeio",
    storageBucket: "newlifeio.appspot.com",
    messagingSenderId: process.env.REACT_APP_DEV_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_DEV_FIREBASE_APP_ID || "",
    measurementId: "G-PJWYRPZSNM",
  },
  "eu-sit": {
    apiKey: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    projectId: "newlifeio",
    storageBucket: "newlifeio.appspot.com",
    messagingSenderId: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    appId: process.env.REACT_APP_SIT_FIREBASE_API_KEY || "",
    measurementId: "G-PJWYRPZSNM",
  },
  "eu-prod": {
    apiKey: process.env.REACT_APP_PROD_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_PROD_FIREBASE_API_KEY || "",
    projectId: "newlifeio-prod",
    storageBucket: "newlifeio-prod.appspot.com",
    messagingSenderId: process.env.REACT_APP_PROD_FIREBASE_API_KEY || "",
    appId: process.env.REACT_APP_PROD_FIREBASE_APP_ID || "",
    measurementId: "G-YMT320RGLJ",
  },
  v1: {
    apiKey: process.env.REACT_APP_V1_FIREBASE_API_KEY || "",
    authDomain: process.env.REACT_APP_V1_FIREBASE_API_KEY || "",
    projectId: "newlifeio-prod",
    storageBucket: "newlifeio-prod.appspot.com",
    messagingSenderId: process.env.REACT_APP_V1_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.REACT_APP_V1_FIREBASE_APP_ID || "",
    measurementId: "G-YMT320RGLJ",
  },
};

const mediaBuckets: Record<string, any> = {
  "eu-dev": `https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
  "eu-sit": `https://eu-sit-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
  "eu-prod": `https://cdn.newlife.io`, //`https://eu-prod-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
};

const websocketsServers: Record<string, any> = {
  "eu-dev": `wss://wsapi-eu-dev.newlife.io/creator`,
  "eu-sit": `wss://wsapi-eu-sit.newlife.io/creator`,
  "eu-prod": `wss://wsapi-eu-prod.newlife.io/creator`,
};

const stripeKeys: Record<string, any> = {
  "eu-dev": `pk_test_wPJ6hXufjI4FCyabWUFsEnRf002P6QN6lX`,
  "eu-sit": `pk_test_wPJ6hXufjI4FCyabWUFsEnRf002P6QN6lX`,
  "eu-prod": `pk_live_DzLJLMNu6sk2V3aJkdmEhdUj00NrUSF9uM`,
};

export const APP_DOMAIN = "life.nco";

export const firebaseConfig = firebaseConfigs[stage];
export const apiBaseUrl = apiBaseUrls[stage];
export const mediaBucket = mediaBuckets[stage];
const websocketsServer = websocketsServers[stage];
export const stripeKey = stripeKeys[stage];

console.log("Stage", stage);
console.log("Firebase config", firebaseConfig);

export const config = {
  env: {
    stage,
  },
  settings: {
    app: {
      // the current app
      name: "newlife",
      currentHost: currentHost,
    },
    newcoin: {
      daoId: "43",
      daoDomain: stage === "eu-prod" ? (currentHost === "dao.newmoon.ac" ? "newmoon.io" : "testaaab1.io") : "dx.io", //"testaaagt.io", //has a proposal -> "jnidjeaor.io",
      displayDaoDomain:
        stage === "eu-prod" ? (currentHost === "dao.newmoon.ac" ? "newmoon.io" : "life.nco") : "test-net-main-dao-dx.io",
      poolId: "",
    },
    firebaseConfig,
    newgraph: {
      baseUrl: apiBaseUrl,
      mediaBucket,
      websocketsServer,
    },
    routing: {
      routeAccessLevels: ROUTE_ACCESS_LEVELS,
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
