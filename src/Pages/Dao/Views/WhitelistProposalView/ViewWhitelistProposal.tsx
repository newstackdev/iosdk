import { Avatar, Col, Row } from "antd";
import { ContentImage } from "../../../../Components/Image";
import { Link } from "react-router-dom";
import { ProgressBar } from "../../Components/Icons";
import { ProposalFolder } from "../../Components/Links/ProposalFolder";
import { VerifiedIcon } from "../../../../Components/Icons/VerifiedIcon";
import { WhitelistProposalRow } from "../../Components/Previews/Whitelist/Row/WhitelistProposalRow";
import { getLocalTimeData } from "../../Utils/Helpers";
import { useAppState } from "../../../../overmind";
import { useCachedDaoWhitelistProposal, useCachedUser } from "../../../../hooks/useCached";
import { useParams } from "react-router";
import { useVerified } from "../../../../hooks/useVerified";

export const ViewWhitelistProposalPage = () => {
  const { daoOwner, id, proposal } = useParams<{
    daoOwner: string;
    id: string;
    proposal;
  }>();
  return <ViewWhitelistProposal proposal={proposal} daoOwner={daoOwner} proposalId={id} />;
};

const ViewWhitelistProposal = (props: { proposal; daoOwner: string; proposalId: string }) => {
  const state = useAppState();
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposalId;
  const proposal = useCachedDaoWhitelistProposal({ daoOwner, proposalId });
  const proposerObj = useCachedUser({ username: proposal.proposer });
  const timeData = getLocalTimeData(proposal);

  const { verifiedUsers } = useVerified([proposal.proposer || ""]);
  const isUserVerified = verifiedUsers && proposal.proposer && verifiedUsers.includes(proposal.proposer);

  if (!(Number(proposal?.id) >= 0)) return <div>Proposal was executed or does not exist.</div>;

  return (
    <Col className="view-proposal-wrapper">
      <WhitelistProposalRow
        daoOwner={daoOwner}
        proposalId={proposalId}
        proposal={proposal}
        wrapperClass={"u-dao-row-wrapper u-dao-margin-btm-40px"}
        embedded={true}
        buttonType={false}
      />

      <p className="paragraph-2b  u-dao-margin-btm-40px">YES votes: {proposal.vote_yes?.quantity}</p>
      <p className="paragraph-2b">NO votes: {proposal.vote_no?.quantity} </p>
      <ProgressBar width={"642px"} proposal={proposal} />
      <p className="view-proposal-time-p">Ending: {timeData.time_left_from_now} </p>
      <p className={"view-proposal-summary-p"}> {proposal.summary}</p>
      <p className={"view-proposal-by-p"}>Proposal by</p>

      <Row className={"view-proposal-user-details-wrapper"}>
        <Link className={"proposal-list-proposal-avi-link"} to={`/user/${proposal.proposer}`}>
          {" "}
          <Avatar src={<ContentImage {...proposerObj} />} className="proposal-list-proposal-avi-cmpt"></Avatar>
        </Link>
        <Row align={"middle"}>
          <p className={"view-proposal-user-display-name-p"}>{proposal.proposer}</p>
          {isUserVerified ? (
            <span>
              <VerifiedIcon />
            </span>
          ) : (
            false
          )}
          <p className="view-proposal-user-full-name-p">{proposerObj.fullName}</p>
        </Row>
      </Row>

      <ProposalFolder proposal={proposal} />
    </Col>
  );
};
export default ViewWhitelistProposal;
