import {
	UserCreateRequest,
	UserUpdateRequest,
} from "@newlife/newlife-creator-client-api";
import { Button, Checkbox, Col, Input, Row } from "antd";
import Form from "antd/lib/form";
import { EmbeddableControl, NLView } from "../../types";
import { useActions, useAppState, useEffects } from "../../overmind";
import { FieldData } from "rc-field-form/lib/interface";
import { useForm } from "antd/lib/form/Form";
import { PictureWallFormItem } from "../../Components/PicturesWall";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { omit } from "lodash";
import { useEffect } from "react";
import { ContentImage } from "../../Components/Image";
import { ProgressButton } from "../../Components/ProgressButton";
import { ContentLayout } from "../../Components/ContentLayout";
import UserUpdateInfo from "./UserUpdateInfo";
import UserUpdateHeader from "./UserUpdateHeader";
import { LogOut } from "../../Components/Icons/LogOut";

export const UserUpdate: NLView<
	EmbeddableControl & { hideUsername?: boolean; noRouing?: boolean }
> = ({
	// hideUsername,
	// noRouing,
	embedded,
	setNext,
}) => {
	const state = useAppState();
	const actions = useActions();
	const effects = useEffects();

	const [form] = useForm();

	useEffect(() => {
			actions.api.user.getCurrent();
	}, []);

	const onFinish = async (values: UserUpdateRequest & { file: any }) => {
		console.log("Success:", values);
		await actions.api.user.update({
			user: omit(values, "file"),
			file: values.file?.fileList[0],
		});
		actions.routing.historyPush({ location: "/my/profile" });
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
		effects.ux.message.error(JSON.stringify(errorInfo));
	};

		const sf = state.api.auth.user || {};

	return (
		<div className="section-divider">
			<Form
				name="basic"
				wrapperCol={{ span: 24 }}
				className="text-center"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				initialValues={sf}
			>
				<ContentLayout
					header={<UserUpdateHeader />}
					info={<UserUpdateInfo embedded={embedded} />}
					isPost
				>
					<div className="post-create-form-width">
						<h2
							className="text-center header-5"
							style={{ margin: "0 auto 20px auto" }}
						>
							My links
						</h2>
						{/* <Form.Item
							name="lastName"
							rules={[
								{
									required: true,
									message: "Please input your last name!",
								},
							]}
						>
							<Input placeholder="last name" />
						</Form.Item> */}

						<Form.Item name="website">
							<Input placeholder="website" />
						</Form.Item>
						<Form.Item
							name="instagram"
							rules={[
								{
									required: true,
									message: "Your instagram please",
								},
							]}
						>
							<Input placeholder="instagram" />
						</Form.Item>
						<Form.Item
							// label="Tumblr"
							name="tumblr"
						>
							<Input placeholder="tumblr" />
						</Form.Item>
						<Form.Item name="soundcloud">
							<Input placeholder="soundcloud" />
						</Form.Item>
						<Form.Item name="twitter">
							<Input placeholder="twitter" />
						</Form.Item>
						<Form.Item
							name="consentEmail"
							valuePropName="checked"
							wrapperCol={{ offset: 0, span: 24 }}
						>
							<RowCheckbox>
								<p
									className="paragraph-2r"
									style={{ marginLeft: "20px" }}
								>
									I agree to receive relevant communication
								</p>
							</RowCheckbox>
						</Form.Item>
						<Form.Item
							name="consentTestgroup"
							valuePropName="checked"
							wrapperCol={{ offset: 0, span: 24 }}
						>
							<RowCheckbox>
								<p
									className="paragraph-2r"
									style={{ marginLeft: "20px" }}
								>
									I would like to take part in the test group
								</p>
							</RowCheckbox>
						</Form.Item>
						<span style={{ display: "flex", alignItems: "center" }}>
							<span style={{ marginRight: "20px" }}>
								Sign Out
							</span>
							<LogOut />
						</span>
					</div>
				</ContentLayout>
			</Form>
		</div>
	);
};

// function logout() {
//     throw new Error("Function not implemented.");
// }
