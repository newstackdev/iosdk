"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
// import { ArgsProps } from "antd/lib/notification";
const showNotification = ({ effects }, { message, duration }) => {
    effects.ux.message.info(message, duration);
};
const setLayout = ({ state }, { headerShown }) => {
    state.ux.layout.headerShown = headerShown;
};
exports.default = {
    actions: {
        showNotification,
        setLayout
    },
    effects: {
        notification: antd_1.notification,
        message: antd_1.message,
    },
    state: {
        layout: {
            headerShown: true
        }
    }
};
//# sourceMappingURL=index.js.map