export declare type WSState = {
    socket: WebSocket | null;
    toggle: (token: string) => void;
    url: string;
};
declare const _default: (upd: (token: string) => string) => WSState;
export default _default;
//# sourceMappingURL=effects.d.ts.map