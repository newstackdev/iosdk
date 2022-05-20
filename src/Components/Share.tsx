import React, { useCallback, useState, useEffect } from "react";
import { Tooltip, Modal, Button } from "antd";
import { PostReadResponse } from "@newlife/newlife-creator-client-api";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  TumblrShareButton,
  TwitterShareButton,
  TelegramShareButton,
  PinterestShareButton,
} from "react-share";
import { QRCodeSVG } from "qrcode.react";
import { NLView } from "../types";
import { CrossCircle } from "./Icons/CrossCircle";
import { TumblrIcon } from "./Icons/TumblrIcon";
import { ShareIcon } from "./Icons/ShareIcon";
import { Clipboard } from "./Icons/Clipboard";
import { TwitterIcon } from "./Icons/TwitterIcon";
import { TelegramIcon } from "./Icons/TelegramIcon";
import { PinterestIcon } from "./Icons/PinterestIcon";
import { contentImageUrl } from "./MediaComponents/ImageMediaComponent";

const ShareModalContent: NLView<{
  label?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, label, style }) => {
  return (
    <div
      className="nl-white-box-content-row"
      style={{
        paddingBottom: 15,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        ...style,
      }}
    >
      {label ? (
        <label
          className="header-2"
          htmlFor={`nl-share-btn-${label}`}
          style={{ width: "100%", cursor: "pointer" }}
        >
          {label}
        </label>
      ) : (
        false
      )}
      {children}
    </div>
  );
};

export const Share: NLView<{ currentPostProps: PostReadResponse }> = ({
  currentPostProps,
}) => {
  const URL =
    process.env.NODE_ENV === "production"
      ? window.location.href
      : `https://web-dev.newlife.io${window.location.pathname}`;
  const [isVisible, setIsVisible] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const [viewQR, setViewQR] = useState(false);

  const onCancelHandler = useCallback(() => {
    setIsVisible(false);
    setViewQR(false);
  }, [setIsVisible, setViewQR]);

  useEffect(() => {
    if (currentPostProps.tags) {
      const tags = currentPostProps.tags.map(
        (tag) => tag.value?.replace(/ /g, "") as string
      );
      setHashtags(tags);
    }
  }, [currentPostProps.tags]);

  return (
    <>
      {isVisible ? (
        <Modal
          closeIcon={<CrossCircle />}
          visible={isVisible}
          onCancel={onCancelHandler}
          className="nl-white-box-modal"
          footer={null}
          width={375}
          title={
            <>
              <div className="header-2" style={{ paddingBottom: 15 }}>
                Share to
              </div>
              <p className="paragraph-2r">
                Share this content to your networks!
              </p>
            </>
          }
        >
          {viewQR ? (
            <div style={{ paddingBottom: 15 }}>
              <QRCodeSVG value={URL} size={238} />
            </div>
          ) : (
            <>
              <ShareModalContent label="Twitter">
                <TwitterShareButton
                  url={URL}
                  title={currentPostProps.title}
                  className="nl-share-btn-Twitter"
                  id="nl-share-btn-Twitter"
                >
                  <TwitterIcon />
                </TwitterShareButton>
              </ShareModalContent>
              <ShareModalContent label="Tumblr">
                <TumblrShareButton
                  url={URL}
                  title={currentPostProps.title}
                  className="nl-share-btn-Tumblr"
                  id="nl-share-btn-Tumblr"
                  tags={hashtags}
                >
                  <TumblrIcon />
                </TumblrShareButton>
              </ShareModalContent>
              <ShareModalContent label="Telegram">
                <TelegramShareButton
                  url={URL}
                  title={currentPostProps.title}
                  className="nl-share-btn-Telegram"
                  id="nl-share-btn-Telegram"
                >
                  <TelegramIcon />
                </TelegramShareButton>
              </ShareModalContent>
              <ShareModalContent label="Pinterest">
                <PinterestShareButton
                  url={URL}
                  title={currentPostProps.title}
                  className="nl-share-btn-Pinterest"
                  id="nl-share-btn-Pinterest"
                  media={contentImageUrl({ ...currentPostProps })}
                >
                  <PinterestIcon />
                </PinterestShareButton>
              </ShareModalContent>
              <ShareModalContent label="Copy">
                <CopyToClipboard text={URL}>
                  <Tooltip
                    title={"copied to clipboard"}
                    placement="right"
                    visible={copyToClipboard}
                    afterVisibleChange={(visible) => {
                      if (visible) {
                        setTimeout(() => {
                          setCopyToClipboard(false);
                        }, 500);
                      }
                    }}
                  >
                    <button
                      className="copy-to-clipboard-button nl-share-btn-Copy"
                      id="nl-share-btn-Copy"
                      onClick={() => {
                        setCopyToClipboard(true);
                      }}
                    >
                      <Clipboard />
                    </button>
                  </Tooltip>
                </CopyToClipboard>
              </ShareModalContent>
            </>
          )}
          <ShareModalContent style={{ paddingBottom: "none" }}>
            <Button
              className="ant-btn ant-btn-primary"
              onClick={() => {
                setViewQR(!viewQR);
              }}
            >
              {viewQR ? "Back" : "QR Code"}
            </Button>
          </ShareModalContent>
        </Modal>
      ) : (
        false
      )}
      <span onClick={() => setIsVisible(true)} style={{ cursor: "pointer" }}>
        <ShareIcon />
      </span>
    </>
  );
};
