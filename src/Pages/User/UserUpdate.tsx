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

export const UserUpdate: NLView<
	EmbeddableControl & { hideUsername?: boolean; noRouing?: boolean }
> = ({
	// hideUsername,
	// noRouing,
	embedded,
	setNext
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
			<ContentLayout>
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
					{/* <Form.Item name="id" /> */}
					<Row justify="center" gutter={12} className="full-width-only">
						<Col span={8}>
							<Form.Item>
								<ContentImage {...sf} neverHide={true} />
							</Form.Item>
						</Col>
						<Col span={14}>
							<Form.Item
								// label="Avatar"
								name="file"
							>
								<PictureWallFormItem uploadText="Upload avatar" />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name="username">
						<Input readOnly={true} />
					</Form.Item>
					<Form.Item
						name="firstName"
						rules={[
							{
								required: true,
								message:
									"Username must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
							},
						]}
					>
						<Input placeholder="name" />
					</Form.Item>
					<Form.Item
						name="lastName"
						rules={[
							{ required: true, message: "Please input your last name!" },
						]}
					>
						<Input placeholder="last name" />
					</Form.Item>
					<Form.Item
						name="email"
						required={true}
						rules={[{ required: true, message: "Please enter your email" }]}
					>
						<Input placeholder="email" />
					</Form.Item>
					<Form.Item name="description">
						<Input.TextArea placeholder="bio" />
					</Form.Item>
					<Form.Item name="website">
						<Input placeholder="website" />
					</Form.Item>
					<Form.Item
						name="instagram"
						rules={[{ required: true, message: "Your instagram please" }]}
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
						name="consentPrivacyPolicy"
						valuePropName="checked"
						wrapperCol={{ offset: 0, span: 24 }}
					>
						<RowCheckbox>
							<p className="paragraph-2r" style={{ margin: 0 }}>
								I agree to Newlife's privacy policy
							</p>
						</RowCheckbox>
					</Form.Item>
					<Form.Item
						name="consentEmail"
						valuePropName="checked"
						wrapperCol={{ offset: 0, span: 24 }}
						rules={[
							{
								required: true,
							},
						]}
					>
						<RowCheckbox>
							<p className="paragraph-2r" style={{ margin: 0 }}>
								I consent to email communications
							</p>
						</RowCheckbox>
					</Form.Item>
					<Form.Item
						name="consentTestgroup"
						valuePropName="checked"
						wrapperCol={{ offset: 0, span: 24 }}
					>
						<RowCheckbox>
							<p className="paragraph-2r" style={{ margin: 0 }}>
								I'd like to join the beta group!
							</p>
						</RowCheckbox>
					</Form.Item>
				</Form>
			</ContentLayout>
		);
	};

// function logout() {
//     throw new Error("Function not implemented.");
// }
