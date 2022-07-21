import { Progress } from "antd";
import { SpinLogo } from "./Icons/SpinLogo";
import { clock } from "../utils/clock";
import { useAppState } from "../overmind";
import { useEffect, useState } from "react";

export const IndeterminateProgress = ({ inProgress }: { inProgress: boolean }) => {
  const [p, setP] = useState(0);

  useEffect(() => {
    clock.on("tick", setP);
    return () => {
      clock.off("tick", setP);
    };
  }, []);
  return inProgress ? (
    <div className="rotating" style={{ fontSize: 41 }}>
      <SpinLogo />
    </div>
  ) : (
    <></>
  );
};
export const IndeterminateProgressAction = ({ actionName }: { actionName: string }) => {
  const state = useAppState();
  const ival = !!state.indicators.specific[actionName];

  return <IndeterminateProgress inProgress={ival} />;
};
export const IndeterminateProgressBar = ({ inProgress }: { inProgress: boolean }) => {
  const [p, setP] = useState(0);

  useEffect(() => {
    clock.on("tick", setP);
    return () => {
      clock.off("tick", setP);
    };
  }, []);
  return inProgress ? <Progress showInfo={false} percent={p} strokeColor={"#c1fa50"} /> : <></>;
};
