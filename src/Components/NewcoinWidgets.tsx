import { Callback, NLView } from "../types";
import { Col, Row } from "antd";
import { MoodReadResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { useAppState } from "../overmind";
import { useCachedNewconAccountHistory } from "../hooks/useCached";

export interface Total {
  quantity: string;
  contract: string;
}

export interface StakeInfo {
  id: number;
  code: string;
  owner: string;
  description: string;
  total: Total;
  creation_date: Date;
  last_update_date: Date;
}

export const StakeControl: NLView<{ stakeInfo: StakeInfo }> = ({ stakeInfo }) => {
  return (
    <>
      <Row justify="space-between" className="app-main-full-width">
        <Col>{stakeInfo.owner}</Col>
        <Col>{stakeInfo.total.quantity}</Col>
        {/* <Col>{stakeInfo.total.contract}</Col> */}
      </Row>
    </>
  );
};

export const UserHistoryControl: NLView<{ user: { username?: string } }> = ({ user }) => {
  const history = useCachedNewconAccountHistory(user);
  return (
    <>
      Hist{" "}
      {history?.actions?.map((h) => (
        <pre style={{ fontSize: 10 }}>{JSON.stringify(h, null, "\t")}</pre>
      ))}
    </>
  );
};

export const NewcoinWidget: NLView<{ user: { username?: string } }> = ({ user: { username } }) => {
  const state = useAppState();
  return (
    <>
      <UserHistoryControl user={{ username }} />
      Account: {JSON.stringify(state.newcoin.account)}
      <h3>Pools</h3>
      {JSON.stringify(state.newcoin?.cache.pools)}
      {/* {state.newcoin?.pool?.rows?.map((stakeInfo: StakeInfo) => <StakeControl stakeInfo={stakeInfo} />)} */}
    </>
  );
};
