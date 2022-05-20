import { ContentLayout } from "../../Components/ContentLayout";
import Form from "antd/lib/form";
import { Button, Checkbox, DatePicker, Input, notification, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { ProgressButton } from "../../Components/ProgressButton";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { useActions } from "src/overmind";
import { Moment } from "moment";
import { useParams } from "react-router-dom";

const NewProposal = () => {
	const [form] = useForm();
	const actions = useActions();
	const { daoOwner } = useParams<{ daoOwner: string, id: string }>();

	return <ContentLayout>
		<p
			className="super-size font-variant-none"
			style={{ marginBottom: "40px" }}
		>
			new proposal
		</p>
		<Form
			name="new-proposal-form"
			form={form}
			onFinish={(val: { vote_start: Moment, vote_end: Moment }) =>
				actions.newcoin.daoCreateProposal({
					...val,
					vote_start: val.vote_start.format("YYYY-MM-DDTHH:m:ss"),
					vote_end: val.vote_end.format("YYYY-MM-DDTHH:m:ss"),
					dao_owner: daoOwner
				})}
			wrapperCol={{ span: 24 }}
			autoComplete="off"
		>
			<Form.Item name="title" label={"Provide a title for your proposal"}>
				<Input placeholder="title" />
			</Form.Item>
			{/* <Form.Item name="topic" label={"Select the topic of your proposal"}>
				<Input placeholder="topic" />
			</Form.Item> */}
			<Form.Item name="vote_start">
				<DatePicker format={"YYYY-MM-DDTHH:m:ss"} showTime placeholder="Vote start date" />
			</Form.Item>
			<Form.Item name="vote_end">
				<DatePicker showTime placeholder="Vote end date" />
			</Form.Item>
			<Form.Item>
				<Select>
					<Select.Option value="whitelist">whitelist</Select.Option>
					<Select.Option value="feature">feature request</Select.Option>
					<Select.Option value="org">org improvement</Select.Option>
					<Select.Option value="general">other</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="summary">
				<Input.TextArea placeholder="Explain your proposal to the community!" />
			</Form.Item>
			<Form.Item name="url" label={""}>
				<Input placeholder="link" />
			</Form.Item>

			{/* <Form.Item name="link" label={""}>
				<Input placeholder="maximum reward" />
			</Form.Item> */}
			<Form.Item
				name="dao-check"
				valuePropName="checked"
				wrapperCol={{ offset: 0, span: 24 }}
			>
				<RowCheckbox>
					<p className="paragraph-2r" style={{ margin: 0 }}>
						I am fostering community health with my proposal
					</p>
				</RowCheckbox>
			</Form.Item>
			<Form.Item
				// hidden={embedded}
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<ProgressButton
					actionName="api.proposal.create"
					type="primary"
					htmlType="submit"
				>
					Share Proposal
				</ProgressButton>
			</Form.Item>
		</Form>

	</ContentLayout>
};

export default NewProposal;