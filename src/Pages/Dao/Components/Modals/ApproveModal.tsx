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
    <div>
      <Button className={"power-up-btn"} onClick={() => setMode(approvalStates.start)}>
        {"Approve"}
      </Button>

      <NewcoinRecept tx={tx} visible={mode == approvalStates.reciept} onDone={endApproving}>
        {" "}
        <h1>Nice! </h1>
        <p>You've approved this proposal.</p>
      </NewcoinRecept>

      <Modal
        closeIcon={<CrossCircle />}
        visible={mode == approvalStates.start}
        onCancel={() => setMode(approvalStates.disabled)}
        className="modal-ctn"
        footer={[]}
      >
        <h2>Approve this proposal!</h2>
        <p>You need to approve this proposal for DAO members to be able to vote on it!</p>

        <ProgressButton
          actionName={"newcoin." + (proposal_type == "whitelist" ? "daoApproveWhitelistProposal" : "daoApproveProposal")}
          progressText="Approving..."
          onClick={approve}
          className={"confirm-btn"}
        >
          {" "}
          Approve
        </ProgressButton>

        <Button onClick={() => setMode(approvalStates.disabled)} className={"cancel-btn"}>
          {" "}
          Cancel
        </Button>

        <p>This is only on Testnet! Need help? Join our telegram group!</p>
      </Modal>
    </div>
  );
};
