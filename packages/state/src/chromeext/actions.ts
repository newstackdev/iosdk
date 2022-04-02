import { Action } from "@newcoin-foundation/core";

export const sendMessage: Action<
  { user: { username?: string } },
  any
> = () => {};
