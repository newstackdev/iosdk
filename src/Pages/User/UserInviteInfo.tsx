// import "./styles/UserInviteInfo.less";
import { Button, Col, FormInstance, Input, Modal, Row } from "antd";
import { Clipboard } from "../../Components/Icons/Clipboard";
import { ContentLayout } from "../../Components/ContentLayout";
import { CopyClipboardHashInput } from "../../Components/CopyClipboardHashInput";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { QRCodeSVG } from "qrcode.react";
import { useAppState } from "../../overmind";
import { useState } from "react";

const UserInviteInfo = ({
  invitedUsername,
  setStatus,
  form,
  hash,
}: {
  invitedUsername?: string;
  setStatus: React.Dispatch<React.SetStateAction<"start" | "inprogress" | "failed" | "done">>;
  form: FormInstance<any>;
  hash: string | undefined;
}) => {
  const state = useAppState();
  const [visible, setVisible] = useState<boolean>(true);

  if (hash) {
    navigator.clipboard.writeText(window.location.origin + `?invite=${hash}`);
  }

  const user = state.api.auth.user;

  const numberOfInvites = user.availableInvites || 0;

  return (
    <Modal
      closeIcon={<CrossCircle />}
      visible={visible}
      footer={null}
      className="nl-white-box-modal"
      onCancel={() => {
        setStatus("start");
        setVisible(false);
        form.resetFields();
      }}
    >
      <ContentLayout>
        <Row className="user-invite-info_modal-root-row">
          <Row style={{ flexDirection: "column", justifyContent: "start" }} className="u-margin-top-medium">
            <Col className="user-invite-info_modal-center-text-col">
              <p className="header-1b text-center">{numberOfInvites} invites left</p>
            </Col>
            <Col className="user-invite-info_modal-center-text-col">
              {invitedUsername && (
                <p className="paragraph-1r text-center">
                  you invited <span className="paragraph-1b">{invitedUsername}</span>
                </p>
              )}
            </Col>
            <Col>
              <p className="paragraph-1r text-left u-margin-top-large">
                Copy your unique invite code to send to {invitedUsername}. This code is a one-off and can be used on sign up.
              </p>
            </Col>
          </Row>

          <Col className="user-invite-info_modal-footer-col">
            {hash && <CopyClipboardHashInput hash={hash} highlight />}
            <Button
              type="primary"
              className="u-margin-top-large"
              onClick={() => {
                setStatus("start");
                setVisible(false);
                form.resetFields();
              }}
            >
              Invite more friends
            </Button>
            <p className="text-left paragraph-2b u-margin-top-large">
              Need help? <span className="paragraph-2u">Join our telegram group</span>
            </p>
          </Col>
          {/* TODO QR code for invite phone contracts, add pending invites, share invite button */}
          {/* <Button type="primary" className="u-margin-top-large">
          Share Invite
        </Button>
        <Row style={{ width: "100%", justifyContent: "space-between" }}>
          <Col>
            <p className="header-3 u-margin-bottom-large">Pending invites</p>
            <Row style={{ width: "100%", justifyContent: "space-between", marginBottom: "20px" }}>
              <Col>circle</Col>
              <Col>
                <p className="paragraph-2b u-margin-bottom-small">username</p>
                <p className="paragraph-2r">6 days ago</p>
              </Col>
            </Row>
          </Col>
          <Col style={{ height: "100%" }}>
            <p className="header-3 u-margin-bottom-large">Invite your phone contracts</p>
            <Col
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                display: "flex",
                height: "300px",
                flex: 1,
                width: "100%",
                alignItems: "center",
              }}
            >
              <QRCodeSVG value="" size={230} style={{ flex: 1 }} />
            </Col>
          </Col>
        </Row> */}
        </Row>
      </ContentLayout>
    </Modal>
  );
};

export default UserInviteInfo;
