import Form from "antd/lib/form";
import { ProgressButton } from "../../Components/ProgressButton";
import { NLView } from "../../types";

const UserUpdateInfo: NLView<{ embedded: boolean | undefined }> = ({
	embedded,
}) => {
	return (
		<Form.Item
			hidden={embedded}
			style={{ height: "100%", display: "flex", alignItems: "end" }}
		>
			<ProgressButton
				actionName="api.user.update"
				type="primary"
				htmlType="submit"
				progressText="Updating info..."
			>
				Save
			</ProgressButton>
		</Form.Item>
	);
};

export default UserUpdateInfo;
