Package.describe({
  name: 'constellation:subscriptions',
  version: '0.4.0',
  summary: 'Subscriptions plugin for Constellation',
  git: 'https://github.com/JackAdams/constellation-subscriptions.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['templating','session','blaze','reactive-dict'], 'client');
  api.use('constellation:console@1.4.0', 'client');

  api.addFiles('subscriptions.css','client');
  api.addFiles('subscriptions.html','client');
  api.addFiles('subscriptions.js','client');
  
  api.imply('constellation:console');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('constellation:subscriptions');
  api.addFiles('subscriptions-tests.js');
});
