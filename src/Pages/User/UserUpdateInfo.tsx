import { NLView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import Form from "antd/lib/form";

const UserUpdateInfo: NLView<{ embedded: boolean | undefined }> = ({ embedded }) => {
  return (
    <Form.Item hidden={embedded} style={{ display: "flex", alignItems: "end", textAlign: "end" }}>
      <ProgressButton actionName="api.user.update" type="primary" htmlType="submit" progressText="Updating info...">
        Save
      </ProgressButton>
    </Form.Item>
  );
};

export default UserUpdateInfo;
