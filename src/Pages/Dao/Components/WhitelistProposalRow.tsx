import { ApproveModal } from "./Modals/ApproveModal";
import { Avatar, Button, Col, Row } from "antd";
import { ContentImage } from "../../../Components/Image";
import { ExecuteModal } from "./Modals/ExecuteModal";
import { Link } from "react-router-dom";
import { StakeModal } from "./Modals/StakeModal";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon";
import { VoteModal } from "./Modals/VoteModal";
import { WithdrawForm } from "./Modals/WithdrawModal";
import { useAppState } from "../../../overmind";
import { useCachedDaoWhitelistProposal, useCachedUser } from "../../../hooks/useCached";
import { useGetAuthorizedActions } from "../Utils/Helpers";
import { useVerified } from "../../../hooks/useVerified";

export const WhitelistProposalRow = (props: { daoOwner; buttonType; proposal; proposalId; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;

  const proposal = useCachedDaoWhitelistProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const proposer = proposal.proposer;
  const proposerObj = useCachedUser({ username: proposer });
  const proposal_type = "whitelist";

  const { status_tag, action_type, vote, timeData } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    proposal,
    currUser,
    proposal_type,
  });

  const { verifiedUsers } = useVerified([proposer || ""]);
  const isUserVerified = verifiedUsers && proposer && verifiedUsers.includes(proposer);

  return (
    <Link to={`/dao/${props.daoOwner}/whitelist-proposal/${proposalId}`}>
      <Row className={props.wrapperClass} align="middle">
        <Row align="middle" className={"u-margin-left-large"}>
          <p className={"header-5 u-margin-right-large"}>#{props.proposalId}</p>
          <Col className={"proposal-list-card-btm-user-details-left-ctn u-margin-right-large"}>
            <Link className={"proposal-list-props.proposal-avi-link"} to={`/user/${(proposal as any).user}`}>
              {" "}
              <Avatar src={<ContentImage {...proposerObj} />} className="proposal-list-props.proposal-avi-cmpt" />
            </Link>
          </Col>
          <Col>
            <p className={"header-3 u-margin-right-large"}> {(proposal as any).user}</p>
            <p className={"header-5 u-margin-right-large"} style={{ display: "inline-flex", justifyContent: "center" }}>
              proposal by: {proposal.proposer}
              {isUserVerified ? (
                <span className="u-margin-left-medium">
                  <VerifiedIcon />
                </span>
              ) : (
                false
              )}
            </p>
          </Col>
        </Row>
        <Row align="middle" className={"u-margin-right-large"}>
          <Col className={"proposal-list-timestamp-ctn u-margin-right-large"}>
            <p className={"u-margin-right-large"}> {timeData.time_end_date} </p>
          </Col>
          {props.buttonType ? (
            <Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}>
              <Button className={"u-dao-view-btn"}>{"View"}</Button>
            </Link>
          ) : (
            <Row className={"proposal-list-btns-ctn"}>
              <Button className={`u-dao-proposal-${status_tag}-tag-status-btn u-margin-right-medium`}>
                <span>{status_tag}</span>
              </Button>
              {action_type == "View" && !props.embedded && (
                <Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}>
                  <Button className={"u-dao-view-btn"}>{action_type}</Button>
                </Link>
              )}
              <StakeModal visible={action_type == "Stake"} daoOwner={daoOwner} />
              {action_type == "Approve" && (
                <ApproveModal proposal_type={"whitelist"} dao_owner={daoOwner} proposal_id={proposal.id} />
              )}
              <VoteModal
                proposal_type={"whitelist"}
                daoOwner={daoOwner}
                proposal={proposal}
                proposalId={proposal.id}
                visible={action_type == "Vote"}
              />
              {action_type == "GetWhitelisted" && (
                <Link to={`/dao/${daoOwner}/proposals`}>
                  <Button className={"u-dao-view-btn"}>{"View"}</Button>
                </Link>
              )}
              {action_type == "SeeOthers" && (
                <Link to={`/dao/${daoOwner}/proposals`}>
                  <Button className={"u-dao-view-btn"}>{"View"}</Button>
                </Link>
              )}
              {action_type == "Execute" && (
                <ExecuteModal
                  dao_owner={daoOwner}
                  proposal_type={"whitelist"}
                  dao_id={proposal.dao_id}
                  proposal_id={proposal.id}
                  proposal_author={proposal.proposer}
                />
              )}
              {action_type == "Voted" && (
                <Button className={"u-dao-view-btn"}>
                  <small>Voted {vote?.quantity?.quantity}</small>
                </Button>
              )}
              {["Withdraw", "Execute"].includes(action_type) && vote?.id && (
                <WithdrawForm vote_id={vote?.id} quantity={vote?.quantity?.quantity} />
              )}{" "}
            </Row>
          )}
        </Row>
      </Row>
    </Link>
  );
};
