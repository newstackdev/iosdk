import {
	UserReadPrivateResponse,
	UserReadPublicResponse,
} from "@newlife/newlife-creator-client-api";
import {
	List,
	Avatar,
	Col,
	Row,
	Button,
	Modal,
	Input,
	Slider,
	Tooltip,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { Link } from "react-router-dom";
import {
	useCachedPool,
	useCachedPowerups,
	useCachedUser,
} from "../hooks/useCached";
import { useActions, useAppState } from "../overmind";
import { Callback, NLView } from "../types";
import { DataRow } from "./DataRow";
import { ContentImage } from "./Image";
import { BlockExplorerLink, blockExplorerUrl } from "./Links";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PowerupsCacheItem } from "../overmind/api/state";
import { ItemGrid } from "./ItemGrid";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import usePreventBodyScroll from "../hooks/usePreventBodyScroll";
import { CrossCircle } from "./Icons/CrossCircle";
import { ProgressButton } from "./ProgressButton";
import { IndeterminateProgress } from "./IndeterminateProgress";
import { RevealInfo } from "./RevealInfo";
import TextArea from "antd/lib/input/TextArea";
import { HashDisplay } from "./CryptoEntities";
import ShowMoreText from "react-show-more-text";
import { Instagram } from "./Icons/Instagram";
import { TumblrIcon } from "./Icons/TumblrIcon";
import { Soundcloud } from "./Icons/Soundcloud";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { Edit } from "./Icons/Edit";
import { SocialLink } from "./SocialLink";
import { Smallinfo } from "./Icons/Smallinfo";
import { STAKE_STEPS, STAKE_STEPS_TYPE } from "../overmind/flows/stake/state";

// import { Info } from "./Icons/Info";
// import { CreatorWidget } from "./Creators";
// import { UserStakeButton } from "../Pages/User/UserStake";

const ellipsisStyle = {
	maxWidth: 125,
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	overflow: "hidden",
} as const;

export const UserWidgetVertical: NLView<{ user?: UserReadPublicResponse }> = ({
	user,
}) => {
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
}> = ({
	user,
	mode,
	value,
	minValue,
	hideButton,
	buttonText,
	hideSelect,
	closeOnDone,
	onDone,
	onCancel,
}) => {
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
			actions.flows.stake.setLatestMode({ stakingMode: m })
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
			const historyItem = [...state.api.cache.stakeHistory]
				.reverse()
				.find((h) => h.user.username === user?.username);

			const success = historyItem && !historyItem.error;

			// return
			success && setTx(historyItem?.response?.data?.TxID_stakeToPool);

			setMode(
				success && closeOnDone ? STAKE_STEPS.DISABLED : STAKE_STEPS.DONE
			);

			// success && setTimeout(() => setMode(STAKE_STEPS.DISABLED));
		};
		const openUrl = (url: string) => {
			window.open(url, "_new");
		};

		const getContainer = () => {
			return state.flows.stake.options.stakingContainer;
		}

		const startStaking = () => {
			setMode(STAKE_STEPS.SELECT);
		}


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
							<Avatar
								size="large"
								src={<ContentImage size="medium" {..._user} />}
							/>
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
					closeIcon={<CrossCircle />}
					visible={_mode === STAKE_STEPS.DONE}
					// getContainer={getContainer}
					okText="Yes"
					cancelText="No"
					onOk={() => stake()}
					// onCancel={() => setMode(STAKE_STEPS.SELECT)}
					onCancel={() => {
						onDone &&
							onDone({
								preStakeValue,
								stakeValue: _value,
								stakeDelta,
							});
						setMode(STAKE_STEPS.DISABLED);
					}}
					cancelButtonProps={{ value: "No" }}
					footer={false}
					className="nl-white-box-modal"
				>
					<Row className="text-center">
						<Col span={8} className="nl-avatar">
							<Avatar
								size="large"
								src={<ContentImage size="medium" {..._user} />}
							/>
						</Col>
						<Col span={12} className="text-left u-margin-left-small">
							<div>
								You{" "}
								{preStakeValue
									? "increased your stake in"
									: "joined"}
								<br />
								<p className="header-3">{_user?.username}</p>
								's DAO.
							</div>
						</Col>
					</Row>
					<div className="text-center">
						<div className="text-left">
							<br />
							<h2 className="header-2">Congratulations</h2>
							{preStakeValue ? (
								<>
									Your stake in {_user?.username}'s DAO increased
									by {stakeDelta} {poolInfo.code}.
								</>
							) : (
								<>
									You are now a member of the {_user?.username}'s
									DAO with all the rights and duties associated.
								</>
							)}
							<br />
							<br />
							<p>
								{_value} $GNCO
								<br />— {round((fee * 5) / 8)} $GNCO (5%) creator
								fee
								<br />— {round((fee * 3) / 8)} $GNCO (3%) DAO fee
								<br />
								<br />
							</p>
						</div>
						<h1>{round(_value - fee)} $GNCO</h1>
						<Button
							className="nl-button-primary"
							onClick={() => openUrl(blockExplorerUrl.newcoin(tx))}
						>
							View on Newcoin
						</Button>
						<Button
							className="nl-button-primary"
							onClick={() => openUrl(blockExplorerUrl.blocks(tx))}
						>
							View on Bloks.io
						</Button>
					</div>
				</Modal>
				<Modal
					visible={_mode === STAKE_STEPS.CONFIRM}
					onOk={() => stake()}
					closeIcon={<CrossCircle />}
					onCancel={() => {
						setMode(
							hideButton ? STAKE_STEPS.DISABLED : STAKE_STEPS.SELECT
						);
						// mode === STAKE_STEPS. : DONE
						// 	? onDone && onDone()
						// 	: onCancel &&  : onCancel();
						// setMode(STAKE_STEPS.SELECT);
						// }}
					}}
					// cancelButtonProps={{ value: "No" }}
					// footer={
					// 	state.indicators.specific["api.user.stake"] ? (
					// 		<IndeterminateProgress inProgress={true} />
					// 	) : undefined
					// }
					footer={false}
					className="nl-white-box-modal primary-buttons-modal"
				>
					<Col span={24} className="nl-avatar u-margin-bottom-medium">
						<Avatar
							size="large"
							src={<ContentImage size="medium" {..._user} />}
						/>
					</Col>
					<Col span={24}>
						{membershipValue > 0 ? (
							<p className="header-3">
								{/* Join {_user?.username || ""}'s DAO */}
								Your membership in {poolInfo.owner.toUpperCase()} DAO is at {displayMembershipValue}. Stake{" "}
								{_value} GNCO more to increase your membership
								value.
							</p>
						) : (
							<p className="header-3">
								Join {_user?.username || ""}'s DAO
							</p>
						)}
					</Col>

					<Col style={{ margin: "80px 0 " }}>
						<p className="paragraph-2r">
							Are you sure you want to
							{membershipValue ? (
								<>
									{" "}
									increase your stake in {_user?.username || ""}'s
									DAO by {_value} $GNCO
								</>
							) : (
								<>
									{" "}
									stake {_value} $GNCO to join{" "}
									{_user?.username || ""}
									's DAO?
								</>
							)}
							?
							<br />
							You will deposit {_value} $GNCO and pay a {round(fee)}{" "}
							$GNCO fee.
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

					<Col
						span={24}
						className="text-left u-margin-top-large"
						style={{ width: "100%" }}
					>
						<p className="paragraph-2r ">
							This is only on Testnet! Need help?
							<br />
							<span className="paragraph-2u">
								Join our telegram group!
							</span>
						</p>id
					</Col>
				</Modal>
				<Modal
					visible={_mode >= STAKE_STEPS.SELECT && !hideSelect}
					okText={"Close"}
					footer={false}
					onCancel={() => {
						_mode === STAKE_STEPS.DONE
							? onDone && onDone()
							: onCancel && onCancel();
						setMode(STAKE_STEPS.DISABLED);
					}}
					className="nl-white-box-modal"
					closeIcon={<CrossCircle />}
				>
					<Row
						align="middle"
						className="text-center nl-row-vertical-space"
					>
						<Col span={24} className="nl-avatar">
							<Avatar
								size="large"
								src={<ContentImage size="medium" {..._user} />}
							/>
						</Col>
						<Col span={24}>
							<p className="header-3">
								{membershipValue > 0 ? (
									<>Your stake in {_user.newcoinTicker} is ${displayMembershipValue} ${poolInfo.owner.toUpperCase()}. Stake{" "}
										{_value} GNCO more to increase your membership
										value.</>
								)
									:

									<>
										Join {_user?.username || ""}'s DAO
									</>}
							</p>
						</Col>
						<Col span={24}>
							<Input
								onChange={(e) => setValue(Number(e.target.value))}
								value={_value}
								suffix="$GNCO"
								className="gnco_input"
							/>
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
									min={minValue}
									max={ncoBalance}
								/>
							</div>
						</Col>
						<Col span={24} className="u-margin-top-large">
							<Button
								className="nl-button-primary stake-button-modal"
								onClick={() => {
									setMode(STAKE_STEPS.CONFIRM)
								}
								}
							>
								Stake
							</Button>
						</Col>
						<Col span={24} className="text-left">
							<span className="paragraph-2r">
								{Math.round(fee * 100) / 100} $GNCO Fee
							</span>

							<p className="paragraph-2r ">
								This is only on Testnet! Need help?
								<br />
								<span className="paragraph-2u">
									Join our telegram group!
								</span>
							</p>
						</Col>
					</Row>
				</Modal>
				{
					hideButton ? (
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
					)
				}
			</>
		);
	};

export const UserPowerup: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => {
	const [visible, setVisible] = useState(false);
	const actions = useActions();
	const state = useAppState();

	const currentUserPowerups: PowerupsCacheItem = useCachedPowerups() as any;

	const poolInfo = useCachedPool({ owner: user?.username });
	const membershipValue = state.newcoin.pools[poolInfo.code];

	const rating = currentUserPowerups?.out?.value?.find(
		(u) => u.id === user?.id
	);
	const isPowering = !!rating;
	const timeSince = rating?.rating?.created
		? Date.now() - new Date(rating?.rating?.created).getDate()
		: -1;

	const [stakeMode, setStakeMode] = useState(false);

	const powerup = async () => {
		setVisible(true);
		!isPowering &&
			user &&
			(await actions.api.user.powerup({ user, amount: 1 }));
	};

	const toStakeMode = () => {
		setStakeMode(true);
		setVisible(false);
	};


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
						<Row
							className="text-center"
							style={{ alignItems: "center" }}
						>
							<Col span={8} className="nl-avatar">
								<Avatar
									size="large"
									src={
										<ContentImage size="medium" {...user} />
									}
								/>
							</Col>
							<Col
								span={12}
								className="text-left u-margin-left-medium"
							>
								<div>
									{isPowering && timeSince > 60000
										? "You powered"
										: state.indicators.specific[
											"api.user.powerup"
										]
											? "Powering..."
											: ""}

									<br />
									<span className="header-3">
										{user?.username}
									</span>
								</div>
							</Col>
						</Row>
						<Row
							gutter={12}
							className="text-center"
							style={{ margin: "80px 0" }}
						>
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
								<span className="paragraph-2r u-margin-right-small ">
									Multiply your power up
								</span>
								<Tooltip
									placement="right"
									title="You can add unlimited power to leonielx.io by joining their DAO. As a member of leonielx.io DAO you will purchase $LEONIE tokens which can be used to access content, buy NFTs and vote on community proposals. The more you buy, the more power you give to leonielx.io. This is only on Testnet! "
								>
									<span>
										<Smallinfo />
									</span>
								</Tooltip>
							</div>
							<Button
								className="nl-button-primary"
								onClick={() => { }}
							>
								8X Power up
							</Button>
						</Col>
						<Col
							span={24}
							className="text-bold u-margin-bottom-medium"
						>
							<Button
								className="nl-button-primary inverse"
								onClick={toStakeMode}
							>
								{membershipValue
									? "∞ Stake more"
									: "Join the DAO"}
							</Button>
						</Col>
					</Row>
					<p className="paragraph-2r text-left">
						This is only on Testnet! Need help?
						<br />
						<span className="paragraph-2u">
							Join our telegram group!
						</span>
					</p>
				</div>
			</Modal>
			<Button onClick={powerup} className="powerup-btn">
				<p
					className="paragraph-2b"
					style={{ lineHeight: 0, margin: 0 }}
				>
					Power up
				</p>
			</Button>
			{/* stakeMode: {stakeMode.toString()} */}
			<UserStake
				onDone={() => setStakeMode(false)}
				hideButton={true}
				user={user}
				mode={stakeMode ? STAKE_STEPS.SELECT : STAKE_STEPS.DISABLED}
			/>
		</>
	);
};

export const UserWidgetTopFixed: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => {
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
	setActiveKey: React.Dispatch<React.SetStateAction<string>>;
	setShowSocials?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ user, setActiveKey }) => {
	const u = useCachedUser({ username: user?.username }, true);
	const state = useAppState();
	const actions = useActions();

	if (!user) return <></>;
	// return <Card title={""}
	// cover={<ContentImage width="100%" src={user.contentUrl} />}
	// >

	const toMonthName = (monthNumber: number) => {
		const date = new Date();
		date.setMonth(monthNumber - 1);

		return date.toLocaleString("en-US", {
			month: "long",
		});
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
			<Col xs={24} xl={16} className="nl-avatar">
				<Row className="user-widget__first-row">
					<Col xs={20} xl={20} className="text-left">
						<Row>
							<Avatar src={<ContentImage {...u} />} />
							<Col
								xs={18}
								xl={18}
								className="u-margin-left-medium"
								style={{
									display: "flex",
									alignItems: "baseline",
								}}
							>
								<Col>
									<p className="header-1r">{u.username}</p>
									<Col className="user__social-icons-wrapper">
										<SocialLink
											platform="instagram"
											user={user}
										>
											<Instagram />
										</SocialLink>
										<SocialLink
											platform="tumblr"
											user={user}
										>
											<TumblrIcon />
										</SocialLink>
										<SocialLink
											platform="soundcloud"
											user={user}
										>
											<Soundcloud />
										</SocialLink>
										<SocialLink
											platform="twitter"
											user={user}
										>
											<TwitterIcon />
										</SocialLink>
									</Col>
								</Col>
								<Col style={{ margin: "0 20px" }}>
									{u.id === state.api.auth.user?.id && (
										<Link to="/my/profile/update">
											<Edit />
										</Link>
									)}
								</Col>
								<Col style={{ flex: 1 }} xs={24}>
									<p className="header-3r">{user.displayName}</p>
								</Col>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row
					className="paragraph-2r text-left"
					style={{ marginTop: "20px" }}
				>
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
					<p
						className="paragraph-2b u-margin-left-small"
						style={{ color: "#959595" }}
					>
						{joinedDate}
					</p>
				</Row>
			</Col>
			<Col xs={24} xl={8} className="user-widget-heading">
				<Row
					className="user-widget-heading  user-widget__second-row"
					style={{ width: "100%", textAlign: "left" }}
					justify="start"
				>
					<Col xs={24} sm={12} className="username">
						<Row className="user-widget-heading__powering">
							<Col xs={12} xl={12}>
								<p
									onClick={() => setActiveKey("1")}
									style={{
										cursor: "pointer",
									}}
									className="header-1r"
								>
									{u.powered || 0}
								</p>
								<p className="paragraph-2r">powered by</p>
							</Col>
							<Col xs={12} xl={12}>
								<p
									onClick={() => setActiveKey("2")}
									style={{ cursor: "pointer" }}
									className="header-1r"
								>
									{u.powering || 0}
								</p>
								<p className="paragraph-2r">powering</p>
							</Col>
						</Row>
						{/* TODO: eyeOutlined? */}
						{/* {u.id === state.auth.user?.id ? (
							<Link
								title="Public view"
								to={`/user/${u.username}`}
							>
								<EyeOutlined />
							</Link>
						) : (
							""
						)} */}
					</Col>
					<Col xs={24} sm={12} className="powerup text-right nl-vertical-space">
						<UserPowerup user={u} />
						<div>
							<Button className="primary" onClick={() => actions.routing.historyPush({ location: "/dao/owner/" + u?.username })}>DAO</Button>
						</div>

						{/* <Button onClick={() => actions.routing.historyPush({ location: `/user/stake/${u.id}` })}>Power up</Button> */}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
// export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => <div>{JSON.stringify</div>

export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => (
	<List
		// header="Activity Stream"
		itemLayout="horizontal"
		dataSource={"instagram,soundcloud,twitter,facebook,pinterest"
			.split(/,/)
			.filter((k) => (user as any)[k])}
		renderItem={(k) => {
			return (
				<List.Item>
					<List.Item.Meta
						description={
							<DataRow
								title={k}
								value={(user as any)[k]}
								link={`https://www.${k}.com/${(user as any)[k]
									}`}
							/>
						}
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
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={<ContentImage {...u} />} />}
							description={
								<Row
									align="middle"
									gutter={18}
									className="app-main-full-width-only"
									justify="start"
									wrap={true}
								>
									<Col sm={24} xxl={24}>
										<Link
											to={`/user/${u.username}`}
											className="paragraph-1r"
										>
											{u.username}
										</Link>
										<Paragraph
											style={{ marginBottom: "0" }}
											className="paragraph-2r"
										>
											{u.powered || ""}
										</Paragraph>
									</Col>
									{/* <Col sm={24} xxl={16}>
										{u.powered || ""}
									</Col> */}
									{/* <Col sm={24} xxl={8}>
										{powerUp ? (
											<UserPowerup user={u} />
										) : (
											""
										)}
									</Col> */}
								</Row>
							}
						/>
					</List.Item>
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
	console.log(users);

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
			{title ? (
				<h2 className="app-main-full-width header-2">{title}</h2>
			) : (
				""
			)}
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
								<Avatar
									src={<ContentImage size="medium" {...u} />}
								/>
							</Col>
							<Col /*sm={16} xxl={8}*/>
								<Link
									to={`/user/${u.username}`}
									className="paragraph-1b"
								>
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
					<Row
						align="middle"
						gutter={6}
						style={{ padding: 12 }}
						justify="center"
						wrap={true}
					>
						<Col sm={10} xxl={4}>
							<Avatar
								src={<ContentImage size="small" {...u} />}
							/>
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

export const UserSocialInfoRow: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => (
	<>
		{"instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
			.split(/,/)
			.filter((k) => (user as any)[k])
			.map((k) => (
				<DataRow
					title={k}
					value={(user as any)[k]}
					link={`https://www.${k}.com/${(user as any)[k]}`}
				/>
			))}
	</>
);

export const PoolInfoDataRow: NLView<{
	pool?: { code: string },
}> = ({
	pool,
}) => {
		const poolInfo = useCachedPool(pool);
		const myPools = useAppState().newcoin.pools;
		const user = useCachedUser({ username: poolInfo.owner });

		return (
			<Row style={{ marginBottom: 10 }}>
				<Col span={4}>
					<Link to={`/user/${user.username}`}>
						<Avatar
							src={<ContentImage {...user} />}
							className="avatar-image-small"
						/>
					</Link>
				</Col>
				<Col span={14}>
					<div>
						<Link to={`/user/${user.username}`}>

							${user.newcoinTicker?.toUpperCase()}&nbsp;
							<b>{~~myPools[poolInfo?.code]}</b>
						</Link>
					</div>
					<small>
						TVL: {poolInfo.total.quantity}
						{/* {Math.round(Number(poolInfo?.total.quantity.toString().replace(/NCO/, "")))} */}
					</small>
				</Col>

				<Col span={6}>
					<UserStake
						user={user}
					/>
				</Col>
			</Row>

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
	onStakeStart?: Callback
}> = ({ user = {}, onStakeStart }) => {
	const nc = useAppState().newcoin;

	return (
		<>
			{Object.keys(nc.pools).map(
				(code) => (
					<PoolInfoDataRow pool={{ code }} />
				)
				// <DataRow
				//     title={<PoolInfo pool={{code}} />}
				//     value={`${val as string} ${code}`}
				// />
			)}
		</>
	);
};

export const UserNewcoinInfo: NLView<{ user?: UserReadPrivateResponse }> = ({
	user = {},
}) => {
	const state = useAppState();
	return (
		<>
			<DataRow
				title="newcoin domain name"
				value={user.username}
				link={`https://explorer-dev.newcoin.org/account/${user.username}`}
				collapse={true}
			/>
			<DataRow
				title="account balance"
				value={state.newcoin.account.acc_balances}
				collapse={true}
			/>

			<DataRow
				title="newcoin pool"
				value={<BlockExplorerLink id={user.newcoinPoolId} />}
				collapse={true}
			/>
			<DataRow
				title="newcoin account"
				value={<BlockExplorerLink id={user.newcoinAccTx} />}
				collapse={true}
			/>
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

export const UserPrivateInfo: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => (
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
