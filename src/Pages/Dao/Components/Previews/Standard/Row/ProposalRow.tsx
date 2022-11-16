import { AviLinkRegular } from "../../../AviLink";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { VoteBar } from "../../../VoteBar";
import { defaultDao } from "../../../../Utils/defaultDao";
import { getLocalTimeData, useGetAuthorizedActions } from "../../../../Utils/Helpers";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoProposal, useCachedUser } from "../../../../../../hooks/useCached";

export const ProposalRow = (props: { daoOwner; buttonType; proposalId; proposal; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || defaultDao(state); //state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;
  const proposal = useCachedDaoProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  const proposer = proposal.proposer;
  const proposerObj = useCachedUser({ username: proposer });
  const proposal_type = "standart";
  const timeData = getLocalTimeData(proposal);

  return (
    <div className="std-row-wrapper">
      <Link to={`/dao/${props.daoOwner}/proposal/${proposal.id}`}>
        <div className={"std-row-top"}>
          <div className={"title-hands-ctn"}>
            <p className={"id"}>#{proposal.id}</p>
            <p className={"title"}>{proposal.title}</p>
          </div>
          <Button href={`/dao/${daoOwner}/proposal/${proposal.id}`}>View</Button>
        </div>

        <div className={"std-row-mid"}>
          <VoteBar timeData={timeData} proposal={proposal} />
          <AviLinkRegular showVerified={true} wrapperClass="avi" username={proposal.proposer} userObj={proposerObj} />
        </div>
      </Link>
    </div>
  );
};
