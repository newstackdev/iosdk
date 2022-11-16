import { AviLinkRegular } from "../../../AviLink";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { VoteBarFull } from "../../../VoteBar";
import { getLocalTimeData } from "../../../../Utils/Helpers";
import { useCachedUser } from "../../../../../../hooks/useCached";

export const WhitelistCard = (props: { proposal; daoOwner }) => {
  const timeData = getLocalTimeData(props.proposal);
  const proposerObj = useCachedUser({ username: props.proposal.proposer });
  let proposalType = "new member";
  const newMember = useCachedUser({ username: (props.proposal as any).user });

  return (
    <Link to={`/dao/${props.daoOwner}/proposal/${props.proposal.id}`}>
      <Col className={"wl-card-wrapper"}>
        <Row className={"u-margin-bottom-large"} justify={"space-between"}>
          <p className="header-5">#{props.proposal.id}</p>
          <p className="">#{proposalType}</p>
        </Row>
        <Row className={"u-margin-bottom-large"}>
          <AviLinkRegular showVerified={true} wrapperClass="avi" username={newMember.username} userObj={newMember} />
        </Row>
        <VoteBarFull proposal={props.proposal} timeData={timeData} />
        <Row className="u-margin-top-medium" align={"middle"} justify={"space-between"}>
          <p className="">proposal by</p>
          <AviLinkRegular showVerified={true} wrapperClass="avi" username={proposerObj.username} userObj={proposerObj} />
        </Row>
      </Col>
    </Link>
  );
};
