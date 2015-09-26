PackageGnome.Stations = new Mongo.Collection('stations');

PackageGnome.Stations.template = function() {
  return {
    created: new Date()
  };
};

PackageGnome.Stations.add = function(station) {
  let id = PackageGnome.Stations.insert(_.extend(PackageGnome.Stations.template(),station));

  let location = {
      searchText: `${station.DepotName}, ${station.Country}`
    };

  PackageGnome.Stations.setLocation(location,id);
};

PackageGnome.Stations.setLocation = function(locationString,id){
  let onResult = function(result) {
    let locations = result.Response.View[0].Result;
    let position = {
      lat: locations[0].Location.DisplayPosition.Latitude,
      lng: locations[0].Location.DisplayPosition.Longitude
    };

  PackageGnome.Stations.update({_id:id},{$set:{location:position}});
  };

  PackageGnome.platform.getGeocodingService().geocode(locationString, onResult, function(e) {
    console.log(e);
  });
};

PackageGnome.Stations.helpers({

});
