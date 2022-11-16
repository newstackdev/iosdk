import { ModalCtrl } from "../../../ModalCtrl";
import { Row } from "antd";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoProposal } from "../../../../../../hooks/useCached";

export const ViewProposalRow = (props: { daoOwner; buttonType; proposalId; proposal; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner;
  const proposalId = props.proposal.id;
  const proposal_type = "standart";
  const proposal = useCachedDaoProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });

  return (
    <Row className={props.wrapperClass || "view-proposal-row-wrapper"} align={"middle"}>
      <p className={"view-proposal-row-title-p"}>{proposal.title}</p>
      <ModalCtrl
        proposal={proposal}
        daoOwner={daoOwner}
        proposal_type={proposal_type}
        currUser={currUser}
        proposalId={proposalId}
      />
    </Row>
  );
};
