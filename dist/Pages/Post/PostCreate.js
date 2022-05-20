import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Input, Row, Tooltip, } from "antd";
import Form from "antd/lib/form";
import { useCallback, useEffect, useState } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useActions, useAppState, useEffects } from "../../overmind";
import { LICENSES } from "../../constants";
import { SelectMood } from "../../Components/SelectMood";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { AddButton } from "../../Components/Icons/AddButton";
import Switch from "react-switch";
import { Info } from "../../Components/Icons/Info";
import { useForm } from "antd/lib/form/Form";
import PostCreateHeader from "./PostCreateHeader";
import PostCreateInfo from "./PostCreateInfo";
import { ExitButton } from "../../Components/Icons/ExitButton";
import Modal from "antd/lib/modal/Modal";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { NFTLargeIcon } from "../../Components/Icons/NFTLargeIcon";
import Avatar from "antd/lib/avatar/avatar";
import { ContentImage } from "../../Components/Image";
import { ContentPreview } from "src/Components/ContentPreview";
const initialLicense = { name: LICENSES[0][0], value: LICENSES[0][1] };
const mintNTFcolor = {
    white: "#FCFCF3",
    purple: "#c46ef7",
    green: "#b3ff00",
    default: "#888888",
};
export const PostCreate = (props) => {
    const state = useAppState();
    const actions = useActions();
    const effects = useEffects();
    const [form] = useForm();
    const [mintConfirmationOpen, setMintConfirmationOpen] = useState(false);
    const [selectedLicense, setSelectedLicense] = useState({
        name: LICENSES[0][0],
        value: LICENSES[0][1],
    });
    const [isLicense, setIsLicense] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [moodMode, setMoodMode] = useState(false);
    const [contentType, setContentType] = useState("");
    const [mintNFTswitch, setMintNFTswitch] = useState(false);
    const [previewPostSwitch, setPreviewPostSwitch] = useState(false);
    const [content, setContent] = useState("");
    const user = state.api.auth.user;
    // balance check
    const balances = state.newcoin.account?.acc_balances || [];
    const ncoBalance = Number((balances[0] || "").replace(/ NCO$/, "")) || 0;
    // const [moods, setMoods] = useState<MoodReadResponse[]>([]);
    const [post, setPost] = useState({});
    const moods = state.api.auth.moods || [];
    actions.routing.setTitle("Create Post");
    useEffect(() => {
        actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setErrMsg(get(ex, "error.errorMessage.details") ||
                get(ex, "message") ||
                "unknown error");
        }
    };
    const onChangeContentHandler = useCallback((e) => {
        if (contentType === "text/plain") {
            setContent(e.currentTarget.value);
            if (isEmpty(e.currentTarget.value)) {
                setPreviewPostSwitch(false);
            }
        }
    }, [contentType]);
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const gtfooh = (v) => {
        actions.api.post.attachToMoods({ moods: v.moods, post });
        actions.routing.historyPush({ location: `/post/${post.id}` });
        setMoodMode(false);
    };
    return (_jsxs("div", { children: [_jsx(Form, { hidden: moodMode || !post, name: "basic", form: form, initialValues: { remember: true, licence: "BY-0" }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", children: _jsx(ContentLayout, { isPost: true, customClass: "post-create-layout", header: _jsx(PostCreateHeader, { contentType: contentType, setContentType: setContentType }), info: _jsx(PostCreateInfo, { selectedLicense: selectedLicense, setSelectedLicense: setSelectedLicense, isLicense: isLicense, setIsLicense: setIsLicense, mintConfirmationOpen: mintConfirmationOpen, ncoBalance: ncoBalance }), children: _jsxs("div", { className: "post-create-form-width", children: [_jsx(Form.Item, { required: true, name: "title", rules: [
                                    {
                                        required: true,
                                        message: "A couple of words here please",
                                    },
                                ], children: _jsxs(Row, { children: [_jsx("p", { className: "header-5", style: { marginBottom: "20px" }, children: "Title" }), _jsx(Input, { placeholder: "A few words\uD83C\uDF19" })] }) }), _jsx(Form.Item, { required: true, name: contentType ? "content" : "description", rules: [
                                    {
                                        required: contentType === "content" ? true : false,
                                        message: "A couple of words here please",
                                    },
                                ], children: _jsxs(Row, { children: [_jsx("p", { className: "header-5", style: { marginBottom: "20px" }, children: contentType ? "Post" : "Description" }), _jsx(Input.TextArea, { placeholder: contentType ? "A new idea?✨" : "What's it about?✨", onChange: onChangeContentHandler, value: content })] }) }), contentType === "text/plain" ? (_jsxs(_Fragment, { children: [_jsxs(Row, { align: "middle", style: {
                                            marginBottom: "10px",
                                        }, children: [_jsx("p", { className: "header-5", children: "Preview post" }), _jsx(Tooltip, { placement: "right", title: "Preview post with possible embed content. First URL in the post will be embedded if possible. Currently supporting youtube and twitter.", children: _jsx("span", { children: _jsx(Info, { color: ncoBalance === 0
                                                            ? mintNTFcolor.purple
                                                            : mintNTFcolor.white }) }) })] }), _jsx(Row, { children: _jsx(Switch, { onChange: () => setPreviewPostSwitch((p) => !p), checked: previewPostSwitch, checkedIcon: _jsx(_Fragment, {}), uncheckedIcon: _jsx(_Fragment, {}), onColor: ncoBalance === 0
                                                ? mintNTFcolor.purple
                                                : mintNTFcolor.green, offColor: ncoBalance === 0
                                                ? mintNTFcolor.purple
                                                : mintNTFcolor.default, disabled: isEmpty(content) }) }), previewPostSwitch && (_jsx(ContentPreview, { content: content, embedContentHeight: "200", embedContentWidth: "350" }))] })) : (false), _jsxs(Form.Item, { name: "doMint", children: [_jsxs(Row, { align: "middle", style: {
                                            marginBottom: "10px",
                                        }, children: [_jsx("p", { className: "header-5", children: "Mint NFT" }), _jsx(Tooltip, { placement: "right", title: ncoBalance === 0
                                                    ? "You do not have enough balance to mint your NFT! Top up!"
                                                    : "Mint your content as an NFT on the Newcoin Network! For now, you can't trade this!", overlayClassName: ncoBalance === 0 ? "tooltip-zero-balance" : "", children: _jsx("span", { children: _jsx(Info, { color: ncoBalance === 0
                                                            ? mintNTFcolor.purple
                                                            : mintNTFcolor.white }) }) })] }), _jsx(Switch, { onChange: () => setMintNFTswitch((p) => !p), checked: mintNFTswitch, checkedIcon: _jsx(_Fragment, {}), uncheckedIcon: _jsx(_Fragment, {}), onColor: ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.green, offColor: ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.default, disabled: ncoBalance === 0 ? true : false })] }), _jsxs(Form.Item, { name: "license", children: [_jsxs(Row, { align: "middle", style: {
                                            marginBottom: "10px",
                                        }, children: [_jsx("p", { className: "header-5", children: "Creative License" }), _jsx(Tooltip, { placement: "right", title: "Share your content with No Rights Reserved with Creative Commons.", children: _jsx("span", { children: _jsx(Info, { color: mintNTFcolor.white }) }) })] }), !isLicense && selectedLicense ? (_jsxs(Row, { className: "licence-box", children: [_jsx("p", { className: "paragraph-2b", style: { width: "90%" }, children: selectedLicense.name }), _jsx("span", { onClick: () => {
                                                    // setSelectedLicense({ name: "");
                                                    setIsLicense(true);
                                                }, style: { display: "flex" }, children: _jsx(ExitButton, {}) })] })) : (_jsx("span", { onClick: () => {
                                            setSelectedLicense(initialLicense);
                                            setIsLicense(true);
                                        }, style: { display: "flex" }, children: _jsx(AddButton, {}) }))] })] }) }) }), _jsxs(Modal, { visible: mintConfirmationOpen, onOk: () => setMintConfirmationOpen(false), onCancel: () => setMintConfirmationOpen(false), footer: false, 
                //@ts-ignore
                // getContainer={() =>
                // 	document.getElementById("basic")
                // }
                className: "nl-white-box-modal", closeIcon: _jsx(CrossCircle, {}), children: [_jsxs(Row, { style: { width: "100%" }, children: [_jsx(Col, { style: { marginRight: "20px" }, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: "avatar-image-top-creators" }) }), _jsxs(Col, { children: [_jsx("p", { className: "paragraph-1r", children: "your NFT" }), _jsx("p", { className: "paragraph-1b", children: user?.username })] })] }), _jsxs(Row, { children: [_jsx(Col, { style: { marginBottom: "20px" }, children: _jsx("p", { className: "header-3", children: "Ready to mint!" }) }), _jsx(Col, { style: { marginBottom: "20px" }, children: _jsx("p", { className: "paragraph-2r", children: "You are about to mint your NFT on Newcoin Protocol!" }) }), _jsxs(Col, { children: [_jsx("p", { className: "paragraph-2r", children: "Summary:" }), _jsx("p", { className: "paragraph-2r", children: "1087 $GNCO" }), _jsx("p", { className: "paragraph-2r", children: "\u2014 5% creator fee" }), _jsx("p", { className: "paragraph-2r", children: "\u2014 3% DAO fee" })] })] }), _jsx(Row, { justify: "space-between", children: _jsx(NFTLargeIcon, {}) }), _jsx(ProgressButton, { actionName: "api.post.create", type: "primary", progressText: "Creating post...", 
                        // htmlType="submit"
                        onClick: () => {
                            form.submit();
                        }, className: !selectedLicense ? "disabled-submit-button" : "", disabled: !selectedLicense || ncoBalance === 0 ? true : false, children: "Mint" })] }), _jsxs(Form, { className: "app-main-full-width", hidden: !moodMode, onFinish: gtfooh, children: [_jsx(Form.Item, { name: "moods", style: { marginBottom: "40px" }, children: _jsx(SelectMood, { moods: moods }) }), _jsx(Form.Item, { label: "", wrapperCol: { offset: 0, span: 24 }, className: "text-right", children: _jsx(ProgressButton, { actionName: "api.post.create", type: "primary", htmlType: "submit", progressText: "Creating post...", children: "Share" }) })] })] }));
};
//# sourceMappingURL=PostCreate.js.map