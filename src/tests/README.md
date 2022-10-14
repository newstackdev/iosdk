# Getting Started with E2E Cypress testing

## 1. Create `cypress.env.json` file in the root of `tests` folder where you add APIKEY env. variable

#### For example:

    { "APIKEY": <APIKEY> }

## 2. For local dev testing

    yarn cypress:run

### NOTE: `chromeWebSecurity` is disabled during e2e testing because of stripe (e2e test frameworks don't handle iframes very well, for that reason it is disabled)
