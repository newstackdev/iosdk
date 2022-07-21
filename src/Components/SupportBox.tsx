import { AppearingComponent } from "./Appearing";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { NLView } from "../types";
import { Row } from "antd";

const SupportBox: NLView<{ style?: CSSProperties }> = ({ style }) => {
  return (
    // <AppearingComponent seconds={2}>
    <Row className="support-box" style={style}>
      <p className="paragraph-2r">Need support?</p>
      <p className="paragraph-2u">
        <Link to="/"> Join our telegram group!</Link>
      </p>
    </Row>
    // </AppearingComponent>
  );
};

export default SupportBox;
