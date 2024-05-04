const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    CYPRESS_APPLITOOLS_API_KEY: 'd2j5AWKqXxwrFVMmNbQXexHLmEjYy111pCt85gz4Seb0w110',
  },
});

require('@applitools/eyes-cypress')(module);
