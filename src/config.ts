import { ReactElement } from "react";
import { PartialDeep } from "type-fest";
import Logo from "./Components/Icons/Logo";
import { Header, Layout, TopMenu } from "./Layout/Layout";
import { AuthWidget } from "./Pages/AuthWidget";
import { FirebaseConfig, GenericComponent } from "./types";
import { ROUTE_ACCESS_LEVELS } from "./overmind/routing/state";
import { DEFAULT_ROUTES } from "./defaultRoutes";
import { get } from "lodash";

const currentHost =
	window.location.hostname === "localhost"
		? "web-dev.newlife.io"
		: window.location.hostname;

const stages: Record<string, string> = {
	"web-dev.newlife.io": "eu-dev",
	"test.newlife.io": "eu-sit",
	"web.newlife.io": "eu-prod",
	"www.newlife.io": "eu-prod",
	"newlife.io": "eu-prod",
	"web-dev.unsid.org": "eu-dev",
};

const stage = stages[currentHost];

const newlifeBaseUrls: Record<string, string> = {
	"eu-dev": "https://api-eu-dev.newlife.io/creator",
	"eu-sit": "https://api-eu-sit.newlife.io/creator",
	"eu-prod": "https://api-eu-prod.newlife.io/creator",
};

const getStr = (o: any) => (path: string) =>
	get(o, path) || "";

const getEnv = getStr(process.env);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigs: Record<string, FirebaseConfig> = {
	"eu-dev": {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "", 	
		authDomain: process.env.REACT_APP_FIREBASE_API_KEY || "", 
		projectId: "newlifeio",
		storageBucket: "newlifeio.appspot.com",
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "", 
		appId: process.env.REACT_APP_FIREBASE_APP_ID || "", 
		measurementId: "G-PJWYRPZSNM",
	},
	"eu-sit": {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
		authDomain: process.env.REACT_APP_FIREBASE_API_KEY || "",
		projectId: "newlifeio",
		storageBucket: "newlifeio.appspot.com",
		messagingSenderId: process.env.REACT_APP_FIREBASE_API_KEY || "",
		appId: process.env.REACT_APP_FIREBASE_API_KEY || "",
		measurementId: "G-PJWYRPZSNM",
	},
	"eu-prod": {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
		authDomain:  process.env.REACT_APP_FIREBASE_API_KEY || "",
		projectId: "newlifeio-prod",
		storageBucket: "newlifeio-prod.appspot.com",
		messagingSenderId: process.env.REACT_APP_FIREBASE_API_KEY || "",
		appId: process.env.PROD_FIREBASE_APP_ID || "",
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


const newlifeMediaBuckets: Record<string, any> = {
	"eu-dev": `https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
	"eu-sit": `https://eu-sit-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
	"eu-prod": `https://eu-prod-creator-api-cdn.s3.eu-west-1.amazonaws.com`, // images/${sizer}${src}
};

const newlifeWebsocketsServers: Record<string, any> = {
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
export const newlifeBaseUrl = newlifeBaseUrls[stage];
export const newlifeMediaBucket = newlifeMediaBuckets[stage];
export const newlifeWebsocketsServer = newlifeWebsocketsServers[stage];
export const stripeKey = stripeKeys[stage];

export const config = {
	settings: {
		firebaseConfig,
		newlife: {
			baseUrl: newlifeBaseUrl,
			mediaBucket: newlifeMediaBucket,
			websocketsServer: newlifeWebsocketsServer,
		},
		routing: {
			routeAccessLevels: ROUTE_ACCESS_LEVELS
		},
		stripe: {
			publicKey: stripeKey
		}
	},
	routes: {
		useDefaultRoutes: true,
		overrides: {},
		noBackButton: ["/explore"],
		defaultRoute: {
			condition: state => !state.api.auth.authorized,
			defaultLocation: _state => "/"
		}
	},
	components: {
		layout: {
			Layout: Layout as GenericComponent,
			TopMenu: TopMenu as GenericComponent,
			Header: Header as GenericComponent
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
			premiumDomains: true
		}
	}
};

export type Configuration<T = {}> = typeof config & T;
export type PartialConfiguration<T = {}> = PartialDeep<Configuration<T>>;
