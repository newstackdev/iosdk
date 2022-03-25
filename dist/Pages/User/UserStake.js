"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStake = exports.UserStakeButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var antd_mask_input_1 = require("antd-mask-input");
var Form_1 = require("antd/lib/form/Form");
var react_1 = require("react");
var react_router_1 = require("react-router");
var ContentLayout_1 = require("../../Components/ContentLayout");
var UserWidget_1 = require("../../Components/UserWidget");
var useCached_1 = require("../../hooks/useCached");
var overmind_1 = require("../../overmind");
var pad = function (s, n, where) {
    return (where == "left" ? s : "") +
        "0".repeat(n - s.length) +
        (where == "left" ? "" : s);
};
var fixValue = function (v) {
    return v
        .replace(/[^\d\.]/g, "")
        .replace(/^(\d+)\.(\d+)?(.*)$/, function (_, m1, m2) {
        return "".concat(m1.slice(0, 6), ".").concat(pad((m2 || "").slice(0, 4), 4, "left"));
    });
};
var UserStakeButton = function (_a) {
    var user = _a.user;
    var actions = (0, overmind_1.useActions)();
    var u = (0, useCached_1.useCachedUser)(user, true);
    var _b = (0, react_1.useState)(false), staking = _b[0], setStaking = _b[1];
    var _c = (0, react_1.useState)(false), staked = _c[0], setStaked = _c[1];
    var doStake = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setStaking(true);
                    return [4 /*yield*/, actions.api.user.stake({
                            user: u,
                            amount: "1000.0000 NCO",
                        })];
                case 1:
                    _a.sent();
                    setStaking(false);
                    setStaked(true);
                    return [2 /*return*/];
            }
        });
    }); };
    if (staking || staked)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ disabled: !!staking, className: "nl-button-primary text-bold", type: "primary", onClick: doStake }, { children: staking ? (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "In progress" }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Stake" }) })));
};
exports.UserStakeButton = UserStakeButton;
var UserStake = function (_a) {
    var _user = _a.user;
    var _b = (0, react_1.useState)("0"), activeKey = _b[0], setActiveKey = _b[1];
    var actions = (0, overmind_1.useActions)();
    var state = (0, overmind_1.useAppState)();
    var form = (0, Form_1.useForm)()[0];
    var id = (0, react_router_1.useParams)().id;
    // const [form, setForm] = useState<{ amount: string }>({ amount: "100.0000" });
    // const user = id ? state.api.cache.users[id] || {} : _user;
    var user = (0, useCached_1.useCachedUser)(id ? { id: id } : _user);
    // useEffect(() => (actions.api.user.read({ id: user.id || "" }) && undefined), [state.auth.authenticated]);
    var stake = function (f) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (/\d{1,6}.\d{4}/.test(f.amount)) {
                actions.api.user.stake({ user: user, amount: f.amount });
            }
            else
                form.setFieldsValue({ amount: fixValue(f.amount) });
            return [2 /*return*/];
        });
    }); };
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
    var recentlyStaked = state.websockets.messages.newcoin.filter(function (msg) {
        return (msg.original.recipient === user.id &&
            msg.original.payload.message == "stake_sent");
    });
    return ((0, jsx_runtime_1.jsxs)(ContentLayout_1.ContentLayout, __assign({ header: "Support " + user.username, info: (0, jsx_runtime_1.jsx)(UserWidget_1.UserWidgetHeading, { user: user, setActiveKey: setActiveKey }) }, { children: [recentlyStaked.length ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "header-2" }, { children: "Thanks for your support!" })), (0, jsx_runtime_1.jsxs)("p", { children: [" ", "You recently staked on ", user.username, " ", recentlyStaked.length, " times:", " ", recentlyStaked
                                .map(function (m) { return m.original.updated; })
                                .join(", ")] }), (0, jsx_runtime_1.jsx)("p", { children: "You are welcome to stake again." })] })) : (""), (0, jsx_runtime_1.jsxs)(antd_1.Form, __assign({ form: form, onFinish: stake, 
                // onFinishFailed={onFinishFailed}
                autoComplete: "off" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ name: "amount", rules: [{ required: true, message: "Enter amount please" }] }, { children: (0, jsx_runtime_1.jsx)(antd_mask_input_1.MaskedInput, { style: { fontSize: 100, textAlign: "center" }, size: "large", mask: "xxxxxxxxxxx", placeholderChar: "\u200C", placeholder: "100.0000", 
                            // value={form.amount}
                            onChange: function (v) {
                                var amount = fixValue(v.target.value);
                                console.log({ amount: amount });
                                form.setFieldsValue({ amount: amount });
                            }, formatCharacters: {
                                x: {
                                    validate: function (char) {
                                        return /[\d\.]/.test(char);
                                    },
                                    transform: function (char) {
                                        return char.toLowerCase();
                                    },
                                },
                            } }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, __assign({ className: "text-center" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ size: "large", type: "primary", htmlType: "submit" }, { children: "Stake" })) }))] }))] })));
};
exports.UserStake = UserStake;
//# sourceMappingURL=UserStake.js.map