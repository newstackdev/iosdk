import { Avatar, Col, Row } from "antd";
import { ContentImage } from "../../../../Components/Image";
import { Link } from "react-router-dom";
import { ProgressBar } from "../../Components/Icons";
import { UserStake } from "../../../../Components/UserWidget";
import { ViewWhitelistProposalPageRow } from "../../Components/Previews/Whitelist/ViewWhitelistProposalPageRow/ViewWhitelistProposalPageRow";
import { getLocalTimeData } from "../../Utils/Helpers";
import { useAppState } from "../../../../overmind";
import { useCachedDaoWhitelistProposal, useCachedPool, useCachedUser } from "../../../../hooks/useCached";
import { useParams } from "react-router";

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
  const daoOwnerObj = useCachedUser({ username: daoOwner });
  const pool = useCachedPool({ owner: daoOwner });

  if (!(Number(proposal?.id) >= 0)) return <div>Proposal was executed or does not exist.</div>;
  const yesVotes = Number(proposal.vote_yes?.quantity?.split(" ")[0]);
  const noVotes = Number(proposal.vote_no?.quantity?.split(" ")[0]);
  const totalVotes = yesVotes + noVotes;

  return (
    <Col className="view-proposal-wrapper">
      <ViewWhitelistProposalPageRow
        daoOwner={daoOwner}
        proposalId={proposalId}
        proposal={proposal}
        wrapperClass={"u-dao-row-wrapper u-dao-margin-btm-40px"}
        embedded={true}
        buttonType={false}
      />

      <p className={"view-proposal-type-p"}> #new member</p>
      <Row align={"middle"}>
        <div className={"view-proposal-row-dao-details"}>
          Posted by
          <Link to={`/user/${proposal.proposer}`} className={"view-proposal-avi-ctn"}>
            <Avatar src={<ContentImage {...proposerObj} />} />
            <p className={"view-proposal-row-username"}>{proposal.proposer}</p>
          </Link>
          in the
          <Link to={`/user/${proposal.proposer}`} className={"view-proposal-avi-ctn"}>
            <Avatar src={<ContentImage {...daoOwnerObj} />} />
            <p className={"view-proposal-row-username"}>{daoOwnerObj.username}</p>
          </Link>
          DAO
          <UserStake buttonText={`Get $${pool.code}`} user={{ username: daoOwner }} hideButton={false} />
        </div>
      </Row>

      <p className="paragraph-2b">
        {timeData.time_left_seconds > 0 ? "Ending" : "Ended"} {timeData.time_left_from_now}{" "}
      </p>
      <p className="paragraph-1b u-margin-top-large">{totalVotes} votes </p>
      <ProgressBar width={"100%"} proposal={proposal} />
      <Row align={"middle"} justify={"space-between"} className={"view-proposal-votes-ctn"}>
        <p className="u-margin-bottom-15 paragraph-2b"> {yesVotes} yes votes </p>
        <p className="u-margin-bottom-15 paragraph-2b"> {noVotes} no votes </p>
      </Row>
    </Col>
  );
};
export default ViewWhitelistProposal;
