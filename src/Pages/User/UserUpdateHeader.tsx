import { Col, Input, Row } from "antd";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import Form from "antd/lib/form";
import SupportBox from "../../Components/SupportBox";
import { ContentImage } from "../../Components/Image";
import { PictureWallFormItem } from "../../Components/PicturesWall";
import { useAppState } from "../../overmind";

const UserUpdateHeader = () => {
	const state = useAppState();
	const sf = state.api.auth.user || {};

	return (
		<div className="post-create-header-wrapper">
			<div className="post-back-arrow" style={{ padding: "0px 20px" }}>
				{/* <LargeArrowBack /> */}
			</div>
			<Row
				style={{
					flex: 1,
					justifyContent: "space-between",
					flexDirection: "column",
				}}
			>
				<Row style={{ flexDirection: "column" }}>
					<h2
						className="text-center header-5"
						style={{ margin: "0 auto 20px auto" }}
					>
						Edit Profile
					</h2>
					<Row justify="center" className="full-width-only">
						{/* <Col span={6}>
							<Form.Item>
								<ContentImage {...sf} neverHide={true} />
							</Form.Item>
						</Col> */}
						<Col span={18}>
							<Form.Item
								// label="Avatar"
								name="file"
							>
								<PictureWallFormItem uploadText="Upload avatar" />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item>
						<Input readOnly={true} placeholder="your domain" />
					</Form.Item>
					<Form.Item
						name="displayName"
						rules={[
							{
								required: true,
								message:
									"Display name must start with a letter, be 3 - 9 chars or longer and contain only latin letters, digits and dots.",
							},
						]}
					>
						<Input placeholder="display name" />
					</Form.Item>
					<Form.Item name="description">
						<Input.TextArea placeholder="bio" />
					</Form.Item>
					<Form.Item
						name="email"
						required={true}
						rules={[
							{
								required: true,
								message: "Please enter your email",
							},
						]}
					>
						<Input placeholder="email" />
					</Form.Item>
				</Row>
				<Row style={{ flex: 1, flexDirection: "column" }}>
					<SupportBox />
				</Row>
				<br />
				<br />
				<br />
				<br />
			</Row>
		</div>
	);
};

export default UserUpdateHeader;
