import { Avatar, Col } from "antd";
import { ContentImage } from "../../../../Components/Image";
import { Link } from "react-router-dom";
import { ProgressBar } from "../../Components/Icons";
import { ProposalFolder } from "../../Components/Links/ProposalFolder";
import { ProposalRow } from "../../Components/Previews/Standard/Row/ProposalRow";
import { VerifiedIcon } from "../../../../Components/Icons/VerifiedIcon";
import { getLocalTimeData } from "../../Utils/Helpers";
import { useAppState } from "../../../../overmind";
import { useCachedDaoProposal, useCachedUser } from "../../../../hooks/useCached";
import { useParams } from "react-router";
import { useVerified } from "../../../../hooks/useVerified";

export const ViewProposalPage = () => {
  const { daoOwner, id, proposal } = useParams<{
    daoOwner: string;
    id: string;
    proposal;
  }>();
  return <ViewProposal proposal={proposal} daoOwner={daoOwner} proposalId={id} />;
};

const ViewProposal = (props: { proposal; daoOwner: string; proposalId: string }) => {
  const state = useAppState();
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposalId;
  const proposal = useCachedDaoProposal({ daoOwner, proposalId });
  const proposerObj = useCachedUser({ username: proposal.proposer });
  const timeData = getLocalTimeData(proposal);
  const proposalSummaryArr = proposal.summary?.split("#");
  const proposalSummary = proposalSummaryArr ? proposalSummaryArr[0] : "";
  const proposalType = proposalSummaryArr ? proposalSummaryArr[1] : "";

  const { verifiedUsers } = useVerified([proposal.proposer || ""]);
  const isUserVerified = verifiedUsers && proposal.proposer && verifiedUsers.includes(proposal.proposer);

  if (!(Number(proposal?.id) >= 0)) return <div>Proposal was executed or does not exist.</div>;

  return (
    <Col>
      <ProposalRow
        daoOwner={daoOwner}
        proposal={proposal}
        wrapperClass={"u-dao-row-wrapper"}
        proposalId={proposal.id}
        embedded={true}
        buttonType={false}
      />
      <p className={"view-proposal-summary-p"}> {proposalType && `Proposal Type: #${proposalType}`}</p>
      <p className="paragraph-2b">YES votes: {proposal.vote_yes?.quantity}</p>
      <p className="u-margin-bottom-15 paragraph-2b">NO votes: {proposal.vote_no?.quantity} </p>
      <ProgressBar width={"642px"} proposal={proposal} />
      <p className="paragraph-2b">Ending: {timeData.time_left_from_now} </p>
      <p className={"view-proposal-summary-p"}> {proposalSummary}</p>
      <p className={"view-proposal-by-p"}>Proposal by</p>

      <Link to={`/user/${proposal.proposer}`} className={"view-proposal-avi-ctn"}>
        <Avatar src={<ContentImage {...proposerObj} />} />
        <p className={"view-proposal-username"}>{proposal.proposer}</p>
        {isUserVerified && <VerifiedIcon />}
      </Link>

      <br />
      <br />
      <ProposalFolder proposal={proposal} />
    </Col>
  );
};
export default ViewProposal;
