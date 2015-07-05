Package.describe({
  name: 'babrahams:constellation-subscriptions',
  version: '0.1.0',
  summary: 'Subscriptions plugin for Constellation',
  git: 'https://github.com/JackAdams/constellation-subscriptions.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');

  api.use(['templating','session','blaze'], 'client');
  api.use('babrahams:constellation@1.0.0', 'client');

  api.addFiles('subscriptions.css','client');
  api.addFiles('subscriptions.html','client');
  api.addFiles('subscriptions.js','client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('subscriptions');
  api.addFiles('subscriptions-tests.js');
});
