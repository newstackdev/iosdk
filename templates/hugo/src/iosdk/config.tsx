import { ROUTE_ACCESS_LEVELS } from "@newstackdev/iosdk/dist/overmind/routing/state";
import { config as baseConfig } from "@newstackdev/iosdk/dist/config";

// import { Explore } from "./Pages/Explore";

import { get } from "lodash";

const currentHost =
	window.location.hostname === "localhost" ?
		process.env.REACT_APP_IOSDK_APP_PROD_HOST || "" :
		window.location.hostname;

const stages: Record<string, string> = {
	[process.env.REACT_APP_IOSDK_APP_DEV_HOST || ""]: "eu-dev",
	[process.env.REACT_APP_IOSDK_APP_SIT_HOST || ""]: "eu-sit",
	[process.env.REACT_APP_IOSDK_APP_PROD_HOST || ""]: "eu-prod"
};

const stage = stages[currentHost];

const apiBaseUrls: Record<string, string> = {
	"eu-dev": "https://api-eu-dev.newgra.ph/v1",
	"eu-sit": "",
	"eu-prod": "https://api.newgra.ph/v1", // upcoming
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

export const themeConfig = {
    ...baseConfig,
	env: {
		stage,
		env: (stage || "").split(/-/)[1]
	},
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
        newsafe: {
            currentHost
		},
    }
}