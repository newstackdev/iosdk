import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ContentLayout } from "../../Components/ContentLayout";
import { ThreeDots } from "../../Components/Icons/ThreeDots";
import { ContentImage } from "../../Components/Image";
import { TopFoldersGrid } from "../../Components/TopFolders";
import { STAKE_STEPS, UserStake } from "../../Components/UserWidget";
import {
	useCachedMood,
	useCachedMoodPosts,
	useCachedPool,
	useCachedUser,
} from "../../hooks/useCached";
import { useAppState } from "../../overmind";
import { NLView } from "../../types";
import { UserStakeButton } from "../User/UserStake";
import { MoodsGridRow } from "./MoodsGrid";

export const Mood: NLView = () => {
	const { moodId: id } = useParams<{ moodId: string }>();

	const mood = useCachedMoodPosts({ id }, true);
	const moodDetails = useCachedMood({ id }, true);

	const user = useCachedUser(mood.author);
	const state = useAppState();

	const pool = useCachedPool({ owner: user.username })

	const _stakeInfo = {
		toAccess: moodDetails.stakeToAccess || 0,
		currentUserStake: (state.newcoin.pools[pool.code] || 0) / 1000,
	}
	const stakeInfo = {
		..._stakeInfo,
		currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
		currency: `${user.username?.toUpperCase()}`,
		currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
	}

	return (
		<div className="section-divider">
			<ContentLayout
				isWorking={!mood?.posts?.length}
				header={
					<>
						<Row
							style={{
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "40px",
							}}
						>
							<Col
								style={{
									alignItems: "center",
									display: "flex",
								}}
							>
								<span
									style={{
										marginRight: "10px",
										display: "flex",
									}}
								>
									{/* <LargeArrowBack /> */}
								</span>
								<Link
									to={`/user/${state.api.auth.user?.username}`}
									style={{ marginLeft: "10px" }}
								>
									<Avatar
										src={<ContentImage {...user} />}
										className="avatar-image-header"
									/>
								</Link>
								<Link
									to={`/user/${user.username}`}
									className="paragraph-1b"
									style={{ marginLeft: "20px" }}
								>
									{user.username}
								</Link>
							</Col>
							<Col
								style={{
									alignItems: "center",
									display: "flex",
								}}
							>
								<ThreeDots />
							</Col>
						</Row>
						<div style={{ marginBottom: "40px" }} className="sparse-vertical-children">
							<p className="paragraph-2b">{moodDetails.title}</p>
							<p className="paragraph-2r">
								{moodDetails.description || ""}
							</p>
							{
								stakeInfo.toAccess ?
									<>
										<p className="paragraph-2r">
											{
												<>
													<div>Stake to access: {stakeInfo.toAccess || ""} </div>
													<div>Your stake: {stakeInfo.currentUserStake}</div>
												</>
											}
										</p>
									</>
									: <></>
							}
						</div>
					</>
				}>
				<div className="nl-white-box sparse-vertical-children">
					{/* {JSON.stringify(state.newcoin.pools)} */}
					{!stakeInfo.currentUserEligible ?

						<>
							<div>Stake to access this folder</div>

								<UserStake
									onDone={() => { }}
									user={user}
								/>

						</>

						:

						<>You are eligible to access this folder</>
					}
				</div>
				<TopFoldersGrid
					mood={mood}
					noFolder={true}
					postNumber={3}
					title="Moods"
					blur={!stakeInfo.currentUserEligible}
				/>
				{/* <ItemGrid items={postList} render={p => <PostWidget post={p} mood={mood} />} /> */}
			</ContentLayout>
		</div>
	);
};

export const MoodDetailed: NLView = () => {
	const { moodId: id } = useParams<{ moodId: string }>();
	const mood = useCachedMood({ id }, true);
	const user = useCachedUser(mood.author);
	return (
		<ContentLayout isWorking={!mood?.posts?.length}>
			{/* <UserWidgetHeading user={mood.author || {}} /> */}
			<h2 className="header-2">{mood.title}</h2>
			<Link to={`/user/${user.username}`}>{user.username}</Link>
			<p>{mood.description}</p>
			<br />
			<MoodsGridRow mood={mood} noFolder={true} wrap={true} />
			{/* <ItemGrid items={postList} render={p => <PostWidget post={p} mood={mood} />} /> */}
		</ContentLayout>
	);
};
