import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContentLayout } from "../../Components/ContentLayout";
import Form from "antd/lib/form";
import { DatePicker, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { ProgressButton } from "../../Components/ProgressButton";
import { useActions } from "../../overmind";
import { useParams } from "react-router-dom";
const NewProposal = () => {
    const [form] = useForm();
    const actions = useActions();
    const { daoOwner } = useParams();
    return _jsxs(ContentLayout, { children: [_jsx("p", { className: "super-size font-variant-none", style: { marginBottom: "40px" }, children: "new proposal" }), _jsxs(Form, { name: "new-proposal-form", form: form, onFinish: (val) => actions.newcoin.daoCreateProposal({
                    ...val,
                    vote_start: val.vote_start.format("YYYY-MM-DDTHH:m:ss"),
                    vote_end: val.vote_end.format("YYYY-MM-DDTHH:m:ss"),
                    dao_owner: daoOwner
                }), wrapperCol: { span: 24 }, autoComplete: "off", children: [_jsx(Form.Item, { name: "title", label: "Provide a title for your proposal", children: _jsx(Input, { placeholder: "title" }) }), _jsx(Form.Item, { name: "vote_start", children: _jsx(DatePicker, { format: "YYYY-MM-DDTHH:m:ss", showTime: true, placeholder: "Vote start date" }) }), _jsx(Form.Item, { name: "vote_end", children: _jsx(DatePicker, { showTime: true, placeholder: "Vote end date" }) }), _jsx(Form.Item, { children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "whitelist", children: "whitelist" }), _jsx(Select.Option, { value: "feature", children: "feature request" }), _jsx(Select.Option, { value: "org", children: "org improvement" }), _jsx(Select.Option, { value: "general", children: "other" })] }) }), _jsx(Form.Item, { name: "summary", children: _jsx(Input.TextArea, { placeholder: "Explain your proposal to the community!" }) }), _jsx(Form.Item, { name: "url", label: "", children: _jsx(Input, { placeholder: "link" }) }), _jsx(Form.Item, { name: "dao-check", valuePropName: "checked", wrapperCol: { offset: 0, span: 24 }, children: _jsx(RowCheckbox, { children: _jsx("p", { className: "paragraph-2r", style: { margin: 0 }, children: "I am fostering community health with my proposal" }) }) }), _jsx(Form.Item
                    // hidden={embedded}
                    , { 
                        // hidden={embedded}
                        wrapperCol: { offset: 8, span: 16 }, children: _jsx(ProgressButton, { actionName: "api.proposal.create", type: "primary", htmlType: "submit", children: "Share Proposal" }) })] })] });
};
export default NewProposal;
//# sourceMappingURL=NewProposal.js.map