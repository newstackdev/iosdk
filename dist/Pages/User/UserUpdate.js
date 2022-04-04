"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const overmind_1 = require("../../overmind");
const Form_1 = require("antd/lib/form/Form");
const RowCheckbox_1 = require("../../Components/RowCheckbox");
const lodash_1 = require("lodash");
const react_1 = require("react");
const ContentLayout_1 = require("../../Components/ContentLayout");
const UserUpdateInfo_1 = __importDefault(require("./UserUpdateInfo"));
const UserUpdateHeader_1 = __importDefault(require("./UserUpdateHeader"));
const LogOut_1 = require("../../Components/Icons/LogOut");
const UserUpdate = ({ 
// hideUsername,
// noRouing,
embedded, setNext, }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const effects = (0, overmind_1.useEffects)();
    const [form] = (0, Form_1.useForm)();
    (0, react_1.useEffect)(() => {
        actions.api.user.getCurrent();
    }, []);
    const onFinish = async (values) => {
        console.log("Success:", values);
        await actions.api.user.update({
            user: (0, lodash_1.omit)(values, "file"),
            file: values.file?.fileList[0],
        });
        actions.routing.historyPush({ location: "/my/profile" });
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        effects.ux.message.error(JSON.stringify(errorInfo));
    };
    const sf = state.api.auth.user || {};
    return ((0, jsx_runtime_1.jsx)("div", { className: "section-divider", children: (0, jsx_runtime_1.jsx)(form_1.default, { name: "basic", wrapperCol: { span: 24 }, className: "text-center", form: form, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", initialValues: sf, children: (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { header: (0, jsx_runtime_1.jsx)(UserUpdateHeader_1.default, {}), info: (0, jsx_runtime_1.jsx)(UserUpdateInfo_1.default, { embedded: embedded }), isPost: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "post-create-form-width", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center header-5", style: { margin: "0 auto 20px auto" }, children: "My links" }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "website", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "website" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "instagram", rules: [
                                {
                                    required: true,
                                    message: "Your instagram please",
                                },
                            ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "instagram" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item
                        // label="Tumblr"
                        , { 
                            // label="Tumblr"
                            name: "tumblr", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "tumblr" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "soundcloud", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "soundcloud" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "twitter", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "twitter" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "consentEmail", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I agree to receive relevant communication" }) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "consentTestgroup", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", style: { marginLeft: "20px" }, children: "I would like to take part in the test group" }) }) }), (0, jsx_runtime_1.jsxs)("span", { style: { display: "flex", alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("span", { style: { marginRight: "20px" }, children: "Sign Out" }), (0, jsx_runtime_1.jsx)(LogOut_1.LogOut, {})] })] }) }) }) }));
};
exports.UserUpdate = UserUpdate;
//# sourceMappingURL=UserUpdate.js.map