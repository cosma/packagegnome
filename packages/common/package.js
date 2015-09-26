Package.describe({
  name: 'common',
});

Package.onUse(function(api,where) {
  api.versionsFrom('1.2.0.1');

  api.use(['momentjs:moment', 'templating', 'jquery']);
  api.addFiles("common.js");
  api.addFiles("helpers.js",['client']);
  api.export("PackageGnome");
});
