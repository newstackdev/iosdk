import { Home } from "./Pages/Home";
import { themeConfig } from "./iosdk/config"
import { ROUTE_ACCESS_LEVELS } from "@newstackdev/iosdk/dist/overmind/routing/state";

// Customize here. You may override the built in config but this will affect some iosdk-provided functionality
export const config = {
	...themeConfig,
	settings: {
		...themeConfig.settings,
		routeAccessLevels: {
			...ROUTE_ACCESS_LEVELS,
			"/": (st, _globalState) => true, // advanced conditions on when the state is allowed
			"/explore": (st) => true,
			"/counter": (st) => true,
		},
		routing: {
			defaults: {
				onAuth: "/home"
			},
		},
		// indicators let us know when an overmind action is in progress for ux and advanced logic
		// setting indicators for all actions for progress is too costly and may become recursive, we filter using this setting
		// to track custom app actions add more items in the regex
		indicators: {
			isWatchable: (actionName: string) => /^(api|lists|auth|newgraphApplication|newsafe)/.test(actionName),
		},
		app: {
			name: process.env.REACT_APP_IOSDK_APP_NAME || process.env.REACT_APP_IOSDK_APP_DOMAIN_PROD || process.env.REACT_APP_IOSDK_APP_DOMAIN_PROD || ""
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