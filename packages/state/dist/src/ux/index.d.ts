import { Action } from "../state";
declare const _default: {
    actions: {
        showNotification: Action<{
            message: string;
            duration?: number;
        }, void>;
    };
    effects: {
        notification: import("antd/lib/notification").NotificationApi;
        message: import("antd/lib/message").MessageApi;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map