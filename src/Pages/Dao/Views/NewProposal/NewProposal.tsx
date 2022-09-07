import { Button, DatePicker, Form, Input, Row, Select, Tooltip } from "antd-latest";
import { ContentLayout } from "../../../../Components/ContentLayout";
import { DownArrow } from "../../Components/Icons";
import { GetWhitelistedModal } from "../../Components/Modals/GetWhitelistedModal";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { RowCheckbox } from "../../../../Components/RowCheckbox";
import { SearchWidget } from "../../../Search/SearchWidget";
import { useActions, useAppState } from "../../../../overmind";
import { useCachedDaoWhitelist } from "../../../../hooks/useCached";
import { useForm } from "antd-latest/lib/form/Form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

const NewProposal = () => {
  const state = useAppState();
  const [form] = useForm();
  const actions = useActions();
  const proposalType = Form.useWatch("proposal_type", form);
  const { daoOwner } = useParams<{ daoOwner }>();
  const ownDao = state.api.auth.user?.username === daoOwner;
  const [proposalCreated, setProposalCreated] = useState(false);
  const [customTime, setCustomTime] = useState(false);
  const [voteEnd, setVoteEnd] = useState<any>({});
  const [tx, setTx] = useState("");
  const [autoApprove, setAutoApprove] = useState({ consent: false, id: "" });
  const autoApproveConsentInfo =
    "Since you are the DAO owner, you can choose to approve this proposal on creation. If you'd rather approve this proposal later, leave the box unchecked.";
  const isWhitelisted = ownDao || useCachedDaoWhitelist(daoOwner).rows?.some((user) => user == state.api.auth.user?.username);

  const proposalCreate = async (val: {
    custom_vote_end;
    custom_vote_start;
    title;
    summary;
    proposal_type;
    auto_approve;
    url;
    whitelist_selection;
  }) => {
    const voteStartTime = val.custom_vote_start
      ? val.custom_vote_start
      : moment().add("5", "minutes").utc().format("YYYY-MM-DDTHH:mm:ss");
    const voteEndTime = val.custom_vote_end ? val.custom_vote_end : voteEnd ? voteEnd.time : moment().add("6", "minutes");
    const proposalAction = proposalType == "whitelist" ? "daoCreateWhitelistProposal" : "daoCreateProposal";
    const types = {
      whitelist: {
        user: val.whitelist_selection,
      },
      standard: {
        summary: val.summary + "#" + proposalType,
        url: val.url || "blank",
        title: val.title,
      },
    };
    const payLoad = proposalType == "whitelist" ? types.whitelist : types.standard;
    const res = await actions.newcoin[proposalAction]({
      ...payLoad,
      vote_start: voteStartTime,
      vote_end: voteEndTime,
      dao_owner: daoOwner,
      user: val.whitelist_selection,
    });

    const success = !!res.TxID_createDaoProposal;
    if (success) {
      setTx(res["TxID_createDaoProposal"]);
      setProposalCreated(true);
      if (val.auto_approve) setAutoApprove({ consent: true, id: res.proposal_id });
    }
  };

  const createApprove = async () => {
    proposalType == "whitelist"
      ? await actions.newcoin.daoApproveWhitelistProposal({ dao_owner: daoOwner, proposal_id: autoApprove.id })
      : await actions.newcoin.daoApproveProposal({
          dao_owner: daoOwner,
          proposal_id: autoApprove.id,
        });
    actions.routing.historyPush({ location: `/dao/${daoOwner}/proposals` });
  };

  return (
    <ContentLayout>
      <Form className={"new-proposal-form"} name="new-proposal-form" form={form} onFinish={proposalCreate} autoComplete="off">
        {!isWhitelisted && <GetWhitelistedModal daoOwner={daoOwner} />}
        <Row justify={"center"}>
          <p className="new-proposal-title">{proposalType == "whitelist" ? "new member" : "new proposal"}</p>
        </Row>

        <Form.Item name={"proposal_type"}>
          <Select showArrow={true} bordered={false} defaultValue={"feature"} className={"type-dropdown"} suffixIcon={DownArrow}>
            <Select.Option value="feature">feature request</Select.Option>
            <Select.Option value="whitelist">new members</Select.Option>
            <Select.Option value="org-improvement">org improvement</Select.Option>
          </Select>
        </Form.Item>

        {!(proposalType == "whitelist") && (
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="title" />
          </Form.Item>
        )}

        {proposalType == "whitelist" && (
          <Form.Item name="whitelist_selection" rules={[{ required: true }]}>
            <SearchWidget searchUsers={true} searchTags={false} showSearch={true} noNavigation={true} />
          </Form.Item>
        )}

        <p className={"u-margin-top-large u-margin-bottom-30 paragraph-2b"}>How long is your proposal live for?</p>
        <Row align="middle" className={"vote-time-btns"}>
          <Button
            className={`time-select-btn-${voteEnd.btn == "day" ? "active" : "inactive"}`}
            onClick={() => {
              setVoteEnd({ btn: "day", time: moment().add("1", "day").utc().format("YYYY-MM-DDTHH:mm:ss") });
              customTime && setCustomTime(false);
            }}
          >
            {" "}
            One Day{" "}
          </Button>
          <Button
            className={`time-select-btn-${voteEnd.btn == "week" ? "active" : "inactive"}`}
            onClick={() => {
              setVoteEnd({ btn: "week", time: moment().add("1", "week").utc().format("YYYY-MM-DDTHH:mm:ss") });
              customTime && setCustomTime(false);
            }}
          >
            {" "}
            One Week{" "}
          </Button>
          <Button
            className={`time-select-btn-${voteEnd.btn == "month" ? "active" : "inactive"}`}
            onClick={() => {
              setVoteEnd({ btn: "month", time: moment().add("1", "month").utc().format("YYYY-MM-DDTHH:mm:ss") });
              customTime && setCustomTime(false);
            }}
          >
            {" "}
            One Month{" "}
          </Button>
          <Button
            className={`time-select-btn-${voteEnd.btn == "custom" ? "active" : "inactive"}`}
            onClick={() => {
              setVoteEnd({ btn: "custom", time: null });
              setCustomTime(true);
            }}
          >
            {" "}
            Custom{" "}
          </Button>
        </Row>

        {customTime && (
          <Form.Item name="custom_vote_start">
            <DatePicker showTime className={"new-proposal-custom-time"} placeholder={"Vote Start"} format={"YYYY-MM-DD-HH:mm"} />
          </Form.Item>
        )}

        {customTime && (
          <Form.Item name="custom_vote_end">
            <DatePicker showTime className={"new-proposal-custom-time"} placeholder={"Vote End"} format={"YYYY-MM-DD-HH:mm"} />
          </Form.Item>
        )}

        {!(proposalType == "whitelist") && (
          <Form.Item name="summary" rules={[{ required: true }]}>
            <Input.TextArea className={"new-proposal-summary"} placeholder="Explain your proposal to the community!" />
          </Form.Item>
        )}

        {!(proposalType == "whitelist") && (
          <Form.Item name="url">
            <Input placeholder="link" />
          </Form.Item>
        )}

        <Row className={"dao-checks"}>
          <Form.Item className={"row-check"} name="dao-check" valuePropName="checked" rules={[{ required: true }]}>
            <RowCheckbox>
              <p className="paragraph-2r">I am fostering community health</p>
            </RowCheckbox>
          </Form.Item>

          {ownDao && (
            <Form.Item className={"row-check"} name="auto_approve" valuePropName="checked">
              <RowCheckbox>
                <Tooltip title={autoApproveConsentInfo}>
                  <p className="paragraph-2r">I consent to auto approval of my proposal</p>
                </Tooltip>
              </RowCheckbox>
            </Form.Item>
          )}
        </Row>

        <Row justify={"center"}>
          <ProgressButton
            className={"share-proposal-btn"}
            actionName={proposalType == "whitelist" ? "newcoin.daoCreateWhitelistProposal" : "newcoin.daoCreateProposal"}
            progressText="Sharing..."
            htmlType="submit"
          >
            {" "}
            Share Proposal
          </ProgressButton>
        </Row>

        <NewcoinRecept
          tx={tx}
          visible={proposalCreated}
          onDone={
            !autoApprove.consent ? () => actions.routing.historyPush({ location: `/dao/${daoOwner}/proposals` }) : createApprove
          }
        >
          <h1 className={"view-proposal-vote-h1"}>Congratulations! </h1>
          <p className={"view-proposal-vote-p"}>You Created a proposal and shared it to the {daoOwner} DAO!</p>
        </NewcoinRecept>
      </Form>
    </ContentLayout>
  );
};
export default NewProposal;
