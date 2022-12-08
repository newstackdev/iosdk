import { Button, Col, Modal, Row } from "antd";
import { ImageComponent } from "../../Components/MediaComponents/ImageMediaComponent";
import { UserReadPublicResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { VerifiedIcon } from "../Icons/VerifiedIcon";
import { showPopUp } from "../../utils/popup";
import { useAppState } from "../../overmind";
import { useCachedPool } from "../../hooks/useCached";
import { usePowerup } from "../../hooks/usePowerup";
import { useVerified } from "../../hooks/useVerified";
import EightTimesIcon from "../Icons/EightTimesIcon";
import InfinityIcon from "../Icons/InfinityIcon";
import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";

const Powerup: React.FC<{ user: UserReadPublicResponse }> = ({ user }) => {
  const { powerup } = usePowerup(user);
  const [open, setOpen] = useState(false);
  const poolInfo = useCachedPool({ owner: user?.username });
  const state = useAppState();
  const { verifiedUsers } = useVerified([user.username || ""]);
  const isUserVerified = verifiedUsers && user.username && verifiedUsers.includes(user.username);

  const showModal = () => {
    setOpen(true);
    if (!isEmpty(user.newcoinTicker || !isEmpty(poolInfo?.code))) powerup(1);
  };

  const powerup8x = () => {
    powerup(8);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} className="power-up-btn">
        <p className="paragraph-2b power-up-btn-label">Power up</p>
      </Button>
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
                {!isEmpty(user.newcoinTicker || poolInfo?.code) && (
                  <Col className="nl-powerup-dialog-ticker" xs={24} sm={5}>
                    ${user.newcoinTicker || poolInfo?.code}
                  </Col>
                )}
              </Row>
              {isEmpty(user.newcoinTicker || poolInfo?.code) ? (
                <Row justify="center" className="nl-powerup-dialog-noDaoMsg">
                  has not created their DAO yet. Please check this profile later.
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
                      showPopUp(
                        `https://auth${
                          state.config.env.env == "dev" ? "-dev" : ""
                        }.newsafe.org/swap/GNCO/${user?.newcoinTicker?.toUpperCase()}`,
                        "__NEWSAFE__",
                      );
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
