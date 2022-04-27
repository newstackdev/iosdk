"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodCreateModal = exports.MoodCreate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lodash_1 = require("lodash");
const overmind_1 = require("../../overmind");
const constants_1 = require("../../constants");
const ProgressButton_1 = require("../../Components/ProgressButton");
const RowCheckbox_1 = require("../../Components/RowCheckbox");
const AddFolder_1 = require("../../Components/Icons/AddFolder");
const CrossCircle_1 = require("../../Components/Icons/CrossCircle");
const MoodCreate = ({ onCreated, setIsCreated }) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const history = (0, react_router_dom_1.useHistory)();
    const [errMsg, setErrMsg] = (0, react_1.useState)("");
    const [moodMode, setMoodMode] = (0, react_1.useState)(false);
    const [moods, setMoods] = (0, react_1.useState)([]);
    const [post, setPost] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
        (async () => {
            const mr = await state.api.client.user.moodsList({
                id: state.api.auth.user?.id || "",
                page: "0",
            });
            setMoods(mr.data.value);
        })();
    }, []);
    const onFinish = async (values) => {
        console.log("Success:", values);
        try {
            const p = await actions.api.mood.create({ mood: values });
            onCreated && onCreated(p);
            setIsCreated(true);
        }
        catch (ex) {
            setErrMsg((0, lodash_1.get)(ex, "error.errorMessage.details") ||
                (0, lodash_1.get)(ex, "message") ||
                "unknown error");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(form_1.default, { hidden: moodMode, name: "basic", 
            // labelCol={{ span: 6 }}
            wrapperCol: { span: 24 }, initialValues: { remember: true }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", className: "text-center", style: { display: "block" }, children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center header-2", children: "Create a folder" }), errMsg && (0, jsx_runtime_1.jsx)("div", { children: errMsg }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "title", rules: [
                        {
                            required: true,
                            message: "Please input a title",
                        },
                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "title" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { required: true, name: "description", rules: [
                        {
                            required: true,
                            message: "A couple of words here please",
                        },
                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "description" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { required: false, name: "stakeToAccess", children: (0, jsx_runtime_1.jsx)(antd_1.Input
                    // disabled
                    , { 
                        // disabled
                        title: "Minimum amount of creator coin stake a user needs to access this folder", placeholder: "minimum stake in creator coin to access" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { required: false, name: "action", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: true, title: "Upcoming feature", placeholder: "action" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "doMint", valuePropName: "checked", children: (0, jsx_runtime_1.jsx)(RowCheckbox_1.RowCheckbox, { disabled: true, title: "Upcoming feature", children: "Create a Newcoin NFT collection" }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "license", rules: [
                        { required: false, message: "Please pick a license" },
                    ], children: (0, jsx_runtime_1.jsx)(antd_1.Select, { defaultValue: constants_1.LICENSES[0][1], children: constants_1.LICENSES.map((l) => ((0, jsx_runtime_1.jsx)(antd_1.Select.Option, { value: l[1], children: l[0] }))) }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { label: "", className: "text-center", children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.mood.create", progressText: "Creating mood...", type: "primary", htmlType: "submit", children: "Create" }) })] }) }));
};
exports.MoodCreate = MoodCreate;
const MoodCreateModal = ({ setIsCreated, onCreated }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), visible: isOpen, onOk: () => setIsOpen(false), onCancel: () => setIsOpen(false), footer: false, className: "nl-white-box-modal", children: (0, jsx_runtime_1.jsx)(exports.MoodCreate, { onCreated: (m) => { setIsOpen(false); onCreated && onCreated(m); }, setIsCreated: setIsCreated }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: "120px" }, children: (0, jsx_runtime_1.jsx)(AddFolder_1.AddFolder, { setIsOpen: setIsOpen }) }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-1r", style: { opacity: 0 }, children: "add folder" })] })] }));
};
exports.MoodCreateModal = MoodCreateModal;
//# sourceMappingURL=MoodCreate.js.map