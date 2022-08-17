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
    actions.routing.historyPush({ location: `/dao/${dao_owner}/proposals` });
  };

  return (
    <div style={{ color: "white" }}>
      <Button className={"power-up-btn"} onClick={() => setMode(executionStates.start)}>
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
        className="modal-ctn"
        footer={[]}
      >
        <h2>Execute this proposal!</h2>
        <p>You need to execute this proposal for it to take effect!</p>

        <ProgressButton
          actionName={"newcoin." + (proposal_type == "whitelist" ? "daoExecuteWhitelistProposal" : "daoExecuteProposal")}
          progressText="Executing..."
          onClick={execute}
          className={"confirm-btn"}
        >
          Execute
        </ProgressButton>

        <Button onClick={() => setMode(executionStates.disabled)} className={"cancel-btn"}>
          {" "}
          Cancel
        </Button>

        <p>This is only on Testnet! Need help? Join our telegram group!</p>
      </Modal>
    </div>
  );
};
