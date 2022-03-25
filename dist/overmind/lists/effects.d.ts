export declare type WSState = {
    socket: WebSocket | null;
    toggle: (token: string) => void;
    url: string;
};
declare const _default: ({ url, key }: {
    url: string;
    key: string;
}) => {
    query(q: string): void;
};
export default _default;
