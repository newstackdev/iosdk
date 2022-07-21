// import "./styles/UserWidget.less";
import { Avatar, Button, Col, Input, List, Modal, Row, Slider, Tooltip } from "antd";
import { BlockExplorerLink } from "../Components/Links";
import { Callback, NLView } from "../types";
import { ContentImage } from "../Components/Image";
import { CrossCircle } from "../Components/Icons/CrossCircle";
import { DataRow } from "../Components/DataRow";
import { Edit } from "../Components/Icons/Edit";
import { HashDisplay } from "../Components/CryptoEntities";
import { ItemGrid } from "../Components/ItemGrid";
import { Link, useHistory, useParams } from "react-router-dom";
import { NewcoinRecept } from "../Components/Recepts";
import { Polygon } from "../Components/Icons/Polygon";
import { PowerupsCacheItem } from "../overmind/api/state";
import { ProgressButton } from "../Components/ProgressButton";
import { RevealInfo } from "../Components/RevealInfo";
import { STAKE_STEPS, STAKE_STEPS_TYPE } from "../overmind/flows/stake/state";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Share } from "../Components/Share";
import { Smallinfo } from "../Components/Icons/Smallinfo";
import { SocialLink } from "../Components/SocialLink";
import { UserFlowRoutes } from "../Pages/User/User";
import { UserReadPrivateResponse, UserReadPublicResponse } from "@newcoin-foundation/iosdk-newgraph-client-js";
import { UserSocials } from "../Pages/User/interfaces/IUser";
import { VerifiedIcon } from "../Components/Icons/VerifiedIcon";
import { VerifiedIconLight } from "../Components/Icons/VerifiedIconLight";
import { useActions, useAppState } from "../overmind";
import { useCachedDaoProposals, useCachedPool, useCachedPowerups, useCachedUser } from "../hooks/useCached";
import { useEffect, useState } from "react";
import { useVerified } from "../hooks/useVerified";
import Paragraph from "antd/lib/typography/Paragraph";
import ShowMoreText from "react-show-more-text";
import usePreventBodyScroll from "../hooks/usePreventBodyScroll";

// import { Info } from "./Icons/Info";
// import { CreatorWidget } from "./Creators";
// import { UserStakeButton } from "../Pages/User/UserStake";

const ellipsisStyle = {
  maxWidth: 125,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
} as const;

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

export const UserWidgetVertical: NLView<{ user?: UserReadPublicResponse }> = ({ user }) => {
  const u = useCachedUser({ id: user?.id || "" });
  if (!u) return <></>;

  return (
    <div style={{ marginBottom: 24 }}>
      <Link to={`/user/${u.username}`}>
        <ContentImage size="small" width="100%" src={u.contentUrl} />
      </Link>
      <Link to={`/user/stake/${u.username}`} hidden={!u.username}>
        Stake on {u.username}
      </Link>
    </div>
  );
};

const round = (v: number) => Math.round(v * 1000) / 1000;

/**
 * User stake widget.
 * @param
 * @returns
 */
export const UserStake: NLView<{
  user?: UserReadPrivateResponse;
  mode?: STAKE_STEPS_TYPE;
  value?: number;
  minValue?: number;
  hideButton?: boolean;
  hideSelect?: boolean;
  buttonText?: string;
  closeOnDone?: boolean;
  onDone?: Callback;
  onCancel?: Callback;
}> = ({ user, mode, value, minValue, hideButton, buttonText, hideSelect, closeOnDone, onDone, onCancel }) => {
  // const [visible, setVisible] = useState(false);
  const actions = useActions();
  const poolInfo = useCachedPool({ owner: user?.username });

  const [preStakeValue, setPrestakeValue] = useState(0);

  const [_value, setValue] = useState(value || 100);
  const [fee, setFee] = useState(0.08 * _value);
  const state = useAppState();

  const [tx, setTx] = useState("");

  const [_mode, setMode] = useState<STAKE_STEPS_TYPE>(mode ?? STAKE_STEPS.DISABLED);

  const _user = useCachedUser(user, true);

  const balances = state.newcoin.mainPool?.acc_balances || []; //state.newcoin.account?.acc_balances || [];
  const ncoBalance = Number((balances[0] || "").replace(/ GNCO$/, ""));

  const membershipValue = state.newcoin.pools[poolInfo.code];
  const displayMembershipValue = membershipValue;

  minValue = minValue || 100;

  const stakeDelta = (membershipValue || 0) - (preStakeValue || 0);

  const hasDao = !!poolInfo.code; // && /\.(io|nco)$/.test(user?.username || "");

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

  const updateValue = (v: number) => {
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

  return (
    <>
      <Modal
        closeIcon={<CrossCircle />}
        // getContainer={getContainer}
        visible={_mode == STAKE_STEPS.NODAO}
        cancelText="Ok"
        // onCancel={() => setMode(STAKE_STEPS.SELECT)}
        onCancel={() => {
          setMode(STAKE_STEPS.DISABLED);
          onDone && onDone({});
        }}
        okButtonProps={{ style: { display: "none" } }}
        className="nl-white-box-modal"
      >
        <Row align="middle" className="text-center">
          <Col span={8} className="nl-avatar">
            <Avatar size="large" src={<ContentImage size="medium" {..._user} />} />
          </Col>
        </Row>
        <div className="section-divider" />
        <Row align="middle" className="text-center">
          <Col span={24} className="nl-avatar">
            <h2>{_user.username}</h2>
            <div className="section-divider" />
            had not created their DAO yet.
            <div className="section-divider" />
            Please check this profile later.
          </Col>
        </Row>
      </Modal>
      <Modal
        visible={_mode === STAKE_STEPS.CONFIRM}
        onOk={() => stake()}
        closeIcon={<CrossCircle />}
        onCancel={() => {
          setMode(hideButton ? STAKE_STEPS.DISABLED : STAKE_STEPS.SELECT);
        }}
        footer={false}
        className="nl-white-box-modal primary-buttons-modal"
      >
        <Col span={24} className="nl-avatar u-margin-bottom-medium">
          <Avatar size="large" src={<ContentImage size="medium" {..._user} />} />
        </Col>
        <Col span={24}>
          {membershipValue > 0 ? (
            <p className="header-3">
              {/* Join {_user?.username || ""}'s DAO */}
              Your membership in {poolInfo.owner.toUpperCase()} DAO is at {displayMembershipValue}. Stake {_value} GNCO more to
              increase your membership value.
            </p>
          ) : (
            <p className="header-3">Join {_user?.username || ""}'s DAO</p>
          )}
        </Col>

        <Col style={{ margin: "80px 0 " }}>
          <p className="paragraph-2r">
            Are you sure you want to
            {membershipValue ? (
              <>
                {" "}
                increase your stake in {_user?.username || ""}'s DAO by {_value} $GNCO
              </>
            ) : (
              <>
                {" "}
                stake {_value} $GNCO to join {_user?.username || ""}
                's DAO?
              </>
            )}
            ?
            <br />
            You will deposit {_value} $GNCO and pay a {round(fee)} $GNCO fee.
          </p>
          {/* to get
					your 1000 ${(_user?.username || "").toUpperCase()}. */}
        </Col>

        <ProgressButton
          actionName="api.user.stake"
          type="primary"
          progressText="Staking..."
          onClick={() => {
            stake();
          }}
        >
          Confirm
        </ProgressButton>

        <Col span={24} className="text-left u-margin-top-large" style={{ width: "100%" }}>
          <p className="paragraph-2r ">
            This is only on Testnet! Need help?
            <br />
            <span className="paragraph-2u">Join our telegram group!</span>
          </p>
          id
        </Col>
      </Modal>
      <Modal
        visible={_mode >= STAKE_STEPS.SELECT && !hideSelect}
        okText={"Close"}
        footer={false}
        onCancel={() => {
          _mode === STAKE_STEPS.DONE ? onDone && onDone() : onCancel && onCancel();
          setMode(STAKE_STEPS.DISABLED);
        }}
        className="nl-white-box-modal"
        closeIcon={<CrossCircle />}
      >
        <Row align="middle" className="text-center nl-row-vertical-space">
          <Col span={24} className="nl-avatar">
            <Avatar size="large" src={<ContentImage size="medium" {..._user} />} />
          </Col>
          <Col span={24}>
            <p className="header-3">
              {membershipValue > 0 ? (
                <>
                  Your stake in {_user.newcoinTicker} is ${displayMembershipValue} ${poolInfo.owner.toUpperCase()}. Stake {_value}{" "}
                  GNCO more to increase your membership value.
                </>
              ) : (
                <>Join {_user?.username || ""}'s DAO</>
              )}
            </p>
          </Col>
          <Col span={24}>
            <Input onChange={(e) => setValue(Number(e.target.value))} value={_value} suffix="$GNCO" className="gnco_input" />
          </Col>
          <Col span={24}>
            <div>
              <Slider
                className="nl-slider"
                value={_value}
                tooltipVisible={false}
                style={{ width: "100%" }}
                onChange={updateValue}
                marks={{
                  100: "0%",
                  [(ncoBalance / 100) * 25]: "25%",
                  [(ncoBalance / 100) * 50]: "50%",
                  [(ncoBalance / 100) * 75]: "75%",
                  [ncoBalance]: "100%",
                }}
                min={minValue / minValue}
                max={ncoBalance}
              />
            </div>
          </Col>
          <Col span={24} className="u-margin-top-large">
            <Button
              className="nl-button-primary stake-button-modal"
              onClick={() => {
                setMode(STAKE_STEPS.CONFIRM);
              }}
            >
              Stake
            </Button>
          </Col>
          <Col span={24} className="text-left">
            <span className="paragraph-2r">{Math.round(fee * 100) / 100} $GNCO Fee</span>

            <p className="paragraph-2r ">
              This is only on Testnet! Need help?
              <br />
              <span className="paragraph-2u">Join our telegram group!</span>
            </p>
          </Col>
        </Row>
      </Modal>
      {/* <Modal
					visible={true}>Test modal</Modal> */}
      <NewcoinRecept
        tx={tx}
        visible={_mode == STAKE_STEPS.DONE}
        onDone={() => {
          setMode(STAKE_STEPS.DISABLED);
          onDone &&
            onDone({
              preStakeValue,
              stakeValue: _value,
              stakeDelta,
            });
        }}
      >
        <div className="text-left">
          <br />
          <h2 className="header-2">Congratulations</h2>
          {preStakeValue ? (
            <>
              Your stake in {_user?.username}'s DAO increased by {stakeDelta} {poolInfo.code}.
            </>
          ) : (
            <>You are now a member of the {_user?.username}'s DAO with all the rights and duties associated.</>
          )}
          <br />
          <br />
          <p>
            {_value} $GNCO
            <br />— {round((fee * 5) / 8)} $GNCO (5%) creator fee
            <br />— {round((fee * 3) / 8)} $GNCO (3%) DAO fee
            <br />
            <br />
          </p>
        </div>
        <h1>{round(_value - fee)} $GNCO</h1>
      </NewcoinRecept>
      {hideButton ? (
        ""
      ) : (
        <ProgressButton
          actionName="api.user.stake"
          onClick={() => startStaking()}
          className="nl-button-primary"
          progressText="Staking..."
        >
          {buttonText || "Stake"}
        </ProgressButton>
      )}
    </>
  );
};

export const UserPowerup: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const actions = useActions();
  const state = useAppState();
  const history = useHistory();
  const { verifiedUsers } = useVerified([user?.username || ""]);
  const isUserVerified = verifiedUsers && user?.username && verifiedUsers.includes(user.username);

  const [stakeMode, setStakeMode] = useState(false);

  const currentUserPowerups: PowerupsCacheItem = useCachedPowerups() as any;

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
    if (!visible) setStakeMode(false);
  }, [visible]);

  const myProfileUrl = `/user/${state.api.auth.user?.username}`;

  // () => actions.routing.historyPush({ location: `/user/stake/${u.id}` })
  return (
    <>
      <Modal
        visible={visible}
        // title="Multiply your powerup"
        okText={"Close"}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ hidden: true }}
        footer={false}
        className="nl-white-box-modal"
        closeIcon={<CrossCircle />}
      >
        <div className="text-center">
          <div>
            <Row className="text-center" style={{ alignItems: "center" }}>
              <Col span={8} className="nl-avatar">
                <Avatar size="large" src={<ContentImage size="medium" {...user} />} />
              </Col>
              <Col span={12} className="text-left u-margin-left-medium">
                <div>
                  {isPowering && timeSince > 60000
                    ? "You powered"
                    : state.indicators.specific["api.user.powerup"]
                    ? "Powering..."
                    : ""}

                  <br />
                  <span
                    className="header-3"
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      gap: 20,
                    }}
                  >
                    {user?.username}
                    {isUserVerified && <VerifiedIcon />}
                  </span>
                </div>
              </Col>
            </Row>
            <Row gutter={12} className="text-center" style={{ margin: "80px 0" }}>
              <Col span={24}>
                <span className="header-1b">+1</span>
              </Col>
            </Row>
          </div>

          <Row gutter={48}>
            <Col span={24} className="u-margin-bottom-medium">
              <br />
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
                className="u-margin-bottom-medium"
              >
                <span className="paragraph-2r u-margin-right-small ">Multiply your power up</span>
                <Tooltip
                  placement="right"
                  title="You can add unlimited power to leonielx.io by joining their DAO. As a member of leonielx.io DAO you will purchase $LEONIE tokens which can be used to access content, buy NFTs and vote on community proposals. The more you buy, the more power you give to leonielx.io. This is only on Testnet! "
                >
                  <span>
                    <Smallinfo />
                  </span>
                </Tooltip>
              </div>
              <Button className="nl-button-primary" onClick={() => {}}>
                8X Power up
              </Button>
            </Col>
            <Col span={24} className="text-bold u-margin-bottom-medium">
              <Button className="nl-button-primary inverse" onClick={toStakeMode}>
                {membershipValue ? "∞ Stake more" : "Join the DAO"}
              </Button>
            </Col>
          </Row>
          <p className="paragraph-2r text-left">
            This is only on Testnet! Need help?
            <br />
            <span className="paragraph-2u">Join our telegram group!</span>
          </p>
        </div>
      </Modal>
      <Row style={{ flexDirection: "column" }}>
        <Col>
          <Button onClick={powerup} className="power-up-btn">
            <p className="paragraph-2b" style={{ lineHeight: 0, margin: 0 }}>
              Power up
            </p>
          </Button>
        </Col>
      </Row>
      {/* {myProfileUrl === history.location.pathname && (
        <Button
          onClick={() => history.push("/user/invite", {})}
          className="primary-green-btn"
        >
          <p className="paragraph-2b" style={{ lineHeight: 0, margin: 0 }}>
            Invite a friend
          </p>
        </Button>
      )} */}
      <UserStake
        onCancel={() => setStakeMode(false)}
        onDone={() => {
          setVisible(false);
          setStakeMode(false);
        }}
        hideButton={true}
        user={user}
        mode={stakeMode ? STAKE_STEPS.SELECT : STAKE_STEPS.DISABLED}
      />
    </>
  );
};

export const UserWidgetTopFixed: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => {
  return (
    <div style={{ position: "fixed", left: 0, top: 54 }}>
      <Link to={`/user/${user?.username}`}>
        <div
          style={{
            wordBreak: "break-all",
            maxWidth: "100%",
            minHeight: "1.5em",
          }}
        >
          {user?.username}
        </div>
      </Link>
    </div>
  );
};

export const UserWidgetHeading: NLView<{
  user?: UserReadPrivateResponse;
  setActiveKey?: React.Dispatch<React.SetStateAction<UserFlowRoutes>>;
  setShowSocials?: React.Dispatch<React.SetStateAction<boolean>>;
  activeKey?: UserFlowRoutes;
}> = ({ user, setActiveKey, activeKey }) => {
  const u = useCachedUser({ username: user?.username }, true);
  const state = useAppState();
  const actions = useActions();
  const params = useParams<{ username: string; id: string }>();
  const { verifiedUsers } = useVerified([user?.username || ""]);
  const isUserVerified = verifiedUsers && u.username && verifiedUsers.includes(u.username);
  const URL =
    process.env.NODE_ENV === "production"
      ? `https://www.newlife.io/user/${user?.username}`
      : `https://web-dev.newlife.io${user?.username}`;
  const daoOwner = params.username || state.config.settings.newcoin.daoDomain;
  const daoProposals = useCachedDaoProposals({ daoOwner });

  if (!user) return <></>;
  // return <Card title={""}
  // cover={<ContentImage width="100%" src={user.contentUrl} />}
  // >

  const poolInfo = useCachedPool({ owner: user?.username });
  const symbol = poolInfo.code;

  let poweredNumber: string | number = u.powered || 0;
  let poweringNumber: string | number = u.powering || 0;

  if (poweredNumber >= 1000) {
    poweredNumber = (poweredNumber / 1000).toFixed(2) + "K";
  }
  if (poweringNumber >= 1000) {
    poweringNumber = (poweringNumber / 1000).toFixed(2) + "K";
  }

  const toMonthName = (monthNumber: number) => {
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
    return sortedSocials.map((social) => <SocialLink platform={social} user={user} />);
  };

  const monthNumber = new Date(user.created || "").getMonth();
  const fullYear = new Date(user.created || "").getFullYear();

  const joinedDate = "Joined " + toMonthName(monthNumber) + " " + fullYear;

  return (
    <Row
      wrap={true}
      // gutter={30}
      style={{
        textAlign: "center",
        minHeight: 250,
        paddingTop: "10px",
      }}
      className="app-main-full-width"
    >
      <Col xs={24} xl={14} className="nl-avatar">
        <Row className="user-widget__first-row">
          <Col xs={24} xl={22} className="text-left">
            <Row style={{ flexWrap: "inherit" }} gutter={64}>
              <Col span={6}>
                <span onClick={() => setActiveKey && setActiveKey("Folders")} style={{ cursor: "pointer" }}>
                  <Avatar src={<ContentImage {...u} />} style={{ width: "160px", height: "160px" }} />
                </span>
              </Col>
              <Col>
                <Row style={{ flexDirection: "column" }}>
                  <Col>
                    <Row className="u-margin-bottom-small">
                      <Row gutter={12} style={{ alignItems: "center" }}>
                        <Col>
                          <span onClick={() => setActiveKey && setActiveKey("Folders")} style={{ cursor: "pointer" }}>
                            <p className="header-1r">{u.username}</p>
                          </span>
                        </Col>
                        <Col>{isUserVerified && <VerifiedIcon />}</Col>
                        <Col>
                          {u.id === state.api.auth.user?.id && (
                            <Link to="/my/profile/update" className="nl-userProfile-editBtn" style={{ height: 30 }}>
                              <Edit />
                            </Link>
                          )}
                        </Col>
                        <Col>
                          <p className="header-3b">{user.displayName}</p>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                  <Row
                    className="user__social-icons-wrapper"
                    style={{ flexWrap: "inherit", alignItems: "initial" }}
                    gutter={[0, 18]}
                  >
                    {getSortedSocialMediaIcons()}
                    <span style={{ cursor: "pointer" }}>
                      <a href={`https://explorer-dev.newcoin.org/account/${user.username}`} target="_blank" rel="noreferrer">
                        <Polygon />
                      </a>
                    </span>
                  </Row>
                  <Row className="paragraph-2r text-left u-margin-top-small" gutter={12} align="bottom">
                    <Col>
                      <p className="paragraph-2r">
                        <ShowMoreText
                          lines={3}
                          more={<span className="paragraph-2u">Show more</span>}
                          less={<span className="paragraph-2u">Show less</span>}
                          className="content-css"
                          anchorClass="my-anchor-css-class"
                          expanded={false}
                          width={280}
                          truncatedEndingComponent={" "}
                        >
                          {user.description}
                        </ShowMoreText>
                      </p>
                    </Col>
                    <Col>
                      <p className="paragraph-3r " style={{ color: "#959595" }}>
                        {joinedDate}
                      </p>
                    </Col>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24} xl={10} className="user-widget-heading">
        <Row
          className="user-widget-heading  user-widget__second-row"
          style={{ width: "100%", textAlign: "left" }}
          justify="start"
        >
          <Col xs={24} xl={24} className="username">
            <Row className="user-widget-heading__powering" style={{ justifyContent: "space-between" }}>
              <Col
                onClick={() => setActiveKey && setActiveKey("Powered")}
                className="user-widget-heading__powerup-number"
                style={{ marginRight: "2%" }}
              >
                <span>
                  <p className="header-1r">{poweredNumber}</p>
                  <p className="paragraph-2r">powered by</p>
                </span>
              </Col>
              <Col onClick={() => setActiveKey && setActiveKey("Powering")} className="user-widget-heading__powerup-number">
                <span>
                  <p className="header-1r">{poweringNumber}</p>
                  <p className="paragraph-2r">powering</p>
                </span>
              </Col>
              <Col xs={12} sm={12} className="powerup text-right">
                <UserPowerup user={u} />
                {symbol && <p className="paragraph-2r u-margin-top-medium">${symbol}</p>}
                {/* <Button onClick={() => actions.routing.historyPush({ location: `/user/stake/${u.id}` })}>Power up</Button> */}
                <Row style={{ justifyContent: "flex-end", alignItems: "center" }} className="u-margin-top-medium">
                  <Share urlToShare={URL} user={user} />
                  {daoProposals.dao_id && (
                    <Button
                      className="u-margin-left-medium"
                      onClick={() =>
                        actions.routing.historyPush({
                          location: "/dao/" + u?.username,
                        })
                      }
                    >
                      DAO
                    </Button>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => (
  <List
    // header="Activity Stream"
    itemLayout="horizontal"
    dataSource={"instagram,soundcloud,twitter,facebook,pinterest".split(/,/).filter((k) => (user as any)[k])}
    renderItem={(k) => {
      return (
        <List.Item>
          <List.Item.Meta
            description={<DataRow title={k} value={(user as any)[k]} link={`https://www.${k}.com/${(user as any)[k]}`} />}
          />
        </List.Item>
      );
    }}
  />
);

export const UsersList: NLView<{
  users?: UserReadPrivateResponse[];
  powerUp?: boolean;
  title?: string;
  layout?: "horizontal" | "vertical";
}> = ({ users, powerUp, title, layout }) => (
  <>
    {title ? <h4 className="header-4">{title}</h4> : ""}
    <List
      // header="Activity Stream"
      itemLayout={layout || "horizontal"}
      dataSource={users || []}
      renderItem={(u) => {
        return (
          <Link to={`/user/${u.username}`} className="paragraph-1r">
            <List.Item className="search-list-item bg-transition-box">
              <List.Item.Meta
                avatar={<Avatar src={<ContentImage {...u} />} />}
                description={
                  <Row align="middle" gutter={18} className="app-main-full-width-only" justify="start" wrap={true}>
                    <Col sm={24} xxl={24} style={{ color: "white" }}>
                      {u.username}
                    </Col>
                    <Paragraph style={{ marginBottom: "0" }} className="paragraph-2r">
                      {u.powered || ""}
                    </Paragraph>
                  </Row>
                }
              />
            </List.Item>
          </Link>
        );
      }}
    />
  </>
);

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

export const UsersHorizontalScroller: NLView<{
  users?: UserReadPrivateResponse[];
  powerUp?: boolean;
  title?: string;
  layout?: "horizontal" | "vertical";
}> = ({ users, powerUp, title, layout }) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <div
      style={{
        width: "100%",
        height: 200,
        marginBottom: 100,
        marginTop: "1em",
      }}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
    >
      {title ? <h2 className="app-main-full-width header-2">{title}</h2> : ""}
      <ScrollMenu
      // LeftArrow={<LeftOutlined />} RightArrow={<RightOutlined />}
      >
        {/* <Row align="middle" gutter={6} style={{ padding: 12 }} justify="center" wrap={true}> */}
        {users?.map((u, i) => {
          return (
            <Row
              align="middle"
              style={{
                width: /*180*/ "auto",
                height: 150,
                marginLeft: "20px",
                marginRight: "20px",
                flexWrap: "inherit",
              }}
              justify="center"
              wrap={true}
            >
              <Col
                /*sm={16} xxl={6}*/
                className="u-margin-small"
              >
                <Avatar src={<ContentImage size="medium" {...u} />} />
              </Col>
              <Col /*sm={16} xxl={8}*/>
                <Link to={`/user/${u.username}`} className="paragraph-1b">
                  {u.username}
                </Link>
                <br></br>
                {u.powered || ""}
              </Col>
            </Row>
          );
        }) || <></>}
        {/* </Row> */}
      </ScrollMenu>
    </div>
  );
};

export const UsersGrid: NLView<{
  users?: UserReadPrivateResponse[];
  powerUp?: boolean;
  title?: string;
  layout?: "horizontal" | "vertical";
}> = ({ users, powerUp, title, layout }) => (
  <>
    {title ? <h2 className="app-main-full-width">{title}</h2> : ""}
    <ItemGrid
      // header="Activity Stream"

      items={users || []}
      render={(u: UserReadPublicResponse) => {
        return (
          <Row align="middle" gutter={6} style={{ padding: 12 }} justify="center" wrap={true}>
            <Col sm={10} xxl={4}>
              <Avatar src={<ContentImage size="small" {...u} />} />
            </Col>
            <Col sm={14} xxl={20}>
              <Link to={`/user/${u.username}`}>{u.username}</Link>
              <br></br>
              {u.powered || ""}
            </Col>
          </Row>
        );
      }}
    />
  </>
);

export const UserSocialInfoRow: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => (
  <>
    {"instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
      .split(/,/)
      .filter((k) => (user as any)[k])
      .map((k) => (
        <DataRow title={k} value={(user as any)[k]} link={`https://www.${k}.com/${(user as any)[k]}`} />
      ))}
  </>
);

export const PoolInfoDataRow: NLView<{
  pool?: { code: string };
  verifyIconLight?: boolean;
}> = ({ pool, verifyIconLight = false }) => {
  const poolInfo = useCachedPool(pool);
  const myPools = useAppState().newcoin.pools;
  const user = useCachedUser({ username: poolInfo.owner });
  const { verifiedUsers } = useVerified([user.username || ""]);
  const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);

  return (
    <Link to={`/user/${user.username}`}>
      <Row
        style={{
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="bg-transition-box"
      >
        <Col span={5}>
          <Avatar src={<ContentImage {...user} />} className="avatar-image-small" />
        </Col>
        <Col span={13} style={{ width: "100%" }}>
          <div className="u-margin-bottom-small" style={{ display: "flex", textAlign: "center" }}>
            {user.username}
            {isUserVerified ? (
              verifyIconLight ? (
                <VerifiedIcon style={{ marginLeft: 20 }} />
              ) : (
                <VerifiedIcon style={{ marginLeft: 20 }} />
              )
            ) : (
              false
            )}
          </div>
          <div>
            ${user.newcoinTicker?.toUpperCase()}&nbsp;
            <b>{~~myPools[poolInfo?.code]}</b>
          </div>
          <small style={{ padding: 0, margin: 0 }}>
            TVL: {poolInfo.total.quantity}
            {/* {Math.round(Number(poolInfo?.total.quantity.toString().replace(/NCO/, "")))} */}
          </small>
        </Col>

        <Col span={6}>
          <UserStake user={user} />
        </Col>
      </Row>
    </Link>

    // <div>
    // 			<CreatorWidget avatarClassName="avatar-image-small" creator={{ username: poolInfo.owner }} />
    // 			{pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code}
    // 			/ ${poolInfo?.total.quantity }
    // 	</div>
  );
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

export const UserNewcoinPoolsParticipation: NLView<{
  user?: UserReadPrivateResponse;
  onStakeStart?: Callback;
  isWalletUsage?: boolean;
}> = ({ user = {}, onStakeStart, isWalletUsage = false }) => {
  const nc = useAppState().newcoin;

  return (
    <>
      <p className="header-3 u-margin-left-large u-margin-bottom-large">Your DAO Memberships</p>
      {Object.keys(nc.pools).map(
        (code) => (
          <PoolInfoDataRow pool={{ code }} verifyIconLight={isWalletUsage} />
        ),
        // <DataRow
        //     title={<PoolInfo pool={{code}} />}
        //     value={`${val as string} ${code}`}
        // />
      )}
    </>
  );
};

export const UserNewcoinInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user = {} }) => {
  const state = useAppState();
  const { verifiedUsers } = useVerified([user.username || ""]);
  const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);

  return (
    <>
      <DataRow
        title="newcoin domain name"
        value={
          isUserVerified ? (
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <span className="u-margin-right-medium">{user.username}</span>
              <VerifiedIcon />
            </div>
          ) : (
            user.username
          )
        }
        link={`https://explorer-dev.newcoin.org/account/${user.username}`}
        collapse={true}
      />
      <DataRow title="newcoin ticker" value={(user as any).newcoinTicker.toUpperCase()} collapse={true} />
      <DataRow title="account balance" value={state.newcoin.account.acc_balances} collapse={true} />

      <DataRow title="newcoin pool" value={<BlockExplorerLink id={user.newcoinPoolId} />} collapse={true} />
      <DataRow title="newcoin account" value={<BlockExplorerLink id={user.newcoinAccTx} />} collapse={true} />
      <DataRow
        title="newcoin publisher public key"
        value={<HashDisplay hash={user.newcoinPublisherPublicKey} />}
        collapse={true}
      />
      <DataRow
        title="newcoin publisher private key"
        value={
          <RevealInfo>
            <HashDisplay hash={user.newcoinPublisherPrivateKey} />
          </RevealInfo>
        }
        collapse={true}
      />
    </>
  );
};

export const UserPrivateInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => (
  <>
    {user &&
      "instagram,soundcloud,twitter,facebook,pinterest,phone,status"
        .split(/,/)
        .filter((k) => (user as any)[k])
        .map((k) => {
          return (
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                {user.firstName} {user.lastName} {user.fullName}
              </Col>
            </Row>
          );
        })}
  </>
);
