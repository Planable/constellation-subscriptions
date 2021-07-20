Package.describe({
  name: "planable:subscriptions",
  version: "0.4.10",
  summary: "Subscriptions plugin for Constellation",
  git: "https://github.com/Planable/constellation-subscriptions.git",
  documentation: "README.md",
  debugOnly: true,
});

Package.onUse(function (api) {
  api.versionsFrom("2.3");

  api.use(
    ["templating@1.4.1", "session", "blaze@2.5.0", "reactive-dict"],
    "client"
  );
  api.use("planable:console@1.4.9", "client");

  api.addFiles("subscriptions.css", "client");
  api.addFiles("subscriptions.html", "client");
  api.addFiles("subscriptions.js", "client");

  api.imply("planable:console");
});

Package.onTest(function (api) {
  api.use("tinytest");
  api.use("planable:subscriptions");
  api.addFiles("subscriptions-tests.js");
});
