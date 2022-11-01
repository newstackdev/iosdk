import { Button, Modal } from "antd";
import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { Form, Input } from "antd-latest";
import { NLView } from "../../../../types";
import { NewcoinRecept } from "../../../../Components/Recepts";
import { ProgressButton } from "../../../../Components/ProgressButton";
import { VOTE_STEPS, VOTE_STEPS_TYPE } from "../../../../overmind/flows/vote/state";
import { pad } from "../../../../utils/pad";
import { useActions, useAppState } from "../../../../overmind";
import { useCachedPool, useCachedUser } from "../../../../hooks/useCached";
import { useEffect, useState } from "react";

export const VoteModal: NLView<{
  mode?: VOTE_STEPS_TYPE;
  quantity?: string;
  option?: string;
  daoOwner?: string;
  proposal?: any;
  proposalId?: number;
  proposal_type?: string;
  visible?: boolean;
}> = ({ quantity, option, proposalId, proposal_type, daoOwner: _do, visible }) => {
  const actions = useActions();
  const state = useAppState();
  const daoOwner = _do || state.config.settings.newcoin.daoDomain || "";

  const owner = useCachedUser({ username: daoOwner });
  const pool = useCachedPool({ owner: daoOwner });

  const ticker = owner.newcoinTicker?.toUpperCase();

  const normalizeQuantity = (q) => {
    const [whole, decimal] = q.split(/\./);
    const padded = pad(decimal || "", 4, "right");
    return [whole, padded].join(".");
  };

  const [form] = Form.useForm();
  const voteVal = Form.useWatch("option", form);

  const [tx, setTx] = useState("");
  const [voteValState, setVoteValState] = useState("");
  const [quantityState, setQuantityState] = useState("");

  const [_mode, setMode] = useState<VOTE_STEPS_TYPE>(VOTE_STEPS.DISABLED);

  const startVoting = () => setMode(VOTE_STEPS.SELECT);
  const endVoting = () => {
    setMode(VOTE_STEPS.DISABLED);
    actions.newcoin[proposal_type === "whitelist" ? "daoGetWhitelistProposals" : "daoGetProposals"]({ daoOwner });
  };

  useEffect(() => setVoteValState(voteVal), [voteVal]);

  const vote = async () => {
    const res = await actions.newcoin.daoVoteProposal({
      quantity: normalizeQuantity(quantityState || quantity) + " " + ticker,
      option: voteValState || option,
      proposal_id: proposalId?.toString(),
      dao_owner: daoOwner,
      proposal_type: proposal_type,
    });
    const success = !!res.TxID_voteDaoProposal;
    if (success) {
      setTx(res.TxID_voteDaoProposal);
      setMode(VOTE_STEPS.DONE);
    }
  };

  return (
    <>
      <NewcoinRecept tx={tx} visible={_mode == VOTE_STEPS.DONE} onDone={endVoting}>
        {" "}
        <h1 className={"view-proposal-vote-h1"}>Congratulations! </h1>
        <p className={"view-proposal-vote-p"}>
          You locked {quantityState} ${`${ticker}`} to vote {voteValState} on this proposal!
        </p>
      </NewcoinRecept>

      {visible && (
        <>
          <Button className={"power-up-btn"} onClick={startVoting}>
            Vote
          </Button>

          <Form form={form} name={"vote-proposal-form"}>
            <Modal
              closeIcon={<CrossCircle />}
              visible={_mode == VOTE_STEPS.SELECT}
              onOk={() => setMode(VOTE_STEPS.LOCK)}
              onCancel={() => setMode(VOTE_STEPS.DISABLED)}
              className="modal-ctn"
              footer={[]}
            >
              <h2>Give your vote!</h2>
              <p>Vote on this proposal! 💚 🔮</p>

              <Button
                className={"confirm-btn"}
                onClick={() => {
                  setVoteValState("YES");
                  setMode(VOTE_STEPS.LOCK);
                }}
              >
                YES
              </Button>

              <Button
                className={"cancel-btn"}
                onClick={() => {
                  setVoteValState("NO");
                  setMode(VOTE_STEPS.LOCK);
                }}
              >
                NO
              </Button>

              <p>
                This is only on Testnet! Need help? Join our telegram group!
                <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ">Join our telegram group!</a>
              </p>
            </Modal>

            <Modal
              closeIcon={<CrossCircle />}
              visible={_mode == VOTE_STEPS.LOCK}
              onOk={() => setMode(VOTE_STEPS.CONFIRM)}
              onCancel={() => setMode(VOTE_STEPS.DISABLED)}
              className="modal-ctn"
              footer={[]}
            >
              <h2>Give your vote!</h2>
              <p>Lock a minimum of 1 ${pool.code} to confirm your vote!</p>

              <Form.Item name="quantity">
                <Input placeholder={"100"} suffix={`$${ticker}`} onChange={(e) => setQuantityState(e.target.value)} />
              </Form.Item>

              <Button
                id={"vote-lock-btn"}
                className={"confirm-btn"}
                onClick={() => {
                  setMode(VOTE_STEPS.CONFIRM);
                }}
              >
                Lock
              </Button>

              <Button
                className={"cancel-btn"}
                onClick={() => {
                  setVoteValState("NO");
                  setMode(VOTE_STEPS.DISABLED);
                }}
              >
                Cancel
              </Button>

              <p>
                This is only on Testnet! Need help? Join our telegram group!
                <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ">Join our telegram group!</a>
              </p>
            </Modal>

            <Modal
              closeIcon={<CrossCircle />}
              visible={_mode == VOTE_STEPS.CONFIRM}
              onOk={() => setMode(VOTE_STEPS.VOTE)}
              onCancel={() => setMode(VOTE_STEPS.DISABLED)}
              className="modal-ctn"
              footer={[]}
            >
              <h2>Confirm your vote! </h2>
              <p>
                Are you sure you want to lock {quantityState} ${ticker} to vote {voteValState}
              </p>

              <Button
                id={"vote-confirm-btn"}
                className={"confirm-btn"}
                onClick={() => {
                  setMode(VOTE_STEPS.VOTE);
                }}
              >
                Confirm
              </Button>

              <Button
                className={"cancel-btn"}
                onClick={() => {
                  setVoteValState("NO");
                  setMode(VOTE_STEPS.DISABLED);
                }}
              >
                Cancel
              </Button>

              <p>
                This is only on Testnet! Need help? Join our telegram group!
                <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ">Join our telegram group!</a>
              </p>
            </Modal>

            <Modal
              closeIcon={<CrossCircle />}
              visible={_mode == VOTE_STEPS.VOTE}
              onOk={() => setMode(VOTE_STEPS.DONE)}
              onCancel={() => setMode(VOTE_STEPS.DISABLED)}
              className="modal-ctn"
              footer={[]}
            >
              <h2> You Selected {voteValState}! </h2>
              <p>
                You are locking <br />
                <br />
                <span className={"header-1r"}>
                  {quantityState} ${`${ticker}`}
                </span>
              </p>

              <ProgressButton
                id={"vote-submit-btn"}
                actionName="newcoin.daoVoteProposal"
                progressText="Voting..."
                onClick={vote}
                className={"confirm-btn"}
              >
                {" "}
                Vote
              </ProgressButton>
            </Modal>
          </Form>
        </>
      )}
    </>
  );
};
