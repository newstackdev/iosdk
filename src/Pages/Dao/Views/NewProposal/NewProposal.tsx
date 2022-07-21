import { Col, DatePicker, Form, Input, Row, Select } from "antd-latest";
import { ContentLayout } from "../../../../Components/ContentLayout";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { RowCheckbox } from "../../../../Components/RowCheckbox";
import { SearchWidget } from "../../../Search/SearchWidget";
import { useActions } from "../../../../overmind";
import { useEffect, useState } from "react";
import { useForm } from "antd-latest/lib/form/Form";
import { useParams } from "react-router-dom";
import moment from "moment";

const { RangePicker } = DatePicker;

const NewProposal = () => {
  const [form] = useForm();
  const actions = useActions();
  const { daoOwner } = useParams<{ daoOwner: string }>();
  const proposalType = Form.useWatch("proposal_type", form);
  const [showWhitelist, setShowWhitelist] = useState(false);
  const whitelistSelection = Form.useWatch("whitelist_selection", form);
  const [tx, setTx] = useState("");
  const [proposalCreated, setProposalCreated] = useState(false);

  const whiteListProposalCreate = async (val: { vote_dates }) => {
    // const voteStart = moment(val.vote_dates[0]);
    const voteEnd = moment(val.vote_dates[1]);
    const res = await actions.newcoin.daoCreateWhitelistProposal({
      ...val,
      vote_start: moment().add("2", "minutes").utc().format("YYYY-MM-DDTHH:mm:ss"),
      vote_end: voteEnd.utc().format("YYYY-MM-DDTHH:mm:ss"),
      dao_owner: daoOwner,
      user: whitelistSelection,
    });
    const success = !!res.TxID_createDaoProposal;
    if (success) {
      setTx(res["TxID_createDaoProposal"]);
      setProposalCreated(true);
    }
  };

  const proposalCreate = async (val: { vote_dates; summary }) => {
    const voteStart = moment(val.vote_dates[0]);
    const voteEnd = moment(val.vote_dates[1]);
    const res = await actions.newcoin.daoCreateProposal({
      ...val,
      summary: val.summary + "#" + proposalType,
      vote_start: voteStart.add(1, "minutes").utc().format("YYYY-MM-DDTHH:mm:ss"),
      vote_end: voteEnd.utc().format("YYYY-MM-DDTHH:mm:ss"),
      dao_owner: daoOwner,
    });
    const success = !!res.TxID_createDaoProposal;
    if (success) {
      setTx(res["TxID_createDaoProposal"]);
      setProposalCreated(true);
    }
  };

  const changeFormView = () => {
    if (proposalType == "whitelist") {
      setShowWhitelist(true);
    } else setShowWhitelist(false);
  };

  useEffect(() => changeFormView(), [proposalType]);

  return (
    <ContentLayout>
      <Form
        name="new-proposal-form"
        form={form}
        onFinish={proposalType == "whitelist" ? whiteListProposalCreate : proposalCreate}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        initialValues={{
          vote_start: moment().add(2, "minute").seconds(0),
          vote_end: moment().add(5, "minute").seconds(0),
        }}
      >
        {moment().add(1, "day").seconds(0).toISOString().replace(/\..+$/, "")}

        <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
          {!showWhitelist ? "new proposal" : "new member"}
        </p>
        {showWhitelist && <Form.Item name="title">New Member Proposal</Form.Item>}
        {!showWhitelist && (
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="title" />
          </Form.Item>
        )}

        <Form.Item name={"proposal_type"} rules={[{ required: true }]}>
          <Select bordered={false} className={"new-proposal-type-dropdown"} placeholder={"topic"}>
            <Select.Option value="whitelist">new members</Select.Option>
            <Select.Option value="feature">feature request</Select.Option>
            <Select.Option value="improvement">org improvement</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>

        {showWhitelist && (
          <Form.Item name={"whitelist_selection"} rules={[{ required: true }]}>
            <Input placeholder="username of new member" />
            {/* <SearchWidget searchTags={false} showSearch={true} noNavigation={true} /> */}
          </Form.Item>
        )}

        <Row>
          <Form.Item name="vote_dates" rules={[{ required: true }]}>
            <RangePicker
              ranges={{
                "One Week": [moment(), moment().endOf("week")],
                "One Month": [moment(), moment().endOf("month")],
              }}
              format={"YYYY-MM-DD-HH:mm"}
              disabled={[true, false]}
            />
          </Form.Item>
        </Row>

        {!showWhitelist && (
          <Form.Item
            name="summary"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea placeholder="Explain your proposal to the community!" />
          </Form.Item>
        )}

        {!showWhitelist && (
          <Form.Item name="url" label={""} rules={[{ required: true }]}>
            <Input placeholder="link" />
          </Form.Item>
        )}
        <Form.Item name="dao-check" valuePropName="checked" rules={[{ required: true }]} wrapperCol={{ offset: 0, span: 24 }}>
          <RowCheckbox>
            <p className="paragraph-2r" style={{}}>
              I am fostering community health with my proposal
            </p>
          </RowCheckbox>
        </Form.Item>

        <Row justify={"center"}>
          <ProgressButton
            actionName={proposalType == "whitelist" ? "newcoin.daoCreateWhitelistProposal" : "newcoin.daoCreateProposal"}
            type={"primary"}
            progressText="Sharing..."
            htmlType="submit"
          >
            Share Proposal
          </ProgressButton>
        </Row>

        <NewcoinRecept
          tx={tx}
          visible={proposalCreated}
          onDone={() => actions.routing.historyPush({ location: `/dao/${daoOwner}/proposals` })}
        >
          <h1 className={"view-proposal-vote-h1"}>Congratulations! </h1>
          <p className={"view-proposal-vote-p"}>You Created a proposal and shared it to the {daoOwner} DAO!</p>
        </NewcoinRecept>
      </Form>
      <Col className={"u-margin-top-large new-proposal-note"}>
        <Row justify={"center"}>
          <p>
            {" "}
            Note: A fee of 1000 NCO tokens is charged by the smart contract. Fees will be returned to the user once the proposal
            receives 2% votes out of total supply.
          </p>
        </Row>
        <Row className={"u-margin-top-large"} justify={"center"}>
          <p>learn more here</p>
        </Row>
      </Col>
    </ContentLayout>
  );
};
export default NewProposal;
