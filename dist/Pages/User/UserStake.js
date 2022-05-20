import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Spin } from "antd";
import { MaskedInput } from "antd-mask-input";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useParams } from "react-router";
import { pad } from "src/utils/pad";
import { ContentLayout } from "../../Components/ContentLayout";
import { UserWidgetHeading } from "../../Components/UserWidget";
import { useCachedUser } from "../../hooks/useCached";
import { useActions, useAppState } from "../../overmind";
const fixValue = (v) => v
    .replace(/[^\d\.]/g, "")
    .replace(/^(\d+)\.(\d+)?(.*)$/, (_, m1, m2) => {
    return `${m1.slice(0, 6)}.${pad((m2 || "").slice(0, 4), 4, "left")}`;
});
export const UserStakeButton = ({ user, }) => {
    const actions = useActions();
    const u = useCachedUser(user, true);
    const [staking, setStaking] = useState(false);
    const [staked, setStaked] = useState(false);
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
    return (_jsx(Button, { disabled: !!staking, className: "nl-button-primary text-bold", type: "primary", onClick: doStake, children: staking ? _jsx(_Fragment, { children: "In progress" }) : _jsx(_Fragment, { children: "Stake" }) }));
};
export const UserStake = ({ user: _user, }) => {
    const [activeKey, setActiveKey] = useState("0");
    const actions = useActions();
    const state = useAppState();
    const [form] = useForm();
    const { id } = useParams();
    // const [form, setForm] = useState<{ amount: string }>({ amount: "100.0000" });
    // const user = id ? state.api.cache.users[id] || {} : _user;
    const user = useCachedUser(id ? { id } : _user);
    // useEffect(() => (actions.api.user.read({ id: user.id || "" }) && undefined), [state.auth.authenticated]);
    const stake = async (f) => {
        if (/\d{1,6}.\d{4}/.test(f.amount)) {
            actions.api.user.stake({ user, amount: f.amount });
        }
        else
            form.setFieldsValue({ amount: fixValue(f.amount) });
    };
    // if(state.auth)
    if (!user)
        return _jsx(Spin, {});
    if (!/\.(io|nco)/.test(user.username || ""))
        return (_jsxs("p", { children: ["At the moment can only stake on .io and .nco accounts (got ~", id, " ", user.username, ")"] }));
    // if (state.api.stakeHistory.find(e => e.user.id === user.id))
    // if ()p
    //     return <div>
    //         <h2>
    //             Thank you
    //         </h2>
    //         <h3>you just staked on {user.username}. Reload the page to stake again.</h3>
    //     </div>
    const recentlyStaked = state.websockets.messages.newcoin.filter((msg) => {
        return (msg.original.recipient === user.id &&
            msg.original.payload.message == "stake_sent");
    });
    return (_jsxs(ContentLayout, { header: "Support " + user.username, info: _jsx(UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), children: [recentlyStaked.length ? (_jsxs(_Fragment, { children: [_jsx("h2", { className: "header-2", children: "Thanks for your support!" }), _jsxs("p", { children: [" ", "You recently staked on ", user.username, " ", recentlyStaked.length, " times:", " ", recentlyStaked
                                .map((m) => m.original.updated)
                                .join(", ")] }), _jsx("p", { children: "You are welcome to stake again." })] })) : (""), _jsxs(Form, { form: form, onFinish: stake, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off", children: [_jsx(Form.Item, { name: "amount", rules: [{ required: true, message: "Enter amount please" }], children: _jsx(MaskedInput, { style: { fontSize: 100, textAlign: "center" }, size: "large", mask: "xxxxxxxxxxx", placeholderChar: "\u200C", placeholder: "100.0000", 
                            // value={form.amount}
                            onChange: (v) => {
                                const amount = fixValue(v.target.value);
                                console.log({ amount });
                                form.setFieldsValue({ amount });
                            }, formatCharacters: {
                                x: {
                                    validate: function (char) {
                                        return /[\d\.]/.test(char);
                                    },
                                    transform: function (char) {
                                        return char.toLowerCase();
                                    },
                                },
                            } }) }), _jsx(Form.Item, { className: "text-center", children: _jsx(Button, { size: "large", type: "primary", htmlType: "submit", children: "Stake" }) })] })] }));
};
//# sourceMappingURL=UserStake.js.map