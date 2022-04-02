import { Action } from "@newcoin-foundation/core";
import { notification, message } from "antd";
// import { ArgsProps } from "antd/lib/notification";

const showNotification: Action<{ message: string; duration?: number }> = (
  { effects },
  { message, duration }
) => {
  effects.ux.message.info(message, duration);
};

export default {
  actions: {
    showNotification,
  },
  effects: {
    notification,
    message,
  },
};
