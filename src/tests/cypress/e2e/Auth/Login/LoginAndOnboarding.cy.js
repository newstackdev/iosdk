let randomname = (numChars) =>
  " "
    .repeat(numChars || 9)
    .split("")
    .map((_) => String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)))
    .join("");
const username = randomname();
const importedUsername = randomname();

describe("User onboarding flow and login", () => {
  const bypassAuthentication = () => {
    cy.getInvitationHash().then((res) => {
      cy.get(".nl-onboarding-input").type(res.invitation.hash);
      cy.window().then((win) => {
        win.sessionStorage.setItem("emailForSignIn", res.email);
      });
      cy.contains("Next").click();
    });
    cy.bypassPhoneVerification().then((token) => {
      cy.visit({
        url: "/signup/domain",
        qs: {
          newsafe_jwt: token,
        },
      });
    });
  };

  const checkIfUsernameWasCreated = (u) => {
    cy.get(".nl-onboarding-input").should("exist");
    cy.bypassPhoneVerification().then((token) => {
      cy.visit({
        url: `/user/${u}.io`,
        qs: {
          newsafe_jwt: token,
        },
      });
    });
    cy.contains(`${u}.io`).should("exist");
    cy.visit("/signout");
  };

  const bypassImportedAuthFlow = (whitelisted) => {
    if (whitelisted) {
      cy.bypassImportedUserWhitelistedAuth().then((res) => {
        cy.window().then((win) => {
          win.sessionStorage.setItem("emailForSignIn", res.email);
          win.sessionStorage.setItem("e2eTestMode", "true");
        });
        cy.bypassPhoneVerification().then((token) => {
          cy.window().then((win) => {
            win.localStorage.setItem(
              "legacyAuthToken",
              JSON.stringify({
                legacyToken: `newsafe ${token}`,
                updated: Date.now(),
              }),
            );
            win.sessionStorage.setItem("nlOnboardingLegacyUpdateOngoing", "true");
          });
          cy.visit({
            url: "/",
            qs: {
              newsafe_jwt: token,
            },
          });
        });
      });
    } else {
      cy.bypassImportedUserAuth().then((res) => {
        cy.window().then((win) => {
          win.sessionStorage.setItem("emailForSignIn", res.email);
          win.sessionStorage.setItem("e2eTestMode", "true");
        });
        cy.bypassPhoneVerification().then((token) => {
          cy.window().then((win) => {
            win.localStorage.setItem(
              "legacyAuthToken",
              JSON.stringify({
                legacyToken: `newsafe ${token}`,
                updated: Date.now(),
              }),
            );
            win.sessionStorage.setItem("nlOnboardingLegacyUpdateOngoing", "true");
          });
          cy.visit({
            url: "/",
            qs: {
              newsafe_jwt: token,
            },
          });
        });
      });
    }
  };

  const cleanup = () => {
    cy.visit("/signout");
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.sessionStorage.setItem("nlOnboardingPhone", "+420123123123");
    });
  };

  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  // TODO: Tests are unstable, for now disabled but will require in the future to be functioning
  // Test is failing because of 409, 504 errors, BE has old/non existing email.
  it("Can onboard imported user", () => {
    bypassImportedAuthFlow(false);
    cy.wait(2000);
    cy.get(".nl-domain-presale__masked-input").clear();
    cy.wait(300);
    cy.get(".nl-domain-presale__masked-input").type(importedUsername);
    cy.contains("Next").click();
    cy.get("#sign-up-form_newcoinTicker").clear().type(randomname(7));
    cy.get("#sign-up-form_displayName").clear().type("tester");
    cy.get(".ant-checkbox-input").first().check();
    cy.contains("Submit").click();

    checkIfUsernameWasCreated(importedUsername);
  });

  it("Can onboard imported and whitelisted user", () => {
    bypassImportedAuthFlow(true);
    cy.wait(2000);
    cy.contains("Next").click();
    cy.get("#sign-up-form_newcoinTicker").clear().type(randomname(7));
    cy.get("#sign-up-form_displayName").clear().type("tester");
    cy.get(".ant-checkbox-input").first().check();
    cy.contains("Submit").click();

    checkIfUsernameWasCreated(importedUsername);
  });

  it("Can catch invalid verification hash", () => {
    cy.get(".nl-onboarding-input").type("invalid hash");
    cy.contains("Next").click();
    cy.contains("This invite code is invalid").should("exist");
    cy.visit("/");
  });

  it("Can onboard new invited users with short username", () => {
    bypassAuthentication();
    cy.get(".nl-domain-presale__masked-input").type("dx");
    cy.get(".masked-input-error").should("exist");
    const shortUsername = randomname(5);
    cy.get(".nl-domain-presale__masked-input").clear().type(shortUsername);
    cy.contains("Next").click();
    cy.get(".__PrivateStripeElement > iframe").should("be.visible");
    cy.get(".__PrivateStripeElement > iframe").then(($iframe) => {
      const $doc = $iframe.contents();

      cy.wrap($doc.find('input[name="number"')[0]).type(4242424242424242);
      cy.wrap($doc.find('input[name="expiry"')[0]).type(4242);
      cy.wrap($doc.find('input[name="cvc"')[0]).type(424);
    });
    cy.contains("Submit").click();

    cy.get("#sign-up-form_newcoinTicker").type(randomname(7));
    cy.get("#sign-up-form_displayName").type("tester");
    cy.get(".ant-checkbox-input").first().check();
    cy.contains("Submit").click();
    checkIfUsernameWasCreated(shortUsername);
    // NOTE: This flow ends here and is not redirected to explore page, will be redirected to login page because fbUser is null since we bypassed phone form
  });

  it("Can onboard new invited users with long username", () => {
    bypassAuthentication();
    cy.get(".nl-domain-presale__masked-input").type(username);
    cy.contains("Next").click();
    cy.get("#sign-up-form_newcoinTicker").type(randomname(7));
    cy.get("#sign-up-form_displayName").type("tester");
    cy.get(".ant-checkbox-input").first().check();
    cy.contains("Submit").click();
    //NOTE: This flow ends here and is not redirected to explore page, will be redirected to login page because fbUser is null since we bypassed phone form
    checkIfUsernameWasCreated(username);
  });
});
