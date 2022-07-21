import { Action } from "../../types";
import { message, notification } from "antd";
// import { ArgsProps } from "antd/lib/notification";

const showNotification: Action<{ message: string; duration?: number }> = ({ effects }, { message, duration }) => {
  effects.ux.message.info(message, duration);
};

const setLayout: Action<{ headerShown: boolean }> = ({ state }, { headerShown }) => {
  state.ux.layout.headerShown = headerShown;
};

export default {
  actions: {
    showNotification,
    setLayout,
  },
  effects: {
    notification,
    message,
  },
  state: {
    layout: {
      headerShown: true,
    },
  },
};
