import { Col, Dropdown, Row, Tabs } from "antd"
import { RefObject, useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useActions, useAppState } from "../overmind"
import { IOView } from "../types"
import { UserNewcoinInfo, UserNewcoinPoolsParticipation } from "./UserWidget";

export const Wallet: IOView = () => {
    const state = useAppState();
    const user = state.api.auth.user;
    const ncoBalance = state.newcoin.account;
    const gncoBalance = state.newcoin.mainPool;

    if (!user)
        return <></>;
    return <div className="nl-white-box" style={{ minWidth: "min(450px, 100vh)" }}>
        <h2 className="text-center">{user.username}</h2>
        <Row>
            <Col span={12}>
                <div className="" style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                }}>{ncoBalance.acc_balances}</div>
            </Col>
            <Col span={12}>
                <div className="" style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                }}>{gncoBalance.acc_balances}</div>
            </Col>
        </Row>

        <div style={{
            overflowY: "scroll",
            maxHeight: 400,
            paddingTop: 20
        }}>
            {/* <UserNewcoinInfo user={user} /> */}
            <UserNewcoinPoolsParticipation user={user} />
        </div>
    </div>
}

export const WalletWidget: IOView = () => {
    const [visible, setVisible] = useState<boolean>(true);
    const actions = useActions();
    const state = useAppState();

    useEffect(() => {
        setVisible(false);
    }, [state.flows.stake.latestMode]);

    return <div>
        <Dropdown
            visible={visible}
            onVisibleChange={(val) => setVisible(val)}
            overlayStyle={{}}
            overlay={<Wallet />}
        >
            <div>W</div>
        </Dropdown>
    </div>
}