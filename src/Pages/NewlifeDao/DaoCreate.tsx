import { ContentLayout } from "../../Components/ContentLayout";
import Form from "antd/lib/form";
import { Button, Checkbox, Input, notification, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { ProgressButton } from "../../Components/ProgressButton";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { useActions, useAppState } from "src/overmind";

const DaoCreate = () => {
	const [form] = useForm();
	const actions = useActions();
	const state = useAppState();

	return <ContentLayout>
		<p
			className="super-size font-variant-none"
			style={{ marginBottom: "40px" }}
		>
			Create your own DAO
		</p>
		<Form
			name="new-proposal-form"
			form={form}
			onFinish={v => actions.newcoin.daoCreate(v)
				.finally(_ => actions.routing.historyPush({ location: "/dao/owner/" + state.api.auth.user?.username }))}
			wrapperCol={{ span: 24 }}
			autoComplete="off"
		>
            <div style={{marginBottom: 20}}>Describe your dao. The description is stored onchain and cannot be changed.</div>
			<Form.Item name="descr">
				<Input.TextArea />
			</Form.Item>
			<Form.Item
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<ProgressButton
					actionName="api.newcoin.daoCreate"
					type="primary"
					htmlType="submit"
                    progressText="Creating your dao"
				>
					Create DAO
				</ProgressButton>
			</Form.Item>
		</Form>

	</ContentLayout>
};

export default DaoCreate;