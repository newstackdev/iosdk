import { NCO_BlockchainAPI } from "@newfound8ion/newcoin-sdk";
export declare const newcoin: NCO_BlockchainAPI;
export declare const newcoinProxy: NCO_BlockchainAPI;
export declare const newcoinProxyProd: NCO_BlockchainAPI;
export declare const hyperion: {
    get: (query: string) => Promise<Response>;
    post: (body: any) => void;
};
