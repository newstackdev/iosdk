import { WSState } from "./effects";
import { Action } from "@newcoin-foundation/core";
declare type WsEvent = {
    type: "modelUpdated";
    model: "user" | "post" | "mood";
    payload: any;
    updated: string;
} | {
    type: "newcoin";
    updated: string;
    payload: {
        message: string;
        amount: number;
    };
};
declare type ActivityStreamEvent = {
    title: string;
    link: string;
    description: string;
    seen?: boolean;
    original: any;
};
declare type NewcoinEvent = {
    payload: {
        message: "stake_received" | "stake_sent";
        txid: string;
    };
    recipient: string;
    type: string;
    updated: string;
    original: any;
};
declare const actions: {
    toggleWebSocket: Action<undefined, void>;
    processIncoming: Action<{
        msg: any;
    }, void>;
    processIncomingModelUpdated: Action<{
        event: WsEvent & {
            type: "modelUpdated";
        };
    }, void>;
    processIncomingNewcoin: Action<{
        event: WsEvent;
    }, void>;
};
declare type WebsocketsState = {
    state: {
        socket: WebSocket | null;
        url: string;
        messages: {
            incoming: any[];
            activityStream: ActivityStreamEvent[];
            newcoin: NewcoinEvent[];
        };
    };
    actions: typeof actions;
    effects: {
        newlife: WSState;
    };
};
declare const _default: WebsocketsState;
export default _default;
//# sourceMappingURL=index.d.ts.map