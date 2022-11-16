import { Col, Dropdown, Row, Tabs } from "antd";
import { CrossCircle } from "./Icons/CrossCircle";
import { IOView } from "../types";
import { NCOLogo } from "./Icons/NCOLogo";
import { RefObject, useEffect, useRef, useState } from "react";
import { UserNewcoinPoolsParticipation } from "./UserWidget";
import { VerifiedIcon } from "./Icons/VerifiedIcon";
import { VerifiedIconLight } from "./Icons/VerifiedIconLight";
import { useActions, useAppState } from "../overmind";
import { useVerified } from "../hooks/useVerified";
import OutsideClickHandler from "react-outside-click-handler";

const roundCurrency = (vals: string[]) => {
  const val = vals?.length ? vals[0] : " ";
  const [n, c] = val.split(/ /);
  return n.replace(/\.?0+$/, "") + " " + c;
};

export const Wallet: IOView<{
  walletShown: boolean;
}> = ({ walletShown }) => {
  const state = useAppState();
  const actions = useActions();
  const user = state.api.auth.user;
  const ncoBalance = state.newcoin.account;
  const gncoBalance = state.newcoin.mainPool;
  const { verifiedUsers } = useVerified([user.username || ""]);
  const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);
  if (!user) return <></>;

  const rowGutter = !(ncoBalance.length === 0 && gncoBalance.length === 0) ? 0 : 24;
  // const walletShown = !!state.flows.userJourney.flags.walletShown;

  const setVisible = (value: boolean) =>
    actions.flows.userJourney.setFlag({
      flag: "walletShown",
      value: value ? "true" : "",
    });

  return (
    <div
      className="nl-white-box"
      style={{
        minWidth: "min(450px, 100vh)",
        padding: 0,
      }}
    >
      <div style={{ width: "100%", textAlign: "end", padding: "20px" }}>
        <span onClick={() => setVisible(!walletShown)} style={{ cursor: "pointer", padding: "30px 10px 0px 20px" }}>
          <CrossCircle />
        </span>
      </div>
      <div style={{ padding: "0px 40px 40px 40px" }}>
        <p className="text-left header-3 u-margin-bottom-medium">
          {user.username}
          {isUserVerified ? (
            <span className="nl-wallet-verificationIcon" style={{ position: "relative", padding: 10 }}>
              <VerifiedIcon style={{ position: "absolute" }} />
            </span>
          ) : (
            false
          )}
        </p>
        <Row gutter={rowGutter}>
          <Col
            className="text-left"
            style={{
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            {roundCurrency(ncoBalance.acc_balances)}
          </Col>
          <Col
            className="text-left"
            style={{
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            {roundCurrency(gncoBalance.acc_balances)}
          </Col>
        </Row>
      </div>
      <div className="wallet-usernames-wrapper">
        {/* <UserNewcoinInfo user={user} /> */}
        <UserNewcoinPoolsParticipation user={user} isWalletUsage />
      </div>
      <br />
    </div>
  );
};

export const WalletWidget: IOView = () => {
  const state = useAppState();
  const actions = useActions();

  const walletShown = !!state.flows.userJourney.flags.walletShown;

  const setVisible = (value: boolean) =>
    actions.flows.userJourney.setFlag({
      flag: "walletShown",
      value: value ? "true" : "",
    });

  useEffect(() => {
    setVisible(false);
  }, []);
  return (
    <div>
      <Dropdown
        visible={walletShown}
        // onVisibleChange={(val) => setVisible(val)}
        overlayStyle={{}}
        overlay={<Wallet walletShown={walletShown} />}
      >
        <div onClick={() => setVisible(!walletShown)}>
          <NCOLogo />
        </div>
      </Dropdown>
    </div>
  );
};
