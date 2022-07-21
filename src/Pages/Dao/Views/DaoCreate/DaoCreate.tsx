import { Button, Input } from "antd";
import { ContentLayout } from "../../../../Components/ContentLayout";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { useActions, useAppState } from "../../../../overmind";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import Form from "antd/lib/form";

const DaoCreate = () => {
  const [form] = useForm();
  const actions = useActions();
  const state = useAppState();
  const [tx, setTx] = useState<string>("");

  return (
    <ContentLayout>
      <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
        {" "}
        Create your own DAO
      </p>
      <Form
        name="new-proposal-form"
        form={form}
        onFinish={(v) =>
          actions.newcoin.daoCreate(v).then(({ TxID_createDao }: { TxID_createDao: string }) => setTx(TxID_createDao))
        }
        wrapperCol={{ span: 24 }}
        autoComplete="off"
      >
        <div style={{ marginBottom: 20 }}>Describe your dao. The description is stored onchain and cannot be changed.</div>
        <Form.Item name="descr">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <ProgressButton actionName="api.newcoin.daoCreate" type="primary" htmlType="submit" progressText="Creating your dao">
            Create DAO
          </ProgressButton>
        </Form.Item>
      </Form>

      <NewcoinRecept
        onDone={() => actions.routing.historyPush({ location: "/dao/" + state.api.auth.user?.username })}
        tx={tx}
        visible={!!tx}
      >
        <p>Congratulations, your own DAO is live!</p>
        <br />
        <p>Start by creating a whitelist proposal for the first person you would like to participate in DAO decisions.</p>
        <p className="nl-vertical-space-self">Are they still not on Newlife? Click below to invite them!</p>
        <p className="text-center nl-vertical-space-self">
          <Button onClick={() => actions.routing.historyPush({ location: "/user/invite" })} className="stroke-btn-green">
            Invite a friend
          </Button>
        </p>
      </NewcoinRecept>
    </ContentLayout>
  );
};

export default DaoCreate;
