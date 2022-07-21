import { message, notification } from "antd";
// import { ArgsProps } from "antd/lib/notification";
const showNotification = ({ effects }, { message, duration }) => {
    effects.ux.message.info(message, duration);
};
const setLayout = ({ state }, { headerShown }) => {
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
//# sourceMappingURL=index.js.map