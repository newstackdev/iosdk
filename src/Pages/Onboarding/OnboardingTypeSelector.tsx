import { Col, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { useActions } from "../../overmind";
import Button from "antd/lib/button";

export const OnboardingTypeSelector: IOView = () => {
  const actions = useActions();

  return (
    <ContentLayout customClass="app-content-layout">
      <Row gutter={[20, 20]} justify="center">
        <Col>
          <Button onClick={actions.flows.user.create.startMetamaskFlow}>
            <p className="paragraph-1r">I have a username purchased on OpenSea</p>
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              actions.routing.historyPush({ location: "/" });
              actions.flows.user.create.stopMetamaskFlow();
            }}
          >
            <p className="paragraph-1r">I want to create a new username</p>
          </Button>
        </Col>
      </Row>
    </ContentLayout>
  );
};
