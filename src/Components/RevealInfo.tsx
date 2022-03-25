import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { NLView } from "../types";

export const RevealInfo: NLView = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    return show ? <>{children}</> : <EyeOutlined onClick={() => setShow(true)} />
}