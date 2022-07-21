import { Button } from "antd";
import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { Modal } from "antd-latest";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { useActions } from "../../../../overmind";
import { useState } from "react";

export const ExecuteModal = ({ proposal_type, dao_owner, dao_id, proposal_id, proposal_author }) => {
  const executionStates = {
    disabled: 0,
    start: 1,
    reciept: 2,
    end: 3,
  };

  const actions = useActions();
  const [mode, setMode] = useState(executionStates.disabled);
  const [tx, setTx] = useState("");

  const execute = async () => {
    const res =
      proposal_type == "whitelist"
        ? await actions.newcoin.daoExecuteWhitelistProposal({ dao_id, proposal_id, proposal_author })
        : await actions.newcoin.daoExecuteProposal({
            dao_id,
            proposal_id,
            proposal_author,
            dao_owner,
          });
    const success = !!res.TxID_executeDaoProposal;
    if (success) {
      setTx(res.TxID_executeDaoProposal);
      setMode(executionStates.reciept);
    }
  };

  const endExecution = async () => {
    setMode(executionStates.disabled);
    proposal_type == "whitelist"
      ? await actions.newcoin.daoGetWhitelistProposals({ daoOwner: dao_owner, proposal_id: proposal_id })
      : await actions.newcoin.daoGetProposals({ daoOwner: dao_owner, proposal_id: proposal_id });
  };

  return (
    <div style={{ color: "white" }}>
      <Button className={"u-dao-view-btn"} onClick={() => setMode(executionStates.start)}>
        {"Execute"}
      </Button>

      <NewcoinRecept tx={tx} visible={mode == executionStates.reciept} onDone={endExecution}>
        {" "}
        <h1 className={"view-proposal-vote-h1"}>Nice! </h1>
        <p className={"view-proposal-vote-p"}>You've executed this proposal.</p>
      </NewcoinRecept>

      <Modal
        closeIcon={<CrossCircle />}
        visible={mode == executionStates.start}
        onCancel={() => setMode(executionStates.disabled)}
        className="nl-white-box-modal view-proposal-vote-ctn"
        footer={[]}
      >
        <p>This proposal is ready to execute</p>
        <p>
          You are the owner of this dao. Please proceed to execute the proposal. Note the proposal will be deleted after
          execution.
        </p>
        <ProgressButton
          actionName={"newcoin." + (proposal_type == "whitelist" ? "daoExecuteWhitelistProposal" : "daoExecuteProposal")}
          progressText="Executing..."
          type={"primary"}
          onClick={execute}
        >
          Execute
        </ProgressButton>
      </Modal>
    </div>
  );
};
