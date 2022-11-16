export type WSState = {
  socket: WebSocket | null;
  toggle: (token: string) => void;
  url: string;
};

export default ({ url, key }: { url: string; key: string }) => {
  const state = {
    socket: null,
  } as WSState;

  return {
    query(q: string) {},
  };
};
