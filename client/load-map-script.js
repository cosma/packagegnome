Template.application.onRendered(function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "/mapjs-core.js" ;

  document.head.appendChild(script);

  var script2 = document.createElement('script');
  script2.type = 'text/javascript';
  script2.src = "/mapjs-service.js";
  var script3 = document.createElement('script');
  script3.type = 'text/javascript';
  script3.src = "/mapjs-ui.js";

  Meteor.setTimeout(function() {
    document.head.appendChild(script2);
    document.head.appendChild(script3);
  },50);
});

// Meteor.startup(function(){
//   if (PackageGnome.Packages.find().count() === 0) {
//     let packages = EJSON.parse('packages-mocks.json');
//     packages = _.toArray(packages);
//     packages.forEach(p => {PackageGnome.Packages.add(p);});
//   }
//
//   if (PackageGnome.Stations.find().count() === 0) {
//     let packages = EJSON.parse('stations-mocks.json');
//     stations = _.toArray(stations);
//     stations.forEach(s => {PackageGnome.Stations.add(s);});
//   }
// });
