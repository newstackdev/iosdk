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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrivateInfo = exports.UserNewcoinInfo = exports.UserNewcoinPoolsParticipation = exports.PoolInfoDataRow = exports.UserSocialInfoRow = exports.UsersGrid = exports.UsersHorizontalScroller = exports.UsersList = exports.UserSocialInfo = exports.UserWidgetHeading = exports.UserWidgetTopFixed = exports.UserPowerup = exports.UserStake = exports.STAKE_STEPS = exports.UserWidgetVertical = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var Paragraph_1 = __importDefault(require("antd/lib/typography/Paragraph"));
var react_router_dom_1 = require("react-router-dom");
var useCached_1 = require("../hooks/useCached");
var overmind_1 = require("../overmind");
var DataRow_1 = require("./DataRow");
var Image_1 = require("./Image");
var Links_1 = require("./Links");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var ItemGrid_1 = require("./ItemGrid");
var react_horizontal_scrolling_menu_1 = require("react-horizontal-scrolling-menu");
var usePreventBodyScroll_1 = __importDefault(require("../hooks/usePreventBodyScroll"));
var CrossCircle_1 = require("./Icons/CrossCircle");
var ProgressButton_1 = require("./ProgressButton");
var IndeterminateProgress_1 = require("./IndeterminateProgress");
var RevealInfo_1 = require("./RevealInfo");
var CryptoEntities_1 = require("./CryptoEntities");
var ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
};
var UserWidgetVertical = function (_a) {
    var user = _a.user;
    var u = (0, useCached_1.useCachedUser)({ id: (user === null || user === void 0 ? void 0 : user.id) || "" });
    if (!u)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { marginBottom: 24 } }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(u.username) }, { children: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, { size: "small", width: "100%", src: u.contentUrl }) })), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, __assign({ to: "/user/stake/".concat(u.username), hidden: !u.username }, { children: ["Stake on ", u.username] }))] })));
};
exports.UserWidgetVertical = UserWidgetVertical;
exports.STAKE_STEPS = {
    DISABLED: -1,
    NODAO: 0,
    SELECT: 1,
    CONFIRM: 2,
    DONE: 3,
};
var round = function (v) { return Math.round(v * 1000) / 1000; };
var UserStake = function (_a) {
    var _b;
    var _c;
    var user = _a.user, mode = _a.mode, value = _a.value, minValue = _a.minValue, hideButton = _a.hideButton, buttonText = _a.buttonText, hideSelect = _a.hideSelect, closeOnDone = _a.closeOnDone, onDone = _a.onDone, onCancel = _a.onCancel;
    // const [visible, setVisible] = useState(false);
    var actions = (0, overmind_1.useActions)();
    var poolInfo = (0, useCached_1.useCachedPool)({ owner: user === null || user === void 0 ? void 0 : user.username });
    var _d = (0, react_1.useState)(0), preStakeValue = _d[0], setPrestakeValue = _d[1];
    var _e = (0, react_1.useState)(value || 100), _value = _e[0], setValue = _e[1];
    var _f = (0, react_1.useState)(0.08 * _value), fee = _f[0], setFee = _f[1];
    var state = (0, overmind_1.useAppState)();
    var _g = (0, react_1.useState)(""), tx = _g[0], setTx = _g[1];
    var _h = (0, react_1.useState)(mode !== null && mode !== void 0 ? mode : exports.STAKE_STEPS.DISABLED), _mode = _h[0], setMode = _h[1];
    var _user = (0, useCached_1.useCachedUser)(user, true);
    var balances = ((_c = state.newcoin.account) === null || _c === void 0 ? void 0 : _c.acc_balances) || [];
    var ncoBalance = Number((balances[0] || "").replace(/ NCO$/, ""));
    var membershipValue = state.newcoin.pools[poolInfo.code];
    minValue = minValue || 100;
    var stakeDelta = (membershipValue || 0) - (preStakeValue || 0);
    var hasDao = !!poolInfo.code; // && /\.(io|nco)$/.test(user?.username || "");
    (0, react_1.useEffect)(function () {
        setMode(mode !== null && mode !== void 0 ? mode : exports.STAKE_STEPS.DISABLED);
    }, [mode]);
    (0, react_1.useEffect)(function () {
        !hasDao && _mode >= 0 && setMode(exports.STAKE_STEPS.NODAO);
    }, [hasDao, _mode]);
    var updateValue = function (v) {
        setValue(v);
        setFee(round(0.08 * v));
    };
    var stake = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, historyItem, success;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setPrestakeValue(membershipValue);
                    return [4 /*yield*/, actions.api.user.stake({
                            user: _user,
                            amount: _value + ".0000",
                        })];
                case 1:
                    res = _c.sent();
                    historyItem = __spreadArray([], state.api.cache.stakeHistory, true).reverse()
                        .find(function (h) { return h.user.username === (user === null || user === void 0 ? void 0 : user.username); });
                    success = historyItem && !historyItem.error;
                    // return
                    success && setTx((_b = (_a = historyItem === null || historyItem === void 0 ? void 0 : historyItem.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.TxID_stakeToPool);
                    setMode(success && closeOnDone ? exports.STAKE_STEPS.DISABLED : exports.STAKE_STEPS.DONE);
                    return [2 /*return*/];
            }
        });
    }); };
    var openUrl = function (url) {
        var target = url === "blocks"
            ? "https://local.bloks.io/transaction/".concat(tx, "?") +
                "nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
                "hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org"
            : url === "newcoin"
                ? "https://explorer.newcoin.org/transaction/" + tx
                : "";
        if (target)
            window.open(target, "_new");
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Modal, __assign({ visible: _mode == exports.STAKE_STEPS.NODAO, cancelText: "Ok", 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: function () {
                    setMode(exports.STAKE_STEPS.DISABLED);
                    onDone && onDone({});
                }, okButtonProps: { style: { display: "none" } }, className: "nl-white-box-modal" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ align: "middle", className: "text-center" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 8, className: "nl-avatar" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "medium" }, _user)) }) })) })), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), (0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ align: "middle", className: "text-center" }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 24, className: "nl-avatar" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: _user.username }), (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), "had not created their DAO yet.", (0, jsx_runtime_1.jsx)("div", { className: "section-divider" }), "Please check this profile later."] })) }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Modal, __assign({ visible: _mode === exports.STAKE_STEPS.DONE, okText: "Yes", cancelText: "No", onOk: function () { return stake(); }, 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: function () {
                    onDone &&
                        onDone({
                            preStakeValue: preStakeValue,
                            stakeValue: _value,
                            stakeDelta: stakeDelta,
                        });
                    setMode(exports.STAKE_STEPS.DISABLED);
                }, cancelButtonProps: { value: "No" }, footer: false, className: "nl-white-box-modal" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", className: "text-center" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 8, className: "nl-avatar" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "medium" }, _user)) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 4 }), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12, className: "text-left" }, { children: (0, jsx_runtime_1.jsxs)("div", { children: ["You", " ", preStakeValue
                                            ? "increased your stake in"
                                            : "joined", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("b", __assign({ style: { fontSize: "1.3em" } }, { children: _user === null || _user === void 0 ? void 0 : _user.username })), "'s DAO."] }) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center" }, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h2", __assign({ className: "header-2" }, { children: "Congratulations!" })), preStakeValue ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Your stake in ", _user === null || _user === void 0 ? void 0 : _user.username, "'s DAO increased by", " ", stakeDelta, " ", poolInfo.code, "."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["You are now a member of the ", _user === null || _user === void 0 ? void 0 : _user.username, "'s DAO with all the rights and duties associated."] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("p", __assign({ className: "text-left" }, { children: [_value, " $NCO", (0, jsx_runtime_1.jsx)("br", {}), "\u2014 ", round((fee * 5) / 8), " $NCO (5%) creator fee", (0, jsx_runtime_1.jsx)("br", {}), "\u2014 ", round((fee * 3) / 8), " $NCO (3%) DAO fee", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), "Total stake:"] })), (0, jsx_runtime_1.jsxs)("h1", { children: [round(_value - fee), " NCO"] }), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ className: "nl-button-primary", onClick: function () { return openUrl("newcoin"); } }, { children: "View on Newcoin" })), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ className: "nl-button-primary", onClick: function () { return openUrl("blocks"); } }, { children: "View on Blocks" }))] }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Modal, __assign({ visible: _mode === exports.STAKE_STEPS.CONFIRM, title: "Confirm your request", okText: "Yes", cancelText: "No", onOk: function () { return stake(); }, closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}), onCancel: function () {
                    setMode(hideButton ? exports.STAKE_STEPS.DISABLED : exports.STAKE_STEPS.SELECT);
                    // mode === STAKE_STEPS. : DONE
                    // 	? onDone && onDone()
                    // 	: onCancel &&  : onCancel();
                    // setMode(STAKE_STEPS.SELECT);
                    // }}
                }, 
                // cancelButtonProps={{ value: "No" }}
                footer: state.indicators.specific["api.user.stake"] ? ((0, jsx_runtime_1.jsx)(IndeterminateProgress_1.IndeterminateProgress, { inProgress: true })) : undefined, className: "nl-white-box-modal primary-buttons-modal" }, { children: ["Are you sure you want to", membershipValue ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", "increase your stake in ", (_user === null || _user === void 0 ? void 0 : _user.username) || "", "'s DAO by", " ", _value, " $NCO"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", "stake ", _value, " $NCO to join ", (_user === null || _user === void 0 ? void 0 : _user.username) || "", "'s DAO?"] })), "?", (0, jsx_runtime_1.jsx)("br", {}), "You will deposit ", _value, " $NCO and pay a ", round(fee), " $NCO fee."] })), (0, jsx_runtime_1.jsx)(antd_1.Modal, __assign({ visible: _mode >= exports.STAKE_STEPS.SELECT && !hideSelect, okText: "Close", footer: false, onCancel: function () {
                    mode === exports.STAKE_STEPS.DONE
                        ? onDone && onDone()
                        : onCancel && onCancel();
                    setMode(exports.STAKE_STEPS.DISABLED);
                }, className: "nl-white-box-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", className: "text-center nl-row-vertical-space" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24, className: "nl-avatar" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "medium" }, _user)) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: membershipValue > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Your current stake in ", (_user === null || _user === void 0 ? void 0 : _user.username) || "", "'s DAO is ", poolInfo.code, " ", membershipValue, ". Stake", " ", _value, " NCO more to increase your membership value."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Join ", (_user === null || _user === void 0 ? void 0 : _user.username) || "", "'s DAO"] })) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        return setValue(Number(e.target.value));
                                    }, value: _value, suffix: "$NCO" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Slider, { className: "nl-slider", value: _value, tooltipVisible: false, style: { width: "100%" }, onChange: updateValue, marks: (_b = {},
                                        _b[minValue] = [minValue],
                                        _b[ncoBalance] = ncoBalance,
                                        _b), min: minValue, max: ncoBalance }) }) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 24 }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ className: "nl-button-primary", onClick: function () { return setMode(exports.STAKE_STEPS.CONFIRM); } }, { children: "Stake" })) }), (0, jsx_runtime_1.jsxs)("small", { children: [Math.round(fee * 100) / 100, " $NCO Fee"] })] })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsxs)("small", { children: ["Learn more about", " ", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://en.wikipedia.org/wiki/The_DAO_(organization)", target: "_new" }, { children: "DAOs" }))] }) }))] })) })), hideButton ? ("") : ((0, jsx_runtime_1.jsx)(ProgressButton_1.ProgressButton, __assign({ actionName: "api.user.stake", onClick: function () { return setMode(exports.STAKE_STEPS.SELECT); }, className: "nl-button-primary" }, { children: buttonText || "Stake" })))] }));
};
exports.UserStake = UserStake;
var UserPowerup = function (_a) {
    var _b, _c, _d, _e;
    var user = _a.user;
    var _f = (0, react_1.useState)(false), visible = _f[0], setVisible = _f[1];
    var actions = (0, overmind_1.useActions)();
    var state = (0, overmind_1.useAppState)();
    var currentUserPowerups = (0, useCached_1.useCachedPowerups)();
    var poolInfo = (0, useCached_1.useCachedPool)({ owner: user === null || user === void 0 ? void 0 : user.username });
    var membershipValue = state.newcoin.pools[poolInfo.code];
    var rating = (_c = (_b = currentUserPowerups === null || currentUserPowerups === void 0 ? void 0 : currentUserPowerups.out) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.find(function (u) { return u.id === (user === null || user === void 0 ? void 0 : user.id); });
    var isPowering = !!rating;
    var timeSince = ((_d = rating === null || rating === void 0 ? void 0 : rating.rating) === null || _d === void 0 ? void 0 : _d.created)
        ? Date.now() - new Date((_e = rating === null || rating === void 0 ? void 0 : rating.rating) === null || _e === void 0 ? void 0 : _e.created).getDate()
        : -1;
    var _g = (0, react_1.useState)(false), stakeMode = _g[0], setStakeMode = _g[1];
    var powerup = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setVisible(true);
                    _a = !isPowering && user;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, actions.api.user.powerup({ user: user, amount: 1 })];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    _a;
                    return [2 /*return*/];
            }
        });
    }); };
    var toStakeMode = function () {
        setStakeMode(true);
        setVisible(false);
    };
    // () => actions.routing.historyPush({ location: `/user/stake/${u.id}` })
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, __assign({ visible: visible, 
                // title="Multiply your powerup"
                okText: "Close", onOk: function () { return setVisible(false); }, onCancel: function () { return setVisible(false); }, cancelButtonProps: { hidden: true }, footer: false, className: "nl-white-box-modal", closeIcon: (0, jsx_runtime_1.jsx)(CrossCircle_1.CrossCircle, {}) }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", className: "text-center" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 8, className: "nl-avatar" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: "large", src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "medium" }, user)) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, { span: 4, className: "text-left" }), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 12, className: "text-left" }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [isPowering && timeSince > 60000 ?
                                                        "You powered" :
                                                        state.indicators.specific["api.user.powerup"] ?
                                                            "Powering..."
                                                            : "", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("b", __assign({ style: { fontSize: "1.3em" } }, { children: user === null || user === void 0 ? void 0 : user.username }))] }) }))] })), (0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ gutter: 12, className: "text-center" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 24 }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "nl-font-huge" }, { children: "+1" })) })) }))] }), (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ gutter: 48 }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 24 }, { children: [(0, jsx_runtime_1.jsx)("br", {}), "Multiply your power up (i)", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ className: "nl-button-primary", onClick: function () { } }, { children: "8X Power up" }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 24, className: "text-bold" }, { children: [(0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ className: "nl-button-primary inverse", onClick: toStakeMode }, { children: membershipValue
                                                ? "Stake more"
                                                : "Join the DAO" }))] }))] }))] })) })), (0, jsx_runtime_1.jsx)(antd_1.Button, __assign({ onClick: powerup, className: "powerup-btn " }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "paragraph-2b", style: { lineHeight: 0, margin: 0 } }, { children: "Power up" })) })), (0, jsx_runtime_1.jsx)(exports.UserStake, { onDone: function () { return setStakeMode(false); }, hideButton: true, user: user, mode: stakeMode ? exports.STAKE_STEPS.SELECT : exports.STAKE_STEPS.DISABLED })] }));
};
exports.UserPowerup = UserPowerup;
var UserWidgetTopFixed = function (_a) {
    var user = _a.user;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { position: "fixed", left: 0, top: 54 } }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(user === null || user === void 0 ? void 0 : user.username) }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                    wordBreak: "break-all",
                    maxWidth: "100%",
                    minHeight: "1.5em",
                } }, { children: user === null || user === void 0 ? void 0 : user.username })) })) })));
};
exports.UserWidgetTopFixed = UserWidgetTopFixed;
var UserWidgetHeading = function (_a) {
    var _b, _c;
    var user = _a.user, setActiveKey = _a.setActiveKey;
    var u = (0, useCached_1.useCachedUser)({ username: user === null || user === void 0 ? void 0 : user.username }, true);
    var state = (0, overmind_1.useAppState)();
    if (!user)
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    // return <Card title={""}
    // cover={<ContentImage width="100%" src={user.contentUrl} />}
    // >
    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ wrap: true, 
        // gutter={30}
        align: "middle", style: { textAlign: "center", minHeight: 250 }, className: "app-main-full-width" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 8, className: "nl-avatar" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, u)) }) })), (0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ span: 16, className: "user-widget-heading" }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ className: "user-widget-heading", style: { width: "100%", textAlign: "left" }, justify: "start" }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ xs: 24, sm: 12, className: "username" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "header-2" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(u.username) }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ style: {
                                                wordBreak: "break-all",
                                                maxWidth: "100%",
                                                minHeight: "1.5em",
                                            }, className: "header-3" }, { children: u.username })) })) })), (0, jsx_runtime_1.jsx)(Paragraph_1.default, __assign({ ellipsis: { rows: 3 } }, { children: user.description || "no description" })), u.id === ((_b = state.api.auth.user) === null || _b === void 0 ? void 0 : _b.id) ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ title: "Public view", to: "/user/".concat(u.username) }, { children: (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}) }))) : (""), u.id === ((_c = state.api.auth.user) === null || _c === void 0 ? void 0 : _c.id) ? ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/my/profile/update" }, { children: (0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}) }))) : ("")] })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ xs: 24, sm: 12, className: "powerup" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ onClick: function () { return setActiveKey("1"); }, style: { cursor: "pointer" }, className: "header-2" }, { children: u.powered || "" })), (0, jsx_runtime_1.jsx)(exports.UserPowerup, { user: u })] }))] })) }))] })));
};
exports.UserWidgetHeading = UserWidgetHeading;
// export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => <div>{JSON.stringify</div>
var UserSocialInfo = function (_a) {
    var user = _a.user;
    return ((0, jsx_runtime_1.jsx)(antd_1.List
    // header="Activity Stream"
    , { 
        // header="Activity Stream"
        itemLayout: "horizontal", dataSource: "instagram,soundcloud,twitter,facebook,pinterest"
            .split(/,/)
            .filter(function (k) { return user[k]; }), renderItem: function (k) {
            return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { description: (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: k, value: user[k], link: "https://www.".concat(k, ".com/").concat(user[k]) }) }) }));
        } }));
};
exports.UserSocialInfo = UserSocialInfo;
var UsersList = function (_a) {
    var users = _a.users, powerUp = _a.powerUp, title = _a.title, layout = _a.layout;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title ? (0, jsx_runtime_1.jsx)("h4", __assign({ className: "header-4" }, { children: title })) : "", (0, jsx_runtime_1.jsx)(antd_1.List
            // header="Activity Stream"
            , { 
                // header="Activity Stream"
                itemLayout: layout || "horizontal", dataSource: users || [], renderItem: function (u) {
                    return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({}, u)) }), description: (0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ align: "middle", gutter: 18, className: "app-main-full-width-only", justify: "start", wrap: true }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ sm: 24, xxl: 24 }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(u.username), className: "paragraph-1r" }, { children: u.username })), (0, jsx_runtime_1.jsx)(Paragraph_1.default, __assign({ style: { marginBottom: "0" }, className: "paragraph-2r" }, { children: u.powered || "" }))] })) })) }) }));
                } })] }));
};
exports.UsersList = UsersList;
// // header="Activity Stream"
// items={users || []}
// render={(u: UserReadPublicResponse) => {
var sliderStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    background: "#364d79",
    padding: 12,
    width: "min(100%,300px)",
};
var UsersHorizontalScroller = function (_a) {
    var users = _a.users, powerUp = _a.powerUp, title = _a.title, layout = _a.layout;
    var _b = (0, usePreventBodyScroll_1.default)(), disableScroll = _b.disableScroll, enableScroll = _b.enableScroll;
    console.log(users);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
            width: "100%",
            height: 200,
            marginBottom: 100,
            marginTop: "1em",
        }, onMouseEnter: disableScroll, onMouseLeave: enableScroll }, { children: [title ? ((0, jsx_runtime_1.jsx)("h2", __assign({ className: "app-main-full-width header-2" }, { children: title }))) : (""), (0, jsx_runtime_1.jsx)(react_horizontal_scrolling_menu_1.ScrollMenu
            // LeftArrow={<LeftOutlined />} RightArrow={<RightOutlined />}
            , { children: (users === null || users === void 0 ? void 0 : users.map(function (u, i) {
                    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", style: {
                            width: /*180*/ "auto",
                            height: 150,
                            marginLeft: "20px",
                            marginRight: "20px",
                            flexWrap: "inherit",
                        }, justify: "center", wrap: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col
                            /*sm={16} xxl={6}*/
                            , __assign({ 
                                /*sm={16} xxl={6}*/
                                className: "u-margin-small" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "medium" }, u)) }) })), (0, jsx_runtime_1.jsxs)(antd_1.Col /*sm={16} xxl={8}*/, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(u.username), className: "paragraph-1b" }, { children: u.username })), (0, jsx_runtime_1.jsx)("br", {}), u.powered || ""] })] })));
                })) || (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) })] })));
};
exports.UsersHorizontalScroller = UsersHorizontalScroller;
var UsersGrid = function (_a) {
    var users = _a.users, powerUp = _a.powerUp, title = _a.title, layout = _a.layout;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title ? (0, jsx_runtime_1.jsx)("h2", __assign({ className: "app-main-full-width" }, { children: title })) : "", (0, jsx_runtime_1.jsx)(ItemGrid_1.ItemGrid
            // header="Activity Stream"
            , { 
                // header="Activity Stream"
                items: users || [], render: function (u) {
                    return ((0, jsx_runtime_1.jsxs)(antd_1.Row, __assign({ align: "middle", gutter: 6, style: { padding: 12 }, justify: "center", wrap: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Col, __assign({ sm: 10, xxl: 4 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: (0, jsx_runtime_1.jsx)(Image_1.ContentImage, __assign({ size: "small" }, u)) }) })), (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ sm: 14, xxl: 20 }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(u.username) }, { children: u.username })), (0, jsx_runtime_1.jsx)("br", {}), u.powered || ""] }))] })));
                } })] }));
};
exports.UsersGrid = UsersGrid;
var UserSocialInfoRow = function (_a) {
    var user = _a.user;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
            .split(/,/)
            .filter(function (k) { return user[k]; })
            .map(function (k) { return ((0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: k, value: user[k], link: "https://www.".concat(k, ".com/").concat(user[k]) })); }) }));
};
exports.UserSocialInfoRow = UserSocialInfoRow;
var PoolInfoDataRow = function (_a) {
    var pool = _a.pool;
    var poolInfo = (0, useCached_1.useCachedPool)(pool);
    var myPools = (0, overmind_1.useAppState)().newcoin.pools;
    return ((0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, __assign({ to: "/user/".concat(poolInfo === null || poolInfo === void 0 ? void 0 : poolInfo.owner) }, { children: poolInfo === null || poolInfo === void 0 ? void 0 : poolInfo.owner })), value: "".concat(pool === null || pool === void 0 ? void 0 : pool.code, " ").concat(myPools[poolInfo === null || poolInfo === void 0 ? void 0 : poolInfo.code], " ").concat(poolInfo === null || poolInfo === void 0 ? void 0 : poolInfo.code, " / ").concat(poolInfo === null || poolInfo === void 0 ? void 0 : poolInfo.total.quantity), link: "/user/".concat(poolInfo === null || poolInfo === void 0 ? void 0 : poolInfo.owner), target: "" }));
    // <>${poolInfo?.owner} {JSON.stringify(poolInfo)}</>;
};
exports.PoolInfoDataRow = PoolInfoDataRow;
var UserNewcoinPoolsParticipation = function (_a) {
    var _b = _a.user, user = _b === void 0 ? {} : _b;
    var nc = (0, overmind_1.useAppState)().newcoin;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.keys(nc.pools).map(function (code) { return ((0, jsx_runtime_1.jsx)(exports.PoolInfoDataRow, { pool: { code: code } })); }
        // <DataRow
        //     title={<PoolInfo pool={{code}} />}
        //     value={`${val as string} ${code}`}
        // />
        ) }));
};
exports.UserNewcoinPoolsParticipation = UserNewcoinPoolsParticipation;
var UserNewcoinInfo = function (_a) {
    var _b = _a.user, user = _b === void 0 ? {} : _b;
    var state = (0, overmind_1.useAppState)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin domain name", value: user.username, link: "https://explorer.newcoin.org/account/".concat(user.username) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "account balance", value: state.newcoin.account.acc_balances }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin pool", value: (0, jsx_runtime_1.jsx)(Links_1.BlockExplorerLink, { id: user.newcoinPoolId }) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin account", value: (0, jsx_runtime_1.jsx)(Links_1.BlockExplorerLink, { id: user.newcoinAccTx }) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin publisher public key", value: (0, jsx_runtime_1.jsx)(CryptoEntities_1.HashDisplay, { hash: user.newcoinPublisherPublicKey }) }), (0, jsx_runtime_1.jsx)(DataRow_1.DataRow, { title: "newcoin publisher private key", value: (0, jsx_runtime_1.jsx)(RevealInfo_1.RevealInfo, { children: (0, jsx_runtime_1.jsx)(CryptoEntities_1.HashDisplay, { hash: user.newcoinPublisherPrivateKey }) }) })] }));
};
exports.UserNewcoinInfo = UserNewcoinInfo;
var UserPrivateInfo = function (_a) {
    var user = _a.user;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: user &&
            "instagram,soundcloud,twitter,facebook,pinterest,phone,status"
                .split(/,/)
                .filter(function (k) { return user[k]; })
                .map(function (k) {
                return ((0, jsx_runtime_1.jsx)(antd_1.Row, __assign({ style: { width: "100%" } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Col, __assign({ span: 12 }, { children: [user.firstName, " ", user.lastName, " ", user.fullName] })) })));
            }) }));
};
exports.UserPrivateInfo = UserPrivateInfo;
//# sourceMappingURL=UserWidget.js.map