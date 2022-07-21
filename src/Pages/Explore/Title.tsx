import { BackArrow } from "../../Components/Icons/BackArrow";
import { Button, Col, Row } from "antd";
import { ForwardArrow } from "../../Components/Icons/ForwardArrow";
import { Link } from "react-router-dom";
import { NLView } from "../../types";
import { useRef } from "react";

const Title: NLView<{ title?: string; href?: string; navigationPrevRef?: any; navigationNextRef?: any }> = ({
  title,
  href,
  navigationPrevRef,
  navigationNextRef,
}) => {
  return (
    <Row
      justify={"space-between"}
      align="middle"
      className="title"
      style={{ width: "100%" }}
      // style={title === "save to a folder" ? {} : { marginBottom: "40px" }}
    >
      <Col>{title && <h2 className="header-2">{title}</h2>}</Col>
      <Row>
        {navigationPrevRef && navigationNextRef && (
          <Row>
            <div style={{ cursor: "pointer" }} className="u-margin-right-medium" ref={navigationPrevRef}>
              <BackArrow />
            </div>
            <div style={{ cursor: "pointer" }} className="u-margin-right-medium" ref={navigationNextRef}>
              <ForwardArrow />
            </div>
          </Row>
        )}
        {href ? (
          <Link className="paragraph-2b" to={href || ""}>
            <Button className="secondary-button">
              <span className="paragraph-2b">See all</span>
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </Row>
    </Row>
  );
};

export default Title;
