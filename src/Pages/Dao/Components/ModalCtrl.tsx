import { ApproveModal } from "./Modals/ApproveModal";
import { Button } from "antd";
import { ExecuteModal } from "./Modals/ExecuteModal";
import { GetWhitelistedModal } from "./Modals/GetWhitelistedModal";
import { Link } from "react-router-dom";
import { StakeModal } from "./Modals/StakeModal";
import { VoteModal } from "./Modals/VoteModal";
import { WithdrawForm } from "./Modals/WithdrawModal";
import { useGetAuthorizedActions } from "../Utils/Helpers";

export const ModalCtrl = ({ proposal, daoOwner, proposal_type, currUser, proposalId }) => {
  const { status_tag, action_type, vote, timeData } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    currUser,
    proposal_type,
    proposal,
  });

  return (
    <div>
      {action_type == "Approve" && <ApproveModal proposal_type={proposal_type} dao_owner={daoOwner} proposal_id={proposal.id} />}
      <VoteModal
        proposal_type={proposal_type}
        daoOwner={daoOwner}
        proposal={proposal}
        proposalId={proposal.id}
        visible={action_type == "Vote"}
      />
      {["Withdraw", "Execute"].includes(action_type) && vote?.id && (
        <WithdrawForm vote_id={vote?.id} quantity={vote?.quantity?.quantity} />
      )}
      {action_type == "Execute" && (
        <ExecuteModal
          dao_owner={daoOwner}
          proposal_type={proposal_type}
          dao_id={proposal.id}
          proposal_id={proposal.id}
          proposal_author={proposal.proposer}
        />
      )}
      {action_type == "GetWhitelisted" && <GetWhitelistedModal daoOwner={daoOwner} />}
      {action_type == "GetWhitelisted" && (
        <Link to={`/dao/${daoOwner}/proposals`}>
          <Button className={"power-up-btn"}>Get Whitelisted</Button>
        </Link>
      )}
      {action_type == "Voted" && <Button className={"power-up-btn"}>You Voted {vote?.quantity?.quantity}</Button>}
      {action_type == "View" && <Button className={"power-up-btn"}>View</Button>}
      <StakeModal visible={action_type == "Stake"} daoOwner={daoOwner} />
    </div>
  );
};
