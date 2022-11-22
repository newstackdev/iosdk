import { Button, Col, Modal, Row } from "antd";
import { ImageComponent } from "../../Components/MediaComponents/ImageMediaComponent";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { VerifiedIcon } from "../Icons/VerifiedIcon";
import { useAppState } from "../../overmind";
import { usePowerup } from "../../hooks/usePowerup";
import { useVerified } from "../../hooks/useVerified";
import EightTimesIcon from "../Icons/EightTimesIcon";
import InfinityIcon from "../Icons/InfinityIcon";
import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";

const Powerup: React.FC<{ user: UserReadPublicResponse }> = ({ user }) => {
  const { powerup } = usePowerup(user);
  const [open, setOpen] = useState(false);
  const state = useAppState();
  const { verifiedUsers } = useVerified([user.username || ""]);
  const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);

  const showModal = () => {
    setOpen(true);
    if (!isEmpty(user.newcoinTicker)) powerup(1);
  };

  const powerup8x = () => {
    powerup(8);
    setOpen(false);
  };

  const redirectToSwap = (ticker?: string) => {
    if (isEmpty(ticker)) return;
    window.location.href =
      state.config.env.stage === "eu-prod"
        ? `https://auth.newsafe.org/swap/GNCO/${ticker}`
        : `https://auth-dev.newsafe.org/swap/GNCO/${ticker}`;
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Power up</Button>
      <Modal
        className="nl-powerup-dialog"
        visible={open}
        maskClosable
        footer={false}
        closable={false}
        maskStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.56)",
          backdropFilter: "blur(13.5px)",
        }}
        onCancel={handleCancel}
        modalRender={() => {
          return (
            <div className="nl-powerup-dialog-container">
              <Row justify="center">
                <div className="nl-powerup-dialog-title">AMPLIFY YOUR POWER-UP</div>
              </Row>
              <Row className="nl-powerup-dialog-profileContainer" align="middle" justify="center">
                <Col>
                  <ImageComponent {...user} size="small" className="nl-powerup-dialog-profilePicture" />
                </Col>
                <Col>
                  <div className="nl-powerup-dialog-username">{user.username}</div>
                </Col>
                <Col>{isUserVerified ? <VerifiedIcon fillColor="#000" /> : false}</Col>
                {!isEmpty(user.newcoinTicker) && (
                  <Col className="nl-powerup-dialog-ticker" xs={24} sm={5}>
                    ${user.newcoinTicker}
                  </Col>
                )}
              </Row>
              {isEmpty(user.newcoinTicker) ? (
                <Row justify="center" className="nl-powerup-dialog-noDaoMsg">
                  had not created their DAO yet. Please check this profile later.
                </Row>
              ) : (
                <>
                  <Row className="nl-powerup-dialog-btn" align="middle" onClick={powerup8x}>
                    <Col className="nl-powerup-dialog-btn-text" xs={14}>
                      Go premium and amplify all your Power-ups, up to 100 per day.
                    </Col>
                    <Col className="nl-powerup-dialog-btn-icon">
                      <EightTimesIcon width="60" height="30" />
                    </Col>
                  </Row>
                  <Row
                    className="nl-powerup-dialog-btn"
                    align="middle"
                    onClick={() => {
                      redirectToSwap(user.newcoinTicker);
                    }}
                  >
                    <Col className="nl-powerup-dialog-btn-text" xs={14}>
                      Swap $GNCO and power as much as you can.
                    </Col>
                    <Col className="nl-powerup-dialog-btn-icon">
                      <InfinityIcon width="60" height="30" />
                    </Col>
                  </Row>
                </>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default Powerup;
