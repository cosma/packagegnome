Template.map.onRendered(function(){
  Meteor.setTimeout(() => {
    PackageGnome.platform = new H.service.Platform({
      'app_id': '8DX8NnKNrXRwOiXRnxot',
      'app_code': 'nEHugbqeGD35N-peqUGYPw'
    });
    // Obtain the default map types from the platform object
    var maptypes = PackageGnome.platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    PackageGnome.map = new H.Map(
      document.getElementById('map'),
      maptypes.normal.map,
      {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
      }
    );
    PackageGnome.map.setZoom(10);

    this.autorun(function(){
       PackageGnome.Package = PackageGnome.Packages.findOne({_id:Session.get('activePackage')});
       if (PackageGnome.Package) {
         Template.map.initialisePackageJourney();
       }
    });
  },500);

});

Template.map.initialisePackageJourney = function(){
    let icon = new H.map.Icon('mapMarker.png');
    // Create a marker using the previously instantiated icon:
    let origin = new H.map.Marker(PackageGnome.Package.originLocation, { icon: icon });
    let destination = new H.map.Marker(PackageGnome.Package.destinationLocation, { icon: icon });

    // Add the marker to the map:
    PackageGnome.map.addObject(origin);
    PackageGnome.map.addObject(destination);

    // Define points to represent the vertices of a short route in Berlin, Germany:
    var points = [
      PackageGnome.Package.originLocation,
      PackageGnome.Package.destinationLocation
    ];

    // Initialize a strip and add all the points to it:
    var strip = new H.geo.Strip();
    points.forEach(function(point) {
      strip.pushPoint(point);
    });

    // Initialize a polyline with the strip:
    var polyline = new H.map.Polyline(strip, { style: { lineWidth: 10 }});

    // Add the polyline to the map:
    PackageGnome.map.addObject(polyline);

    // Zoom the map to make sure the whole polyline is visible:
    PackageGnome.map.setViewBounds(polyline.getBounds());
};
