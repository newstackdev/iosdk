import { ROUTE_ACCESS_LEVELS } from "@newstackdev/iosdk/dist/overmind/routing/state";
import { config as baseConfig } from "@newstackdev/iosdk/dist/config";

import { Home } from "./Pages/Home";
// import { Explore } from "./Pages/Explore";

import { get } from "lodash";

const currentHost =
	window.location.hostname === "localhost" ?
		process.env.REACT_APP_IOSDK_APP_DEV_HOST || "":
		window.location.hostname;

const stages: Record<string, string> = {
	[process.env.REACT_APP_IOSDK_APP_DEV_HOST || ""]: "eu-dev",
	[process.env.REACT_APP_IOSDK_APP_SIT_HOST || ""]: "eu-sit",
	[process.env.REACT_APP_IOSDK_APP_PROD_HOST || ""]: "eu-prod"
};

const stage = stages[currentHost];

const apiBaseUrls: Record<string, string> = {
	"eu-dev": "https://api-eu-dev.newlife.io/creator",
	"eu-sit": "https://api-eu-sit.newlife.io/creator",
	"eu-prod": "https://api-eu-prod.newlife.io/creator",
};

const getStr = (o: any) => (path: string) =>
	get(o, path) || "";

const getEnv = getStr(process.env);

const mediaBuckets: Record<string, any> = {
	"eu-dev": `https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
	"eu-sit": `https://eu-sit-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
	"eu-prod": `https://eu-prod-creator-api-cdn.s3.eu-west-1.amazonaws.com`, // images/${sizer}${src}
};

const websocketServers: Record<string, any> = {
	"eu-dev": `wss://wsapi-eu-dev.newlife.io/creator`,
	"eu-sit": `wss://wsapi-eu-sit.newlife.io/creator`,
	"eu-prod": `wss://wsapi-eu-prod.newlife.io/creator`,
};


export const APP_DOMAIN = process.env.REACT_APP_IOSDK_APP_DOMAIN || "";

export const newlifeBaseUrl = apiBaseUrls[stage];
export const newlifeMediaBucket = mediaBuckets[stage];
export const newlifeWebsocketsServer = websocketServers[stage];

export const apiBaseUrl = apiBaseUrls[stage];

// Customize here
export const config = {
	...baseConfig,

	settings: {
		newgraph: {
			baseUrl: apiBaseUrl,
		},
		newcoin: {
			daoDomain: APP_DOMAIN,
			 // ignore for now
			daoId: "43",
			poolId: ""
		},
		newlife: {
			baseUrl: newlifeBaseUrl,
			mediaBucket: newlifeMediaBucket,
			websocketsServer: newlifeWebsocketsServer,
		},
		app: {
			currentHost,
			name: process.env.REACT_APP_IOSDK_APP_NAME || APP_DOMAIN
		},
		routing: {
			routeAccessLevels: {
				...ROUTE_ACCESS_LEVELS,
				"/": (st, _globalState) => true, // apps should temporarily use the second arg
				"/explore": (st) => true, 
				"/counter": (st) => true, 
			} 
		},
		// indicators let us know when an action is in progress
		// setting indicators for all actions for progress is too costly and may become recursive, we filter using this setting
		indicators: {
			isWatchable: (actionName: string) => /^(api|lists|auth|newgraphApplication|unsid)/.test(actionName),
		  }
		},
	routes: {
		// override built-in routes here
		overrides: {
			"/explore": Home,
			"/": Home
		}
	}
};