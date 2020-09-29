"use strict";

module.exports = function (app) {
  const path = require("path");
  const models = require(path.resolve(__dirname, "../model-config.json"));
  const datasources = require(path.resolve(__dirname, "../datasources.json"));

  // alter the table schemas based on the model definitions.

  function autoUpdateAll() {
    Object.keys(models).forEach(function (key) {
      if (typeof models[key].dataSource != "undefined") {
        if (typeof datasources[models[key].dataSource] != "undefined") {
          app.dataSources[models[key].dataSource].autoupdate(key, function (
            err
          ) {
            if (err) throw err;
            console.log(`Model ${key} updated`);
          });
        }
      }
    });
  }

  // create or re-create the table schemas based on the model definitions.
  function autoMigrateAll() {
    Object.keys(models).forEach(function (key) {
      if (typeof models[key].dataSource != "undefined") {
        if (typeof datasources[models[key].dataSource] != "undefined") {
          app.dataSources[models[key].dataSource].automigrate(key, function (
            err
          ) {
            if (err) throw err;
            console.log(`Model ${key} migrated`);
          });
        }
      }
    });
  }

  // enable with caution
  autoUpdateAll();
};
