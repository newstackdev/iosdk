import { Button, Input } from "antd";
import Form from "antd/lib/form";
import { NLView } from "../../../../types";
import { useActions, useAppState } from "../../../../overmind";
import { AUTH_FLOW_STATUS } from "../../../../overmind/auth/state";
import { CrossCircleErr } from "../../../User/UserCreate";
import { layout } from "../../Auth";
import { FormInstance } from "antd";
import "./styles/Form.less";

const PhoneForm: NLView<{
	setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>> | undefined;
	embedded: boolean | undefined;
	phoneForm: FormInstance<any>;
	isErrorSubmit: boolean | undefined;
	handleCallBack: ((value: any) => any) | undefined;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	error: boolean;
}> = ({
	setIsErrorSubmit,
	embedded,
	phoneForm,
	isErrorSubmit,
	setError,
	error,
}) => {
	const state = useAppState();
	const actions = useActions();

	return (
		<Form
			form={phoneForm}
			hidden={state.auth.status !== AUTH_FLOW_STATUS.ANONYMOUS}
			{...layout}
			name="basic"
			initialValues={{ phone: "+420111111111" }} // +420111111111
			onFinish={({ phone }) => {
				actions.firebase.requestToken({ phone });
				// phoneForm.resetFields();
			}}
			// onFinishFailed={onFinishFailed}
			autoComplete="off"
			className="text-center"
		>
			<Form.Item
				name="phone"
				rules={[
					{
						required: true,
						message: "The phone number is invalid.",
						pattern: new RegExp(
							"^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,7}$"
						),
					},
				]}
				className="phone-form-height"
			>
				<Input
					className="text-center"
					placeholder="enter phone number"
					suffix={<CrossCircleErr />}
					onChange={() => {
						phoneForm
							.validateFields()
							.then(() => {
								setIsErrorSubmit
									? setIsErrorSubmit(false)
									: setError(false);
							})
							.catch((e) => {
								console.log(e.errorFields?.length);
								if (e.errorFields?.length) {
									setIsErrorSubmit
										? setIsErrorSubmit(true)
										: setError(true);
								}
							});
					}}
				/>
			</Form.Item>

			<div className="app-control-surface" hidden={embedded}>
				<Button
					type="primary"
					htmlType="submit"
					className={
						isErrorSubmit || error ? "disabled-submit-button" : ""
					}
				>
					Send verification
				</Button>
			</div>
		</Form>
	);
};

export default PhoneForm;
