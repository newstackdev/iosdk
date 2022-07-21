export declare type WSState = {
    socket: WebSocket | null;
    toggle: (wsServer: string, token: string) => void;
    url: string;
};
declare const _default: (upd: (wsServer: string, token: string) => string) => WSState;
export default _default;
