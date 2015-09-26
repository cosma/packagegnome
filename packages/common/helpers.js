Template.registerHelper("exactMoment", function(date){
  return moment(new Date(date)).format("dddd, MMMM Do YYYY");
});

Template.registerHelper("package", function(){
  return PackageGnome.Packages.findOne({_id:Session.get('activePackage')});
});
