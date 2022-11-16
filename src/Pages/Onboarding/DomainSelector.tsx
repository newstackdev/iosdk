import { AppearingComponent } from "../../Components/Appearing";
import { Button, Tag, Tooltip } from "antd";
import { ContentLayout } from "../../Components/ContentLayout";
import { IOView } from "../../types";
import { Link } from "react-router-dom";
import { MaskedInput } from "antd-mask-input";
import { NextButton } from "./NextButton";
import { RefObject, SyntheticEvent, useEffect, useRef } from "react";
import { SpaceSpin } from "../../Components/Spin";
import { estimateUsernamePrice } from "../../utils/username";
import { isEmpty } from "lodash";
import { useActions, useAppState } from "../../overmind";
import Paragraph from "antd/lib/typography/Paragraph";

export const DomainSelector: IOView = () => {
  const actions = useActions();
  const state = useAppState();
  const fuia = state.flows.user.create.formUsernameIsAvailable;
  const isMetamaskFlow = state.flows.user.create.metamaskFlow;
  const el: RefObject<typeof MaskedInput> = useRef({} as typeof MaskedInput);

  const username = state.flows.user.create.form.username || "";

  useEffect(() => {
    if (state.flows.user.create.isLegacyUpdateOngoing) {
      actions.flows.user.create.updateForm({ ...state.api.auth.user });
    }
  }, [state.api.auth.user]);

  const domainPrice = () => estimateUsernamePrice(username);

  const isPaidUsername = () => {
    const len = username.replace(/\.io/, "").length;
    const couponCode = state.flows.user.create.form.couponCode;
    return (
      len > 1 &&
      len <= 5 &&
      !state.api.auth.user?.subscriptionStatus?.startsWith("io-domain-sale") &&
      !(couponCode === "NEWFORUM-100-DROP1307" || couponCode === "LONDONX" || couponCode === "LONDON22")
    );
  };
  const isOneChar = () => {
    const len = username.replace(/\.io/, "").length;
    return len === 1 && !state.api.auth.user?.subscriptionStatus?.startsWith("io-domain-sale");
  };
  return (
    <ContentLayout>
      <div className="nl-onboarding-title nl-domain-selector">
        <div className="nl-domain-selector-infobox">
          <p className="paragraph-2r">
            Choose a name for your new life. It will be your account and wallet ID to receive crypto payments. This cannot be
            changed or deleted, and you own it. 9 characters max: a-z and 1-5.
          </p>
        </div>
      </div>
      <div className="nl-onboarding-form">
        <MaskedInput
          ref={el as any}
          readOnly={!isEmpty(state.api.auth.user.newcoinAccTx)}
          className={
            fuia === "unavailable" ? "nl-domain-presale__masked-input masked-input-error" : "nl-domain-presale__masked-input"
          }
          defaultValue={state.flows.user.create.form.username?.replace(/\.io$/, "") || ""}
          value={state.flows.user.create.form.username?.replace(/\.io$/, "")}
          size="large"
          mask="xxxxxxxxx.io"
          placeholderChar="&zwnj;"
          onChange={(v: SyntheticEvent & { target: { value: string } }) => {
            actions.flows.user.create.updateForm({
              username: v.target.value.replace(/\u200c/g, "").toLowerCase(),
            });
          }}
          formatCharacters={{
            x: {
              validate: function (char: string) {
                return /^[a-zA-Z1-5\.]$/.test(char);
              },
            },
          }}
        />
      </div>

      <NextButton
        nextProps={isMetamaskFlow ? { command: actions.evm.sendSignedMessage, text: "Transfer to us via Metamask" } : undefined}
        visible={
          (!isMetamaskFlow && !(isEmpty(state.flows.user.create.form.username) || isOneChar())) ||
          (isMetamaskFlow && fuia === "availableOnOpenSea")
        }
        contentDescription={
          !isMetamaskFlow && (
            <>
              {fuia === "checking" && <SpaceSpin isRotating={fuia === "checking"} />}
              {fuia === "unavailable" && <Tag className="u-margin-top-medium flex-center">Name is {fuia}</Tag>}
              <Paragraph className="paragraph-2r nl-domain-presale__footer-paragraph">
                {isOneChar() && !isMetamaskFlow ? (
                  <AppearingComponent seconds={1}>
                    To purchase a one character domain please{" "}
                    <Link
                      className="paragraph-2u nl-onboarding-link"
                      to="https://t.me/joinchat/Ezz_sQzaOK2j977siawwGQ"
                      target="_new"
                    >
                      contact us
                    </Link>
                    .
                  </AppearingComponent>
                ) : (
                  <></>
                )}
                {isPaidUsername() && !state.flows.user.create.legacyToken && !isMetamaskFlow ? (
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
                !isMetamaskFlow &&
                (state.flows.user.create.form.displayName !== state.flows.user.create.form.username || fuia === "unavailable") ? (
                  <>
                    <Tooltip
                      title={
                        <>
                          Your Newlife identity is now a part of the Newcoin ecosystem and provides access to many exciting
                          services. You may keep your current username as the display name on Newlife on the next dialog.
                        </>
                      }
                    >
                      <span> Why is my username changing?</span>
                    </Tooltip>
                    &nbsp;
                    <a href="/" onClick={() => actions.flows.user.create.stopLegacyImport()}>
                      I am not {state.flows.user.create.legacyUsername || state.api.auth.user.username}
                    </a>
                  </>
                ) : (
                  ""
                )}
              </Paragraph>
            </>
          )
        }
      />
      {/* )} */}
    </ContentLayout>
  );
};
