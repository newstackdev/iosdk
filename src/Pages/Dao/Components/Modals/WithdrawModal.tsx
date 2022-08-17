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
      <Button className={"power-up-btn"} onClick={() => setMode(withdrawStates.start)}>
        Withdraw {Math.round(quantity) || ""}
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
        className="modal-ctn"
        footer={[]}
      >
        <h2>This proposal has expired!</h2>
        <p>Your vote is ready to be withdrawn</p>

        {quantity && (
          <ProgressButton
            actionName={"newcoin.daoWithdrawVoteDeposit"}
            progressText="Withdrawing..."
            onClick={withdraw}
            className={"confirm-btn"}
          >
            Withdraw {Math.round(quantity)}
          </ProgressButton>
        )}

        <Button onClick={() => setMode(withdrawStates.disabled)} className={"cancel-btn"}>
          {" "}
          Cancel
        </Button>

        <p>This is only on Testnet! Need help? Join our telegram group!</p>
      </Modal>
    </div>
  );
};
