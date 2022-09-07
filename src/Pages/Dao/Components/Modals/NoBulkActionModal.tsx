import { CrossCircle } from "../../../../Components/Icons/CrossCircle";
import { Modal } from "antd-latest";
import { useState } from "react";

export const NoBulkActionModal = () => {
  const bulkActionStates = {
    start: 1,
    end: 2,
  };

  const [mode, setMode] = useState(bulkActionStates.start);

  return (
    <Modal
      visible={mode === bulkActionStates.start}
      onCancel={() => window.location.reload()}
      closeIcon={<CrossCircle />}
      className="modal-ctn"
      footer={[]}
    >
      <h2>Oops! There are no qualifying proposals to perform this action.</h2>
      <p>This is only on Testnet! Need help? Join our telegram group!</p>
    </Modal>
  );
};
