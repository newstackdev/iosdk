import { Col, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import { WhitelistPreview } from "../../Components/WhitelistPreview";
import { useAppState } from "../../overmind";
import { useState } from "react";

const HashtagSelector: IOView = () => {
  const state = useAppState();
  const [activeTags, setActiveTags] = useState([] as string[]);

  const username = state.flows.user.create.form.username;

  const generateMockWhitelist = () => {
    const mockUser = {
      username: "Hashtag",
    };
    const mockWhiteList: Array<any> = [];
    for (let i = 0; i < 64; i++) {
      mockWhiteList.push(mockUser);
    }
    return mockWhiteList;
  };

  return (
    <ContentLayout>
      <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
        {username || "username.io"}
      </p>
      <Row className="onboarding-selector-navigation">
        <Col className="onboarding-selector-info-title">
          <p className="header-2b">Select 8 or more hashtags you like</p>
        </Col>
        <Col>
          <ProgressButton
            actionName="api.user.create"
            type="primary"
            htmlType="submit"
            progressText="Next step..."
            disabled={activeTags.length >= 8 ? false : true}
            onClick={() => {}}
          >
            Next
          </ProgressButton>
        </Col>
      </Row>
      <Row style={{ justifyContent: "space-between", width: "90%" }}>
        {generateMockWhitelist().map((user, i) => (
          <WhitelistPreview setActiveTags={setActiveTags} activeTags={activeTags} user={user.username + i} />
        ))}
      </Row>
    </ContentLayout>
  );
};

export default HashtagSelector;
