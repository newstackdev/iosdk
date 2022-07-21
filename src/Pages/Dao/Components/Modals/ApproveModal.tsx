import { Button } from "antd";
import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { Modal } from "antd-latest";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { useActions } from "../../../../overmind";
import { useState } from "react";

export const ApproveModal = ({ proposal_type, dao_owner, proposal_id }) => {
  const approvalStates = {
    disabled: 0,
    start: 1,
    reciept: 2,
    end: 3,
  };

  const actions = useActions();
  const [mode, setMode] = useState(approvalStates.disabled);
  const [tx, setTx] = useState("");

  const approve = async () => {
    const res =
      proposal_type == "whitelist"
        ? await actions.newcoin.daoApproveWhitelistProposal({ dao_owner, proposal_id })
        : await actions.newcoin.daoApproveProposal({
            dao_owner,
            proposal_id,
          });
    const success = !!res.TxID_approveDaoProposal;
    if (success) {
      setTx(res.TxID_approveDaoProposal);
      setMode(approvalStates.reciept);
    }
  };

  const endApproving = async () => {
    setMode(approvalStates.disabled);
    proposal_type == "whitelist"
      ? await actions.newcoin.daoGetWhitelistProposals({ daoOwner: dao_owner, proposal_id: proposal_id })
      : await actions.newcoin.daoGetProposals({ daoOwner: dao_owner, proposal_id: proposal_id });
  };

  return (
    <div style={{ color: "white" }}>
      <Button className={"u-dao-view-btn"} onClick={() => setMode(approvalStates.start)}>
        {"Approve"}
      </Button>

      <NewcoinRecept tx={tx} visible={mode == approvalStates.reciept} onDone={endApproving}>
        {" "}
        <h1 className={"view-proposal-vote-h1"}>Nice! </h1>
        <p className={"view-proposal-vote-p"}>You've approved this proposal.</p>
      </NewcoinRecept>

      <Modal
        closeIcon={<CrossCircle />}
        visible={mode == approvalStates.start}
        onCancel={() => setMode(approvalStates.disabled)}
        className="nl-white-box-modal view-proposal-vote-ctn"
        footer={[]}
      >
        <p>This proposal is ready to approve</p>
        <p>You are the owner of this dao. Please approve to activate the proposal.</p>
        <ProgressButton
          actionName={"newcoin." + (proposal_type == "whitelist" ? "daoApproveWhitelistProposal" : "daoApproveProposal")}
          progressText="Approving..."
          type={"primary"}
          onClick={approve}
        >
          Approve
        </ProgressButton>
      </Modal>
    </div>
  );
};
