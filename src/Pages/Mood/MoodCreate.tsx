import { Button, Checkbox, Col, Input, Modal, Row, Select, Upload, notification } from "antd";
import { Callback, NLView } from "../../types";
import { FileOutlined } from "@ant-design/icons";
import { MoodCreateRequest, MoodReadResponse, PostCreateRequest, PostReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { PicturesWall } from "../../Components/PicturesWall";
import { get } from "lodash";
import { useActions, useAppState, useEffects } from "../../overmind";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "antd/lib/form";

import { MoodWidget } from "../../Components/MoodWidget";

import { AddFolder } from "../../Components/Icons/AddFolder";
import { Addfolderv2 } from "../../Components/Icons/Addfolderv2";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { LICENSES } from "../../constants";
import { ProgressButton } from "../../Components/ProgressButton";
import { RowCheckbox } from "../../Components/RowCheckbox";

export const MoodCreate: NLView<{
  onCreated?: Callback<MoodReadResponse>;
  setIsCreated?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ onCreated, setIsCreated }) => {
  const state = useAppState();
  const actions = useActions();

  const history = useHistory();

  const [errMsg, setErrMsg] = useState("");
  const [moodMode, setMoodMode] = useState(false);
  const [moods, setMoods] = useState<MoodReadResponse[]>([]);
  const [post, setPost] = useState<PostReadResponse>({});

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);

    (async () => {
      const mr = await state.api.client.user.moodsList({
        id: state.api.auth.user?.id || "",
        page: "0",
      });
      setMoods(mr.data.value as MoodReadResponse[]);
    })();
  }, []);

  const onFinish = async (values: MoodCreateRequest) => {
    console.log("Success:", values);

    try {
      const p = await actions.api.mood.create({ mood: values });

      onCreated && onCreated(p);
      setIsCreated!(true);
    } catch (ex) {
      setErrMsg(get(ex, "error.errorMessage.details") || get(ex, "message") || "unknown error");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        hidden={moodMode}
        name="basic"
        // labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="text-center"
        style={{ display: "block" }}
      >
        <h2 className="text-center header-2">Create a folder</h2>
        {errMsg && <div>{errMsg}</div>}
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Please input a title",
            },
          ]}
        >
          <Input placeholder="title" id="mood-create-title" />
        </Form.Item>

        <Form.Item
          required={true}
          name="description"
          rules={[
            {
              required: true,
              message: "A couple of words here please",
            },
          ]}
        >
          <Input placeholder="description" id="mood-create-description" />
        </Form.Item>
        <Form.Item required={false} name="stakeToAccess">
          <Input
            // disabled
            title="Minimum amount of creator coin stake a user needs to access this folder"
            placeholder="minimum stake in creator coin to access"
          />
        </Form.Item>
        <Form.Item required={false} name="action">
          <Input disabled title="Upcoming feature" placeholder="action" />
        </Form.Item>
        <Form.Item name="doMint" valuePropName="checked">
          {/* <Checkbox/> */}
          <RowCheckbox disabled title="Upcoming feature">
            Create a Newcoin NFT collection
          </RowCheckbox>
        </Form.Item>
        <Form.Item name="license" rules={[{ required: false, message: "Please pick a license" }]}>
          <Select defaultValue={LICENSES[0][1]}>
            {LICENSES.map((l) => (
              <Select.Option value={l[1]}>{l[0]}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="" className="text-center">
          <ProgressButton
            actionName="api.mood.create"
            progressText="Creating mood..."
            type="primary"
            htmlType="submit"
            id="mood-create-submit"
          >
            Create
          </ProgressButton>
        </Form.Item>
      </Form>
    </>
  );
};

export const MoodCreateModal: NLView<{
  setIsCreated?: React.Dispatch<React.SetStateAction<boolean>>;
  onCreated?: Callback<MoodReadResponse>;
}> = ({ setIsCreated, onCreated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        closeIcon={<CrossCircle />}
        visible={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={false}
        className="nl-white-box-modal"
      >
        <MoodCreate
          onCreated={(m) => {
            setIsOpen(false);
            onCreated && onCreated(m);
          }}
          setIsCreated={setIsCreated}
        />
      </Modal>
      <div>
        <div style={{ fontSize: "120px" }} id="add-folder-button">
          <AddFolder setIsOpen={setIsOpen} />
        </div>
        <p className="paragraph-1r" style={{ opacity: 0 }}>
          add folder
        </p>
      </div>
    </>
  );
};
