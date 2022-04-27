import { Dropdown, Tabs } from "antd"
import { RefObject, useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useActions, useAppState } from "src/overmind"
import { IOView } from "src/types"
import { UserNewcoinInfo, UserNewcoinPoolsParticipation } from "./UserWidget";

export const Wallet: IOView = () => {
    const state = useAppState();
    const user = state.api.auth.user;
    const ncUser = state.newcoin.account;

    if (!user)
        return <></>;
    return <div className="nl-white-box" style={{ minWidth: "min(450px, 100vh)" }}>
        <h2 className="text-center">{user.username}</h2>
        <div className="" style={{ 
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
        }}>{ncUser.acc_balances}</div>
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