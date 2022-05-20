import { Avatar, Button, Col, Row } from "antd";
import Modal from "antd/lib/modal";
import { useEffect, useState } from "react";
import { round } from "src/utils/numeric";
import { Callback, NLView } from "../types";
import { CrossCircle } from "./Icons/CrossCircle";
import { ContentImage } from "./Image";
import { blockExplorerUrl } from "./Links";

const openUrl = (url: string) => {
    window.open(url, "_new");
};

export const NewcoinRecept: NLView<{ 
    visible?: boolean,
    onDone?: Callback,
    onCancel?: Callback,
    tx: string
}> = ({ 
    children,
    visible,
    onDone,
    tx
}) => {
    const [_visible, _setVisible] = useState(!!visible);
    
    useEffect(() => {
        tx && _setVisible(true);
    }, [tx])

    return <Modal
        closeIcon={<CrossCircle />}
        visible={_visible}
        okText="Yes"
        cancelText="No"
        onCancel={() => { _setVisible(false); onDone && onDone(); }}
        // onCancel={() => setMode(STAKE_STEPS.SELECT)}
        // onCancel={() => onCancel && onCancel() }
        cancelButtonProps={{ value: "No" }}
        footer={false}
        className="nl-white-box-modal"
    >
        {children}
        <div className="text-center" style={{ marginTop: 20 }}>
            {/* <h1>{round(value - fee)} $GNCO</h1> */}
            <Button
                className="nl-button-primary"
                onClick={() => openUrl(blockExplorerUrl.newcoin(tx))}
            >
                View on Newcoin
            </Button>
            <Button
                className="nl-button-primary"
                onClick={() => openUrl(blockExplorerUrl.blocks(tx))}
            >
                View on Bloks.io
            </Button>
        </div>
    </Modal>
}