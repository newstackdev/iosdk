import { Button, Checkbox, Col, Input, Progress, Radio, Row, Select, Tooltip, Upload, notification } from "antd";
import {
  MoodReadResponse,
  PostCreateRequest,
  PostReadResponse,
  UserReadPrivateResponse,
} from "@newstackdev/iosdk-newgraph-client-js";
import { NLView } from "../../../types";
import { PicturesWall } from "../../../Components/PicturesWall";
import { useActions, useAppState, useEffects } from "../../../overmind";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "antd/lib/form";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import { MoodWidget } from "../../../Components/MoodWidget";

import { AddButton } from "../../../Components/Icons/AddButton";
import { AddFolder } from "../../../Components/Icons/AddFolder";
import { ContentImage } from "../../../Components/Image";
import { ContentLayout } from "../../../Components/ContentLayout";
import { CrossCircle } from "../../../Components/Icons/CrossCircle";
import { ExitButton } from "../../../Components/Icons/ExitButton";
import { IndeterminateProgress } from "../../../Components/IndeterminateProgress";
import { Info } from "../../../Components/Icons/Info";
import { LICENSES } from "../../../constants";
import { LargeArrowBack } from "../../../Components/Icons/LargeArrowBack";
import { MoodCreateModal } from "../../Mood/MoodCreate";
import { MoodsGrid } from "../../Mood/MoodsGrid";
import { NFTIcon } from "../../../Components/Icons/NTFIcon";
import { NFTLargeIcon } from "../../../Components/Icons/NFTLargeIcon";
import { ProgressButton } from "../../../Components/ProgressButton";
import { RowCheckbox } from "../../../Components/RowCheckbox";
import { SelectMood } from "../../../Components/SelectMood";
import { useEmbed } from "../../../hooks/useEmbed";
import { useForm } from "antd/lib/form/Form";
import Avatar from "antd/lib/avatar/avatar";
import Modal from "antd/lib/modal/Modal";
import PostCreateHeader from "./PostCreateHeader";
import PostCreateInfo, { LicenseProps } from "./PostCreateInfo";
import Switch from "react-switch";
import TextArea from "antd/lib/input/TextArea";

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

  const [mintConfirmationOpen, setMintConfirmationOpen] = useState<boolean>(false);
  const [selectedLicense, setSelectedLicense] = useState<LicenseProps>({
    name: LICENSES[0][0],
    value: LICENSES[0][1],
  });
  const [isLicense, setIsLicense] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState("");
  const [moodMode, setMoodMode] = useState(false);

  const [contentType, setContentType] = useState("");
  const [mintNFTswitch, setMintNFTswitch] = useState<boolean>(false);
  const [embedSwitch, setEmbedSwitch] = useState(true);
  const [isEmbedBtnVisible, setIsEmbedBtnVisible] = useState(false);
  const [content, setContent] = useState("");

  const user: UserReadPrivateResponse | null = state.api.auth.user;

  // balance check

  // const balances = state.newcoin.account?.acc_balances || [];
  const mainPoolBalances = state.newcoin?.mainPool?.acc_balances || [];
  const blnc = mainPoolBalances[0]?.replace(/ GNCO/, "") || 0; // || "")?.replace(/ GNCO/, "") || 0;
  const ncoBalance = Number(blnc); //(balances[0] || "").replace(/ NCO$/, "")) || 0;

  // const [moods, setMoods] = useState<MoodReadResponse[]>([]);
  const [post, setPost] = useState<PostReadResponse>({});

  const { isLoading, error, embedContent } = useEmbed(content, "200", "350");

  const moods = state.api.auth.moods || [];

  actions.routing.setTitle("Create Post");

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "post" }, { text: "create" }]);
  }, []);

  useEffect(() => {
    if (contentType === "text/plain" && !isLoading && !isEmpty(embedContent) && isEmpty(error)) {
      setIsEmbedBtnVisible(true);
      setEmbedSwitch(true);
    } else {
      setIsEmbedBtnVisible(false);
      setEmbedSwitch(false);
    }
  }, [contentType, error, isLoading, embedContent, content]);

  const onFinish = async (values: PostCreateRequest & { file: FileList }) => {
    console.log("Success:", values);

    if (mintNFTswitch && !mintConfirmationOpen) return setMintConfirmationOpen(true);
    !mintNFTswitch && setMoodMode(true);
    try {
      if (!contentType) {
        const f = values.file[0];

        // const contentType = mime.lookup(extname(f.));
        if (!f.type) {
          return effects.ux.message.warning("Unrecognized/unsupported content type. Upload something else.");
        }
      }

      const postForm = {
        ...values,
        contentType,
        doMint: mintNFTswitch ? "true" : "",
        embed: embedSwitch && isEmbedBtnVisible ? "true" : "",
        license: selectedLicense.value,
      };
      const p = await actions.api.post.create({ postForm });
      if (!p) return;

      !mintNFTswitch && setMoodMode(true);

      const whereToGo: PostReadResponse = p.find((p) => typeof p != "string") as any;
      if (!whereToGo) {
        return actions.ux.showNotification({ message: "All upload items failed" });
      }

      setPost(whereToGo);
    } catch (ex) {
      setErrMsg(get(ex, "error.errorMessage.details") || get(ex, "message") || "unknown error");
    }
  };

  const onNextMode = () => {
    setMintConfirmationOpen(false);
    setMoodMode(true);
  };

  const onChangeContentHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (contentType === "text/plain") {
        setContent(e.currentTarget.value);
        if (isEmpty(e.currentTarget.value)) {
          setEmbedSwitch(false);
        }
      }
    },
    [contentType],
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const gtfooh = (v: { moods: MoodReadResponse[] }) => {
    actions.api.post.attachToMoods({ moods: v.moods, post });
    actions.routing.historyPush({ location: `/post/${post.id}` });
    setMoodMode(false);
  };

  return (
    <div>
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
          customClass="post-create-layout"
          header={
            <PostCreateHeader
              contentType={contentType}
              setContentType={setContentType}
              onChangeContent={onChangeContentHandler}
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
              embedSwitch={embedSwitch}
              content={embedContent || ""}
              contentType={contentType}
              isLoading={isLoading}
            />
          }
        >
          <div className="post-create-form-width">
            {(contentType !== "text/plain" || mintNFTswitch) && (
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
                  <p className="header-5" style={{ marginBottom: "20px" }}>
                    Title
                  </p>
                  <Input placeholder="A few words🌙" />
                </Row>
              </Form.Item>
            )}
            {contentType !== "text/plain" && (
              <Form.Item required={false} name={"description"}>
                <Row>
                  <p className="header-5" style={{ marginBottom: "20px" }}>
                    Description
                  </p>
                  <Input.TextArea placeholder={"What's it about?✨"} />
                </Row>
              </Form.Item>
            )}
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
                  overlayClassName={ncoBalance === 0 ? "tooltip-zero-balance" : ""}
                >
                  <span>
                    <Info color={ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.white} />
                  </span>
                </Tooltip>
              </Row>
              <Switch
                onChange={() => setMintNFTswitch((p) => !p)}
                checked={mintNFTswitch}
                checkedIcon={<></>}
                uncheckedIcon={<></>}
                onColor={ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.green}
                offColor={ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.default}
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
                <Tooltip placement="right" title="Share your content with No Rights Reserved with Creative Commons.">
                  <span>
                    <Info color={mintNTFcolor.white} />
                  </span>
                </Tooltip>
              </Row>
              {!isLicense && selectedLicense ? (
                <Row className="licence-box">
                  <p className="paragraph-2b" style={{ width: "90%" }}>
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
            {isEmbedBtnVisible ? (
              <Form.Item name="embed">
                <Row
                  align="middle"
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <p className="header-5">Embed</p>
                </Row>
                <Row>
                  <Switch
                    onChange={() => setEmbedSwitch((p) => !p)}
                    checked={embedSwitch}
                    checkedIcon={<></>}
                    uncheckedIcon={<></>}
                    onColor={ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.green}
                    offColor={ncoBalance === 0 ? mintNTFcolor.purple : mintNTFcolor.default}
                  />
                </Row>
              </Form.Item>
            ) : (
              false
            )}
          </div>
        </ContentLayout>
      </Form>

      <Modal
        visible={mintConfirmationOpen}
        onOk={() => setMintConfirmationOpen(false)}
        onCancel={() => {
          setMintConfirmationOpen(false);
          setPost({});
        }}
        footer={
          isEmpty(post) ? (
            <ProgressButton
              actionName="api.post.create"
              type="primary"
              progressText="Creating post..."
              // htmlType="submit"
              onClick={() => {
                form.submit();
              }}
              className={`nl-button-primary ${!selectedLicense ? "disabled-submit-button" : ""}`}
              disabled={!selectedLicense || ncoBalance === 0 ? true : false}
            >
              <p className="paragraph-1b">Mint</p>
            </ProgressButton>
          ) : (
            <Button onClick={onNextMode} className="nl-button-primary">
              <p className="paragraph-1b">Next</p>
            </Button>
          )
        }
        //@ts-ignore
        // getContainer={() =>
        // 	document.getElementById("basic")
        // }
        className="nl-white-box-modal"
        closeIcon={<CrossCircle />}
      >
        <Row style={{ width: "100%" }} className="nl-mintNFT-modal u-margin-bottom-large">
          <Col className="u-margin-right-medium">
            <Avatar src={<ContentImage {...user} />} className="avatar-image-top-creators" />
          </Col>
          <Col>
            <p className="paragraph-1r">testnet NFT</p>
            <p className="header-3">{user?.username}</p>
          </Col>
        </Row>
        {isEmpty(post) ? (
          <>
            <Row>
              <Col className="u-margin-bottom-medium">
                <p className="header-3">Ready to mint!</p>
              </Col>
              <Col className="u-margin-bottom-medium">
                <p className="paragraph-1r">
                  You're about to mint your NFT on Newcoin Protocol Testnet. On Testnet your NFT is not financially tradeable.
                </p>
              </Col>
              <Col>
                <p className="paragraph-1r">
                  When the Mainnet goes live, your Testnet NFT will be deleted and you will be able to create tradeable NFTs!
                </p>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col className="u-margin-bottom-medium">
                <p className="header-3">Your NFT is minting</p>
              </Col>
              <Col className="u-margin-bottom-medium">
                <p className="paragraph-1r">
                  Your mint on Newcoin Protocol Testnet is in progress. On Testnet your NFT is not financially tradeable.
                </p>
              </Col>
              <Col>
                <p className="paragraph-1r">
                  When the Mainnet goes live, your Testnet NFT will be deleted and you will be able to create tradeable NFTs!
                </p>
              </Col>
            </Row>
          </>
        )}
        <Row justify="space-between" className="u-margin-top-large u-margin-bottom-small">
          <NFTLargeIcon />
        </Row>
      </Modal>

      <Form className="app-main-full-width" hidden={!moodMode} onFinish={gtfooh}>
        <Form.Item name="moods" style={{ marginBottom: "40px" }}>
          <SelectMood moods={moods} />
        </Form.Item>

        <Form.Item label="" wrapperCol={{ offset: 0, span: 24 }} className="text-right">
          <ProgressButton actionName="api.post.create" type="primary" htmlType="submit" progressText="Creating post...">
            Save
          </ProgressButton>
        </Form.Item>
      </Form>
    </div>
  );
};
