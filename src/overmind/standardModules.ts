
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

    newcoin

    // ...(custom ? { custom } : {})
};