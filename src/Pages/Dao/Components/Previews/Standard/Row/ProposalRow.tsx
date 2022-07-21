import { ApproveModal } from "../../../Modals/ApproveModal";
import { Avatar, Col } from "antd-latest";
import { Button, Row } from "antd";
import { ContentImage } from "../../../../../../Components/Image";
import { ExecuteModal } from "../../../Modals/ExecuteModal";
import { Hands, ProgressBar } from "../../../Icons";
import { Link } from "react-router-dom";
import { StakeModal } from "../../../Modals/StakeModal";
import { VerifiedIcon } from "../../../../../../Components/Icons/VerifiedIcon";
import { VoteModal } from "../../../Modals/VoteModal";
import { WithdrawForm } from "../../../Modals/WithdrawModal";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoProposal, useCachedUser } from "../../../../../../hooks/useCached";
import { useGetAuthorizedActions } from "../../../../Utils/Helpers";
import { useVerified } from "../../../../../../hooks/useVerified";

export const ProposalRow = (props: { daoOwner; buttonType; proposalId; proposal; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;
  const proposal = useCachedDaoProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const proposer = proposal.proposer;
  const proposerObj = useCachedUser({ username: proposer });
  const proposal_type = "standart";
  const { status_tag, action_type, vote, timeData } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    currUser,
    proposal_type,
    proposal,
  });

  const { verifiedUsers } = useVerified([proposer || ""]);
  const isUserVerified = verifiedUsers && proposer && verifiedUsers.includes(proposer);

  return (
    <Link to={`/dao/${props.daoOwner}/proposal/${proposal.id}`}>
      <Row className={"std-row-wrapper"} justify={"space-between"}>
        <Row align={"top"} className={"u-dao-gap-40"}>
          <Col>
            <Row align={"top"} justify={"center"}>
              <span>
                <Hands width={"50"} height={"50"} />
              </span>
            </Row>
            <Row align={"top"} justify={"center"}>
              <p className={"id-p"}>#{proposal.id}</p>
            </Row>
          </Col>
          <Col>
            <p className={"title-p"}>{proposal.title}</p>
            <p className="paragraph-2b">YES votes: {proposal.vote_yes?.quantity}</p>
            <p className="u-margin-bottom-15 paragraph-2b">NO votes: {proposal.vote_no?.quantity} </p>
            <ProgressBar width={"642px"} proposal={proposal} />
            <p className="paragraph-2b">
              {timeData.time_left_seconds > 0 ? "Ending" : "Ended"} {timeData.time_left_from_now}{" "}
            </p>
          </Col>
        </Row>

        <Col>
          <Row justify={"end"}>
            {props.buttonType ? (
              <Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}>
                <Button className={"u-dao-view-btn"}>View</Button>
              </Link>
            ) : (
              <Row className={"proposal-list-btns-ctn"}>
                <Button className={`u-dao-proposal-${status_tag}-tag-status-btn u-margin-right-medium`}>
                  <span>{status_tag}</span>
                </Button>
                {["View", "GetWhitelisted", "SeeOthers"].includes(action_type) && !props.embedded && (
                  <Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}>
                    <Button className={"u-dao-view-btn"}>View</Button>
                  </Link>
                )}
                <StakeModal visible={action_type == "Stake"} daoOwner={daoOwner} />
                {action_type == "Approve" && (
                  <ApproveModal proposal_type={"standart"} dao_owner={daoOwner} proposal_id={proposal.id} />
                )}
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
                {/* {(action_type == "GetWhitelisted") &&
                    <Link to={`/dao/${daoOwner}/proposals/${proposal.id}`} >
                        <Button className={"u-dao-view-btn"}>View</Button>
                    </Link>
                }(
                {(action_type == "SeeOthers") &&
                    <Link to={`/dao/${daoOwner}/proposals/${proposal.id}`} >
                        <Button className={"u-dao-view-btn"}>View (seeOthers)</Button>
                    </Link>
                } */}
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
            )}
          </Row>
          <Row align={"middle"} className={"std-row-usr-details"}>
            <Link className={""} to={`/user/${proposal.proposer}`}>
              <Avatar src={<ContentImage {...proposerObj} />} />
            </Link>
            <p className={"header-3"}>{proposal.proposer} </p>
            {isUserVerified && (
              <span>
                <VerifiedIcon />
              </span>
            )}
          </Row>
        </Col>
      </Row>
    </Link>
  );
};
