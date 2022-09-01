import { Button, Form, Input, Result, Space, Spin } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { MaskedInput } from "antd-mask-input";
import { NLView } from "../../types";
import { SyntheticEvent, useEffect, useState } from "react";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { UserWidgetHeading } from "../../Components/UserWidget";
import { pad } from "../../utils/pad";
import { useActions, useAppState } from "../../overmind";
import { useCachedUser } from "../../hooks/useCached";
import { useForm } from "antd/lib/form/Form";
import { useParams } from "react-router";

const fixValue = (v: string) =>
  v.replace(/[^\d\.]/g, "").replace(/^(\d+)\.(\d+)?(.*)$/, (_: string, m1: string, m2: string) => {
    return `${m1.slice(0, 6)}.${pad((m2 || "").slice(0, 4), 4, "left")}`;
  });

export const UserStakeButton: NLView<{ user: UserReadPublicResponse }> = ({ user }) => {
  const actions = useActions();
  const u = useCachedUser(user, true);
  const [staking, setStaking] = useState<Boolean>(false);
  const [staked, setStaked] = useState<Boolean>(false);

  const doStake = async () => {
    setStaking(true);
    await actions.api.user.stake({
      user: u,
      amount: "1000.0000 NCO",
    });
    setStaking(false);
    setStaked(true);
  };

  // if (staking || staked) return <UserStake
  // 		onDone={() => setStaking(false)}
  // 		hideButton={true}
  // 		user={user}
  // 		mode={STAKE_STEPS.SELECT}
  // 	/>;

  return (
    <Button disabled={!!staking} className="nl-button-primary text-bold" type="primary" onClick={doStake}>
      {staking ? <>In progress</> : <>Stake</>}
    </Button>
  );
};

export const UserStake: NLView<{ user: UserReadPublicResponse }> = ({ user: _user }) => {
  const actions = useActions();
  const state = useAppState();
  const [form] = useForm<{ amount: string }>();

  const { id } = useParams<{ id: string }>();

  // const [form, setForm] = useState<{ amount: string }>({ amount: "100.0000" });
  // const user = id ? state.api.cache.users[id] || {} : _user;

  const user = useCachedUser(id ? { id } : _user);

  // useEffect(() => (actions.api.user.read({ id: user.id || "" }) && undefined), [state.auth.authenticated]);

  const stake = async (f: { amount: string }) => {
    if (/\d{1,6}.\d{4}/.test(f.amount)) {
      actions.api.user.stake({ user, amount: f.amount });
    } else form.setFieldsValue({ amount: fixValue(f.amount) });
  };

  // if(state.auth)
  if (!user) return <Spin />;

  if (!/\.(io|nco)/.test(user.username || ""))
    return (
      <p>
        At the moment can only stake on .io and .nco accounts (got ~{id} {user.username})
      </p>
    );

  // if (state.api.stakeHistory.find(e => e.user.id === user.id))
  // if ()p
  //     return <div>
  //         <h2>
  //             Thank you
  //         </h2>
  //         <h3>you just staked on {user.username}. Reload the page to stake again.</h3>
  //     </div>

  const recentlyStaked = state.websockets.messages.newcoin.filter((msg) => {
    return msg.original.recipient === user.id && msg.original.payload.message == "stake_sent";
  });

  return (
    <ContentLayout header={"Support " + user.username} info={<UserWidgetHeading user={user} />}>
      {recentlyStaked.length ? (
        <>
          <h2 className="header-2">Thanks for your support!</h2>
          <p>
            {" "}
            You recently staked on {user.username} {recentlyStaked.length} times:{" "}
            {recentlyStaked.map((m) => m.original.updated).join(", ")}
          </p>
          <p>You are welcome to stake again.</p>
        </>
      ) : (
        ""
      )}
      <Form
        form={form}
        onFinish={stake}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="amount" rules={[{ required: true, message: "Enter amount please" }]}>
          <MaskedInput
            style={{ fontSize: 100, textAlign: "center" }}
            size="large"
            mask="xxxxxxxxxxx"
            placeholderChar="&zwnj;"
            placeholder="100.0000"
            // value={form.amount}
            onChange={(v: SyntheticEvent & { target: { value: string } }) => {
              const amount = fixValue(v.target.value);
              console.log({ amount });
              form.setFieldsValue({ amount });
            }}
            formatCharacters={{
              x: {
                validate: function (char: string) {
                  return /[\d\.]/.test(char);
                },
                transform: function (char: string) {
                  return char.toLowerCase();
                },
              },
            }}
          />

          {/* <Input size="large" placeholder="amount" width="3ch" type="number" prefix="NCO" /> */}
        </Form.Item>
        <Form.Item className="text-center">
          <Button size="large" type="primary" htmlType="submit">
            Stake
          </Button>
        </Form.Item>
      </Form>
    </ContentLayout>
  );
};
