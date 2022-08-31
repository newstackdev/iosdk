export declare const initWeb3: () => void;
export declare const connect: () => Promise<string>;
export declare const sendSignedMessage: (acc_address: string, username: string) => Promise<{
    payload: string;
    encryptedPayload: string;
}>;
export declare const checkConnection: () => Promise<boolean>;
export declare const getCurrentAccount: () => Promise<string>;
