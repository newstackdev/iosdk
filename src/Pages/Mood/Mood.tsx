import { MoodReadResponse } from "@newlife/newlife-creator-client-api";
import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { PremiumContent } from "../Components/PremiumContent";
import { useCurrentUserStakeEligibility, useFolderStakeInfo } from "../../hooks/useBlockchainInfo";
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
import { IOView, NLView } from "../../types";
import { MoodsGridRow } from "./MoodsGrid";

// const useFolderStakeInfo = (folder: MoodReadResponse) => {
// 	const moodDetails = useCachedMood(folder, true);
// 	const state = useAppState();
// 	const user = useCachedUser(folder.author);

// 	const pool = useCachedPool({ owner: user.username })

// 	const _stakeInfo = {
// 		toAccess: moodDetails.stakeToAccess || 0,
// 		currentUserStake: (state.newcoin.pools[pool.code] || 0) / 1000,
// 	}
// 	return {
// 		..._stakeInfo,
// 		currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
// 		currency: `${user.username?.toUpperCase()}`,
// 		currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
// 	};
// };

export const Mood: NLView = () => {
	const { moodId: id } = useParams<{ moodId: string }>();

	const mood = useCachedMoodPosts({ id }, true);
	const moodDetails = useCachedMood({ id }, true);

	const user = useCachedUser(mood.author);
	const state = useAppState();

	const pool = useCachedPool({ owner: user.username })

	const stakeInfo = useFolderStakeInfo(moodDetails);
	// {
	// 	..._stakeInfo,
	// 	currentUserNeeds: _stakeInfo.currentUserStake - _stakeInfo.toAccess,
	// 	currency: `${user.username?.toUpperCase()}`,
	// 	currentUserEligible: _stakeInfo.currentUserStake - _stakeInfo.toAccess > 0,
	// }
	// if(true)
	// 	return <>{JSON.stringify(moodDetails.stakeToAccess)}</>
	return (
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
					<Row style={{ marginBottom: "40px" }}>
						<p className="paragraph-2b">{moodDetails.title}</p>
						<p className="paragraph-2r">
							{moodDetails.description || ""}
						</p>
						{/* {moodDetails.stakeToAccess} */}
					</Row>
					<Row>
						{
							stakeInfo.toAccess ?
								(!stakeInfo.currentUserEligible ?
									<>
										<hr />
										<p className="paragraph-2r">
											{
												<>
													This content is accessible only to members of {user.username} dao.<br /><br />
													<div>Stake to access: {stakeInfo.toAccess || ""} </div>
													<div>Your stake: {stakeInfo.currentUserStake}</div>
													<div>Stake to enter: {stakeInfo.currentUserNeeds}</div>
												</>
											}
										</p>
									</>
									: <p>
										<hr />
										You are eligible to access this premium folder
									</p>)
								: <></>
						}
					</Row>
				</>
			}
			isMood
		>
			{/* <UserWidgetHeading user={mood.author || {}} /> */}

			{/* <MoodsGridRow mood={mood} noFolder={true} wrap={true} /> */}
			<TopFoldersGrid
				mood={mood}
				noFolder={true}
				postNumber={3}
				title="Moods"
			/>
			{/* <ItemGrid items={postList} render={p => <PostWidget post={p} mood={mood} />} /> */}
		</ContentLayout>
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
