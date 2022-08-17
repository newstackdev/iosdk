import { message, notification } from "antd";
// import { ArgsProps } from "antd/lib/notification";
const showNotification = ({ effects }, { message, duration }) => {
    effects.ux.message.info(message, duration);
};
const setLayout = ({ state }, { headerShown }) => {
    state.ux.layout.headerShown = headerShown;
};
const setFooterVisibility = ({ state }, { footerShown }) => {
    state.ux.layout.footerShown = footerShown;
};
export default {
    actions: {
        showNotification,
        setLayout,
        setFooterVisibility,
    },
    effects: {
        notification,
        message,
    },
    state: {
        layout: {
            headerShown: true,
            footerShown: true,
        },
    },
};
//# sourceMappingURL=index.js.map