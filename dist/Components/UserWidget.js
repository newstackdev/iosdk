import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import "./styles/UserWidget.less";
import { Avatar, Button, Col, Input, List, Modal, Row, Slider, Tooltip } from "antd";
import { BlockExplorerLink } from "../Components/Links";
import { ContentImage } from "../Components/Image";
import { CrossCircle } from "../Components/Icons/CrossCircle";
import { DataRow } from "../Components/DataRow";
import { DAO as DetailsIcon } from "../Components/Icons/DAO";
import { Edit } from "../Components/Icons/Edit";
import { HashDisplay } from "../Components/CryptoEntities";
import { ItemGrid } from "../Components/ItemGrid";
import { Link, useHistory } from "react-router-dom";
import { NewcoinRecept } from "../Components/Recepts";
import { Polygon } from "../Components/Icons/Polygon";
import { ProgressButton } from "../Components/ProgressButton";
import { RevealInfo } from "../Components/RevealInfo";
import { STAKE_STEPS } from "../overmind/flows/stake/state";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Smallinfo } from "../Components/Icons/Smallinfo";
import { SocialLink } from "../Components/SocialLink";
import { UserSocials } from "../Pages/User/interfaces/IUser";
import { VerifiedIcon } from "../Components/Icons/VerifiedIcon";
import { showPopUp } from "../utils/popup";
import { useActions, useAppState } from "../overmind";
import { useCachedPool, useCachedPowerups, useCachedUser } from "../hooks/useCached";
import { useEffect, useState } from "react";
import { useVerified } from "../hooks/useVerified";
import BadgeWidget from "./BadgeWidget";
import CountUp from "react-countup";
import Paragraph from "antd/lib/typography/Paragraph";
import PowerupDialog from "../Components/PowerupDialog";
import ShowMoreText from "react-show-more-text";
import isFinite from "lodash/isFinite";
import usePreventBodyScroll from "../hooks/usePreventBodyScroll";
const ellipsisStyle = {
    maxWidth: 125,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
};
export const SOCIAL_MEDIA = [
    UserSocials.SOUNDCLOUD,
    UserSocials.INSTAGRAM,
    UserSocials.TWITTER,
    UserSocials.FACEBOOK,
    UserSocials.PINTEREST,
    UserSocials.TUMBLR,
    UserSocials.YOUTUBE,
    UserSocials.DISCORD,
];
export const UserWidgetVertical = ({ user }) => {
    const u = useCachedUser({ id: user?.id || "" });
    if (!u)
        return _jsx(_Fragment, {});
    return (_jsxs("div", { style: { marginBottom: 24 }, children: [_jsx(Link, { to: `/user/${u.username}`, children: _jsx(ContentImage, { size: "small", width: "100%", src: u.contentUrl }) }), _jsxs(Link, { to: `/user/stake/${u.username}`, hidden: !u.username, children: ["Stake on ", u.username] })] }));
};
const round = (v) => Math.round(v * 1000) / 1000;
/**
 * User stake widget.
 * @param
 * @returns
 */
export const UserStake = ({ user, mode, value, minValue, hideButton, buttonText, hideSelect, closeOnDone, onDone, onCancel, usePowerupTerminology = false, stakeInNewsafe, }) => {
    // const [visible, setVisible] = useState(false);
    const actions = useActions();
    const poolInfo = useCachedPool({ owner: user?.username, code: user?.newcoinTicker });
    const [preStakeValue, setPrestakeValue] = useState(0);
    const [_value, setValue] = useState(value || 100);
    const [fee, setFee] = useState(0.08 * _value);
    const state = useAppState();
    const [tx, setTx] = useState("");
    const [_mode, setMode] = useState(mode ?? STAKE_STEPS.DISABLED);
    const _user = useCachedUser(user, true);
    const balances = state.newcoin.mainPool?.acc_balances || []; //state.newcoin.account?.acc_balances || [];
    const ncoBalance = Number((balances[0] || "").replace(/ GNCO$/, ""));
    const membershipValue = state.newcoin.pools[poolInfo.code];
    const displayMembershipValue = membershipValue;
    minValue = minValue || 100;
    const stakeDelta = (membershipValue || 0) - (preStakeValue || 0);
    const hasDao = !!poolInfo.code; // && /\.(io|nco)$/.test(user?.username || "");
    const closeWallet = () => actions.flows.userJourney.setFlag({
        flag: "walletShown",
        value: "",
    });
    useEffect(() => {
        setMode(mode ?? STAKE_STEPS.DISABLED);
    }, [mode]);
    useEffect(() => {
        const m = _mode ?? STAKE_STEPS.DISABLED;
        setMode(m);
        actions.flows.stake.setLatestMode({ stakingMode: m });
    }, [_mode]);
    useEffect(() => {
        !hasDao && _mode >= 0 && setMode(STAKE_STEPS.NODAO);
    }, [hasDao, _mode]);
    const updateValue = (v) => {
        setValue(v);
        setFee(round(0.08 * v));
    };
    const stake = async () => {
        setPrestakeValue(membershipValue);
        const res = await actions.api.user.stake({
            user: _user,
            amount: _value + ".0000",
        });
        const historyItem = [...state.api.cache.stakeHistory].reverse().find((h) => h.user.username === user?.username);
        const success = !!res.TxID_stakePool; //historyItem && !historyItem.error;
        success && setTx(res.TxID_stakePool);
        setMode(success && closeOnDone ? STAKE_STEPS.DISABLED : STAKE_STEPS.DONE);
    };
    const startStaking = () => {
        setMode(STAKE_STEPS.SELECT);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Modal, { closeIcon: _jsx(CrossCircle, {}), 
                // getContainer={getContainer}
                visible: _mode == STAKE_STEPS.NODAO, cancelText: "Ok", 
                // onCancel={() => setMode(STAKE_STEPS.SELECT)}
                onCancel: () => {
                    setMode(STAKE_STEPS.DISABLED);
                    onDone && onDone({});
                }, okButtonProps: { style: { display: "none" } }, wrapClassName: "iosdk-modal iosdk-stake-modal", className: "iosdk-modal iosdk-stake-modal nl-white-box-modal", children: [_jsx(Row, { align: "middle", className: "text-center", children: _jsx(Col, { span: 8, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }) }), _jsx("div", { className: "section-divider" }), _jsx(Row, { align: "middle", className: "text-center", children: _jsxs(Col, { span: 24, className: "nl-avatar", children: [_jsx("h2", { children: _user.username }), _jsx("div", { className: "section-divider" }), "has not created their DAO yet.", _jsx("div", { className: "section-divider" }), "Please check this profile later."] }) })] }), _jsxs(Modal, { visible: _mode === STAKE_STEPS.CONFIRM, onOk: () => stake(), closeIcon: _jsx(CrossCircle, {}), onCancel: () => {
                    setMode(hideButton ? STAKE_STEPS.DISABLED : STAKE_STEPS.SELECT);
                }, footer: false, className: "nl-white-box-modal primary-buttons-modal", children: [_jsx(Col, { span: 24, className: "nl-avatar u-margin-bottom-medium", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }), _jsx(Col, { span: 24, children: membershipValue > 0 ? (_jsxs("p", { className: "header-3", children: ["Your membership in ", poolInfo.owner.toUpperCase(), " DAO is at ", displayMembershipValue, ". Stake ", _value, " GNCO more to increase your membership value."] })) : (_jsxs("p", { className: "header-3", children: ["Join ", _user?.username || "", "'s DAO"] })) }), _jsx(Col, { style: { margin: "80px 0 " }, children: _jsxs("p", { className: "paragraph-2r", children: ["Are you sure you want to", membershipValue ? (_jsxs(_Fragment, { children: [" ", "increase your stake in ", _user?.username || "", "'s DAO by ", _value, " $GNCO"] })) : (_jsxs(_Fragment, { children: [" ", "stake ", _value, " $GNCO to join ", _user?.username || "", "'s DAO?"] })), "?", _jsx("br", {}), "You will deposit ", _value, " $GNCO and pay a ", round(fee), " $GNCO fee."] }) }), _jsx(ProgressButton, { actionName: "api.user.stake", type: "primary", progressText: "Staking...", onClick: () => {
                            stake();
                        }, children: "Confirm" }), _jsxs(Col, { span: 24, className: "text-left u-margin-top-large", style: { width: "100%" }, children: [_jsxs("p", { className: "paragraph-2r ", children: ["This is only on Testnet! Need help?", _jsx("br", {}), _jsx("span", { className: "paragraph-2u", children: "Join our telegram group!" })] }), "id"] })] }), _jsx(Modal, { visible: _mode >= STAKE_STEPS.SELECT && !hideSelect, okText: "Close", footer: false, onCancel: () => {
                    _mode === STAKE_STEPS.DONE ? onDone && onDone() : onCancel && onCancel();
                    setMode(STAKE_STEPS.DISABLED);
                }, className: "nl-white-box-modal", closeIcon: _jsx(CrossCircle, {}), children: _jsxs(Row, { align: "middle", className: "text-center nl-row-vertical-space", children: [_jsx(Col, { span: 24, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ..._user }) }) }), _jsx(Col, { span: 24, children: _jsx("p", { className: "header-3 text-left", children: membershipValue > 0 ? (_jsxs(_Fragment, { children: ["Your ", usePowerupTerminology ? "powerup" : "stake", " in ", poolInfo.code || "", " is $", displayMembershipValue, " $", poolInfo.owner.toUpperCase(), ". ", usePowerupTerminology ? "Powerup" : "Stake", " ", _value, " GNCO more to increase your membership value."] })) : (_jsxs(_Fragment, { children: ["Join ", _user?.username || "", "'s DAO"] })) }) }), _jsx(Col, { span: 24, children: _jsx(Input, { onChange: (e) => setValue(Number(e.target.value)), value: _value, suffix: "$GNCO", className: "gnco_input" }) }), _jsx(Col, { span: 24, children: _jsx("div", { children: _jsx(Slider, { className: "nl-slider", value: _value, tooltipVisible: false, style: { width: "100%" }, onChange: updateValue, marks: {
                                        0: "0%",
                                        [(ncoBalance / 100) * 25]: "25%",
                                        [(ncoBalance / 100) * 50]: "50%",
                                        [(ncoBalance / 100) * 75]: "75%",
                                        [ncoBalance]: "100%",
                                    }, min: minValue / minValue, max: ncoBalance }) }) }), _jsx(Col, { span: 24, className: "u-margin-top-large", children: _jsx(Button, { className: "stake-button-modal", onClick: () => {
                                    setMode(STAKE_STEPS.CONFIRM);
                                }, children: buttonText || "Stake" }) }), _jsxs(Col, { span: 24, className: "text-left", children: [_jsxs("span", { className: "paragraph-2r", children: [Math.round(fee * 100) / 100, " $GNCO Fee"] }), _jsxs("p", { className: "paragraph-2r ", children: ["This is only on Testnet! Need help?", _jsx("br", {}), _jsx("span", { className: "paragraph-2u", children: "Join our telegram group!" })] })] })] }) }), _jsxs(NewcoinRecept, { tx: tx, visible: _mode == STAKE_STEPS.DONE, onDone: () => {
                    setMode(STAKE_STEPS.DISABLED);
                    onDone &&
                        onDone({
                            preStakeValue,
                            stakeValue: _value,
                            stakeDelta,
                        });
                }, children: [_jsxs("div", { className: "text-left", children: [_jsx("br", {}), _jsx("h2", { className: "header-2", children: "Congratulations" }), preStakeValue ? (_jsxs(_Fragment, { children: ["Your stake in ", _user?.username, "'s DAO increased by ", stakeDelta, " ", poolInfo.code, "."] })) : (_jsxs(_Fragment, { children: ["You are now a member of the ", _user?.username, "'s DAO with all the rights and duties associated."] })), _jsx("br", {}), _jsx("br", {}), _jsxs("p", { children: [_value, " $GNCO", _jsx("br", {}), "\u2014 ", round((fee * 5) / 8), " $GNCO (5%) creator fee", _jsx("br", {}), "\u2014 ", round((fee * 3) / 8), " $GNCO (3%) DAO fee", _jsx("br", {}), _jsx("br", {})] })] }), _jsxs("h1", { children: [round(_value - fee), " $GNCO"] })] }), hideButton ? ("") : stakeInNewsafe ? (_jsx(Button, { onClick: () => showPopUp(`https://auth${state.config.env.env == "dev" ? "-dev" : ""}.newsafe.org/swap/GNCO/${user?.newcoinTicker?.toUpperCase()}`, "__NEWSAFE__"), children: buttonText || "Stake" })) : (_jsx(ProgressButton, { actionName: "api.user.stake", onClick: () => {
                    closeWallet();
                    startStaking();
                }, progressText: "Staking...", type: "primary", children: buttonText || "Stake" }))] }));
};
export const UserPowerup = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const actions = useActions();
    const state = useAppState();
    const history = useHistory();
    const { verifiedUsers } = useVerified([user?.username || ""]);
    const isUserVerified = verifiedUsers && user?.username && verifiedUsers.includes(user.username);
    const [stakeMode, setStakeMode] = useState(false);
    const currentUserPowerups = useCachedPowerups();
    const poolInfo = useCachedPool({ owner: user?.username });
    const membershipValue = state.newcoin.pools[poolInfo.code];
    const rating = currentUserPowerups?.out?.value?.find((u) => u.id === user?.id);
    const isPowering = !!rating;
    const timeSince = rating?.rating?.created ? Date.now() - new Date(rating?.rating?.created).getDate() : -1;
    const powerup = async () => {
        setVisible(true);
        !isPowering && user && (await actions.api.user.powerup({ user, amount: 1 }));
    };
    const toStakeMode = () => {
        setStakeMode(true);
        // setVisible(false);
    };
    useEffect(() => {
        if (!visible)
            setStakeMode(false);
    }, [visible]);
    const myProfileUrl = `/user/${state.api.auth.user?.username}`;
    // () => actions.routing.historyPush({ location: `/user/stake/${u.id}` })
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { visible: visible, 
                // title="Multiply your powerup"
                okText: "Close", onOk: () => setVisible(false), onCancel: () => setVisible(false), cancelButtonProps: { hidden: true }, footer: false, className: "iosdk-modal nl-white-box-modal", closeIcon: _jsx(CrossCircle, {}), children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { children: [_jsxs(Row, { className: "text-center", style: { alignItems: "center" }, children: [_jsx(Col, { span: 8, className: "nl-avatar", children: _jsx(Avatar, { size: "large", src: _jsx(ContentImage, { size: "medium", ...user }) }) }), _jsx(Col, { span: 12, className: "text-left u-margin-left-medium", children: _jsxs("div", { children: [isPowering && timeSince > 60000
                                                        ? "You powered"
                                                        : state.indicators.specific["api.user.powerup"]
                                                            ? "Powering..."
                                                            : "", _jsx("br", {}), _jsxs("span", { className: "header-3", style: {
                                                            display: "inline-flex",
                                                            justifyContent: "center",
                                                            gap: 20,
                                                        }, children: [user?.username, isUserVerified && _jsx(VerifiedIcon, {})] })] }) })] }), _jsx(Row, { gutter: 12, className: "text-center", style: { margin: "80px 0" }, children: _jsx(Col, { span: 24, children: _jsx("span", { className: "header-1b", children: "+1" }) }) })] }), _jsxs(Row, { gutter: 48, children: [_jsxs(Col, { span: 24, className: "u-margin-bottom-medium", children: [_jsx("br", {}), _jsxs("div", { style: {
                                                justifyContent: "center",
                                                display: "flex",
                                                alignItems: "center",
                                            }, className: "u-margin-bottom-medium", children: [_jsx("span", { className: "paragraph-2r u-margin-right-small ", children: "Multiply your power up" }), _jsx(Tooltip, { placement: "right", title: "You can add unlimited power to leonielx.io by joining their DAO. As a member of leonielx.io DAO you will purchase $LEONIE tokens which can be used to access content, buy NFTs and vote on community proposals. The more you buy, the more power you give to leonielx.io. This is only on Testnet! ", children: _jsx("span", { children: _jsx(Smallinfo, {}) }) })] }), _jsx(Button, { className: "nl-button-primary", onClick: () => { }, children: "8X Power up" })] }), _jsx(Col, { span: 24, className: "text-bold u-margin-bottom-medium", children: _jsx(Button, { className: "nl-button-primary inverse", onClick: toStakeMode, children: membershipValue ? "∞ Stake more" : "Join the DAO" }) })] }), _jsxs("p", { className: "paragraph-2r text-left", children: ["This is only on Testnet! Need help?", _jsx("br", {}), _jsx("span", { className: "paragraph-2u", children: "Join our telegram group!" })] })] }) }), _jsx(Row, { style: { flexDirection: "column" }, children: _jsx(Col, { children: _jsx(Button, { onClick: powerup, className: "power-up-btn", children: _jsx("p", { className: "paragraph-2b", style: { lineHeight: 0, margin: 0 }, children: "Power up" }) }) }) }), _jsx(UserStake, { onCancel: () => setStakeMode(false), onDone: () => {
                    setVisible(false);
                    setStakeMode(false);
                }, hideButton: true, user: user, mode: stakeMode ? STAKE_STEPS.SELECT : STAKE_STEPS.DISABLED })] }));
};
export const UserWidgetTopFixed = ({ user }) => {
    return (_jsx("div", { style: { position: "fixed", left: 0, top: 54 }, children: _jsx(Link, { to: `/user/${user?.username}`, children: _jsx("div", { style: {
                    wordBreak: "break-all",
                    maxWidth: "100%",
                    minHeight: "1.5em",
                }, children: user?.username }) }) }));
};
export const UserWidgetHeading = ({ user, setActiveKey, newPowerup = true, hideNewlifeSpecificInfo, disableBadges, isBadgesLoading, badgesError, badges, }) => {
    const u = useCachedUser({ username: user?.username }, true);
    const state = useAppState();
    const { verifiedUsers } = useVerified([user?.username || ""]);
    const isUserVerified = verifiedUsers && u.username && verifiedUsers.includes(u.username);
    const poolInfo = useCachedPool({ owner: user?.username });
    const [newScore, setNewScore] = useState(0);
    if (!user)
        return _jsx(_Fragment, {});
    useEffect(() => {
        if (!isBadgesLoading && !badgesError && user) {
            setNewScore(Math.floor(Math.log((800 * (badges?.length || 0) + (u?.powered || 0)) *
                +poolInfo.total.quantity.toString().replace(/[^0-9_-\s\.,]/gim, "")) || 0));
        }
    }, [isBadgesLoading, user, badges, u, poolInfo]);
    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString("en-US", {
            month: "long",
        });
    };
    const getSortedSocialMediaIcons = () => {
        const sortedSocials = [...SOCIAL_MEDIA].sort((a, b) => {
            if (user.verifiedSocialIds?.includes(a)) {
                return -1;
            }
            return 0;
        });
        return sortedSocials.map((social) => _jsx(SocialLink, { platform: social, user: user }));
    };
    const monthNumber = new Date(user.created || "").getMonth();
    const fullYear = new Date(user.created || "").getFullYear();
    const joinedDate = "Joined " + toMonthName(monthNumber) + " " + fullYear;
    const isCurrentUserProfile = u.id === state.api.auth.user?.id;
    return (_jsxs(Row, { wrap: true, 
        // gutter={30}
        style: {
            textAlign: "center",
            minHeight: 250,
            paddingTop: "10px",
        }, className: "app-main-full-width", children: [_jsx(Col, { xs: 24, xl: 14, className: "nl-avatar", children: _jsx(Row, { className: "user-widget__first-row", children: _jsx(Col, { xs: 24, xl: 22, className: "text-left", children: _jsxs(Row, { style: { flexWrap: "inherit" }, gutter: 64, children: [_jsx(Col, { span: 6, children: _jsx("span", { onClick: () => setActiveKey && setActiveKey("Folders"), style: { cursor: "pointer" }, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...u }), style: { width: "160px", height: "160px" } }) }) }), _jsx(Col, { children: _jsxs(Row, { style: { flexDirection: "column" }, children: [_jsx(Col, { children: _jsx(Row, { className: "u-margin-bottom-small", children: _jsxs(Row, { gutter: 12, style: { alignItems: "center" }, children: [_jsx(Col, { children: _jsx("span", { onClick: () => setActiveKey && setActiveKey("Folders"), style: { cursor: "pointer" }, children: _jsx("p", { className: "header-1r", children: u.username }) }) }), _jsx(Col, { children: isUserVerified && _jsx(VerifiedIcon, {}) }), _jsx(Col, { children: isCurrentUserProfile && (_jsx(Link, { to: "/my/profile/update", className: "nl-userProfile-editBtn", style: { height: 30 }, children: _jsx(Edit, {}) })) }), _jsx(Col, { children: _jsx("p", { className: "header-3b", children: user.displayName }) })] }) }) }), _jsxs(Row, { className: "user__social-icons-wrapper", style: { flexWrap: "inherit", alignItems: "initial" }, gutter: [0, 18], children: [getSortedSocialMediaIcons(), _jsx("span", { style: { cursor: "pointer" }, children: _jsx("a", { href: `https://explorer-dev.newcoin.org/account/${user.username}`, target: "_blank", rel: "noreferrer", children: _jsx(Polygon, {}) }) })] }), _jsxs(Row, { className: "paragraph-2r text-left u-margin-top-small", gutter: 12, align: "bottom", children: [_jsx(Col, { children: _jsx("p", { className: "paragraph-2r", children: _jsx(ShowMoreText, { lines: 3, more: _jsx("span", { className: "paragraph-2u", children: "Show more" }), less: _jsx("span", { className: "paragraph-2u", children: "Show less" }), className: "content-css", anchorClass: "my-anchor-css-class", expanded: false, width: 280, truncatedEndingComponent: " ", children: user.description }) }) }), _jsx(Col, { children: _jsx("p", { className: "paragraph-3r ", style: { color: "#959595" }, children: joinedDate }) })] })] }) })] }) }) }) }), _jsx(Col, { xs: 24, xl: 10, className: "user-widget-heading", children: _jsx(Row, { className: "user-widget-heading  user-widget__second-row", style: { width: "100%", textAlign: "left" }, justify: "start", children: _jsx(Col, { xs: 24, xl: 24, className: "username", children: _jsx(Row, { className: "user-widget-heading__powering", justify: "end", children: _jsxs(Row, { className: "user-widget-heading__newscore u-margin-bottom-medium", gutter: [20, 20], children: [_jsx(Col, { onClick: () => setActiveKey && setActiveKey("UserDetail"), className: "user-widget-heading__powerup-number", children: _jsxs("span", { children: [_jsx("p", { className: "header-1r user-widget-heading-newscore-num", children: _jsx(CountUp, { delay: 5, end: isBadgesLoading || badgesError || !isFinite(newScore) ? 0 : newScore }) }), _jsx("p", { className: "paragraph-2r", children: "Newscore" })] }) }), _jsx(Col, { onClick: () => setActiveKey && setActiveKey("UserDetail"), className: "user-widget-heading__powerup-number u-margin-right-small", children: !disableBadges && (_jsx(Row, { gutter: 12, justify: "center", children: _jsx(BadgeWidget, { user: user, badges: badges, className: "user-widget-heading-badge-section", badgeLimit: 3 }) })) }), _jsx(Col, { children: newPowerup ? _jsx(PowerupDialog, { user: user }) : _jsx(UserPowerup, { user: u }) }), _jsx(Col, { children: _jsx(Button, { onClick: () => setActiveKey && setActiveKey("UserDetail"), className: "user-widget-heading-details-btn", children: _jsx(DetailsIcon, {}) }) })] }) }) }) }) })] }));
};
export const UserSocialInfo = ({ user }) => (_jsx(List
// header="Activity Stream"
, { 
    // header="Activity Stream"
    itemLayout: "horizontal", dataSource: "instagram,soundcloud,twitter,facebook,pinterest".split(/,/).filter((k) => user[k]), renderItem: (k) => {
        return (_jsx(List.Item, { children: _jsx(List.Item.Meta, { description: _jsx(DataRow, { title: k, value: user[k], link: `https://www.${k}.com/${user[k]}` }) }) }));
    } }));
export const UsersList = ({ users, powerUp, title, layout }) => (_jsxs(_Fragment, { children: [title ? _jsx("h4", { className: "header-4", children: title }) : "", _jsx(List
        // header="Activity Stream"
        , { 
            // header="Activity Stream"
            itemLayout: layout || "horizontal", dataSource: users || [], renderItem: (u) => {
                return (_jsx(Link, { to: `/user/${u.username}`, className: "paragraph-1r", children: _jsx(List.Item, { className: "search-list-item bg-transition-box", children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: _jsx(ContentImage, { ...u }) }), description: _jsxs(Row, { align: "middle", gutter: 18, className: "app-main-full-width-only", justify: "start", wrap: true, children: [_jsx(Col, { sm: 24, xxl: 24, style: { color: "white" }, children: u.username }), _jsx(Paragraph, { style: { marginBottom: "0" }, className: "paragraph-2r", children: u.powered || "" })] }) }) }) }));
            } })] }));
// // header="Activity Stream"
// items={users || []}
// render={(u: UserReadPublicResponse) => {
const sliderStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    background: "#364d79",
    padding: 12,
    width: "min(100%,300px)",
};
export const UsersHorizontalScroller = ({ users, powerUp, title, layout }) => {
    const { disableScroll, enableScroll } = usePreventBodyScroll();
    return (_jsxs("div", { style: {
            width: "100%",
            height: 200,
            marginBottom: 100,
            marginTop: "1em",
        }, onMouseEnter: disableScroll, onMouseLeave: enableScroll, children: [title ? _jsx("h2", { className: "app-main-full-width header-2", children: title }) : "", _jsx(ScrollMenu
            // LeftArrow={<LeftOutlined />} RightArrow={<RightOutlined />}
            , { children: users?.map((u, i) => {
                    return (_jsxs(Row, { align: "middle", style: {
                            width: /*180*/ "auto",
                            height: 150,
                            marginLeft: "20px",
                            marginRight: "20px",
                            flexWrap: "inherit",
                        }, justify: "center", wrap: true, children: [_jsx(Col
                            /*sm={16} xxl={6}*/
                            , { 
                                /*sm={16} xxl={6}*/
                                className: "u-margin-small", children: _jsx(Avatar, { src: _jsx(ContentImage, { size: "medium", ...u }) }) }), _jsxs(Col /*sm={16} xxl={8}*/, { children: [_jsx(Link, { to: `/user/${u.username}`, className: "paragraph-1b", children: u.username }), _jsx("br", {}), u.powered || ""] })] }));
                }) || _jsx(_Fragment, {}) })] }));
};
export const UsersGrid = ({ users, powerUp, title, layout }) => (_jsxs(_Fragment, { children: [title ? _jsx("h2", { className: "app-main-full-width", children: title }) : "", _jsx(ItemGrid
        // header="Activity Stream"
        , { 
            // header="Activity Stream"
            items: users || [], render: (u) => {
                return (_jsxs(Row, { align: "middle", gutter: 6, style: { padding: 12 }, justify: "center", wrap: true, children: [_jsx(Col, { sm: 10, xxl: 4, children: _jsx(Avatar, { src: _jsx(ContentImage, { size: "small", ...u }) }) }), _jsxs(Col, { sm: 14, xxl: 20, children: [_jsx(Link, { to: `/user/${u.username}`, children: u.username }), _jsx("br", {}), u.powered || ""] })] }));
            } })] }));
export const UserSocialInfoRow = ({ user }) => (_jsx(_Fragment, { children: "instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
        .split(/,/)
        .filter((k) => user[k])
        .map((k) => (_jsx(DataRow, { title: k, value: user[k], link: `https://www.${k}.com/${user[k]}` }))) }));
export const PoolInfoDataRow = ({ pool, verifyIconLight = false, noLink, stakeInNewsafe }) => {
    const poolInfo = useCachedPool(pool);
    const myPools = useAppState().newcoin.pools;
    const user = useCachedUser({ username: poolInfo.owner });
    const { verifiedUsers } = useVerified([user.username || ""]);
    const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);
    const state = useAppState();
    const row = (_jsxs(Row, { style: {
            padding: "20px",
            alignItems: "center",
            justifyContent: "center",
        }, className: "bg-transition-box", children: [_jsx(Col, { span: 5, children: _jsx(Avatar, { src: _jsx(ContentImage, { ...user }), className: "avatar-image-small" }) }), _jsxs(Col, { span: 13, style: { width: "100%" }, children: [_jsxs("div", { className: "u-margin-bottom-small", style: { display: "flex", textAlign: "center" }, children: [user.username, isUserVerified ? (verifyIconLight ? (_jsx(VerifiedIcon, { style: { marginLeft: 20 } })) : (_jsx(VerifiedIcon, { style: { marginLeft: 20 } }))) : (false)] }), _jsxs("div", { children: ["$", poolInfo.code?.toUpperCase(), "\u00A0", _jsx("b", { children: ~~myPools[poolInfo?.code] })] }), _jsxs("small", { style: { padding: 0, margin: 0 }, children: ["TVL: ", poolInfo.total.quantity] })] }), _jsx(Col, { span: 6, children: _jsx(UserStake, { user: user, stakeInNewsafe: stakeInNewsafe }) })] }));
    return noLink ? _jsx(_Fragment, { children: row }) : _jsx(Link, { to: `/user/${user.username}`, children: row });
    // <div>
    // 			<CreatorWidget avatarClassName="avatar-image-small" creator={{ username: poolInfo.owner }} />
    // 			{pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code}
    // 			/ ${poolInfo?.total.quantity }
    // 	</div>
    // <DataRow
    // 	title={
    // 		// <Link to={`/user/${poolInfo?.owner}`}>{poolInfo?.owner}</Link>
    // 		<CreatorWidget avatarClassName="avatar-image-small" creator={{ username: poolInfo.owner }} />
    // 	}
    // 	value={
    // 		`${pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code
    // 		}
    // 		/ ${poolInfo?.total.quantity
    // 	}`}
    // 	link={`/user/${poolInfo?.owner}`}
    // 	target=""
    // />
    // );
    // <>${poolInfo?.owner} {JSON.stringify(poolInfo)}</>;
};
export const UserNewcoinPoolsParticipation = ({ user = {}, onStakeStart, isWalletUsage = false }) => {
    const nc = useAppState().newcoin;
    return (_jsxs(_Fragment, { children: [_jsx("p", { className: "header-3 u-margin-left-large u-margin-bottom-large", children: "Your DAO Memberships" }), Object.keys(nc.pools).map((code) => (_jsx(PoolInfoDataRow, { pool: { code }, verifyIconLight: isWalletUsage })))] }));
};
export const UserNewcoinInfo = ({ user = {} }) => {
    const state = useAppState();
    const { verifiedUsers } = useVerified([user.username || ""]);
    const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);
    const poolInfo = useCachedPool({ owner: user?.username });
    return (_jsxs(_Fragment, { children: [_jsx(DataRow, { title: "newcoin domain name", value: isUserVerified ? (_jsxs("div", { style: { display: "inline-flex", alignItems: "center" }, children: [_jsx("span", { className: "u-margin-right-medium", children: user.username }), _jsx(VerifiedIcon, {})] })) : (user.username), link: `https://explorer-dev.newcoin.org/account/${user.username}`, collapse: true }), _jsx(DataRow, { title: "newcoin ticker", value: poolInfo.code.toUpperCase(), collapse: true }), _jsx(DataRow, { title: "account balance", value: state.newcoin.account.acc_balances, collapse: true }), _jsx(DataRow, { title: "newcoin pool", value: _jsx(BlockExplorerLink, { id: user.newcoinPoolId }), collapse: true }), _jsx(DataRow, { title: "newcoin account", value: _jsx(BlockExplorerLink, { id: user.newcoinAccTx }), collapse: true }), _jsx(DataRow, { title: "newcoin publisher public key", value: _jsx(HashDisplay, { hash: user.newcoinPublisherPublicKey }), collapse: true }), _jsx(DataRow, { title: "newcoin publisher private key", value: _jsx(RevealInfo, { children: _jsx(HashDisplay, { hash: user.newcoinPublisherPrivateKey }) }), collapse: true })] }));
};
export const UserPrivateInfo = ({ user }) => (_jsx(_Fragment, { children: user &&
        "instagram,soundcloud,twitter,facebook,pinterest,phone,status"
            .split(/,/)
            .filter((k) => user[k])
            .map((k) => {
            return (_jsx(Row, { style: { width: "100%" }, children: _jsxs(Col, { span: 12, children: [user.firstName, " ", user.lastName, " ", user.fullName] }) }));
        }) }));
//# sourceMappingURL=UserWidget.js.map