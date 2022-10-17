import { Avatar, Button, Col, Row } from "antd";
import { Callback, NLView } from "../types";
import { ContentImage } from "./Image";
import { CrossCircle } from "./Icons/CrossCircle";
import { blockExplorerUrl } from "./Links";
import { useEffect, useState } from "react";
import Modal from "antd/lib/modal";

const openUrl = (url: string) => {
  window.open(url, "_new");
};

export const NewcoinRecept: NLView<{
  visible?: boolean;
  onDone?: Callback;
  // onCancel?: Callback,
  tx: string;
}> = ({ children, visible, onDone, tx }) => {
  const [_visible, _setVisible] = useState(!!visible);

  useEffect(() => {
    _setVisible(!!tx && !!visible);
  }, [tx, visible]);

  return (
    <Modal
      closeIcon={<CrossCircle />}
      visible={_visible}
      okText="Yes"
      cancelText="No"
      onCancel={() => {
        _setVisible(false);
        onDone && onDone();
      }}
      // onCancel={() => setMode(STAKE_STEPS.SELECT)}
      // onCancel={() => onCancel && onCancel() }
      cancelButtonProps={{ value: "No" }}
      footer={false}
      className="nl-white-box-modal"
    >
      {children}
      <div className="nl-vertical-space">&nbsp;</div>
      <div className="text-center" style={{ marginTop: 20 }}>
        {/* <h1>{round(value - fee)} $GNCO</h1> */}
        <Button className="nl-button-primary" onClick={() => openUrl(blockExplorerUrl.newcoin(tx))}>
          View on Newcoin
        </Button>
        <Button className="nl-button-primary" onClick={() => openUrl(blockExplorerUrl.blocks(tx))}>
          View on Bloks.io
        </Button>
      </div>
    </Modal>
  );
};
