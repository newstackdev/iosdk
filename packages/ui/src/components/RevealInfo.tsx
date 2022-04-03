import { EyeOutlined } from "@ant-design/icons";
import { NLView } from "@newcoin-foundation/core";
import { useState } from "react";

export const RevealInfo: NLView = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  return show ? <>{children}</> : <EyeOutlined onClick={() => setShow(true)} />;
};
