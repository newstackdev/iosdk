import { AviLinkMedium, AviLinkRegular } from "../../../AviLink";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { VoteBar } from "../../../VoteBar";
import { getLocalTimeData } from "../../../../Utils/Helpers";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoWhitelistProposal, useCachedUser } from "../../../../../../hooks/useCached";

export const WhitelistProposalRow = (props: { daoOwner; buttonType; proposal; proposalId; wrapperClass; embedded? }) => {
  const state = useAppState();
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;

  const proposal = useCachedDaoWhitelistProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const proposer = proposal.proposer;
  const proposerObj = useCachedUser({ username: proposer });
  const newMember = useCachedUser({ username: (proposal as any).user });
  const timeData = getLocalTimeData(proposal);

  return (
    <div className="std-row-wrapper">
      <Link to={`/dao/${props.daoOwner}/member-proposal/${proposalId}`}>
        <div className={"std-row-wl-top"}>
          <div className={"title-hands-ctn"}>
            <p className={"wl-id"}>#{proposal.id}</p>
            <AviLinkMedium showVerified={true} wrapperClass={"avi"} username={newMember.username} userObj={newMember} />
          </div>
          <Button className={"view-btn"} href={`/dao/${daoOwner}/proposal/${proposal.id}`}>
            View
          </Button>
        </div>

        <div className={"std-row-mid"}>
          <VoteBar timeData={timeData} proposal={proposal} />
          <AviLinkRegular showVerified={true} wrapperClass={"avi"} username={proposer} userObj={proposerObj} />
        </div>
      </Link>
    </div>
  );
};
