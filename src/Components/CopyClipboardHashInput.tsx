import { Clipboard } from "./Icons/Clipboard";
import { Col, Input, Row } from "antd";
import { IOView } from "../types";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export const CopyClipboardHashInput: IOView<{ hash: string; highlight?: boolean }> = ({ hash, highlight }) => {
  const [showCopyText, setShowCopyText] = useState<boolean>(false);

  return (
    <CopyToClipboard text={window.location.origin + `?invite=${hash}`}>
      <div
        style={
          highlight ? { position: "relative", cursor: "pointer" } : { position: "relative", cursor: "pointer", width: "200px" }
        }
        onClick={() => {
          setShowCopyText(true);
          setTimeout(() => {
            setShowCopyText(false);
          }, 3000);
        }}
      >
        <Row align="middle">
          {/* <Input
            type="primary"
            className={showCopyText ? "nl-user-unvite-input-hash typography-overflow" : "typography-overflow"}
            placeholder={hash}
          /> */}
          <Col>
            {highlight && (
              <p
                className={highlight ? `header-1r` : "header-1r typography-overflow"}
                style={showCopyText || highlight ? { color: "#d7ff65" } : { color: "#fff" }}
              >
                {hash}
              </p>
            )}
          </Col>
          <Col>
            <Clipboard fill={showCopyText || highlight ? "#d7ff65" : "#fff"} />
          </Col>
          {(showCopyText || highlight) && (
            <div style={{ position: "absolute", bottom: 0, right: 0 }}>
              <p className="paragraph-3r" style={{ color: "#d7ff65" }}>
                Copied to clipboard!
              </p>
            </div>
          )}
        </Row>
      </div>
    </CopyToClipboard>
  );
};
