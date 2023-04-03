import { BackArrow } from "../../Components/Icons/BackArrow";
import { Button, Col, Drawer, Row } from "antd";
import { ForwardArrow } from "../../Components/Icons/ForwardArrow";
import { Link } from "react-router-dom";
import { NLView } from "../../types";
import { SelectMoodForm } from "../../Components/SelectMood";
import { useState } from "react";

interface ITitle {
  title?: string;
  href?: string;
  navigationPrevRef?: any;
  navigationNextRef?: any;
  deeplikeActions?: boolean;
  deepLikeContainer?: React.MutableRefObject<any>;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
}

const Title: NLView<ITitle> = ({
  title,
  href,
  navigationPrevRef,
  navigationNextRef,
  deeplikeActions,
  deepLikeContainer,
  setVisible,
  visible,
}) => {
  return (
    <Row justify={"space-between"} align="middle" className={"title"}>
      {title && (
        <Col>
          <h2 className="paragraph-1b">{title}</h2>
        </Col>
      )}
      <Row>
        {navigationPrevRef && navigationNextRef && (
          <Row style={{ alignItems: "end" }}>
            <div style={{ cursor: "pointer" }} className="u-margin-right-medium" ref={navigationPrevRef}>
              <BackArrow />
            </div>
            <div style={{ cursor: "pointer" }} className="u-margin-right-medium" ref={navigationNextRef}>
              <ForwardArrow />
            </div>
          </Row>
        )}
        {href && (
          <Link className="paragraph-2b" to={href || ""}>
            <Button className="secondary-button">
              <span className="paragraph-2b">See all</span>
            </Button>
          </Link>
        )}
        {deeplikeActions && setVisible && (
          <Row align="middle">
            <span className="paragraph-2b u-margin-right-medium cursor-pointer" onClick={() => setVisible((p) => !p)}>
              {visible ? "Hide" : "See all"}
            </span>
            <Button className="secondary-button" htmlType="submit">
              <span className="paragraph-2b">Next</span>
            </Button>
          </Row>
        )}
      </Row>
    </Row>
  );
};

export default Title;
