import { Col, Row } from "antd";
import { ProgressBar } from "./Icons";

export const VoteBar = ({ proposal, timeData }) => {
  const yesVotes = Number(proposal.vote_yes?.quantity?.split(" ")[0]);
  const noVotes = Number(proposal.vote_no?.quantity?.split(" ")[0]);
  return (
    <Col className={"votes"}>
      <Row className={"votes-txt"}>
        <p className="paragraph-2b"> {yesVotes} yes votes </p>
        <p className="paragraph-2b"> {noVotes} no votes </p>
      </Row>
      <ProgressBar width={"95%"} proposal={proposal} />
      <Row className={"votes-txt"}>
        <p className="paragraph-2b">
          {timeData.time_to_start_secs > 0 ? "Starting" : "Started"} {timeData.time_to_start}{" "}
        </p>
        <p className="paragraph-2b">
          {timeData.time_left_seconds > 0 ? "Ending" : "Ended"} {timeData.time_left_from_now}{" "}
        </p>
      </Row>
    </Col>
  );
};

export const VoteBarFull = ({ proposal, timeData }) => {
  const yesVotes = Number(proposal.vote_yes?.quantity?.split(" ")[0]);
  const noVotes = Number(proposal.vote_no?.quantity?.split(" ")[0]);
  return (
    <Col className={"votes"}>
      <Row justify={"space-between"}>
        <p className="paragraph-2b"> {yesVotes} yes votes </p>
        <p className="paragraph-2b"> {noVotes} no votes </p>
      </Row>
      <ProgressBar width={"100%"} proposal={proposal} />
      <Row justify={"space-between"}>
        <p className="paragraph-2b">
          {timeData.time_to_start_secs > 0 ? "Starting" : "Started"} {timeData.time_to_start}{" "}
        </p>
        <p className="paragraph-2b">
          {timeData.time_left_seconds > 0 ? "Ending" : "Ended"} {timeData.time_left_from_now}{" "}
        </p>
      </Row>
    </Col>
  );
};
