import { ContentLayout } from "../../Components/ContentLayout";
import { Form, Input } from "antd";
import { IOView } from "../../types";
import { Link, useLocation } from "react-router-dom";
import { NextButton } from "./NextButton";
import { UnsuccessfulLoginModal } from "../Auth/UI-Components/UnsuccessfulLoginModal";
import { useActions, useAppState } from "../../overmind";
import { useCallback, useEffect, useState } from "react";
import { validUrl } from "../../utils/urlHelpers";
import Spotlights from "../../Components/Spotlights";
import TopFolders from "../../Components/TopFolders";
import isEmpty from "lodash/isEmpty";

export const LinkHash: IOView = () => {
  const queryString = useLocation().search;
  const actions = useActions();
  const state = useAppState();
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);

  const topPostsPublic = state.lists.public.posts.items;
  const topMoodsPublic = state.lists.public.moods.items;

  const done = () => {
    const code = state.flows.user.create.form.inviteHash;
    try {
      if (code === "LONDONX" || code === "LONDON22") {
        actions.flows.user.create.bypassInviteFlow({ couponCode: code });
        return;
      }
      actions.flows.user.create.verifyHash({ inviteHash: code || "" });
    } catch (e) {
      setIsErrorSubmit(true);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      !topPostsPublic.length && (await actions.lists.public.posts());
      !topMoodsPublic.length && (await actions.lists.public.moods());
    };

    loadAll();
  }, [topPostsPublic.length]);

  useEffect(() => {
    actions.api.auth.logout();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(queryString);
    actions.flows.user.create.stopMetamaskFlow();
    if (!isEmpty(urlParams.get("invite"))) {
      actions.flows.user.create.updateForm({ inviteHash: urlParams.get("invite") as string });
      done();
      actions.routing.historyPush({ location: "/signup/auth" });
    }
  }, [actions.flows.user, actions.routing, done, queryString]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      if (validUrl(e.target.value)) {
        const params = new URL(e.target.value).searchParams;
        val = params.get("invite") || e.target.value;
      }
      actions.flows.user.create.updateForm({ inviteHash: val });
    },
    [actions],
  );
  return (
    <>
      <ContentLayout>
        <div className="nl-onboarding-title">Enter your invite key</div>
        <Form onFinish={done} className="nl-onboarding-form">
          <Input
            name="hash"
            className="nl-onboarding-input nl-onboarding-input-hash ant-form ant-form-item"
            onChange={onChangeHandler}
            defaultValue={state.flows.user.create.form.inviteHash}
            style={{ textAlign: "center" }}
          />
        </Form>
        <NextButton
          isErrorSubmit={isErrorSubmit}
          nextProps={{ text: "Next", command: () => done() }}
          visible={!isEmpty(state.flows.user.create.form.inviteHash)}
          contentDescription={
            !state.flows.user.create.legacyToken && !state.auth.authenticated ? (
              <div>
                Enter hash or nft credentials. Or
                <Link to="/auth/newlife-members" className="paragraph-2u nl-onboarding-link">
                  {" "}
                  click here{" "}
                </Link>
                if you are a member from the Newlife mobile app.
              </div>
            ) : null
          }
        />
        <UnsuccessfulLoginModal redirect={actions.routing.historyPush} />
      </ContentLayout>
      <>
        <div className="explore-page-wrapper u-margin-top-mega">
          <Spotlights carousel posts={topPostsPublic} title="Spotlights" />
          <TopFolders
            title={"Explore top folders"}
            userMoods={topMoodsPublic}
            maxItems={3}
            maxPostsToShow={5}
            posts={"full"}
            filterToSameNumberPosts
            enableScrollForMoreMoods={false}
          />
        </div>
      </>
    </>
  );
};
