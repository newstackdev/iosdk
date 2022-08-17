import { Col, Row } from "antd";
import { ReactElement } from "react";
import { Spin } from "./Spin";
import { useAppState } from "../overmind";

type LayedOutContent = {
  header?: ReactElement | string | undefined;
  info?: ReactElement;
  isWorking?: boolean;
  isDomainPresale?: boolean;
  customClass?: string;
  isPost?: boolean;
  isMood?: boolean;
  isVote?: boolean;
  position?: "top";
};

const ContentLayoutHorizontal: React.FunctionComponent<React.PropsWithChildren<LayedOutContent>> = ({
  header,
  info,
  children,
  isWorking,
}) => (
  <>
    <h2>{header}</h2>
    <Row gutter={18} wrap={true}>
      <Col xs={24} sm={8} lg={4}>
        {info}
      </Col>
      <Col xs={24} sm={14} lg={20}>
        {children}
      </Col>
    </Row>
    {isWorking ? <Spin /> : ""}
  </>
);

const ContentLayoutVertical: React.FunctionComponent<React.PropsWithChildren<LayedOutContent>> = ({
  header,
  info,
  children,
  isWorking,
}) => {
  const state = useAppState();
  return (
    <div className="app-main-full-width">
      <div>{info}</div>
      <h2>{header}</h2>
      <div>{children}</div>
      {/* {(isWorking !== undefined) && state.indicators.isWorking ? <Spin /> : ""} */}
    </div>
  );
};

const ContentLayoutHorizontal3col: React.FunctionComponent<React.PropsWithChildren<LayedOutContent>> = ({
  header,
  info,
  children,
  isWorking,
  customClass = "",
  position = "",
  isPost,
  isMood,
  isVote,
}) => {
  const state = useAppState();
  let customPosition = "";

  switch (position) {
    case "top":
      customPosition = "app-content-align-vertically-top";
      break;
    default:
      customPosition = "app-content-align-vertically";
      break;
  }
  const layoutWrapperClassName = "app-main-full-width app-content-layout";
  // return <div className="app-main-full-width" style={{ minHeight: "90vh" }}>
  //     <div>{info}</div>
  //     <h2>{header}</h2>
  //     <div>{childlgren}</div>
  //     {/* {(isWorking !== undefined) && state.indicators.isWorking ? <Spin /> : ""} */}
  // </div>;
  if (isWorking) return <Spin />;

  // const spanSum = (header ? 4 : 0) + (info ? 4 : 0);
  // const mainSpan = 24 - spanSum

  const extrasSpan = (header ? 4 : 0) + (info ? 4 : 0);

  return (
    <Row
      justify="space-between"
      gutter={16}
      className={isVote ? layoutWrapperClassName + " " + "app-post-page-layout" : layoutWrapperClassName}
      style={{ margin: 0, height: "100%" }}
    >
      {header && (
        <Col
          xs={24}
          lg={isVote ? 5 : isPost ? 7 : isMood ? 1 : 4}
          className={isVote ? "text-left post-notification-column" : "text-left"}
          style={isVote ? { display: "flex", padding: 0, marginTop: 10 } : {}}
        >
          {header}
        </Col>
      )}
      <Col
        xs={24}
        lg={isPost || isVote ? 18 - extrasSpan : isMood ? 27 - extrasSpan : 24 - extrasSpan}
        className={`${customClass}`}
        style={
          isVote
            ? {
                width: "100%",
                padding: 0,
                display: "flex",
              }
            : extrasSpan
            ? { display: "flex" }
            : {
                width: "100%",
                padding: 0,
                display: "flex",
              }
        }
      >
        <div className={`app-main-full-height ${customPosition}`}>{children}</div>
      </Col>
      {info ? (
        <Col xs={24} lg={isVote ? 9 : isPost ? 7 : 4} style={isVote ? { display: "flex", padding: 0 } : { display: "flex" }}>
          <div
            style={isVote ? { width: "100%", display: "flex", justifyContent: "end" } : { width: "100%" }}
            className="text-left"
          >
            {info}
          </div>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

export const ContentLayout = ContentLayoutHorizontal3col;
