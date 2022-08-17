import { ApproveModal } from "../../../Modals/ApproveModal";
import { Button, Row } from "antd";
import { ExecuteModal } from "../../../Modals/ExecuteModal";
import { GetWhitelistedModal } from "../../../Modals/GetWhitelistedModal";
import { Link } from "react-router-dom";
import { StakeModal } from "../../../Modals/StakeModal";
import { VoteModal } from "../../../Modals/VoteModal";
import { WithdrawForm } from "../../../Modals/WithdrawModal";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoProposal } from "../../../../../../hooks/useCached";
import { useGetAuthorizedActions } from "../../../../Utils/Helpers";

export const ViewProposalRow = (props: { daoOwner; buttonType; proposalId; proposal; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner;
  const proposalId = props.proposal.id;
  const proposal = useCachedDaoProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const proposal_type = "standart";
  let { status_tag, action_type, vote } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    currUser,
    proposal_type,
    proposal,
  });

  return (
    <Row className={props.wrapperClass || "view-proposal-row-wrapper"} align={"middle"}>
      <p className={"view-proposal-row-title-p"}>{proposal.title}</p>
      <Row align={"middle"}>
        {action_type == "GetWhitelisted" && <GetWhitelistedModal daoOwner={daoOwner} />}
        {action_type == "GetWhitelisted" && (
          <Link to={`/dao/${daoOwner}/proposals`}>
            <Button className={"u-dao-view-btn"}>Get Whitelisted</Button>
          </Link>
        )}
        <StakeModal visible={action_type == "Stake"} daoOwner={daoOwner} />
        {action_type == "Approve" && <ApproveModal proposal_type={"standart"} dao_owner={daoOwner} proposal_id={proposal.id} />}
        <VoteModal
          proposal_type={"standart"}
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
            proposal_type={"standart"}
            dao_id={proposal.id}
            proposal_id={proposal.id}
            proposal_author={proposal.proposer}
          />
        )}
        {action_type == "Voted" && (
          <Button className={"u-dao-view-btn"}>
            <small>Voted {vote?.quantity?.quantity}</small>
          </Button>
        )}
      </Row>
    </Row>
  );
};
