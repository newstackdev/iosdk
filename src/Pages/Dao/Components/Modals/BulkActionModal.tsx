import { Button } from "antd";
import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { Modal } from "antd-latest";
import { useActions } from "../../../../overmind";
import { useState } from "react";

export const BulkActionModal = ({ proposals, showProposalType, daoId, actionType, dao_owner }) => {
  const bulkActionStates = {
    disabled: 0,
    start: 1,
    end: 2,
  };

  const actions = useActions();
  const [mode, setMode] = useState(bulkActionStates.start);
  const dao_Id = daoId;

  const approveAll = async () => {
    if (showProposalType == "members" || !proposals.length) {
      return;
    }
    proposals.map(async (proposal) => {
      const proposalId = proposal.id;
      const proposalAuthor = proposal.proposer;
      showProposalType == "whitelist"
        ? await actions.newcoin.daoApproveWhitelistProposal({ dao_owner: proposalAuthor, proposal_id: proposalId })
        : await actions.newcoin.daoApproveProposal({
            dao_owner: proposalAuthor,
            proposal_id: proposalId,
          });
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const executeAll = async () => {
    setTimeout(() => {}, 1000);
    if (showProposalType == "members" || !proposals.length) {
      return;
    }
    proposals.map(async (proposal) => {
      const proposalId = proposal.id;
      const proposalAuthor = proposal.proposer;
      const daoId = dao_Id || "";
      showProposalType == "whitelist"
        ? await actions.newcoin.daoExecuteWhitelistProposal({
            dao_id: daoId,
            proposal_id: proposalId,
            proposal_author: proposalAuthor,
          })
        : await actions.newcoin.daoExecuteProposal({
            dao_id: daoId,
            proposal_id: proposalId,
            proposal_author: proposalAuthor,
            dao_owner: proposalAuthor,
          });
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Modal
      visible={mode == bulkActionStates.start}
      closeIcon={<CrossCircle />}
      onCancel={() => window.location.reload()}
      className="modal-ctn"
      footer={[]}
    >
      <h2>
        Are you sure you want to {actionType} {proposals.length} proposals?{" "}
      </h2>
      <Button onClick={actionType == "approve" ? approveAll : executeAll} className={"confirm-btn"}>
        {actionType} {proposals.length} proposals
      </Button>

      <Button onClick={() => window.location.reload()} className={"cancel-btn"}>
        {" "}
        Cancel bulk action
      </Button>

      <p>This is only on Testnet! Need help? Join our telegram group!</p>
    </Modal>
  );
};
