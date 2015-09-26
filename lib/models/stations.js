PackageGnome.Stations = new Mongo.Collection('stations');

PackageGnome.Stations.template = function(consigKey, imageUrl, geoData) {
  return {
    consigKey: consigKey,
    imageUrl: imageUrl,
    geoData: geoData,
    created: new Date()
  };
};

PackageGnome.Stations.add = function(consigKey, imageUrl, geoData) {
  let station = PackageGnome.Stations.template(consigKey, imageUrl, geoData);

  PackageGnome.Stations.insert(station);
};

PackageGnome.Stations.helpers({

});
