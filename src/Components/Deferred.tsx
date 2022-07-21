import { NLView } from "../types";
import { clock } from "../utils/clock";
import { useEffect, useState } from "react";

export const Deferred: NLView<{ deferTime: number; visible: boolean }> = ({ deferTime, visible, children }) => {
  const [startTime, setStartTime] = useState<number>(0);

  const processTick = () => {
    ((!startTime && visible) || (startTime && !visible)) && setStartTime(visible ? Date.now() : 0);
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
