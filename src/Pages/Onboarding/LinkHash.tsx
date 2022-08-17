import { Col, Form, Input, Row } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { NextButton } from "./NextButton";
import { useActions, useAppState } from "../../overmind";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

export const LinkHash: IOView = () => {
  const queryString = useLocation().search;
  const actions = useActions();
  const state = useAppState();
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);

  const done = () => {
    try {
      actions.flows.user.create.verifyHash({ inviteHash: state.flows.user.create.form.inviteHash || "" });
    } catch (e) {
      setIsErrorSubmit(true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(queryString);

    if (!isEmpty(urlParams.get("invite"))) {
      actions.flows.user.create.updateForm({ inviteHash: urlParams.get("invite") as string });
      done();
      actions.routing.historyPush({ location: "/signup/auth" });
    }
  }, [actions.flows.user, actions.routing, done, queryString]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      actions.flows.user.create.updateForm({ inviteHash: e.target.value });
    },
    [actions],
  );
  return (
    <ContentLayout>
      Enter your secret invite key:
      <Form onFinish={done}>
        <Input
          name="hash"
          className="u-margin-top-large"
          onChange={onChangeHandler}
          defaultValue={state.flows.user.create.form.inviteHash}
          style={{ textAlign: "center" }}
        />
        <Col className="u-margin-top-large">
          <NextButton
            isErrorSubmit={isErrorSubmit}
            nextProps={{ text: "Next", command: () => done() }}
            visible={!isEmpty(state.flows.user.create.form.inviteHash)}
          />
        </Col>
      </Form>
    </ContentLayout>
  );
};
