import { Callback } from "../types";
import { Checkbox, Col, Row } from "antd";

export const RowCheckbox = ({
  children,
  onChange,
  disabled,
  title,
}: {
  disabled?: boolean;
  title?: string;
  children: string | React.FC | JSX.Element;
  onChange?: Callback;
}) => (
  <Row
    className="full-width"
    style={
      title === "report-checkbox"
        ? {
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }
        : { justifyContent: "flex-start" }
    }
    align="bottom"
  >
    <Col span={2} title={title}>
      <Checkbox disabled={disabled} onChange={onChange} />
    </Col>
    <Col span={18} className="text-left">
      {children}
    </Col>
  </Row>
);
