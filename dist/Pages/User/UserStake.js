"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStake = exports.UserStakeButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const antd_mask_input_1 = require("antd-mask-input");
const Form_1 = require("antd/lib/form/Form");
const react_1 = require("react");
const react_router_1 = require("react-router");
const ContentLayout_1 = require("../../Components/ContentLayout");
const UserWidget_1 = require("../../Components/UserWidget");
const useCached_1 = require("../../hooks/useCached");
const overmind_1 = require("../../overmind");
const pad = (s, n, where) => (where == "left" ? s : "") +
    "0".repeat(n - s.length) +
    (where == "left" ? "" : s);
const fixValue = (v) => v
    .replace(/[^\d\.]/g, "")
    .replace(/^(\d+)\.(\d+)?(.*)$/, (_, m1, m2) => {
    return `${m1.slice(0, 6)}.${pad((m2 || "").slice(0, 4), 4, "left")}`;
});
const UserStakeButton = ({ user, }) => {
    const actions = (0, overmind_1.useActions)();
    const u = (0, useCached_1.useCachedUser)(user, true);
    const [staking, setStaking] = (0, react_1.useState)(false);
    const [staked, setStaked] = (0, react_1.useState)(false);
    const doStake = async () => {
        setStaking(true);
        await actions.api.user.stake({
            user: u,
            amount: "1000.0000 NCO",
        });
        setStaking(false);
        setStaked(true);
    };
    if (staking || staked)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !!staking, className: "nl-button-primary text-bold", type: "primary", onClick: doStake, children: staking ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "In progress" }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Stake" }) }));
};
exports.UserStakeButton = UserStakeButton;
const UserStake = ({ user: _user, }) => {
    const [activeKey, setActiveKey] = (0, react_1.useState)("0");
    const actions = (0, overmind_1.useActions)();
    const state = (0, overmind_1.useAppState)();
    const [form] = (0, Form_1.useForm)();
    const { id } = (0, react_router_1.useParams)();
    // const [form, setForm] = useState<{ amount: string }>({ amount: "100.0000" });
    // const user = id ? state.api.cache.users[id] || {} : _user;
    const user = (0, useCached_1.useCachedUser)(id ? { id } : _user);
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
        return (0, jsx_runtime_1.jsx)(antd_1.Spin, {});
    if (!/\.(io|nco)/.test(user.username || ""))
        return ((0, jsx_runtime_1.jsxs)("p", { children: ["At the moment can only stake on .io and .nco accounts at the moment (got ~", id, " ", user.username, ")"] }));
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
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, { header: "Support " + user.username, info: (0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }), children: [recentlyStaked.length ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "header-2", children: "Thanks for your support!" }), (0, jsx_runtime_1.jsxs)("p", { children: [" ", "You recently staked on ", user.username, " ", recentlyStaked.length, " times:", " ", recentlyStaked
                                .map((m) => m.original.updated)
                                .join(", ")] }), (0, jsx_runtime_1.jsx)("p", { children: "You are welcome to stake again." })] })) : (""), (0, jsx_runtime_1.jsxs)(antd_1.Form, { form: form, onFinish: stake, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off", children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "amount", rules: [{ required: true, message: "Enter amount please" }], children: (0, jsx_runtime_1.jsx)(antd_mask_input_1.MaskedInput, { style: { fontSize: 100, textAlign: "center" }, size: "large", mask: "xxxxxxxxxxx", placeholderChar: "\u200C", placeholder: "100.0000", 
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
                            } }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { className: "text-center", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", htmlType: "submit", children: "Stake" }) })] })] }));
};
exports.UserStake = UserStake;
//# sourceMappingURL=UserStake.js.map