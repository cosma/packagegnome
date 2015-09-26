PackageGnome.Packages = new Mongo.Collection('packages');

PackageGnome.Packages.add = function(shipment) {
  shipment = shipment['tracker.output'].consignment[0];
  shipment._id = shipment.consignmentKey.replace(/ /g,"");

  let originLocation = {
      name: "originLocation",
      searchText: `${shipment.originDepotName}, ${shipment.originCountry}`
    };
  let destinationLocation = {
      name: "destinationLocation",
      searchText: `${shipment.deliveryTown}, ${shipment.destinationCountry}`
    };

  console.log(originLocation);
  console.log(destinationLocation);
  let id = PackageGnome.Packages.insert(shipment);
  console.log(id);
  PackageGnome.Packages.setLocation(originLocation,id);
  PackageGnome.Packages.setLocation(destinationLocation,id);
};

PackageGnome.Packages.setLocation = function(locationString,id){
  let onResult = function(result) {
    console.log(result);
    let locations = result.Response.View[0].Result;
    let position = {
      lat: locations[0].Location.DisplayPosition.Latitude,
      lng: locations[0].Location.DisplayPosition.Longitude
    };

    let positionObject = {};
        positionObject[locationString.name] = position;
  PackageGnome.Packages.update({_id:id},{$set:positionObject});
  };

  PackageGnome.platform.getGeocodingService().geocode(locationString, onResult, function(e) {
    console.log(e);
  });
};

PackageGnome.Packages.helpers({
  getStations: function(){
    return PackageGnome.Stations.find({consigKey:this.consigKey},{sort:{created:1}}).fetch();
  },

  getCurrentStation: function(){
    return PackageGnome.Stations.findOne({consigKey:this.consigKey},{sort:{created:-1}});
  },

  addMessage: function(msg){
    let template = {
      created: new Date(),
      package: PackageGnome.Package._id
    };

    PackageGnome.Messages.insert(_.extend(template,{msg:msg}));
  },

  getMessages: function(){
    return PackageGnome.Messages.find({package:this._id},{sort:{created:-1}});
  }
});
