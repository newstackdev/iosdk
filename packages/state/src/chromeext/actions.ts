import { Action } from "../state";

export const sendMessage: Action<
  { user: { username?: string } },
  any
> = () => {};
