"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
// import { ArgsProps } from "antd/lib/notification";
var showNotification = function (_a, _b) {
    var effects = _a.effects;
    var message = _b.message, duration = _b.duration;
    effects.ux.message.info(message, duration);
};
exports["default"] = {
    actions: {
        showNotification: showNotification
    },
    effects: {
        notification: antd_1.notification,
        message: antd_1.message
    }
};
