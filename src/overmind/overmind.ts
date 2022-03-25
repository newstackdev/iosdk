
import { IContext } from 'overmind';
// import { firebaseRequestToken, firebaseVerifyPhone, historyPush, logout, newlifeAuthorize, onInitializeOvermind, onRouteChange, routeAfterAuth, setBreadcrumbs, setFbUser, setPreloginRoute, wrapPromise } from './actions';

import { namespaced } from 'overmind/config'

import auth from "./auth";
import routing from "./routing";
import api from "./api";
import firebase from "./firebase";
import ux from "./ux";
import flows from "./flows";
import indicators from './indicators';
import websockets from './websockets';
import lists from './lists';
import newcoin from './newcoin';
import chromeext from './chromeext';
import payments from './payments';
import evm from './evm';
// import configuration from './config';
import { merge } from 'lodash';
import { config as defaultConfig, Configuration, PartialConfiguration } from "../config";

import { app } from "overmind/app";
// type AppType = typeof import("overmind/app").app;
// const custom = {};

export const config = (cfg: PartialConfiguration) => {
    return namespaced({
        indicators,
        auth,
        routing,
        firebase,
        websockets,
        payments,
        evm,
 
        ux,
        chromeext,
        config: { state: merge({}, defaultConfig, cfg) } as { state: Configuration },
 
        api,
        lists,
        flows,

        newcoin,

        ...app
        // ...(custom ? { custom } : {})
    })

}

export type State = ReturnType<typeof config>["state"];
export type Context = IContext<ReturnType<typeof config>>;

// export const xconfig = { 
//     state,
//     effects: {
//         Firebase,
//         Api,
//         fetch
//     },
//     actions: {
//         onInitializeOvermind,
//         historyPush,
//         firebaseRequestToken,
//         firebaseVerifyPhone,
//         setFbUser,
//         routeAfterAuth,
//         setPreloginRoute,
//         setBreadcrumbs,
//         onRouteChange,
//         wrapPromise,
//         newlifeAuthorize,
//         logout
//     }
//  };
