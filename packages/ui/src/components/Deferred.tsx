import { useEffect, useState } from "react";
import { clock, NLView } from "@newcoin-foundation/core";

export const Deferred: NLView<{ deferTime: number; visible: boolean }> = ({
  deferTime,
  visible,
  children,
}) => {
  const [startTime, setStartTime] = useState<number>(0);

  const processTick = () => {
    ((!startTime && visible) || (startTime && !visible)) &&
      setStartTime(visible ? Date.now() : 0);
  };

  useEffect(() => {
    clock.on("tick", processTick);
    return () => {
      clock.off("tick", processTick);
    };
  }, [visible]);

  const show = visible && Date.now() - startTime > deferTime;

  return <>{show ? children : <></>}</>;
};

export default Deferred;
