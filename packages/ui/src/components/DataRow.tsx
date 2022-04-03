import { Row, Col } from "antd";
import { ReactElement } from "react";

export const DataRow = ({
  title,
  value,
  link,
  target,
}: {
  title?: ReactElement | string;
  value?: ReactElement | string;
  link?: string;
  target?: string;
}) =>
  !value ? (
    <>no value</>
  ) : (
    <Row style={{ width: "100%", marginBottom: 24 }}>
      <Col push={0} span={8}>
        {title}
      </Col>
      <Col
        push={2}
        span={14}
        style={{
          textOverflow: "ellipsis",
          textAlign: "right",
          overflow: "hidden",
        }}
      >
        {link ? (
          <a href={link} target={target === undefined ? "_new" : target}>
            {value}
          </a>
        ) : (
          value
        )}
      </Col>
    </Row>
  );
