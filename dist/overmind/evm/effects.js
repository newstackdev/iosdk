"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignedMessage = exports.connect = exports.initWeb3 = void 0;
const web3_1 = __importDefault(require("web3"));
let web3js = null;
const ethereum = window.ethereum;
let account_address = "";
const initWeb3 = () => {
    if (!web3js) {
        web3js = new web3_1.default(ethereum);
    }
    ;
};
exports.initWeb3 = initWeb3;
(0, exports.initWeb3)();
const connect = async () => {
    const r = await web3js?.givenProvider.request({ method: 'eth_requestAccounts' });
    await ethereum.enable();
    account_address = r.toString();
    console.log("account:", r);
};
exports.connect = connect;
const sendSignedMessage = async () => {
    // const msg = await web3js?.eth.sign(web3js.utils.sha3('test') as string, account_address);
    const m = {
        collectionAddress: "100",
        nftIndex: "10",
        timestamp: Date.now(),
        address: account_address
    };
    const payload = JSON.stringify(m);
    const signature = await web3js?.eth.personal.sign(payload, account_address, "");
    console.log(JSON.stringify({ payload, signature }));
    // , function (err, signature) {
    //     console.log("Error: " +err);
    //     console.log("Signature: "+ signature);  // But maybe do some error checking. :-)
    // });
};
exports.sendSignedMessage = sendSignedMessage;
//# sourceMappingURL=effects.js.map