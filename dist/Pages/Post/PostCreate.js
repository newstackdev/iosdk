"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const form_1 = __importDefault(require("antd/lib/form"));
const react_1 = require("react");
const lodash_1 = require("lodash");
const overmind_1 = require("../../overmind");
const constants_1 = require("../../constants");
const SelectMood_1 = require("../../Components/SelectMood");
const ContentLayout_1 = require("../../Components/ContentLayout");
const ProgressButton_1 = require("../../Components/ProgressButton");
const AddButton_1 = require("../../Components/Icons/AddButton");
const react_switch_1 = __importDefault(require("react-switch"));
const Info_1 = require("../../Components/Icons/Info");
const Form_1 = require("antd/lib/form/Form");
const PostCreateHeader_1 = __importDefault(require("./PostCreateHeader"));
const PostCreateInfo_1 = __importDefault(require("./PostCreateInfo"));
const ExitButton_1 = require("../../Components/Icons/ExitButton");
const Modal_1 = __importDefault(require("antd/lib/modal/Modal"));
const CrossCircle_1 = require("../../Components/Icons/CrossCircle");
const NFTLargeIcon_1 = require("../../Components/Icons/NFTLargeIcon");
const avatar_1 = __importDefault(require("antd/lib/avatar/avatar"));
const Image_1 = require("../../Components/Image");
const initialLicense = { name: constants_1.LICENSES[0][0], value: constants_1.LICENSES[0][1] };
const mintNTFcolor = {
    white: "#FCFCF3",
    purple: "#c46ef7",
    green: "#b3ff00",
    default: "#888888",
};
const PostCreate = (props) => {
    const state = (0, overmind_1.useAppState)();
    const actions = (0, overmind_1.useActions)();
    const effects = (0, overmind_1.useEffects)();
    const [form] = (0, Form_1.useForm)();
    const [mintConfirmationOpen, setMintConfirmationOpen] = (0, react_1.useState)(false);
    const [selectedLicense, setSelectedLicense] = (0, react_1.useState)({
        name: constants_1.LICENSES[0][0],
        value: constants_1.LICENSES[0][1],
    });
    const [isLicense, setIsLicense] = (0, react_1.useState)(false);
    const [errMsg, setErrMsg] = (0, react_1.useState)("");
    const [moodMode, setMoodMode] = (0, react_1.useState)(false);
    const [contentType, setContentType] = (0, react_1.useState)("");
    const [mintNFTswitch, setMintNFTswitch] = (0, react_1.useState)(false);
    const user = state.api.auth.user;
    // balance check
    const balances = state.newcoin.account?.acc_balances || [];
    const ncoBalance = Number((balances[0] || "").replace(/ NCO$/, "")) || 0;
    // const [moods, setMoods] = useState<MoodReadResponse[]>([]);
    const [post, setPost] = (0, react_1.useState)({});
    const moods = state.api.auth.moods || [];
    actions.routing.setTitle("Create Post");
    (0, react_1.useEffect)(() => {
        actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
    }, []);
    const onFinish = async (values) => {
        console.log("Success:", values);
        if (mintNFTswitch && !mintConfirmationOpen)
            return setMintConfirmationOpen(true);
        setMintConfirmationOpen(false);
        try {
            if (!contentType) {
                const f = values.file[0];
                // const contentType = mime.lookup(extname(f.));
                if (!f.type) {
                    return effects.ux.message.warning("Unrecognized/unsupported content type. Upload something else.");
                }
            }
            const postForm = {
                ...values,
                contentType,
                doMint: mintNFTswitch ? "true" : "",
                license: selectedLicense.value,
            };
            const p = await actions.api.post.create({ postForm });
            if (!p)
                return;
            setMoodMode(true);
            setPost(p);
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
    const gtfooh = (v) => {
        actions.api.post.attachToMoods({ moods: v.moods, post });
        actions.routing.historyPush({ location: `/post/${post.id}` });
        setMoodMode(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "section-divider", children: [(0, jsx_runtime_1.jsx)(form_1.default, { hidden: moodMode || !post, name: "basic", form: form, initialValues: { remember: true, licence: "BY-0" }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", children: (0, jsx_runtime_1.jsx)(ContentLayout_1.ContentLayout, { isPost: true, header: (0, jsx_runtime_1.jsx)(PostCreateHeader_1.default, { contentType: contentType, setContentType: setContentType }), info: (0, jsx_runtime_1.jsx)(PostCreateInfo_1.default, { selectedLicense: selectedLicense, setSelectedLicense: setSelectedLicense, isLicense: isLicense, setIsLicense: setIsLicense, mintConfirmationOpen: mintConfirmationOpen, ncoBalance: ncoBalance }), children: (0, jsx_runtime_1.jsxs)("div", { className: "post-create-form-width", children: [(0, jsx_runtime_1.jsx)(form_1.default.Item, { required: true, name: "title", rules: [
                                    {
                                        required: true,
                                        message: "A couple of words here please",
                                    },
                                ], children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)("p", { className: "header-5", style: { marginBottom: "20px" }, children: "Title" }), (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "A few words\uD83C\uDF19" })] }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { required: true, name: contentType ? "content" : "description", rules: [
                                    {
                                        required: contentType === "content"
                                            ? true
                                            : false,
                                        message: "A couple of words here please",
                                    },
                                ], children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)("p", { className: "header-5", style: { marginBottom: "20px" }, children: contentType ? "Post" : "Description" }), (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { placeholder: contentType
                                                ? "A new idea?✨"
                                                : "What's it about?✨" })] }) }), (0, jsx_runtime_1.jsxs)(form_1.default.Item, { name: "doMint", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", style: {
                                            marginBottom: "10px",
                                        }, children: [(0, jsx_runtime_1.jsx)("p", { className: "header-5", children: "Mint NFT" }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { placement: "right", title: ncoBalance === 0
                                                    ? "You do not have enough balance to mint your NFT! Top up!"
                                                    : "Mint your content as an NFT on the Newcoin Network! For now, you can't trade this!", overlayClassName: ncoBalance === 0
                                                    ? "tooltip-zero-balance"
                                                    : "", children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Info_1.Info, { color: ncoBalance === 0
                                                            ? mintNTFcolor.purple
                                                            : mintNTFcolor.white }) }) })] }), (0, jsx_runtime_1.jsx)(react_switch_1.default, { onChange: () => setMintNFTswitch((p) => !p), checked: mintNFTswitch, checkedIcon: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), uncheckedIcon: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), onColor: ncoBalance === 0
                                            ? mintNTFcolor.purple
                                            : mintNTFcolor.green, offColor: ncoBalance === 0
                                            ? mintNTFcolor.purple
                                            : mintNTFcolor.default, disabled: ncoBalance === 0 ? true : false })] }), (0, jsx_runtime_1.jsxs)(form_1.default.Item, { name: "license", children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", style: {
                                            marginBottom: "10px",
                                        }, children: [(0, jsx_runtime_1.jsx)("p", { className: "header-5", children: "Creative License" }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { placement: "right", title: "Share your content with No Rights Reserved with Creative Commons.", children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Info_1.Info, { color: mintNTFcolor.white }) }) })] }), !isLicense && selectedLicense ? ((0, jsx_runtime_1.jsxs)(antd_1.Row, { className: "licence-box", children: [(0, jsx_runtime_1.jsx)("p", { className: "paragraph-2b", style: { width: "90%" }, children: selectedLicense.name }), (0, jsx_runtime_1.jsx)("span", { onClick: () => {
                                                    // setSelectedLicense({ name: "");
                                                    setIsLicense(true);
                                                }, style: { display: "flex" }, children: (0, jsx_runtime_1.jsx)(ExitButton_1.ExitButton, {}) })] })) : ((0, jsx_runtime_1.jsx)("span", { onClick: () => {
                                            setSelectedLicense(initialLicense);
                                            setIsLicense(true);
                                        }, style: { display: "flex" }, children: (0, jsx_runtime_1.jsx)(AddButton_1.AddButton, {}) }))] })] }) }) }), (0, jsx_runtime_1.jsxs)(Modal_1.default, { visible: mintConfirmationOpen, onOk: () => setMintConfirmationOpen(false), onCancel: () => setMintConfirmationOpen(false), footer: false, 
                //@ts-ignore
                // getContainer={() =>
                // 	document.getElementById("basic")
                // }
                className: "nl-white-box-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, { style: { width: "100%" }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { style: { marginRight: "20px" }, children: (0, jsx_runtime_1.jsx)(avatar_1.default, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { ...user }), className: "avatar-image-top-creators" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { children: [(0, jsx_runtime_1.jsx)("p", { className: "paragraph-1r", children: "your NFT" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-1b", children: user?.username })] })] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { style: { marginBottom: "20px" }, children: (0, jsx_runtime_1.jsx)("p", { className: "header-3", children: "Ready to mint!" }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { style: { marginBottom: "20px" }, children: (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "You are about to mint your NFT on Newcoin Protocol!" }) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, { children: [(0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "Summary:" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "1087 $GNCO" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "\u2014 5% creator fee" }), (0, jsx_runtime_1.jsx)("p", { className: "paragraph-2r", children: "\u2014 3% DAO fee" })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Row, { justify: "space-between", children: (0, jsx_runtime_1.jsx)(NFTLargeIcon_1.NFTLargeIcon, {}) }), (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.post.create", type: "primary", progressText: "Creating post...", 
                        // htmlType="submit"
                        onClick: () => {
                            form.submit();
                        }, className: !selectedLicense ? "disabled-submit-button" : "", disabled: !selectedLicense || ncoBalance === 0 ? true : false, children: "Mint" })] }), (0, jsx_runtime_1.jsxs)(form_1.default, { className: "app-main-full-width", hidden: !moodMode, onFinish: gtfooh, children: [(0, jsx_runtime_1.jsx)(form_1.default.Item, { name: "moods", style: { marginBottom: "40px" }, children: (0, jsx_runtime_1.jsx)(SelectMood_1.SelectMood, { moods: moods }) }), (0, jsx_runtime_1.jsx)(form_1.default.Item, { label: "", wrapperCol: { offset: 0, span: 24 }, className: "text-right", children: (0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, { actionName: "api.post.create", type: "primary", htmlType: "submit", progressText: "Creating post...", children: "Share" }) })] })] }));
};
exports.PostCreate = PostCreate;
//# sourceMappingURL=PostCreate.js.map