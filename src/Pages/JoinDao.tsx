import { APP_DOMAIN } from "../config";
import { CrossCircle } from "../Components/Icons/CrossCircle";
import { EmbeddableControl } from "../types";
import { Link } from "react-router-dom";
import { UserStake } from "../Components/UserWidget";
import { useActions, useAppState } from "../overmind";
import { useState } from "react";
import Modal from "antd/lib/modal/Modal";

export const JoinDaoWidget = ({ embedded, setNext }: React.PropsWithChildren<EmbeddableControl>) => {
  const state = useAppState();
  const actions = useActions();
  const justStaked = [...state.api.cache.stakeHistory].reverse().find((h) => h.user.username === APP_DOMAIN);
  const isStaking = state.indicators.specific["api.user.stake"];
  const APP_USER = { username: APP_DOMAIN };
  const [visible, setVisible] = useState<boolean>(true);

  // const [staking, setStaking] = useState(false);

  const currentStake = (state.newcoin.pools || {})["CGY"];
  const isMember = currentStake >= 1087;

  const done = (
    { stakeDelta, stakeValue, preStakeValue }: { stakeDelta: number; stakeValue: number; preStakeValue: number } = {
      stakeDelta: 0,
      stakeValue: 0,
      preStakeValue: 0,
    },
  ) => {
    if (
      isMember &&
      ((!preStakeValue && stakeDelta && state.flows.user.create.justCreated) || !state.flows.user.create.justCreated) &&
      /^\/?$/.test(state.routing.location)
      // !justStaked &&
      // !isStaking
    ) {
      actions.routing.historyPush({ location: "/explore" });
      return <></>;
    }
  };

  done();

  if (!state.newcoin.pools || !state.api.auth.user?.id) return <></>;

  if (!state.api.auth.authorized)
    //  || state.indicators.isWorking
    return <></>;

  const minValue = isMember ? 100 : 1087;

  return (
    <Modal
      visible={visible}
      className="nl-white-box-modal text-center"
      footer={false}
      closeIcon={isMember ? <CrossCircle /> : <></>}
      onCancel={() => {
        if (!isMember) return;
        setVisible(false);
        actions.routing.historyPush({ location: "/explore" });
      }}
    >
      {/* {JSON.stringify(useAppState().newcoin.pools["CGY"])} */}
      {isMember ? (
        <>
          <h2 className="text-left text-bold">You are a member of the Newlife DAO</h2>
          <div style={{ textAlign: "left" }}>
            You may increase your stake or visit the <Link to={`/user/${APP_DOMAIN}`}>${APP_DOMAIN}</Link> home page.
          </div>
        </>
      ) : (
        <>
          <h2 style={{ width: "100%", textAlign: "start" }} className="header-2">
            Join the Newlife DAO
          </h2>
          <p style={{ textAlign: "left", margin: "0" }} className="paragraph-1r">
            Newlife is governed by the community. To join the app, you need to own at least 1000 $LIFE on your account.
          </p>
          <div style={{ padding: "20px 0" }}>
            <p className="header-1b" style={{ margin: 0 }}>
              1087
            </p>
            <p className="paragraph-1r" style={{ margin: 0 }}>
              $GNCO
            </p>
          </div>
          <p style={{ textAlign: "left", margin: "0" }} className="paragraph-1r">
            By clicking "Stake" you will deposit 1087 $GNCO into the DAO to receive 1000 $LIFE tokens. You can recover them
            anytime minus the stake 10% fee.
          </p>
          <div className="text-center">
            {/* <UserStakeButton user={{ id: "66bee450-4134-90de-81b5-d8e196b18372" }} /> */}
            {/* <ProgressButton actionName="api.user.stake" className="nl-button-primary text-bold"
                                type="primary"
                                onClick={() => actions.api.user.stake({ user: APP_USER, amount: "1087.0000" })}>
                                {staking ? <>In progress</> : <>Join the DAO</>}
                            </ProgressButton> */}
          </div>
        </>
      )}

      <UserStake
        user={APP_USER} /*id: "66bee450-4134-90de-81b5-d8e196b18372" */
        value={minValue}
        // mode={isStaking ? STAKE_STEPS.CONFIRM : STAKE_STEPS.DISABLED}
        minValue={minValue}
        onDone={done}
        // onCancel={() => setStaking(false)}
        buttonText={!isMember ? "Join the DAO" : "Stake more"}
      />

      <p style={{ margin: 0, textAlign: "left", width: "100%" }} className="paragraph-1r">
        Learn more about <span className="paragraph-2u"> app staking</span>
      </p>
    </Modal>
  );
};

export const JoinDao = JoinDaoWidget;
