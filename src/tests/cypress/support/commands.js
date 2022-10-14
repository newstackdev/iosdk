// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-file-upload";
Cypress.Commands.add("getInvitationHash", () => {
  cy.exec(
    `curl -X POST https://api-eu-dev.newsafe.org/v1/generateSessionToken --header 'Authorization: ApiKey ${Cypress.env(
      "APIKEY",
    )}'`,
  ).then((tokenRes) => {
    cy.exec(
      `
    curl -X POST https://api-eu-dev.newgra.ph/v1/test-utils/user/configure/invited -H 'Content-Type: application/json' -H 'Authorization: newsafe ${
      JSON.parse(tokenRes.stdout).jwt
    }' -d '{"phone":"+420123123123"}'
    `,
    ).then((hashRes) => {
      return JSON.parse(hashRes.stdout);
    });
  });
});

Cypress.Commands.add("bypassPhoneVerification", () => {
  cy.exec(
    `curl -X POST https://api-eu-dev.newsafe.org/v1/generateSessionToken --header 'Authorization: ApiKey ${Cypress.env(
      "APIKEY",
    )} {"phone":"+420123123123"}'`,
  ).then((phoneToken) => {
    return JSON.parse(phoneToken.stdout).jwt;
  });
});

Cypress.Commands.add("bypassImportedUserAuth", () => {
  cy.exec(
    `curl -X POST https://api-eu-dev.newsafe.org/v1/generateSessionToken --header 'Authorization: ApiKey ${Cypress.env(
      "APIKEY",
    )}'`,
  ).then((tokenRes) => {
    cy.exec(
      `
    curl -X POST https://api-eu-dev.newgra.ph/v1/test-utils/user/configure/imported -H 'Content-Type: application/json' -H 'Authorization: newsafe ${
      JSON.parse(tokenRes.stdout).jwt
    }' -d '{"phone":"+420123123123"}'
    `,
    ).then((res) => {
      return JSON.parse(res.stdout);
    });
  });
});

Cypress.Commands.add("bypassImportedUserWhitelistedAuth", () => {
  cy.exec(
    `curl -X POST https://api-eu-dev.newsafe.org/v1/generateSessionToken --header 'Authorization: ApiKey ${Cypress.env(
      "APIKEY",
    )}'`,
  ).then((tokenRes) => {
    cy.exec(
      `
    curl -X POST https://api-eu-dev.newgra.ph/v1/test-utils/user/configure/imported-whitelisted -H 'Content-Type: application/json' -H 'Authorization: newsafe ${
      JSON.parse(tokenRes.stdout).jwt
    }' -d '{"phone":"+420123123123"}'
    `,
    ).then((res) => {
      return JSON.parse(res.stdout);
    });
  });
});

Cypress.Commands.add("bypassRegisteredUserAuth", () => {
  cy.bypassPhoneVerification().then((token) => {
    cy.visit({
      url: "/explore",
      qs: {
        newsafe_jwt: token,
      },
    });
  });
});
