const { defineConfig } = require("cypress");

const envs = {
  production: "https://newlife.io",
  development: "http://localhost:3000",
  test: "http://localhost:3000",
};

const testStage = envs[process.env.NODE_ENV];

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    baseUrl: testStage,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
});
