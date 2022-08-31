import { AviLinkRegular } from "../../../AviLink";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { VoteBarFull } from "../../../VoteBar";
import { getLocalTimeData } from "../../../../Utils/Helpers";
import { useCachedUser } from "../../../../../../hooks/useCached";

export const ProposalCard = (props: { proposal; daoOwner }) => {
  const timeData = getLocalTimeData(props.proposal);
  const proposerObj = useCachedUser({ username: props.proposal.proposer });

  const proposalSummaryArr = props.proposal.summary?.split("#");
  const proposalSummary = proposalSummaryArr ? proposalSummaryArr[0] : "";
  let proposalType = proposalSummaryArr && proposalSummaryArr[1];
  proposalType = proposalType == "undefined" ? "feature" : proposalType;

  return (
    <Link to={`/dao/${props.daoOwner}/proposal/${props.proposal.id}`}>
      <Col className={"card-wrapper"}>
        <Row className={"card-top"} justify={"space-between"}>
          <Row align={"middle"}>
            <p className="header-5 u-margin-right-small">#{props.proposal.id}</p>
            <p className="card-title header-5">{props.proposal.title}</p>
          </Row>
          <Row align={"middle"}>
            <p className="">#{proposalType}</p>
          </Row>
        </Row>
        <VoteBarFull proposal={props.proposal} timeData={timeData} />
        <p className="card-summary u-dao-header-2r u-margin-top-15"> {proposalSummary}</p>
        <Row className="u-margin-top-medium" align={"middle"} justify={"space-between"}>
          <p className="">proposal by</p>
          <AviLinkRegular showVerified={true} wrapperClass="avi" username={proposerObj.username} userObj={proposerObj} />
        </Row>
      </Col>
    </Link>
  );
};
