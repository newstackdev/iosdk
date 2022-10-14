import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, Modal, Select } from "antd";
import { get } from "lodash";
import { useActions, useAppState } from "../../overmind";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "antd/lib/form";
import { AddFolder } from "../../Components/Icons/AddFolder";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { LICENSES } from "../../constants";
import { ProgressButton } from "../../Components/ProgressButton";
import { RowCheckbox } from "../../Components/RowCheckbox";
export const MoodCreate = ({ onCreated, setIsCreated }) => {
    const state = useAppState();
    const actions = useActions();
    const history = useHistory();
    const [errMsg, setErrMsg] = useState("");
    const [moodMode, setMoodMode] = useState(false);
    const [moods, setMoods] = useState([]);
    const [post, setPost] = useState({});
    useEffect(() => {
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
            setErrMsg(get(ex, "error.errorMessage.details") || get(ex, "message") || "unknown error");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (_jsx(_Fragment, { children: _jsxs(Form, { hidden: moodMode, name: "basic", 
            // labelCol={{ span: 6 }}
            wrapperCol: { span: 24 }, initialValues: { remember: true }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off", className: "text-center", style: { display: "block" }, children: [_jsx("h2", { className: "text-center header-2", children: "Create a folder" }), errMsg && _jsx("div", { children: errMsg }), _jsx(Form.Item, { name: "title", rules: [
                        {
                            required: true,
                            message: "Please input a title",
                        },
                    ], children: _jsx(Input, { placeholder: "title", id: "mood-create-title" }) }), _jsx(Form.Item, { required: true, name: "description", rules: [
                        {
                            required: true,
                            message: "A couple of words here please",
                        },
                    ], children: _jsx(Input, { placeholder: "description", id: "mood-create-description" }) }), _jsx(Form.Item, { required: false, name: "stakeToAccess", children: _jsx(Input
                    // disabled
                    , { 
                        // disabled
                        title: "Minimum amount of creator coin stake a user needs to access this folder", placeholder: "minimum stake in creator coin to access" }) }), _jsx(Form.Item, { required: false, name: "action", children: _jsx(Input, { disabled: true, title: "Upcoming feature", placeholder: "action" }) }), _jsx(Form.Item, { name: "doMint", valuePropName: "checked", children: _jsx(RowCheckbox, { disabled: true, title: "Upcoming feature", children: "Create a Newcoin NFT collection" }) }), _jsx(Form.Item, { name: "license", rules: [{ required: false, message: "Please pick a license" }], children: _jsx(Select, { defaultValue: LICENSES[0][1], children: LICENSES.map((l) => (_jsx(Select.Option, { value: l[1], children: l[0] }))) }) }), _jsx(Form.Item, { label: "", className: "text-center", children: _jsx(ProgressButton, { actionName: "api.mood.create", progressText: "Creating mood...", type: "primary", htmlType: "submit", id: "mood-create-submit", children: "Create" }) })] }) }));
};
export const MoodCreateModal = ({ setIsCreated, onCreated }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { closeIcon: _jsx(CrossCircle, {}), visible: isOpen, onOk: () => setIsOpen(false), onCancel: () => setIsOpen(false), footer: false, className: "nl-white-box-modal", children: _jsx(MoodCreate, { onCreated: (m) => {
                        setIsOpen(false);
                        onCreated && onCreated(m);
                    }, setIsCreated: setIsCreated }) }), _jsx(AddFolder, { setIsOpen: setIsOpen, id: "add-folder-button" })] }));
};
//# sourceMappingURL=MoodCreate.js.map