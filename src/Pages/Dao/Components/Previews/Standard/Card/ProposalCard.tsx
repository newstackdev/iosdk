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

  return (
    <Link to={`/dao/${props.daoOwner}/proposal/${props.proposal.id}`}>
      <Col className={"proposal-list-card-wrapper"}>
        <Row className="u-dao-card-top-details-wrapper" align={"middle"} justify={"space-between"}>
          <Row className="u-dao-card-top-details-left" align={"middle"}>
            <p className={"proposal-list-id-p"}>#{props.proposal.id}</p>
            <span className={"proposal-list-hands-icon-span"}>
              <Hands />
            </span>
            <p className={"proposal-list-title-p"}>{props.proposal.title}</p>
          </Row>
        </Row>
        <Col className={"u-dao-card-mid-details-wrapper"}>
          <p className="paragraph-2b">YES votes: {props.proposal.vote_yes?.quantity}</p>
          <p className="paragraph-2b">NO votes: {props.proposal.vote_no?.quantity} </p>
          <ProgressBar width={"350px"} proposal={props.proposal} />
          <p className="proposal-list-time-left-p">Ending in: {timeData.time_left_from_now} </p>
        </Col>
        <p className={"proposal-list-summary-p"}> {props.proposal.summary}</p>
        <p className={"proposal-list-props.proposal-by-p"}>proposal by</p>
        <Row className={"u-dao-card-btm-details-wrapper"}>
          <Col className={"proposal-list-card-btm-user-details-left-ctn"}>
            <Link className={"proposal-list-props.proposal-avi-link"} to={`/user/${props.proposal.proposer}`}>
              {" "}
              <Avatar src={<ContentImage {...proposerObj} />} className="proposal-list-props.proposal-avi-cmpt" />
            </Link>
          </Col>
          <Col className={"proposal-list-card-btm-user-details-right-ctn"}>
            <p className={"proposal-list-card-btm-user-display-name-p"}>{props.proposal.proposer}</p>
            {isUserVerified && (
              <span className="u-margin-left-medium">
                <VerifiedIcon />
              </span>
            )}
            <p className="view-proposal-user-full-name-p">{proposerObj.fullName}</p>
          </Col>
        </Row>
      </Col>
    </Link>
  );
};
