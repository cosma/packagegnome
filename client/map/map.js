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

    var ui = H.ui.UI.createDefault(PackageGnome.map, maptypes);

    this.autorun(function(){
       PackageGnome.Package = PackageGnome.Packages.findOne({_id:Session.get('activePackage')});
       if (PackageGnome.Package) {
         if (PackageGnome.currentMarkers) {
           PackageGnome.map.removeObject(PackageGnome.currentMarkers);
         }
         Template.map.initialisePackageJourney();

         Meteor.setTimeout(() => {
           PackageGnome.map.setZoom(PackageGnome.map.getZoom() - 1);
         },10);
       }
    });
  },500);

});


Template.map.initialisePackageJourney = function(){
    let logIt = function(evt){
      console.log("Hey");
    };

    PackageGnome.currentMarkers = new H.map.Group();
    PackageGnome.map.addObject(PackageGnome.currentMarkers);
    let iconOrigin = new H.map.Icon(PackageGnome.Package.imageUrlOriginTODO || 'http://googlemaps.googlermania.com/google_maps_api_v3/en/Google_Maps_Marker.png');
    let iconDestination = new H.map.Icon(PackageGnome.Package.imageUrlDestinationTODO || 'http://googlemaps.googlermania.com/google_maps_api_v3/en/Google_Maps_Marker.png');
    // Create a marker using the previously instantiated icon:
    let origin = new H.map.Marker(PackageGnome.Package.originLocation);
    let destination = new H.map.Marker(PackageGnome.Package.destinationLocation);
    origin.addEventListener('tap',logIt);

    // Add the marker to the map:
    PackageGnome.currentMarkers.addObject(origin);
    PackageGnome.currentMarkers.addObject(destination);

    // Define points to represent the vertices of a short route in Berlin, Germany:
    var points = [
      PackageGnome.Package.originLocation,
    ];

    // Add the stations in between

    var stations = PackageGnome.Package.getStations();

    stations.forEach(s => {
      points.push(s.location);
      let iconStation = new H.map.Icon(s.imageUrl || 'http://i.imgur.com/RNiWxnS.png');
      let marker = new H.map.Marker(s.location, { icon: iconStation });

      marker.addEventListener('tap',logIt);
      PackageGnome.currentMarkers.addObject(marker);

    });

    // Add the endpoint
    //points.push(PackageGnome.Package.destinationLocation);

    // Initialize a strip and add all the points to it:
    var strip = new H.geo.Strip();
    points.forEach(function(point) {
      strip.pushPoint(point);
    });

    // Initialize a polyline with the strip:
    var polyline = new H.map.Polyline(strip, { style: { lineWidth: 10,strokeColor:"#ff6600" }});

    // Add the polyline to the map:
    PackageGnome.currentMarkers.addObject(polyline);
    // Zoom the map to make sure the whole polyline is visible:
    PackageGnome.map.setViewBounds(polyline.getBounds());


    // Add a weaker polyline for not yet passed stations
    var weakStrip = new H.geo.Strip();
    let lastPoint = points[points.length - 1];
    points = [];
    points.push(lastPoint);
    points.push(PackageGnome.Package.destinationLocation);
    points.forEach(function(point) {
      weakStrip.pushPoint(point);
    });    polyline = new H.map.Polyline(weakStrip, { style: { lineWidth: 1,strokeColor:"#ff6600" }});
    PackageGnome.currentMarkers.addObject(polyline);

};
