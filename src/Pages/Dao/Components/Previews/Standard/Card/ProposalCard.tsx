import { Avatar, Col, Row } from "antd";
import { ContentImage } from "../../../../../../Components/Image";
import { Hands, ProgressBar } from "../../../Icons";
import { Link } from "react-router-dom";
import { VerifiedIcon } from "../../../../../../Components/Icons/VerifiedIcon";
import { getLocalTimeData } from "../../../../Utils/Helpers";
import { useCachedUser } from "../../../../../../hooks/useCached";
import { useVerified } from "../../../../../../hooks/useVerified";

export const ProposalCard = (props: { proposal; daoOwner }) => {
  const timeData = getLocalTimeData(props.proposal);
  const proposerObj = useCachedUser({ username: props.proposal.proposer });

  const { verifiedUsers } = useVerified([props.proposal.proposer || ""]);
  const isUserVerified = verifiedUsers && props.proposal.proposer && verifiedUsers.includes(props.proposal.proposer);

  const yesVotes = Number(props.proposal.vote_yes?.quantity?.split(" ")[0]);
  const noVotes = Number(props.proposal.vote_no?.quantity?.split(" ")[0]);

  const proposalSummaryArr = props.proposal.summary?.split("#");
  const proposalSummary = proposalSummaryArr ? proposalSummaryArr[0] : "";
  let proposalType = proposalSummaryArr && proposalSummaryArr[1];
  proposalType = proposalType == "undefined" ? "feature" : proposalType;

  return (
    <Link to={`/dao/${props.daoOwner}/proposal/${props.proposal.id}`}>
      <Col className={"card-wrapper"}>
        <div className={"card-top"}>
          <Row align={"middle"}>
            <p className="header-5 u-margin-right-medium">#{props.proposal.id}</p>
            <Hands />
            <p className="card-title header-5 u-margin-left-medium">{props.proposal.title}</p>
          </Row>
          <Row align={"middle"}>
            <p className="">#{proposalType}</p>
          </Row>
        </div>
        <p className="u-margin-top-15">
          {timeData.time_left_seconds > 0 ? "Ending" : "Ended"} {timeData.time_left_from_now}{" "}
        </p>
        <p className="paragraph-1b u-margin-top-30"> {yesVotes + noVotes} votes </p>
        <ProgressBar width={"100%"} proposal={props.proposal} />
        <Row align={"bottom"} justify={"space-between"}>
          <p className=""> {yesVotes} yes votes </p>
          <p className=""> {noVotes} no votes </p>
        </Row>
        <p className="card-summary u-dao-header-2r u-margin-top-15"> {proposalSummary}</p>
        <Row className="u-margin-top-small" align={"middle"} justify={"space-between"}>
          <p className="">proposal by</p>
          <Link className={""} to={`/user/${props.proposal.proposer}`}>
            {" "}
            <Avatar src={<ContentImage {...proposerObj} />} className="proposal-list-props.proposal-avi-cmpt" />
          </Link>
          <p className="">{props.proposal.proposer}</p>
          {isUserVerified && <VerifiedIcon />}
          <p className="">{proposerObj.fullName}</p>
        </Row>
      </Col>
    </Link>
  );
};
