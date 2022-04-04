"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
// import { ArgsProps } from "antd/lib/notification";
const showNotification = ({ effects }, { message, duration }) => {
    effects.ux.message.info(message, duration);
};
exports.default = {
    actions: {
        showNotification,
    },
    effects: {
        notification: antd_1.notification,
        message: antd_1.message,
    },
};
//# sourceMappingURL=index.js.map