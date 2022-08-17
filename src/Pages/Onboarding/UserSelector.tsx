import { Col, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { ProgressButton } from "../../Components/ProgressButton";
import { TopCreators } from "../../Components/Creators";
import { useActions, useAppState } from "../../overmind";
import { useState } from "react";

type Props = {};

const UserSelector: IOView = (props: Props) => {
  const state = useAppState();
  const actions = useActions();
  const [addedUsers, setAddedUsers] = useState<string[]>([]);

  const allowNext = addedUsers.length >= 8 ? true : false;

  const username = state.flows.user.create.form.username;
  const users = state.lists.top.users.items;

  const selectedUsers = users.filter((user) => addedUsers.includes(user.username || ""));

  return (
    <ContentLayout>
      <p className="super-size font-variant-none" style={{ marginBottom: "40px" }}>
        {username || "username.io"}
      </p>
      <Row className="onboarding-selector-navigation">
        <Col className="onboarding-selector-info-title">
          <p className="header-2b">Select 8 or more people you like</p>
        </Col>
        <Col>
          <ProgressButton
            actionName=""
            type="primary"
            htmlType="submit"
            progressText="Next step..."
            disabled={!allowNext}
            onClick={async () =>
              await actions.api.user.powerUpMultiple({
                users: selectedUsers,
              })
            }
          >
            Next
          </ProgressButton>
        </Col>
      </Row>
      <TopCreators
        title={"Explore top creators"}
        users={users}
        buttonType="addUser"
        setAddedUsers={setAddedUsers}
        addedUsers={addedUsers}
      />
    </ContentLayout>
  );
};

export default UserSelector;
