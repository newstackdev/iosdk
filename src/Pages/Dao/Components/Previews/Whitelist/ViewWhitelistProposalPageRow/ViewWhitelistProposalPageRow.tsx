import { ApproveModal } from "../../../Modals/ApproveModal";
import { Avatar, Button, Row } from "antd";
import { ContentImage } from "../../../../../../Components/Image";
import { ExecuteModal } from "../../../Modals/ExecuteModal";
import { GetWhitelistedModal } from "../../../Modals/GetWhitelistedModal";
import { Link } from "react-router-dom";
import { StakeModal } from "../../../Modals/StakeModal";
import { VoteModal } from "../../../Modals/VoteModal";
import { WithdrawForm } from "../../../Modals/WithdrawModal";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoWhitelist, useCachedDaoWhitelistProposal, useCachedUser } from "../../../../../../hooks/useCached";
import { useGetAuthorizedActions } from "../../../../Utils/Helpers";

export const ViewWhitelistProposalPageRow = (props: { daoOwner; buttonType; proposal; proposalId; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;

  const proposal = useCachedDaoWhitelistProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const newMember = useCachedUser({ username: (proposal as any).user });
  const proposal_type = "whitelist";

  let { status_tag, action_type, vote, timeData } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    proposal,
    currUser,
    proposal_type,
  });

  return (
    <Row justify={"space-between"}>
      <Link to={`/user/${(proposal as any).user}`} className={"wlst-member-details"}>
        <Avatar src={<ContentImage {...newMember} />} className="wlst-member-avi" />
        <p className={"wlst-member-username"}> {(proposal as any).user}</p>
      </Link>

      <Row align={"top"} className={"u-margin-bottom-30"}>
        <Button className={`u-dao-proposal-${status_tag}-tag-status-btn u-margin-right-medium`}>
          <span>{status_tag}</span>
        </Button>
        {action_type == "GetWhitelisted" && <GetWhitelistedModal daoOwner={daoOwner} />}
        {action_type == "GetWhitelisted" && (
          <Link to={`/dao/${daoOwner}/proposals`}>
            <Button className={"u-dao-view-btn"}>Get Whitelisted</Button>
          </Link>
        )}
        <StakeModal visible={action_type == "Stake"} daoOwner={daoOwner} />
        {action_type == "Approve" && <ApproveModal proposal_type={"whitelist"} dao_owner={daoOwner} proposal_id={proposal.id} />}
        <VoteModal
          proposal_type={"whitelist"}
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
            proposal_type={"whitelist"}
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
