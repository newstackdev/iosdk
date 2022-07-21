import { Button } from "antd";
import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { Modal } from "antd-latest";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { useActions } from "../../../../overmind";
import { useState } from "react";

export const WithdrawForm = ({ vote_id, quantity }) => {
  const withdrawStates = {
    disabled: 0,
    start: 1,
    reciept: 2,
    end: 3,
  };

  const actions = useActions();
  const [mode, setMode] = useState(withdrawStates.disabled);
  const [tx, setTx] = useState("");

  const withdraw = async () => {
    const res = await actions.newcoin.daoWithdrawVoteDeposit({ vote_id });
    const success = !!res.TxID_WithdrawVoteDeposit;
    if (success) {
      setTx(res.TxID_WithdrawVoteDeposit);
      setMode(withdrawStates.reciept);
    }
  };

  const endWithdrawing = async () => {
    setMode(withdrawStates.disabled);
    await actions.newcoin.getAccountBalance();
  };

  return (
    <div style={{ color: "white" }}>
      <Button className={"u-dao-view-btn"} onClick={() => setMode(withdrawStates.start)}>
        Withdraw {quantity || ""}
      </Button>
      &nbsp;
      <NewcoinRecept tx={tx} visible={mode == withdrawStates.reciept} onDone={endWithdrawing}>
        {" "}
        <h1 className={"view-proposal-vote-h1"}>Nice! </h1>
        <p className={"view-proposal-vote-p"}>You've withdrawn your {quantity} vote deposit.</p>
      </NewcoinRecept>
      <Modal
        closeIcon={<CrossCircle />}
        visible={mode == withdrawStates.start && quantity}
        onCancel={() => setMode(withdrawStates.disabled)}
        className="nl-white-box-modal view-proposal-vote-ctn"
        footer={[]}
      >
        <p>Your vote for this expired proposal is ready to be withdrawn</p>
        <br />
        {quantity && (
          <ProgressButton
            actionName={"newcoin.daoWithdrawVoteDeposit"}
            progressText="Withdrawing..."
            type={"primary"}
            onClick={withdraw}
          >
            Withdraw {quantity}
          </ProgressButton>
        )}
      </Modal>
    </div>
  );
};
