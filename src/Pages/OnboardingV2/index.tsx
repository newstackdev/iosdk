import { Button, Col, Form, Input, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { useActions, useAppState } from "../../overmind";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// https://newlifeai.atlassian.net/wiki/spaces/~653302162/pages/edit-v2/846364673

export const OnboardingLink: IOView = ({ children }) => {
  const { link: _linkFromUrl } = useParams<{ link: string }>();
  const actions = useActions();

  const done = (hash) => {
    actions.api.user.checkLinkHash({ hash });
    // check nft - need endpoint; implement in overmind under flows/onboarding2
  };

  useEffect(() => {
    done(_linkFromUrl);
  }, [_linkFromUrl]);

  return (
    <ContentLayout customClass="app-content-layout">
      Enter your secret invite key:
      <br />
      <Form onFinish={(e) => done(e.hash)}>
        <Row className="nl-row-vertical-space">
          <Col>
            <Input name="hash" />
            <br />
          </Col>
        </Row>
        <Row className="nl-row-vertical-space">
          <Col>
            <Button htmlType="submit">Next</Button>
          </Col>
        </Row>
      </Form>
    </ContentLayout>
  );
};

// v2.1
export const OnboardingNft: IOView = ({ children }) => {
  return (
    <ContentLayout customClass="app-content-layout">
      NFT Code
      <br />
      <Input />
    </ContentLayout>
  );
};

export const OnboardingVerifyLink: IOView = ({ children }) => {
  // get list of items in the invite by hash id

  return (
    <ContentLayout customClass="app-content-layout">
      Your nft
      <br />
      <Input />
    </ContentLayout>
  );
};

// v2.1
export const OnboardingVerifyNft: IOView = ({ children }) => {
  return (
    <ContentLayout customClass="app-content-layout">
      Your nft
      <br />
      <Input />
    </ContentLayout>
  );
};

export const OnboardingDomain: IOView = ({ children }) => {
  return (
    <ContentLayout customClass="app-content-layout">
      Your nft
      <br />
      <Input />
    </ContentLayout>
  );
};

export const OnboardingSubscribe: IOView = ({ children }) => {
  return (
    <ContentLayout customClass="app-content-layout">
      Your nft
      <br />
      <Input />
    </ContentLayout>
  );
};

export const OnboardingCreate: IOView = ({ children }) => {
  return (
    <ContentLayout customClass="app-content-layout">
      Your nft
      <br />
      <Input />
    </ContentLayout>
  );
};

export const OnboardingPowerup: IOView = ({ children }) => {
  return (
    <ContentLayout customClass="app-content-layout">
      Your nft
      <br />
      <Input />
    </ContentLayout>
  );
};

// OnboardingNft
// OnboardingVerifyLink
// OnboardingVerifyNft
// OnboardingDomain
// OnboardingSubscribe
// OnboardingCreate
// OnboardingPowerup
