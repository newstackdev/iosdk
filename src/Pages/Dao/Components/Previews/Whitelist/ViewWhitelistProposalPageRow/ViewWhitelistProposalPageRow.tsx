import { AviLinkLarge } from "../../../AviLink";
import { ModalCtrl } from "../../../ModalCtrl";
import { Row } from "antd";
import { useAppState } from "../../../../../../overmind";
import { useCachedDaoWhitelistProposal, useCachedUser } from "../../../../../../hooks/useCached";

export const ViewWhitelistProposalPageRow = (props: { daoOwner; buttonType; proposal; proposalId; wrapperClass; embedded? }) => {
  const state = useAppState();
  const currUser = state.api.auth.user?.username || "";
  const daoOwner = props.daoOwner || state.config.settings.newcoin.daoDomain;
  const proposalId = props.proposal.id;

  const proposal = useCachedDaoWhitelistProposal({
    daoOwner,
    proposalId: props?.proposal?.id,
  });
  const newMember = useCachedUser({ username: (proposal as any).user });
  const proposal_type = "whitelist";

  return (
    <Row justify={"space-between"}>
      <AviLinkLarge showVerified={true} wrapperClass="avi" username={newMember.username} userObj={newMember} />
      <Row align={"top"} className={"u-margin-bottom-30"}>
        <ModalCtrl
          proposal={proposal}
          daoOwner={daoOwner}
          proposal_type={proposal_type}
          currUser={currUser}
          proposalId={proposalId}
        />
      </Row>
    </Row>
  );
};
