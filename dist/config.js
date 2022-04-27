"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.stripeKey = exports.newlifeWebsocketsServer = exports.newlifeMediaBucket = exports.newlifeBaseUrl = exports.firebaseConfig = exports.APP_DOMAIN = void 0;
const Logo_1 = __importDefault(require("./Components/Icons/Logo"));
const Layout_1 = require("./Layout/Layout");
const AuthWidget_1 = require("./Pages/AuthWidget");
const state_1 = require("./overmind/routing/state");
const lodash_1 = require("lodash");
const currentHost = window.location.hostname === "localhost"
    ? "web-dev.newlife.io"
    : window.location.hostname;
const stages = {
    "web-dev.newlife.io": "eu-dev",
    "test.newlife.io": "eu-sit",
    "web.newlife.io": "eu-prod",
    "www.newlife.io": "eu-prod",
    "newlife.io": "eu-prod",
    "web-dev.unsid.org": "eu-dev",
};
const stage = stages[currentHost];
const newlifeBaseUrls = {
    "eu-dev": "https://api-eu-dev.newlife.io/creator",
    "eu-sit": "https://api-eu-sit.newlife.io/creator",
    "eu-prod": "https://api-eu-prod.newlife.io/creator",
};
const getStr = (o) => (path) => (0, lodash_1.get)(o, path) || "";
const getEnv = getStr(process.env);
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigs = {
    "eu-dev": {
        apiKey: process.env.DEV_FIREBASE_API_KEY || "",
        authDomain: process.env.DEV_FIREBASE_API_KEY || "",
        projectId: "newlifeio",
        storageBucket: "newlifeio.appspot.com",
        messagingSenderId: process.env.DEV_FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.DEV_FIREBASE_APP_ID || "",
        measurementId: "G-PJWYRPZSNM",
    },
    "eu-sit": {
        apiKey: process.env.SIT_FIREBASE_API_KEY || "",
        authDomain: process.env.SIT_FIREBASE_API_KEY || "",
        projectId: "newlifeio",
        storageBucket: "newlifeio.appspot.com",
        messagingSenderId: process.env.SIT_FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.SIT_FIREBASE_APP_ID || "",
        measurementId: "G-PJWYRPZSNM",
    },
    "eu-prod": {
        apiKey: process.env.PROD_FIREBASE_API_KEY || "",
        authDomain: process.env.PROD_FIREBASE_API_KEY || "",
        projectId: "newlifeio-prod",
        storageBucket: "newlifeio-prod.appspot.com",
        messagingSenderId: process.env.PROD_FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.PROD_FIREBASE_APP_ID || "",
        measurementId: "G-YMT320RGLJ",
    },
    v1: {
        apiKey: process.env.V1_FIREBASE_API_KEY || "",
        authDomain: process.env.V1_FIREBASE_API_KEY || "",
        projectId: "newlifeio-prod",
        storageBucket: "newlifeio-prod.appspot.com",
        messagingSenderId: process.env.V1_FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.V1_FIREBASE_APP_ID || "",
        measurementId: "G-YMT320RGLJ",
    },
};
// with env:
// ----
// "eu-dev": {
// 	apiKey: process.env.REACT_APP_FIREBASE_KEY || "",
// 	authDomain: "newlifeio.firebaseapp.com",
// 	projectId: "newlifeio",
// 	storageBucket: "newlifeio.appspot.com",
// 	messagingSenderId: "360722214510",
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
// 	measurementId: "G-PJWYRPZSNM",
// },
// "eu-sit": {
// 	apiKey: process.env.REACT_APP_FIREBASE_KEY || "",
// 	authDomain: "newlifeio.firebaseapp.com",
// 	projectId: "newlifeio",
// 	storageBucket: "newlifeio.appspot.com",
// 	messagingSenderId: "360722214510",
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
// 	measurementId: "G-PJWYRPZSNM",
// },
// "eu-prod": {
// 	apiKey: process.env.REACT_APP_FIREBASE_KEY || "",
// 	authDomain: "newlifeio-prod.firebaseapp.com",
// 	projectId: "newlifeio-prod",
// 	storageBucket: "newlifeio-prod.appspot.com",
// 	messagingSenderId: "666370792765",
// 	appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
// 	measurementId: "G-YMT320RGLJ",
// },
// v1: {
// 	apiKey: process.env.REACT_APP_NEWLIFE_V1_FIREBASE_API_KEY || "",
// 	authDomain: "newlifeio-prod.firebaseapp.com",
// 	projectId: "newlifeio-prod",
// 	storageBucket: "newlifeio-prod.appspot.com",
// 	messagingSenderId: "666370792765",
// 	appId: process.env.REACT_APP_NEWLIFE_V1_FIREBASE_APP_ID || "",
// 	measurementId: "G-YMT320RGLJ",
// },
// ----
const newlifeMediaBuckets = {
    "eu-dev": `https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
    "eu-sit": `https://eu-sit-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
    "eu-prod": `https://eu-prod-creator-api-cdn.s3.eu-west-1.amazonaws.com`, // images/${sizer}${src}
};
const newlifeWebsocketsServers = {
    "eu-dev": `wss://wsapi-eu-dev.newlife.io/creator`,
    "eu-sit": `wss://wsapi-eu-sit.newlife.io/creator`,
    "eu-prod": `wss://wsapi-eu-prod.newlife.io/creator`,
};
const stripeKeys = {
    "eu-dev": `pk_test_wPJ6hXufjI4FCyabWUFsEnRf002P6QN6lX`,
    "eu-sit": `pk_test_wPJ6hXufjI4FCyabWUFsEnRf002P6QN6lX`,
    "eu-prod": `pk_live_DzLJLMNu6sk2V3aJkdmEhdUj00NrUSF9uM`,
};
exports.APP_DOMAIN = "life.nco";
exports.firebaseConfig = firebaseConfigs[stage];
exports.newlifeBaseUrl = newlifeBaseUrls[stage];
exports.newlifeMediaBucket = newlifeMediaBuckets[stage];
exports.newlifeWebsocketsServer = newlifeWebsocketsServers[stage];
exports.stripeKey = stripeKeys[stage];
exports.config = {
    settings: {
        firebaseConfig: exports.firebaseConfig,
        newlife: {
            baseUrl: exports.newlifeBaseUrl,
            mediaBucket: exports.newlifeMediaBucket,
            websocketsServer: exports.newlifeWebsocketsServer,
        },
        routing: {
            routeAccessLevels: state_1.ROUTE_ACCESS_LEVELS,
        },
        stripe: {
            publicKey: exports.stripeKey
        }
    },
    routes: {
        useDefaultRoutes: true,
        overrides: {},
        noBackButton: ["/explore"],
    },
    components: {
        layout: {
            Layout: Layout_1.Layout,
            TopMenu: Layout_1.TopMenu,
            Header: Layout_1.Header
        },
        auth: {
            AuthWidget: AuthWidget_1.AuthWidget,
        },
        icons: {
            Logo: Logo_1.default,
        },
    },
    featureFlags: {
        onboarding: {
            premiumDomains: true
        }
    }
};
//# sourceMappingURL=config.js.map