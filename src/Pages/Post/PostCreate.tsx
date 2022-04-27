import {
	PostCreateRequest,
	MoodReadResponse,
	PostReadResponse,
	UserReadPrivateResponse,
} from "@newlife/newlife-creator-client-api";
import {
	Button,
	Checkbox,
	Col,
	Input,
	notification,
	Progress,
	Radio,
	Row,
	Select,
	Tooltip,
	Upload,
} from "antd";
import Form from "antd/lib/form";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { get } from "lodash";
import { NLView } from "../../types";
import { useActions, useAppState, useEffects } from "../../overmind";
import { PicturesWall } from "../../Components/PicturesWall";

import { MoodWidget } from "../../Components/MoodWidget";

import { LICENSES } from "../../constants";
import { SelectMood } from "../../Components/SelectMood";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { ContentLayout } from "../../Components/ContentLayout";
import { IndeterminateProgress } from "../../Components/IndeterminateProgress";
import { ProgressButton } from "../../Components/ProgressButton";
import { MoodCreateModal } from "../Mood/MoodCreate";
import { MoodsGrid } from "../Mood/MoodsGrid";
import { LargeArrowBack } from "../../Components/Icons/LargeArrowBack";
import TextArea from "antd/lib/input/TextArea";
import { AddButton } from "../../Components/Icons/AddButton";
import Switch from "react-switch";
import { Info } from "../../Components/Icons/Info";
import { useForm } from "antd/lib/form/Form";
import PostCreateHeader from "./PostCreateHeader";
import PostCreateInfo, { LicenseProps } from "./PostCreateInfo";
import { ExitButton } from "../../Components/Icons/ExitButton";
import { AddFolder } from "../../Components/Icons/AddFolder";
import Modal from "antd/lib/modal/Modal";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { NFTIcon } from "../../Components/Icons/NTFIcon";
import { NFTLargeIcon } from "../../Components/Icons/NFTLargeIcon";
import Avatar from "antd/lib/avatar/avatar";
import { ContentImage } from "../../Components/Image";

const initialLicense = { name: LICENSES[0][0], value: LICENSES[0][1] };

const mintNTFcolor = {
	white: "#FCFCF3",
	purple: "#c46ef7",
	green: "#b3ff00",
	default: "#888888",
};

export const PostCreate: NLView = (props) => {
	const state = useAppState();
	const actions = useActions();
	const effects = useEffects();

	const [form] = useForm();

	const [mintConfirmationOpen, setMintConfirmationOpen] =
		useState<boolean>(false);
	const [selectedLicense, setSelectedLicense] = useState<LicenseProps>({
		name: LICENSES[0][0],
		value: LICENSES[0][1],
	});
	const [isLicense, setIsLicense] = useState<boolean>(false);
	const [errMsg, setErrMsg] = useState("");
	const [moodMode, setMoodMode] = useState(false);

	const [contentType, setContentType] = useState("");
	const [mintNFTswitch, setMintNFTswitch] = useState<boolean>(false);

	const user: UserReadPrivateResponse | null = state.api.auth.user;

	// balance check

	const balances = state.newcoin.account?.acc_balances || [];
	const ncoBalance = Number((balances[0] || "").replace(/ NCO$/, "")) || 0;

	// const [moods, setMoods] = useState<MoodReadResponse[]>([]);
	const [post, setPost] = useState<PostReadResponse>({});

	const moods = state.api.auth.moods || [];

	actions.routing.setTitle("Create Post");

	useEffect(() => {
		actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
	}, []);

	const onFinish = async (values: PostCreateRequest & { file: FileList }) => {
		console.log("Success:", values);

		if (mintNFTswitch && !mintConfirmationOpen)
			return setMintConfirmationOpen(true);

		setMintConfirmationOpen(false);

		try {
			if (!contentType) {
				const f = values.file[0];

				// const contentType = mime.lookup(extname(f.));
				if (!f.type) {
					return effects.ux.message.warning(
						"Unrecognized/unsupported content type. Upload something else."
					);
				}
			}

			const postForm = {
				...values,
				contentType,
				doMint: mintNFTswitch ? "true" : "",
				license: selectedLicense.value,
			};

			const p = await actions.api.post.create({ postForm });
			if (!p) return;

			setMoodMode(true);
			setPost(p);
		} catch (ex) {
			setErrMsg(
				get(ex, "error.errorMessage.details") ||
					get(ex, "message") ||
					"unknown error"
			);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const gtfooh = (v: { moods: MoodReadResponse[] }) => {
		actions.api.post.attachToMoods({ moods: v.moods, post });
		actions.routing.historyPush({ location: `/post/${post.id}` });
		setMoodMode(false);
	};

	return (
		<div className="section-divider">
			<Form
				hidden={moodMode || !post}
				name="basic"
				form={form}
				initialValues={{ remember: true, licence: "BY-0" }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<ContentLayout
					isPost={true}
					header={
						<PostCreateHeader
							contentType={contentType}
							setContentType={setContentType}
						/>
					}
					info={
						<PostCreateInfo
							selectedLicense={selectedLicense}
							setSelectedLicense={setSelectedLicense}
							isLicense={isLicense}
							setIsLicense={setIsLicense}
							mintConfirmationOpen={mintConfirmationOpen}
							ncoBalance={ncoBalance}
						/>
					}
				>
					<div className="post-create-form-width">
						<Form.Item
							required={true}
							name="title"
							rules={[
								{
									required: true,
									message: "A couple of words here please",
								},
							]}
						>
							<Row>
								<p
									className="header-5"
									style={{ marginBottom: "20px" }}
								>
									Title
								</p>
								<Input placeholder="A few words🌙" />
							</Row>
						</Form.Item>
						<Form.Item
							required={true}
							name={contentType ? "content" : "description"}
							rules={[
								{
									required:
										contentType === "content"
											? true
											: false,
									message: "A couple of words here please",
								},
							]}
						>
							<Row>
								<p
									className="header-5"
									style={{ marginBottom: "20px" }}
								>
									{contentType ? "Post" : "Description"}
								</p>
								<Input.TextArea
									placeholder={
										contentType
											? "A new idea?✨"
											: "What's it about?✨"
									}
								/>
							</Row>
						</Form.Item>
						{/* <Form.Item
						name="license"
						rules={[
							{
								required: false,
								message: "Please pick a license",
							},
						]}
					>
						<Select defaultValue={LICENSES[0][1]}>
							{LICENSES.map((l) => (
								<Select.Option value={l[1]}>
									{l[0]}
								</Select.Option>
							))}
						</Select>
					</Form.Item> */}
						{/* <Form.Item name="doMint" valuePropName="checked">
						<RowCheckbox>Mint NFT on Newcoin</RowCheckbox>
					</Form.Item> */}
						<Form.Item name="doMint">
							<Row
								align="middle"
								style={{
									marginBottom: "10px",
								}}
							>
								<p className="header-5">Mint NFT</p>
								<Tooltip
									placement="right"
									title={
										ncoBalance === 0
											? "You do not have enough balance to mint your NFT! Top up!"
											: "Mint your content as an NFT on the Newcoin Network! For now, you can't trade this!"
									}
									overlayClassName={
										ncoBalance === 0
											? "tooltip-zero-balance"
											: ""
									}
								>
									<span>
										<Info
											color={
												ncoBalance === 0
													? mintNTFcolor.purple
													: mintNTFcolor.white
											}
										/>
									</span>
								</Tooltip>
							</Row>
							<Switch
								onChange={() => setMintNFTswitch((p) => !p)}
								checked={mintNFTswitch}
								checkedIcon={<></>}
								uncheckedIcon={<></>}
								onColor={
									ncoBalance === 0
										? mintNTFcolor.purple
										: mintNTFcolor.green
								}
								offColor={
									ncoBalance === 0
										? mintNTFcolor.purple
										: mintNTFcolor.default
								}
								disabled={ncoBalance === 0 ? true : false}
							/>
						</Form.Item>
						<Form.Item name="license">
							<Row
								align="middle"
								style={{
									marginBottom: "10px",
								}}
							>
								<p className="header-5">Creative License</p>
								<Tooltip
									placement="right"
									title="Share your content with No Rights Reserved with Creative Commons."
								>
									<span>
										<Info color={mintNTFcolor.white} />
									</span>
								</Tooltip>
							</Row>
							{!isLicense && selectedLicense ? (
								<Row className="licence-box">
									<p
										className="paragraph-2b"
										style={{ width: "90%" }}
									>
										{selectedLicense.name}
									</p>
									<span
										onClick={() => {
											// setSelectedLicense({ name: "");
											setIsLicense(true);
										}}
										style={{ display: "flex" }}
									>
										<ExitButton />
									</span>
								</Row>
							) : (
								<span
									onClick={() => {
										setSelectedLicense(initialLicense);
										setIsLicense(true);
									}}
									style={{ display: "flex" }}
								>
									<AddButton />
								</span>
							)}
						</Form.Item>
					</div>
				</ContentLayout>
			</Form>

			<Modal
				visible={mintConfirmationOpen}
				onOk={() => setMintConfirmationOpen(false)}
				onCancel={() => setMintConfirmationOpen(false)}
				footer={false}
				//@ts-ignore
				// getContainer={() =>
				// 	document.getElementById("basic")
				// }
				className="nl-white-box-modal"
				closeIcon={<CrossCircle />}
			>
				<Row style={{ width: "100%" }}>
					<Col style={{ marginRight: "20px" }}>
						<Avatar
							src={<ContentImage {...user} />}
							className="avatar-image-top-creators"
						/>
					</Col>
					<Col>
						<p className="paragraph-1r">your NFT</p>
						<p className="paragraph-1b">{user?.username}</p>
					</Col>
				</Row>
				<Row>
					<Col style={{ marginBottom: "20px" }}>
						<p className="header-3">Ready to mint!</p>
					</Col>
					<Col style={{ marginBottom: "20px" }}>
						<p className="paragraph-2r">
							You are about to mint your NFT on Newcoin Protocol!
						</p>
					</Col>
					<Col>
						<p className="paragraph-2r">Summary:</p>
						<p className="paragraph-2r">1087 $GNCO</p>
						<p className="paragraph-2r">— 5% creator fee</p>
						<p className="paragraph-2r">— 3% DAO fee</p>
					</Col>
				</Row>
				<Row justify="space-between">
					<NFTLargeIcon />
				</Row>
				<ProgressButton
					actionName="api.post.create"
					type="primary"
					progressText="Creating post..."
					// htmlType="submit"
					onClick={() => {
						form.submit();
					}}
					className={!selectedLicense ? "disabled-submit-button" : ""}
					disabled={
						!selectedLicense || ncoBalance === 0 ? true : false
					}
				>
					Mint
				</ProgressButton>
			</Modal>

			<Form
				className="app-main-full-width"
				hidden={!moodMode}
				onFinish={gtfooh}
			>
				<Form.Item name="moods" style={{ marginBottom: "40px" }}>
					<SelectMood moods={moods} />
				</Form.Item>

				<Form.Item
					label=""
					wrapperCol={{ offset: 0, span: 24 }}
					className="text-right"
				>
					<ProgressButton
						actionName="api.post.create"
						type="primary"
						htmlType="submit"
						progressText="Creating post..."
					>
						Share
					</ProgressButton>
				</Form.Item>
			</Form>
		</div>
	);
};
