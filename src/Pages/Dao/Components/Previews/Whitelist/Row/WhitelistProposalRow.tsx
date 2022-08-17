import { ApproveModal } from "../../../Modals/ApproveModal";
import { Avatar, Button, Col, Row } from "antd";
import { ContentImage } from "../../../../../../Components/Image";
import { ExecuteModal } from "../../../Modals/ExecuteModal";
import { GetWhitelistedModal } from "../../../Modals/GetWhitelistedModal";
import { Hands, ProgressBar } from "../../../Icons";
import { Link } from "react-router-dom";
import { StakeModal } from "../../../Modals/StakeModal";
import { VerifiedIcon } from "../../../../../../Components/Icons/VerifiedIcon";
import { VoteModal } from "../../../Modals/VoteModal";
import { WithdrawForm } from "../../../Modals/WithdrawModal";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoWhitelistProposal, useCachedUser } from "../../../../../../hooks/useCached";
import { useGetAuthorizedActions } from "../../../../Utils/Helpers";
import { useVerified } from "../../../../../../hooks/useVerified";

export const WhitelistProposalRow = (props: { daoOwner; buttonType; proposal; proposalId; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;
  const yesVotes = Number(props.proposal.vote_yes?.quantity?.split(" ")[0]);
  const noVotes = Number(props.proposal.vote_no?.quantity?.split(" ")[0]);

  const proposal = useCachedDaoWhitelistProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const proposer = proposal.proposer;
  const proposerObj = useCachedUser({ username: proposer });
  const newMember = useCachedUser({ username: (proposal as any).user });
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
    <Link to={`/dao/${props.daoOwner}/member-proposal/${proposalId}`}>
      <Row className={"wlst-row-wrapper"} justify={"space-between"}>
        <Row align={"top"} className={"u-dao-gap-40"}>
          <Col>
            <Row align={"top"} justify={"center"}>
              <span>
                <Hands width={"50"} height={"50"} />
              </span>
            </Row>
            <Row align={"top"} justify={"center"}>
              <p>#{proposal.id}</p>
            </Row>
          </Col>
          <Col>
            <Link to={`/user/${(proposal as any).user}`} className={"wlst-member-details"}>
              <Avatar src={<ContentImage {...newMember} />} className="wlst-member-avi" />
              <p className={"wlst-member-username"}> {(proposal as any).user}</p>
            </Link>
            <Row align={"middle"} justify={"space-between"} className={"view-proposal-votes-ctn"}>
              <p className="paragraph-2b"> {yesVotes} yes votes </p>
              <p className="paragraph-2b"> {noVotes} no votes </p>
            </Row>
            <ProgressBar width={"750px"} proposal={proposal} />
            <p className="paragraph-2b">
              {timeData.time_left_seconds > 0 ? "Ending" : "Ended"} {timeData.time_left_from_now}{" "}
            </p>
          </Col>
        </Row>

        <Col>
          <Row justify={"end"}>
            <Link to={`/dao/${daoOwner}/proposal/${proposal.id}`}>
              <Button className={"u-dao-view-btn"}>View</Button>
            </Link>
          </Row>
          <Row align={"middle"} className={"wlst-row-usr-details"}>
            <Link className={""} to={`/user/${proposal.proposer}`}>
              <Avatar src={<ContentImage {...proposerObj} />} />
            </Link>
            <p className={"header-3"}>{proposal.proposer} </p>
            {isUserVerified && <VerifiedIcon />}
          </Row>
        </Col>
      </Row>
    </Link>
  );
};
