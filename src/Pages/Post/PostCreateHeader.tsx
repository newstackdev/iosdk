import { Col, Row } from "antd";
import Form from "antd/lib/form";
import { PicturesWall } from "../../Components/PicturesWall";
import { NLView } from "../../types";
import { Text } from "../../Components/Icons/Text";
import { Image } from "../../Components/Icons/Image";
import { Video } from "../../Components/Icons/Video";
import SupportBox from "../../Components/SupportBox";

const PostCreateHeader: NLView<{
	contentType: string;
	setContentType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ contentType, setContentType }) => {
	return (
		<div className="post-create-header-wrapper">
			<Row
				style={{
					flex: 1,
					justifyContent: "space-between",
					flexDirection: "column",
				}}
			>
				<Row>
					<h2
						className="text-center header-5"
						style={{ margin: "0 auto 20px auto" }}
					>
						Upload node
					</h2>
				</Row>
				<Row style={{ flex: 1, flexDirection: "column" }}>
					{/* <Form.Item name="contentType">
					<Radio.Group
						defaultValue={""}
						onChange={(v) => setContentType(v.target.value)}
						value={contentType}
					>
						<Radio
							defaultChecked={true}
							value=""
							checked={contentType === "" ? true : false}
						>
							Media
						</Radio>
						<Radio
							value="text/plain"
							checked={contentType === "" ? false : true}
						>
							Text
						</Radio>
					</Radio.Group>
				</Form.Item> */}
					{!contentType ? (
						<Form.Item
							name="file"
							valuePropName="fileList"
							getValueFromEvent={(ev) => {
								return ev?.target?.files || [];
							}}
							rules={[
								{
									required: !contentType,
									message: "What are you uploading?",
								},
							]}
						>
							<div style={{ margin: "auto" }}>
								<PicturesWall
									name="uploadNode"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									// setContentType={setContentType}
									contentType={contentType}
								>
									<span
										style={{
											marginRight: "20px",
											cursor: "pointer",
										}}
										onClick={(e) => {
											e.stopPropagation();
											setContentType("text/plain");
										}}
									>
										<Text />
									</span>
									<span style={{ marginRight: "20px" }}>
										<Image />
									</span>
									<Video />
								</PicturesWall>
							</div>
						</Form.Item>
					) : (
						<Form.Item name="content">
							{/* TODO add name prop to the title description */}
							{/* <TextArea /> */}
							<div
								style={{ margin: "auto" }}
								className="content-uploader"
							>
								<PicturesWall>
									<span
										onClick={(e) => {
											e.stopPropagation();
										}}
									>
										<Text />
										{/* <div style={{ marginTop: 8 }}>{this.props.uploadText || "Upload"}</div> */}
									</span>
									<div
										onClick={(e) => {
											e.stopPropagation();
											setContentType("");
										}}
										style={{
											bottom: 0,
											left: 0,
											position: "absolute",
										}}
									>
										<span
											style={{
												marginRight: "20px",
												cursor: "pointer",
											}}
										>
											<Image />
										</span>
										<span
											style={{
												cursor: "pointer",
											}}
										>
											<Video />
										</span>
									</div>
								</PicturesWall>
							</div>
						</Form.Item>
					)}
					<SupportBox />
				</Row>

				{/* <Form.Item
				name="title"
				rules={[
					{
						required: true,
						message: "Please input a title",
					},
				]}
		>
			<Input placeholder="title" />
		</Form.Item> */}

				{/* <IndeterminateProgress inProgress={state.indicators.specific["api.post.create"]} />
		</Form.Item>
	</Form>
	<Form
		className="app-main-full-width"
		hidden={!moodMode}
		onFinish={gtfooh}
	>
		<Form.Item label="">
			Save to your folders
	</Form.Item>
	<Form.Item name="moods">
			<SelectMood moods={moods} />
		</Form.Item>

		<Form.Item
			label=""
			wrapperCol={{ offset: 0, span: 24 }}
			className="text-center"
		>
		<MoodCreateModal />
		<ProgressButton actionName="api.post.create" type="primary" htmlType="submit">
				Submit
		</ProgressButton>
		</Form.Item>
	</Form>
	{/* <SelectMood moods={moods} /> */}
			</Row>
		</div>
	);
};

export default PostCreateHeader;
