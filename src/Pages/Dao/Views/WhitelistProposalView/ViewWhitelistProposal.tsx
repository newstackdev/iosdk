import { AviLinkRegular } from "../../Components/AviLink";
import { BlockExplorerIcon } from "../../Components/Icons";
import { Button, Col, Row } from "antd";
import { UserStake } from "../../../../Components/UserWidget";
import { ViewWhitelistProposalPageRow } from "../../Components/Previews/Whitelist/ViewWhitelistProposalPageRow/ViewWhitelistProposalPageRow";
import { VoteBarFull } from "../../Components/VoteBar";
import { getLocalTimeData, useGetAuthorizedActions } from "../../Utils/Helpers";
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

  const proposal_type = "standart";
  const currUser = state.api.auth.user?.username || "";
  let { status_tag, action_type, vote } = useGetAuthorizedActions({
    daoOwner,
    proposalId,
    currUser,
    proposal_type,
    proposal,
  });

  return (
    <Col className="view-proposal-wrapper u-margin-top-mega">
      <ViewWhitelistProposalPageRow
        daoOwner={daoOwner}
        proposalId={proposalId}
        proposal={proposal}
        wrapperClass={"u-margin-bottom-large u-dao-row-wrapper"}
        embedded={true}
        buttonType={false}
      />

      <p className={"view-proposal-type-p"}> #new member</p>
      <Row align={"middle"} justify={"space-between"}>
        <p className={" u-margin-bottom-30 view-proposal-row-dao-details"}>
          Posted by
          <AviLinkRegular username={proposal.proposer} userObj={proposerObj} showVerified={false} wrapperClass={"avi"} />
          in the
          <AviLinkRegular username={daoOwner} userObj={daoOwnerObj} showVerified={false} wrapperClass={"avi"} />
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
      <VoteBarFull proposal={proposal} timeData={timeData} />
    </Col>
  );
};
export default ViewWhitelistProposal;
