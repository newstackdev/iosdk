import { Avatar, Button, Col } from "antd";
import { BlockExplorerIcon, ProgressBar } from "../../Components/Icons";
import { BlockExplorerLink } from "../../../../Components/Links";
import { ContentImage } from "../../../../Components/Image";
import { ContentPreview } from "../../../../Components/EmbedContent/ContentPreview";
import { Link } from "react-router-dom";
import { ProposalFolder } from "../../Components/Links/ProposalFolder";
import { Row } from "antd-latest";
import { UserStake } from "../../../../Components/UserWidget";
import { ViewProposalRow } from "../../Components/Previews/Standard/ViewProposalPageRow/ViewProposalRow";
import { getLocalTimeData, useGetAuthorizedActions } from "../../Utils/Helpers";
import { useAppState } from "../../../../overmind";
import { useCachedDaoProposal, useCachedPool, useCachedUser } from "../../../../hooks/useCached";
import { useEmbed } from "../../../../hooks/useEmbed";
import { useParams } from "react-router";
import isEmpty from "lodash/isEmpty";

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
  const daoOwnerObj = useCachedUser({ username: daoOwner });
  const timeData = getLocalTimeData(proposal);
  const { isLoading, error, embedContent } = useEmbed(proposal.url || "", "200", "350");

  const proposalSummaryArr = proposal.summary?.split("#");
  const proposalSummary = proposalSummaryArr ? proposalSummaryArr[0] : "";
  let proposalType = proposalSummaryArr && proposalSummaryArr[1];
  proposalType = proposalType == "undefined" ? "feature" : proposalType;
  const pool = useCachedPool({ owner: daoOwner });

  const proposal_type = "standart";
  const currUser = state.api.auth.user?.username || "";
  let { status_tag, action_type, vote } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    currUser,
    proposal_type,
    proposal,
  });

  if (!(Number(proposal?.id) >= 0)) return <div>Proposal was executed or does not exist.</div>;
  const yesVotes = Number(proposal.vote_yes?.quantity?.split(" ")[0]);
  const noVotes = Number(proposal.vote_no?.quantity?.split(" ")[0]);
  const totalVotes = yesVotes + noVotes;

  return (
    <Col className={"u-margin-top-mega view-proposal-row-wrapper"}>
      <ViewProposalRow
        daoOwner={daoOwner}
        proposal={proposal}
        wrapperClass={"u-margin-bottom-large u-dao-row-wrapper"}
        proposalId={proposal.id}
        embedded={true}
        buttonType={false}
      />

      <Row align={"middle"} justify={"space-between"}>
        <p className={" u-margin-bottom-30 view-proposal-row-dao-details"}>
          Posted by
          <Link to={`/user/${proposal.proposer}`} className={"view-proposal-avi-ctn"}>
            <Avatar className={"u-margin-right-medium"} src={<ContentImage {...proposerObj} />} />
            <p className={"view-proposal-row-username"}>{proposal.proposer}</p>
          </Link>
          in the
          <Link to={`/user/${proposal.proposer}`} className={"view-proposal-avi-ctn"}>
            <Avatar className={"u-margin-right-medium"} src={<ContentImage {...daoOwnerObj} />} />
            <p className={"view-proposal-row-username"}>{daoOwnerObj.username}</p>
          </Link>
          DAO
          <a href={"#"} target={"rel_no_opener"}>
            <BlockExplorerIcon />
          </a>
          <Button className={`u-dao-proposal-${status_tag}-tag-status-btn`}>
            <span>{status_tag}</span>
          </Button>
          <UserStake buttonText={`Get $${pool.code}`} user={{ username: daoOwner }} hideButton={false} />
        </p>
      </Row>

      <p className="paragraph-1b u-margin-top-large">{totalVotes} votes </p>

      <ProgressBar width={"100%"} proposal={proposal} />

      <Row align={"middle"} justify={"space-between"} className={"view-proposal-votes-ctn"}>
        <p className="u-margin-bottom-15 paragraph-2b"> {yesVotes} yes votes </p>
        <p className="u-margin-bottom-15 paragraph-2b"> {noVotes} no votes </p>
      </Row>

      <Col className={"view-proposal-summary-p"}>
        <Row justify={"space-between"}>
          <p className={"view-proposal-type-p"}> {proposalType && `proposal type: ${proposalType}`}</p>
          <p className={"view-proposal-type-p"}>
            {timeData.time_left_seconds > 0 ? "ending" : "ended"} {timeData.time_left_from_now}{" "}
          </p>
        </Row>

        <Row className="u-margin-bottom-15">
          <p> {proposalSummary} </p>
        </Row>
        <Row>
          {embedContent && !isEmpty(embedContent) && !isLoading && !error && (
            <div className="view-proposal-embed-container">
              <ContentPreview content={embedContent} />
            </div>
          )}
        </Row>
        <ProposalFolder proposal={proposal} />
      </Col>
    </Col>
  );
};
export default ViewProposal;
