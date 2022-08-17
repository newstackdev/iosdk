import { AppearingComponent } from "../../Components/Appearing";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { MaskedInput } from "antd-mask-input";
import { NextButton } from "./NextButton";
import { RefObject, SyntheticEvent, useEffect, useRef } from "react";
import { SpaceSpin } from "../../Components/Spin";
import { Tag, Tooltip } from "antd";
import { estimateUsernamePrice } from "../../utils/username";
import { useActions, useAppState } from "../../overmind";
import Paragraph from "antd/lib/typography/Paragraph";

export const DomainSelector: IOView = () => {
  const actions = useActions();
  const state = useAppState();
  const fuia = state.flows.user.create.formUsernameIsAvailable;
  const el: RefObject<typeof MaskedInput> = useRef({} as typeof MaskedInput);

  const username = state.flows.user.create.form.username || "";

  useEffect(() => {
    if (state.flows.user.create.isLegacyUpdateOngoing) {
      actions.flows.user.create.updateForm({ ...state.api.auth.user });
    }
  }, []);

  const domainPrice = () => estimateUsernamePrice(username);

  const isPaidUsername = () => {
    const len = username.replace(/\.io/, "").length;
    return len > 1 && len <= 5 && !state.api.auth.user?.subscriptionStatus?.startsWith("io-domain-sale");
  };
  const isOneChar = () => {
    const len = username.replace(/\.io/, "").length;
    return len === 1 && !state.api.auth.user?.subscriptionStatus?.startsWith("io-domain-sale");
  };
  return (
    <ContentLayout>
      <MaskedInput
        ref={el as any}
        className={
          fuia === "unavailable" ? "nl-domain-presale__masked-input masked-input-error" : "nl-domain-presale__masked-input"
        }
        defaultValue={state.flows.user.create.form.username?.replace(/\.io$/, "") || ""}
        size="large"
        mask="xxxxxxxxx.IO"
        placeholderChar="&zwnj;"
        onChange={(v: SyntheticEvent & { target: { value: string } }) => {
          actions.flows.user.create.updateForm({
            username: v.target.value.replace(/\u200c/g, "").toLowerCase(),
          });
        }}
        formatCharacters={{
          x: {
            validate: function (char: string) {
              return /^[a-z1-5\.]$/.test(char);
            },
            transform: function (char: string) {
              return char.toLowerCase();
            },
          },
        }}
      />
      <SpaceSpin isRotating={fuia === "checking"} />
      {fuia === "unavailable" && <Tag className="u-margin-top-medium">Name is {fuia}</Tag>}

      <Paragraph className="paragraph-2r nl-domain-presale__footer-paragraph">
        {/* {(state.api.auth.user.status === 'imported').toString()} {(state.api.auth.user.username !== state.flows.user.create.form.username).toString()} */}
        {isOneChar() ? (
          <AppearingComponent seconds={1}>
            To purchase a one character domain please{" "}
            <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ" target="_new">
              contact us
            </a>
            .
          </AppearingComponent>
        ) : (
          <></>
        )}
        {isPaidUsername() && !state.flows.user.create.legacyToken ? (
          <AppearingComponent seconds={1}>
            <br />
            {state.config.featureFlags.onboarding.premiumDomains ? (
              <>
                Premium usernames of 5 and fewer characters must be purchased.
                <br />
                Estimated price: {domainPrice()}
                <br />
                Click Next to continue.
              </>
            ) : (
              <>
                For early access please contact&nbsp;
                <a href="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ" target="_new">
                  our support team
                </a>
                .
              </>
            )}
          </AppearingComponent>
        ) : (
          ""
        )}

        {state.flows.user.create.legacyToken &&
        (state.flows.user.create.form.displayName !== state.flows.user.create.form.username || fuia === "unavailable") ? (
          <>
            <Tooltip
              title={
                <>
                  Your Newlife identity is now a part of the Newcoin ecosystem and provides access to many exciting services. You
                  may keep your current username as the display name on Newlife on the next dialog.
                </>
              }
            >
              <span>Why is my username changing?</span>
            </Tooltip>
            &nbsp;
            <a href="/" onClick={() => actions.flows.user.create.stopLegacyImport()}>
              I am not {state.flows.user.create.legacyUsername}
            </a>
          </>
        ) : (
          ""
        )}
      </Paragraph>
      <NextButton />
    </ContentLayout>
  );
};
