const { defineConfig } = require("cypress");

const envs = {
  production: "https://newlife.io",
  development: "http://localhost:3000",
  test: "https://web-dev.newlife.io",
};

const testStage = envs[process.env.NODE_ENV];

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: testStage,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
