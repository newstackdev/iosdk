import { IContext } from "overmind";
// import { firebaseRequestToken, firebaseVerifyPhone, historyPush, logout, newlifeAuthorize, onInitializeOvermind, onRouteChange, routeAfterAuth, setBreadcrumbs, setFbUser, setPreloginRoute, wrapPromise } from './actions';

import { namespaced } from "overmind/config";

// import configuration from './config';
import { Configuration, PartialConfiguration, config as defaultConfig } from "../config";
import { merge } from "lodash";
import { standardModules } from "./standardModules";

// export type
export const config = (cfg: PartialConfiguration) => {
  const _cfg = { state: merge({}, defaultConfig, cfg) } as {
    state: Configuration;
  };
  return namespaced({
    ...standardModules,
    config: _cfg,
  });
};

export type State = ReturnType<typeof config>["state"];
export type Context = IContext<ReturnType<typeof config>>;
