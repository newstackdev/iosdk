import { Button } from "antd";
import { Col, Modal } from "antd-latest";
import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { useActions } from "../../../../overmind";
import { useState } from "react";

export const GetWhitelistedModal = ({ daoOwner }) => {
  const states = {
    disabled: 0,
    start: 1,
  };

  const [mode, setMode] = useState(states.start);
  const actions = useActions();

  return (
    <Modal
      closeIcon={<CrossCircle />}
      visible={mode == states.start}
      onCancel={() => setMode(states.disabled)}
      className="modal-ctn"
      footer={[]}
    >
      <Col>
        <h2>Oops! You're not a member</h2>
        <p className={"u-margin-top-large u-margin-bottom-large"}>
          You need to be nominated and approved by the DAO members before you can vote! Ask a member of the DAO to submit a new
          member proposal on your behalf.
        </p>
      </Col>
      <Button onClick={() => setMode(states.disabled)} className={"confirm-btn"}>
        {" "}
        Okay
      </Button>

      <Button
        className={"cancel-btn"}
        onClick={() => {
          actions.routing.historyPush({ location: `/dao/${daoOwner}/proposals` });
        }}
      >
        {" "}
        Back to DAO
      </Button>
    </Modal>
  );
};
