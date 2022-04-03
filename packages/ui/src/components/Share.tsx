import { NLView } from "@newcoin-foundation/core";
import { useAppState } from "@newcoin-foundation/state";
import { Button, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";

export const Share: NLView<{ url: string }> = ({ url }) => (
  <Input value={url} />
);

export const ShareButton: NLView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const state = useAppState();

  const url = [
    window.location.protocol,
    "//",
    window.location.host,
    state.routing.location,
  ].join("");

  return (
    <>
      {isVisible ? (
        <Modal
          visible={isVisible}
          onCancel={() => setIsVisible(false)}
          onOk={() => setIsVisible(false)}
          className="nl-white-box-modal"
        >
          <Share url={url} />
        </Modal>
      ) : (
        <></>
      )}
      <Button onClick={() => setIsVisible(true)}>Share link</Button>
    </>
  );
};
