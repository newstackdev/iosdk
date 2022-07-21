import api from "./api";
import auth from "./auth";
import chromeext from "./chromeext";
import evm from "./evm";
import firebase from "./firebase";
import flows from "./flows";
import indicators from "./indicators";
import lists from "./lists";
import newcoin from "./newcoin";
import payments from "./payments";
import routing from "./routing";
import ux from "./ux";
import websockets from "./websockets";

export const standardModules = {
  indicators,
  auth,
  routing,
  firebase,
  websockets,
  payments,
  evm,

  ux,
  chromeext,

  api,
  lists,
  flows,

  newcoin,

  // ...(custom ? { custom } : {})
};
